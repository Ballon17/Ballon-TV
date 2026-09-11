import React, { useState } from 'react';
import { Match, MatchStatus, StreamServer } from '../types';
import { TEAMS } from '../data/teams';
import { X, Plus, Tv, Radio, Save, AlertCircle, Trash2, CheckCircle, Video } from 'lucide-react';

interface AddMatchModalProps {
  onClose: () => void;
  onAddMatch: (match: Match) => void;
  onResetDefaults: () => void;
  existingMatch?: Match | null;
  onDeleteMatch?: (id: string) => void;
}

export const AddMatchModal: React.FC<AddMatchModalProps> = ({
  onClose,
  onAddMatch,
  onResetDefaults,
  existingMatch,
  onDeleteMatch
}) => {
  const [homeTeamKey, setHomeTeamKey] = useState<string>('realMadrid');
  const [awayTeamKey, setAwayTeamKey] = useState<string>('barcelona');
  const [customHomeName, setCustomHomeName] = useState<string>('');
  const [customAwayName, setCustomAwayName] = useState<string>('');
  const [leagueId, setLeagueId] = useState<string>(existingMatch?.leagueId || 'ucl');
  const [leagueRound, setLeagueRound] = useState<string>(existingMatch?.leagueRound || 'الجولة 30');
  const [date, setDate] = useState<'today' | 'yesterday' | 'tomorrow'>(
    (existingMatch?.date as 'today' | 'yesterday' | 'tomorrow') || 'today'
  );
  const [time, setTime] = useState<string>(existingMatch?.time || '21:00');
  const [status, setStatus] = useState<MatchStatus>(existingMatch?.status || 'upcoming');
  const [currentMinute, setCurrentMinute] = useState<number>(existingMatch?.currentMinute || 60);
  const [homeScore, setHomeScore] = useState<number>(existingMatch?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState<number>(existingMatch?.awayScore ?? 0);
  const [channel, setChannel] = useState<string>(existingMatch?.channel || 'beIN Sports 1 HD Premium');
  const [commentator, setCommentator] = useState<string>(existingMatch?.commentator || 'عصام الشوالي');
  const [stadium, setStadium] = useState<string>(existingMatch?.stadium || 'استاد سانتياغو برنابيو');
  const [streamUrl, setStreamUrl] = useState<string>(existingMatch?.servers[0]?.videoUrl || '');

  const leagueOptions = [
    { id: 'ucl', name: 'دوري أبطال أوروبا' },
    { id: 'premier', name: 'الدوري الإنجليزي الممتاز' },
    { id: 'laliga', name: 'الدوري الإسباني' },
    { id: 'spl', name: 'دوري روشن السعودي' },
    { id: 'caf', name: 'دوري أبطال أفريقيا' },
    { id: 'seriea', name: 'الدوري الإيطالي' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedLeagueObj = leagueOptions.find(l => l.id === leagueId) || leagueOptions[0];

    // Determine home team
    const homeTeam = customHomeName.trim()
      ? {
          id: `team-${Date.now()}-h`,
          name: customHomeName.trim(),
          nameEn: customHomeName.trim(),
          shortName: customHomeName.trim().slice(0, 3).toUpperCase(),
          country: 'دولي',
          logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80'
        }
      : TEAMS[homeTeamKey] || TEAMS.realMadrid;

    // Determine away team
    const awayTeam = customAwayName.trim()
      ? {
          id: `team-${Date.now()}-a`,
          name: customAwayName.trim(),
          nameEn: customAwayName.trim(),
          shortName: customAwayName.trim().slice(0, 3).toUpperCase(),
          country: 'دولي',
          logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&auto=format&fit=crop&q=80'
        }
      : TEAMS[awayTeamKey] || TEAMS.barcelona;

    const servers: StreamServer[] = [
      {
        id: `srv-${Date.now()}-1`,
        name: 'سيرفر البث المباشر FHD',
        quality: '1080p 60fps',
        bitrate: '8500 kbps',
        status: 'online',
        commentator,
        type: 'fhd',
        videoUrl: streamUrl.trim() || undefined
      },
      {
        id: `srv-${Date.now()}-2`,
        name: 'سيرفر الجوال الخفيف SD',
        quality: '480p 30fps',
        bitrate: '1800 kbps',
        status: 'online',
        commentator,
        type: 'sd',
        videoUrl: streamUrl.trim() || undefined
      }
    ];

    const newMatch: Match = {
      id: existingMatch?.id || `match-${Date.now()}`,
      leagueId,
      leagueName: selectedLeagueObj.name,
      leagueRound: leagueRound.trim() || 'الجولة الرسمية',
      leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=64&auto=format&fit=crop&q=60',
      date,
      time,
      status,
      currentMinute: status === 'live' ? Number(currentMinute) : undefined,
      homeScore: status !== 'upcoming' ? Number(homeScore) : undefined,
      awayScore: status !== 'upcoming' ? Number(awayScore) : undefined,
      isHotMatch: true,
      channel,
      commentator,
      stadium,
      homeTeam,
      awayTeam,
      servers,
      events: existingMatch?.events || [],
      stats: existingMatch?.stats || {
        possession: [50, 50],
        shots: [10, 10],
        shotsOnTarget: [4, 4],
        corners: [5, 5],
        fouls: [10, 10],
        yellowCards: [1, 1],
        redCards: [0, 0],
        offsides: [1, 1],
        saves: [3, 3],
        passes: [400, 400],
        passAccuracy: [82, 82]
      },
      homeLineup: existingMatch?.homeLineup || { formation: '4-3-3', manager: 'المدرب الوطني', startingXI: [], substitutes: [] },
      awayLineup: existingMatch?.awayLineup || { formation: '4-3-3', manager: 'المدرب الوطني', startingXI: [], substitutes: [] }
    };

    onAddMatch(newMatch);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-6 top-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              {existingMatch ? 'تعديل بيانات المباراة والبث' : 'إضافة مباراة وبث مباشر جديد'}
            </h3>
            <p className="text-xs text-slate-400">
              قم بضبط الفريقين والنتيجة ورابط البث المباشر (يوتيوب أو سيرفر خارجي)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* League and Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">البطولة / الدوري</label>
              <select
                value={leagueId}
                onChange={(e) => setLeagueId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-emerald-500"
              >
                {leagueOptions.map((lg) => (
                  <option key={lg.id} value={lg.id}>
                    {lg.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">موعد العرض في الجدول</label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value as 'today' | 'yesterday' | 'tomorrow')}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-emerald-500"
              >
                <option value="today">مباريات اليوم 🔴</option>
                <option value="tomorrow">مباريات الغد ⏳</option>
                <option value="yesterday">مباريات الأمس ✅</option>
              </select>
            </div>
          </div>

          {/* Teams Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <div>
              <label className="block text-emerald-400 font-bold mb-1.5">الفريق المضيف (صاحب الأرض)</label>
              <select
                value={homeTeamKey}
                onChange={(e) => setHomeTeamKey(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white mb-2"
              >
                {Object.entries(TEAMS).map(([key, team]) => (
                  <option key={key} value={key}>
                    {team.name} ({team.country})
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="أو اكتب اسم فريق مخصص..."
                value={customHomeName}
                onChange={(e) => setCustomHomeName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 placeholder-slate-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-blue-400 font-bold mb-1.5">الفريق الضيف</label>
              <select
                value={awayTeamKey}
                onChange={(e) => setAwayTeamKey(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white mb-2"
              >
                {Object.entries(TEAMS).map(([key, team]) => (
                  <option key={key} value={key}>
                    {team.name} ({team.country})
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="أو اكتب اسم فريق مخصص..."
                value={customAwayName}
                onChange={(e) => setCustomAwayName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 placeholder-slate-500 text-xs"
              />
            </div>
          </div>

          {/* Match Status & Score */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">حالة المباراة</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MatchStatus)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-emerald-500"
              >
                <option value="live">مباشر الآن 🔴</option>
                <option value="upcoming">قادمة (لم تبدأ بعد)</option>
                <option value="finished">انتهت المباراة</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">وقت المباراة (أو التوقيت)</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="21:00"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            {status === 'live' ? (
              <div>
                <label className="block text-emerald-400 font-bold mb-1.5">الدقيقة الحالية</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={currentMinute}
                  onChange={(e) => setCurrentMinute(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            ) : (
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">الدور / الجولة</label>
                <input
                  type="text"
                  value={leagueRound}
                  onChange={(e) => setLeagueRound(e.target.value)}
                  placeholder="الجولة 30 أو نصف النهائي"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            )}
          </div>

          {/* Score inputs if live or finished */}
          {status !== 'upcoming' && (
            <div className="grid grid-cols-2 gap-4 p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
              <div>
                <label className="block text-emerald-400 font-bold mb-1">أهداف المضيف</label>
                <input
                  type="number"
                  min="0"
                  value={homeScore}
                  onChange={(e) => setHomeScore(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold text-center text-sm"
                />
              </div>
              <div>
                <label className="block text-blue-400 font-bold mb-1">أهداف الضيف</label>
                <input
                  type="number"
                  min="0"
                  value={awayScore}
                  onChange={(e) => setAwayScore(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold text-center text-sm"
                />
              </div>
            </div>
          )}

          {/* Broadcast & Commentary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">القناة الناقلة</label>
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="beIN Sports 1 HD أو SSC 1 HD"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">المعلق الرياضي</label>
              <input
                type="text"
                value={commentator}
                onChange={(e) => setCommentator(e.target.value)}
                placeholder="عصام الشوالي، فارس عوض، فهد العتيبي..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          {/* Live Video Stream Link (YouTube / m3u8 / iframe embed) */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold">
              <Video className="w-4 h-4" />
              <span>رابط البث المباشر (اختياري)</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
              يمكنك وضع رابط بث مباشر من <strong>YouTube Live</strong> أو رابط <strong>m3u8 / MP4</strong> أو رابط صفحة تضمين <strong>iframe</strong> لتشغيل البث الحقيقي داخل مشغل الموقع.
            </p>
            <input
              type="text"
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
              placeholder="مثال: https://www.youtube.com/embed/live_stream_id أو https://example.com/live.m3u8"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 placeholder-slate-600 focus:border-emerald-500 font-mono text-xs"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onResetDefaults}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
                title="استرجاع كافة المباريات الـ 27 الافتراضية"
              >
                استعادة الجدول الافتراضي (27 مباراة)
              </button>

              {existingMatch && onDeleteMatch && (
                <button
                  type="button"
                  onClick={() => {
                    onDeleteMatch(existingMatch.id);
                    onClose();
                  }}
                  className="px-3 py-2 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/40 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف المباراة</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{existingMatch ? 'حفظ التعديلات' : 'نشر المباراة في الجدول'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
