import { Match, StreamServer } from '../types';
import { mockMatches } from '../data/mockMatches';

/**
 * Returns date formatted as YYYY-MM-DD in Asia/Riyadh (Saudi / Mecca) timezone
 */
export function getRiyadhDate(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Riyadh' }); // YYYY-MM-DD
}

/**
 * Get stored custom servers for a match from localStorage
 */
export function getCustomServersForMatch(matchId: string): StreamServer[] | null {
  try {
    const raw = localStorage.getItem(`kora_servers_${matchId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

/**
 * Save custom servers for a match in localStorage
 */
export function saveCustomServersForMatch(matchId: string, servers: StreamServer[]): void {
  try {
    localStorage.setItem(`kora_servers_${matchId}`, JSON.stringify(servers));
  } catch (e) {
    // ignore
  }
}

/**
 * Creates default streaming servers for any match
 */
export function generateDefaultServers(commentatorName: string = 'معلق عربي'): StreamServer[] {
  return [
    {
      id: 'srv-fhd-1',
      name: 'سيرفر 1 - beIN Sports 1 FHD (بدون تقطيع)',
      quality: '1080p 60fps',
      bitrate: '6500 kbps',
      status: 'online',
      commentator: commentatorName,
      type: 'fhd',
      engine: 'hls',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      referer: 'https://ysscores.com/',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    {
      id: 'srv-hd-2',
      name: 'سيرفر 2 - HD سريع للأجهزة الضعيفة والمتوسطة',
      quality: '720p',
      bitrate: '3500 kbps',
      status: 'online',
      commentator: commentatorName,
      type: 'hd',
      engine: 'hls',
      url: 'https://test-streams.mux.dev/test_001/stream.m3u8',
      videoUrl: 'https://test-streams.mux.dev/test_001/stream.m3u8',
    },
    {
      id: 'srv-sd-3',
      name: 'سيرفر 3 - متعدد الجودات التلقائي (Auto)',
      quality: 'Multi / Auto',
      bitrate: 'Adaptive',
      status: 'online',
      commentator: commentatorName,
      type: 'sd',
      engine: 'hls',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
    {
      id: 'srv-tv-4',
      name: 'سيرفر 4 - مخصص للشاشات الذكية والتلفاز (Smart TV)',
      quality: '1080p Ultra',
      bitrate: '8000 kbps',
      status: 'backup',
      commentator: commentatorName,
      type: '4k',
      engine: 'shaka',
      url: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
      videoUrl: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
    },
  ];
}

/**
 * Transforms raw Ysscores API item into application Match model
 */
export function transformYsscoresMatch(
  item: any,
  dateCategory: 'yesterday' | 'today' | 'tomorrow'
): Match {
  const matchId = `match-ys-${item.match_id}`;
  const homeTitle = item.home_team?.title || 'الفريق المضيف';
  const awayTitle = item.away_team?.title || 'الفريق الضيف';
  const championshipTitle = item.championship?.title || 'بطولة دولية';

  // Determine status
  let status: 'live' | 'upcoming' | 'finished' = 'upcoming';
  if (item.live === 1) {
    status = 'live';
  } else if (item.status === 4) {
    status = 'finished';
  } else if (dateCategory === 'yesterday') {
    status = 'finished';
  } else if (dateCategory === 'tomorrow') {
    status = 'upcoming';
  }

  // Format time (HH:mm)
  let timeStr = '20:00';
  if (item.match_time) {
    timeStr = item.match_time.slice(0, 5);
  }

  // Logos with HTTPS and fallback
  const homeLogo = item.home_team?.image
    ? `https://imgs.ysscores.com/teams/64/${item.home_team.image}`
    : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80';

  const awayLogo = item.away_team?.image
    ? `https://imgs.ysscores.com/teams/64/${item.away_team.image}`
    : 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80';

  const leagueLogo = item.championship?.image
    ? `https://imgs.ysscores.com/championship/48/${item.championship.image}`
    : 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80';

  // Channel & Commentator if provided
  let channel = 'beIN Sports HD 1';
  let commentator = 'معلق مميز';
  if (Array.isArray(item.channel_commm) && item.channel_commm.length > 0) {
    const firstChan = item.channel_commm[0];
    if (firstChan.channel?.title) channel = firstChan.channel.title;
    if (firstChan.commentator?.title) commentator = firstChan.commentator.title;
  }

  // Custom servers preserved from local storage if previously configured
  const savedServers = getCustomServersForMatch(matchId);
  const servers = savedServers || generateDefaultServers(commentator);

  // Calculate live minute if live
  let currentMinute: number | undefined = undefined;
  if (status === 'live') {
    if (item.match_timestamp) {
      const nowSeconds = Math.floor(Date.now() / 1000);
      const diffMinutes = Math.floor((nowSeconds - item.match_timestamp) / 60);
      currentMinute = Math.min(Math.max(diffMinutes, 1), 94);
    } else {
      currentMinute = 42;
    }
  }

  const homeScoreVal = Number(item.home_scores ?? 0);
  const awayScoreVal = Number(item.away_scores ?? 0);

  return {
    id: matchId,
    leagueId: `league-${item.championship?.id || item.championship_id || 'general'}`,
    leagueName: championshipTitle,
    leagueRound: 'الجولة الحالية',
    leagueLogo: leagueLogo,
    homeTeam: {
      id: `team-${item.home_team?.row_id || 'home'}`,
      name: homeTitle,
      nameEn: homeTitle,
      shortName: homeTitle.slice(0, 4),
      logo: homeLogo,
      country: 'دولي',
    },
    awayTeam: {
      id: `team-${item.away_team?.row_id || 'away'}`,
      name: awayTitle,
      nameEn: awayTitle,
      shortName: awayTitle.slice(0, 4),
      logo: awayLogo,
      country: 'دولي',
    },
    time: timeStr,
    date: dateCategory,
    status,
    currentMinute,
    homeScore: homeScoreVal,
    awayScore: awayScoreVal,
    channel,
    commentator,
    stadium: 'الملعب الرئيسي',
    isHotMatch: Boolean(item.ranking <= 5 || item.type === 1 || item.live === 1),
    servers,
    stats: {
      possession: [52, 48],
      shots: [Math.max(homeScoreVal * 3 + 5, 7), Math.max(awayScoreVal * 3 + 4, 6)],
      shotsOnTarget: [Math.max(homeScoreVal + 3, 4), Math.max(awayScoreVal + 2, 3)],
      corners: [6, 4],
      fouls: [11, 12],
      yellowCards: [2, 2],
      redCards: [0, 0],
      offsides: [2, 1],
      saves: [4, 5],
      passes: [480, 440],
      passAccuracy: [85, 82],
    },
    homeLineup: {
      formation: '4-3-3',
      manager: 'المدير الفني',
      startingXI: [
        { number: 1, name: 'حارس المرمى', position: 'GK' },
        { number: 4, name: 'قلب دفاع 1', position: 'DF' },
        { number: 5, name: 'قلب دفاع 2', position: 'DF' },
        { number: 2, name: 'ظهير أيمن', position: 'DF' },
        { number: 3, name: 'ظهير أيسر', position: 'DF' },
        { number: 6, name: 'محور ارتكاز', position: 'MF' },
        { number: 8, name: 'صانع ألعاب', position: 'MF' },
        { number: 10, name: 'قائد الوسط', position: 'MF', isCaptain: true },
        { number: 7, name: 'جناح أيمن', position: 'FW' },
        { number: 11, name: 'جناح أيسر', position: 'FW' },
        { number: 9, name: 'رأس الحربة', position: 'FW' },
      ],
      substitutes: [
        { number: 12, name: 'حارس بديل', position: 'GK' },
        { number: 14, name: 'مدافع بديل', position: 'DF' },
        { number: 18, name: 'وسط بديل', position: 'MF' },
        { number: 20, name: 'مهاجم بديل', position: 'FW' },
      ],
    },
    awayLineup: {
      formation: '4-2-3-1',
      manager: 'المدرب الفني للضيف',
      startingXI: [
        { number: 1, name: 'حارس الفريق الضيف', position: 'GK' },
        { number: 2, name: 'مدافع أيمن', position: 'DF' },
        { number: 4, name: 'قلب الدفاع', position: 'DF' },
        { number: 5, name: 'مدافع أيسر', position: 'DF' },
        { number: 3, name: 'ظهير', position: 'DF' },
        { number: 6, name: 'وسط مدافع', position: 'MF' },
        { number: 8, name: 'وسط محور', position: 'MF' },
        { number: 10, name: 'نجم الفريق', position: 'MF', isCaptain: true },
        { number: 14, name: 'جناح سريع', position: 'MF' },
        { number: 17, name: 'مهاجم ثاني', position: 'FW' },
        { number: 9, name: 'الهداف', position: 'FW' },
      ],
      substitutes: [
        { number: 22, name: 'حارس بديل', position: 'GK' },
        { number: 15, name: 'مدافع بديل', position: 'DF' },
        { number: 19, name: 'وسط بديل', position: 'MF' },
        { number: 21, name: 'مهاجم بديل', position: 'FW' },
      ],
    },
    events: [],
  };
}

/**
 * Fetch matches for yesterday, today, or tomorrow
 * Implements proxy fallback and caching
 */
export async function fetchLiveMatchesFromApi(
  dateCategory: 'yesterday' | 'today' | 'tomorrow'
): Promise<{ matches: Match[]; source: 'server' | 'proxy' | 'fallback' }> {
  const offset = dateCategory === 'yesterday' ? -1 : dateCategory === 'tomorrow' ? 1 : 0;
  const targetDateStr = getRiyadhDate(offset);

  // 1. First attempt: Call our local /api/matches Express or PHP backend endpoint
  try {
    const res = await fetch(`/api/matches?date=${targetDateStr}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (res.ok) {
      const json = await res.json();
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        const parsedMatches = json.data.map((item: any) =>
          transformYsscoresMatch(item, dateCategory)
        );
        return { matches: parsedMatches, source: 'server' };
      }
    }
  } catch (err) {
    console.warn('Backend /api/matches unreachable or static host:', err);
  }

  // 2. Second attempt: Direct or Free CORS proxy for GitHub Pages / static client
  try {
    const rawApiUrl = `https://api-ar.ysscores.com/api/matches/matches_date_get/${targetDateStr}/%5B%5D/%5B%5D/%5B%5D/D/180`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rawApiUrl)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const proxyRes = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (proxyRes.ok) {
      const json = await proxyRes.json();
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        const parsedMatches = json.data.map((item: any) =>
          transformYsscoresMatch(item, dateCategory)
        );
        return { matches: parsedMatches, source: 'proxy' };
      }
    }
  } catch (proxyErr) {
    console.warn('CORS proxy fetch error:', proxyErr);
  }

  // 3. Fallback to rich pre-configured default matches for this day
  const fallbackList = mockMatches.filter((m) => m.date === dateCategory);
  return { matches: fallbackList, source: 'fallback' };
}
