import express from "express";
import path from "path";
import fs from "fs";
import os from "os";
import { createServer as createViteServer } from "vite";

interface CacheEntry {
  timestamp: number;
  data: string;
}

const memoryCache = new Map<string, CacheEntry>();

function getRiyadhDate(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-CA", { timeZone: "Asia/Riyadh" }); // YYYY-MM-DD
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // CORS headers
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  /**
   * Matches API Endpoint:
   * Replicates the PHP script with caching to prevent IP bans.
   * Query: ?date=YYYY-MM-DD (defaults to today's date in Asia/Riyadh)
   */
  app.get("/api/matches", async (req, res) => {
    try {
      const todayDate = getRiyadhDate(0);
      let targetDate = (req.query.date as string) || todayDate;

      // Handle relative shortcuts: 'today', 'yesterday', 'tomorrow'
      if (targetDate === "today") {
        targetDate = todayDate;
      } else if (targetDate === "yesterday") {
        targetDate = getRiyadhDate(-1);
      } else if (targetDate === "tomorrow") {
        targetDate = getRiyadhDate(1);
      }

      // Sanitize date format: YYYY-MM-DD
      targetDate = targetDate.replace(/[^0-9-]/g, "");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
        targetDate = todayDate;
      }

      // Cache TTL: 30s for today, 600s (10 min) for other dates
      const cacheTTL = targetDate === todayDate ? 30 * 1000 : 600 * 1000;
      const now = Date.now();

      // Check Memory Cache
      const cached = memoryCache.get(targetDate);
      if (cached && (now - cached.timestamp < cacheTTL)) {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("X-Cache", "HIT-MEMORY");
        return res.send(cached.data);
      }

      // Check Disk Cache (temp directory fallback)
      const diskCacheFile = path.join(os.tmpdir(), `matches_${targetDate}.json`);
      try {
        if (fs.existsSync(diskCacheFile)) {
          const stats = fs.statSync(diskCacheFile);
          if (now - stats.mtimeMs < cacheTTL) {
            const fileData = fs.readFileSync(diskCacheFile, "utf-8");
            memoryCache.set(targetDate, { timestamp: stats.mtimeMs, data: fileData });
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.setHeader("X-Cache", "HIT-DISK");
            return res.send(fileData);
          }
        }
      } catch (err) {
        console.warn("Disk cache check error:", err);
      }

      // Construct API URL
      const apiUrl = `https://api-ar.ysscores.com/api/matches/matches_date_get/${targetDate}/%5B%5D/%5B%5D/%5B%5D/D/180`;

      // Fetch with Real Browser Headers to bypass Cloudflare protection
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const upstreamResponse = await fetch(apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Referer": "https://ysscores.com/",
          "Origin": "https://ysscores.com",
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (upstreamResponse.ok) {
        const textData = await upstreamResponse.text();

        // Validate JSON structure
        try {
          const parsed = JSON.parse(textData);
          if (parsed && (parsed.status === true || Array.isArray(parsed.data))) {
            // Save to memory and disk cache
            memoryCache.set(targetDate, { timestamp: now, data: textData });
            try {
              fs.writeFileSync(diskCacheFile, textData, "utf-8");
            } catch (diskErr) {
              console.warn("Could not write to disk cache:", diskErr);
            }

            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.setHeader("X-Cache", "MISS");
            return res.send(textData);
          }
        } catch (parseErr) {
          console.error("Invalid JSON received from upstream API:", parseErr);
        }
      }

      // If upstream failed or returned invalid response, try returning any stale cache
      if (cached) {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("X-Cache", "STALE-MEMORY");
        return res.send(cached.data);
      }

      if (fs.existsSync(diskCacheFile)) {
        const fileData = fs.readFileSync(diskCacheFile, "utf-8");
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("X-Cache", "STALE-DISK");
        return res.send(fileData);
      }

      res.status(502).json({
        status: false,
        message: "فشل جلب البيانات من المصدر، يرجى المحاولة لاحقاً",
      });
    } catch (error: any) {
      console.error("Error in /api/matches:", error);
      res.status(500).json({
        status: false,
        message: "حدث خطأ في معالجة طلب المباريات",
        error: error?.message,
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`⚽ Kora Live Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
