import { Match } from '../types';

/**
 * Dynamically updates document title, Open Graph, and Twitter meta tags
 * for social media sharing and rich previews when viewing a match.
 */
export function updateMatchMetaTags(match: Match | null) {
  if (typeof document === 'undefined') return;

  if (!match) {
    // Reset to default platform metadata
    document.title = 'كورة لايف - بث المباريات مباشرة و يومياً';
    setMeta('meta[name="description"]', 'content', 'منصة بث المباريات المباشرة ومواعيد ونتائج مباريات اليوم والقنوات الناقلة والتعليق العربي وترتيب الدوريات.');
    setMeta('meta[property="og:title"]', 'content', 'كورة لايف - بث المباريات مباشرة و يومياً');
    setMeta('meta[property="og:description"]', 'content', 'منصة بث المباريات المباشرة ومواعيد ونتائج مباريات اليوم والقنوات الناقلة والتعليق العربي وترتيب الدوريات.');
    setMeta('meta[property="og:url"]', 'content', window.location.origin);
    setMeta('meta[property="og:image"]', 'content', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=630&fit=crop&q=80');
    setMeta('meta[property="og:image:secure_url"]', 'content', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=630&fit=crop&q=80');
    setMeta('meta[property="og:image:alt"]', 'content', 'كورة لايف - بث المباريات مباشرة');
    setMeta('meta[name="twitter:title"]', 'content', 'كورة لايف - بث المباريات مباشرة و يومياً');
    setMeta('meta[name="twitter:description"]', 'content', 'منصة بث المباريات المباشرة ومواعيد ونتائج مباريات اليوم والقنوات الناقلة والتعليق العربي وترتيب الدوريات.');
    setMeta('meta[name="twitter:image"]', 'content', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=630&fit=crop&q=80');
    setMeta('meta[name="twitter:data1"]', 'content', 'أقوى الدوريات العالمية');
    setMeta('meta[name="twitter:data2"]', 'content', 'مباشر الآن 🔴');
    return;
  }

  const home = match.homeTeam?.name || 'الفريق المضيف';
  const away = match.awayTeam?.name || 'الفريق الضيف';
  const league = match.leagueName || 'البطولة';
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  const statusText = isLive
    ? `مباشر الآن (${match.homeScore ?? 0} - ${match.awayScore ?? 0}) دقيقة ${match.currentMinute ?? 0}'`
    : isFinished
    ? `انتهت (${match.homeScore ?? 0} - ${match.awayScore ?? 0})`
    : `الساعة ${match.time} بتوقيت مكة المكرمة`;

  const title = `🔴 بث مباشر: ${home} ضد ${away} | ${league} - كورة لايف`;
  const description = `شاهد الآن البث المباشر لمباراة ${home} ضد ${away} (${statusText}) في ${league}. القناة الناقلة: ${match.channel || 'beIN Sports'}، تعليق: ${match.commentator || 'عصام الشوالي'}. سيرفرات سريعة وجودات متعددة بدون تقطيع.`;
  const shareUrl = `${window.location.origin}/?match=${encodeURIComponent(match.id)}`;
  const imageUrl = match.homeTeam?.logo || match.awayTeam?.logo || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=630&fit=crop&q=80';

  // Update browser tab title
  document.title = title;

  // Update Standard & Open Graph meta tags
  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', shareUrl);
  setMeta('meta[property="og:image"]', 'content', imageUrl);
  setMeta('meta[property="og:image:secure_url"]', 'content', imageUrl);
  setMeta('meta[property="og:image:alt"]', 'content', `${home} ضد ${away} - بث مباشر`);

  // Update Twitter Card meta tags
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', imageUrl);
  setMeta('meta[name="twitter:image:alt"]', 'content', `${home} ضد ${away}`);
  setMeta('meta[name="twitter:data1"]', 'content', league);
  setMeta('meta[name="twitter:data2"]', 'content', isLive ? 'مباشر الآن 🔴' : match.time);

  // Update Schema.org JSON-LD structured data for sports events
  const jsonLdEl = document.getElementById('match-ld-json');
  if (jsonLdEl) {
    jsonLdEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: `${home} ضد ${away}`,
      description: description,
      sport: 'Soccer',
      url: shareUrl,
      eventStatus: isLive
        ? 'https://schema.org/EventLive'
        : isFinished
        ? 'https://schema.org/EventCompleted'
        : 'https://schema.org/EventScheduled',
      homeTeam: {
        '@type': 'SportsTeam',
        name: home,
        image: match.homeTeam?.logo,
      },
      awayTeam: {
        '@type': 'SportsTeam',
        name: away,
        image: match.awayTeam?.logo,
      },
      location: {
        '@type': 'Place',
        name: match.stadium || 'الملعب الرئيسي',
      },
      broadcast: {
        '@type': 'BroadcastEvent',
        name: match.channel || 'beIN Sports',
        isLiveBroadcast: isLive,
      },
    });
  }
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (selector.includes('property=')) {
      const prop = selector.match(/property="([^"]+)"/)?.[1];
      if (prop) el.setAttribute('property', prop);
    } else if (selector.includes('name=')) {
      const name = selector.match(/name="([^"]+)"/)?.[1];
      if (name) el.setAttribute('name', name);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}
