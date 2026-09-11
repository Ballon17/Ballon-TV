import express from "express";
import path from "path";
import fs from "fs";
import os from "os";
import { createServer as createViteServer } from "vite";
import { mockMatches } from "./src/data/mockMatches";

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function replaceOrInsertMeta(html: string, identifier: string, replacement: string): string {
  const regex = new RegExp(`<meta\\s+[^>]*${identifier}[^>]*>`, "i");
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace("</head>", `  ${replacement}\n</head>`);
}

/**
 * Injects Open Graph, Twitter, and Schema.org metadata for a specific or current live match into HTML.
 * This guarantees rich previews on social media platforms (WhatsApp, Twitter/X, Facebook, Telegram, Discord).
 */
function injectMatchMetaTags(html: string, matchId: string | undefined, req: express.Request): string {
  try {
    const match = matchId
      ? mockMatches.find((m) => m.id === matchId) || mockMatches.find((m) => m.status === "live") || mockMatches[0]
      : mockMatches.find((m) => m.status === "live") || mockMatches[0];

    if (!match) return html;

    const host = req.get("x-forwarded-host") || req.get("host") || "localhost:3000";
    const protocol = req.get("x-forwarded-proto") || req.protocol || "https";
    const baseUrl = `${protocol}://${host}`;
    const shareUrl = `${baseUrl}/?match=${encodeURIComponent(match.id)}`;

    const home = match.homeTeam?.name || "الفريق المضيف";
    const away = match.awayTeam?.name || "الفريق الضيف";
    const league = match.leagueName || "أقوى الدوريات العالمية";
    const isLive = match.status === "live";
    const isFinished = match.status === "finished";

    const scoreText = isLive
      ? `مباشر الآن (${match.homeScore ?? 0} - ${match.awayScore ?? 0}) دقيقة ${match.currentMinute ?? 0}'`
      : isFinished
      ? `انتهت (${match.homeScore ?? 0} - ${match.awayScore ?? 0})`
      : `الساعة ${match.time} بتوقيت مكة المكرمة`;

    const dynamicTitle = `🔴 بث مباشر: ${home} ضد ${away} | ${league} - كورة لايف`;
    const dynamicDesc = `شاهد الآن البث المباشر لمباراة ${home} ضد ${away} (${scoreText}) في ${league}. القناة الناقلة: ${match.channel || "beIN Sports"}، تعليق: ${match.commentator || "عصام الشوالي"}. سيرفرات متعددة وسريعة بدون تقطيع.`;
    const matchImage =
      match.homeTeam?.logo ||
      match.awayTeam?.logo ||
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=630&fit=crop&q=80";

    // Update <title>
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(dynamicTitle)}</title>`);

    // Update Meta Description
    html = replaceOrInsertMeta(html, 'name="description"', `<meta name="description" content="${escapeHtml(dynamicDesc)}" />`);

    // Update Open Graph tags
    html = replaceOrInsertMeta(html, 'property="og:title"', `<meta property="og:title" content="${escapeHtml(dynamicTitle)}" />`);
    html = replaceOrInsertMeta(html, 'property="og:description"', `<meta property="og:description" content="${escapeHtml(dynamicDesc)}" />`);
    html = replaceOrInsertMeta(html, 'property="og:url"', `<meta property="og:url" content="${escapeHtml(shareUrl)}" />`);
    html = replaceOrInsertMeta(html, 'property="og:image"', `<meta property="og:image" content="${escapeHtml(matchImage)}" />`);
    html = replaceOrInsertMeta(html, 'property="og:image:secure_url"', `<meta property="og:image:secure_url" content="${escapeHtml(matchImage)}" />`);
    html = replaceOrInsertMeta(html, 'property="og:image:alt"', `<meta property="og:image:alt" content="${escapeHtml(home + " ضد " + away + " - بث مباشر")}" />`);

    // Update Twitter Card tags
    html = replaceOrInsertMeta(html, 'name="twitter:title"', `<meta name="twitter:title" content="${escapeHtml(dynamicTitle)}" />`);
    html = replaceOrInsertMeta(html, 'name="twitter:description"', `<meta name="twitter:description" content="${escapeHtml(dynamicDesc)}" />`);
    html = replaceOrInsertMeta(html, 'name="twitter:image"', `<meta name="twitter:image" content="${escapeHtml(matchImage)}" />`);
    html = replaceOrInsertMeta(html, 'name="twitter:image:alt"', `<meta name="twitter:image:alt" content="${escapeHtml(home + " ضد " + away)}" />`);
    html = replaceOrInsertMeta(html, 'name="twitter:data1"', `<meta name="twitter:data1" content="${escapeHtml(league)}" />`);
    html = replaceOrInsertMeta(html, 'name="twitter:data2"', `<meta name="twitter:data2" content="${escapeHtml(isLive ? "مباشر الآن 🔴" : match.time)}" />`);

    // Update JSON-LD Structured Data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      name: `${home} ضد ${away}`,
      description: dynamicDesc,
      sport: "Soccer",
      url: shareUrl,
      eventStatus: isLive
        ? "https://schema.org/EventLive"
        : isFinished
        ? "https://schema.org/EventCompleted"
        : "https://schema.org/EventScheduled",
      homeTeam: { "@type": "SportsTeam", name: home, image: match.homeTeam?.logo },
      awayTeam: { "@type": "SportsTeam", name: away, image: match.awayTeam?.logo },
      location: { "@type": "Place", name: match.stadium || "الملعب الرئيسي" },
      broadcast: { "@type": "BroadcastEvent", name: match.channel || "beIN Sports", isLiveBroadcast: isLive },
    };

    html = html.replace(
      /<script type="application\/ld\+json" id="match-ld-json">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json" id="match-ld-json">${JSON.stringify(jsonLd)}</script>`
    );
  } catch (err) {
    console.error("Match meta injection error in server:", err);
  }
  return html;
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

  // Vite middleware & HTML serving setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Dynamic HTML injection middleware for dev (handles match sharing links and social crawlers)
    app.use(async (req, res, next) => {
      const url = req.originalUrl || req.url;
      const isHtmlRequest =
        req.method === "GET" &&
        !url.startsWith("/api/") &&
        !url.startsWith("/@") &&
        !url.startsWith("/src/") &&
        !url.startsWith("/node_modules/") &&
        (req.headers.accept?.includes("text/html") || url === "/" || url.startsWith("/?") || url.startsWith("/match/"));

      if (isHtmlRequest) {
        try {
          const matchId = (req.query.match as string) || (url.startsWith("/match/") ? url.split("/")[2]?.split("?")[0] : undefined);
          const indexPath = path.join(process.cwd(), "index.html");
          let rawHtml = fs.readFileSync(indexPath, "utf-8");
          let transformedHtml = await vite.transformIndexHtml(url, rawHtml);
          transformedHtml = injectMatchMetaTags(transformedHtml, matchId, req);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.status(200).end(transformedHtml);
        } catch (e) {
          return next(e);
        }
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*", (req, res) => {
      const matchId = (req.query.match as string) || (req.path.startsWith("/match/") ? req.path.split("/")[2] : undefined);
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, "utf-8");
        html = injectMatchMetaTags(html, matchId, req);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.send(html);
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`⚽ Kora Live Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
