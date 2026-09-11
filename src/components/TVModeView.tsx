import React, { useState, useEffect, useRef } from 'react';
import { Match } from '../types';
import { 
  Tv, 
  Play, 
  Calendar, 
  Clock, 
  Radio, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  Shield, 
  ArrowLeft, 
  Maximize, 
  Sparkles,
  Award
} from 'lucide-react';

interface TVModeViewProps {
  matches: Match[];
  onSelectMatchForStream: (match: Match) => void;
  onExitTVMode: () => void;
  activeDate: 'yesterday' | 'today' | 'tomorrow';
  onChangeDate: (date: 'yesterday' | 'today' | 'tomorrow') => void;
}

export const TVModeView: React.FC<TVModeViewProps> = ({
  matches,
  onSelectMatchForStream,
  onExitTVMode,
  activeDate,
  onChangeDate
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [timeStr, setTimeStr] = useState<string>('');
  const matchCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Filter matches by selected day
  const filteredMatches = matches.filter((m) => m.date === activeDate);

  // Live TV clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Remote Control (D-pad Keyboard Navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredMatches.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredMatches.length - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (activeDate === 'tomorrow') onChangeDate('today');
        else if (activeDate === 'today') onChangeDate('yesterday');
        setSelectedIndex(0);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activeDate === 'yesterday') onChangeDate('today');
        else if (activeDate === 'today') onChangeDate('tomorrow');
        setSelectedIndex(0);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const selected = filteredMatches[selectedIndex];
        if (selected) {
          onSelectMatchForStream(selected);
        }
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        onExitTVMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredMatches, selectedIndex, activeDate, onChangeDate, onSelectMatchForStream, onExitTVMode]);

  // Scroll active card into view
  useEffect(() => {
    const el = matchCardsRef.current[selectedIndex];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedIndex]);

  const selectedMatch = filteredMatches[selectedIndex] || filteredMatches[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden dir-rtl text-right">
      {/* Top TV Bar */}
      <div className="h-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 px-6 sm:px-12 flex items-center justify-between shrink-0 shadow-2xl">
        {/* Brand & Mode */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/40 border border-emerald-400/30">
            <Tv className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>كورة لايف</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                SMART TV 10-FOOT
              </span>
            </h1>
            <p className="text-xs text-slate-400">بث مباشر للمباريات بجودة 4K و FHD لشاشات التلفاز الذكية</p>
          </div>
        </div>

        {/* Date Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              onChangeDate('yesterday');
              setSelectedIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeDate === 'yesterday'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📅 الأمس
          </button>
          <button
            onClick={() => {
              onChangeDate('today');
              setSelectedIndex(0);
            }}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeDate === 'today'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>🔴 اليوم (مباشر)</span>
          </button>
          <button
            onClick={() => {
              onChangeDate('tomorrow');
              setSelectedIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeDate === 'tomorrow'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⏳ الغد
          </button>
        </div>

        {/* Clock & Exit */}
        <div className="flex items-center gap-4">
          <div className="text-left font-mono font-bold text-lg text-emerald-400 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
            {timeStr}
          </div>
          <button
            onClick={onExitTVMode}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
            title="الخروج إلى وضع الهاتف والكمبيوتر"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>خروج من وضع التلفاز</span>
          </button>
        </div>
      </div>

      {/* Main TV Layout (2 Columns: Match List on Right, Giant Preview on Left) */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-6 sm:p-8 overflow-hidden">
        {/* Left / Center: Giant Match Cinema Showcase */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {selectedMatch ? (
            <>
              {/* League & Round Tag */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold border border-slate-700">
                    {selectedMatch.leagueName}
                  </span>
                  <span className="text-xs text-slate-400">{selectedMatch.leagueRound}</span>
                </div>
                {selectedMatch.status === 'live' ? (
                  <span className="px-3.5 py-1 bg-red-600 text-white rounded-full text-xs font-black flex items-center gap-1.5 animate-pulse shadow-lg shadow-red-600/40">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>مباشر • دقيقة {selectedMatch.currentMinute}'</span>
                  </span>
                ) : selectedMatch.status === 'finished' ? (
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs font-bold">
                    انتهت المباراة
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
                    تبدأ الساعة {selectedMatch.time}
                  </span>
                )}
              </div>

              {/* Giant Scoreboard */}
              <div className="my-auto py-6 flex items-center justify-around z-10">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-3 w-40 text-center">
                  <img
                    src={selectedMatch.homeTeam?.logo}
                    alt={selectedMatch.homeTeam?.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-xl"
                  />
                  <h3 className="text-lg sm:text-xl font-black text-white">{selectedMatch.homeTeam?.name}</h3>
                </div>

                {/* Score or VS */}
                <div className="flex flex-col items-center gap-2">
                  {selectedMatch.status === 'upcoming' ? (
                    <div className="text-3xl sm:text-5xl font-black text-emerald-400 font-mono tracking-widest bg-slate-900/80 px-6 py-3 rounded-2xl border border-slate-800">
                      {selectedMatch.time}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 bg-slate-900/90 px-8 py-3 rounded-3xl border border-slate-800 shadow-2xl">
                      <span className="text-4xl sm:text-6xl font-black font-mono text-white">
                        {selectedMatch.homeScore ?? 0}
                      </span>
                      <span className="text-2xl text-slate-500 font-bold">:</span>
                      <span className="text-4xl sm:text-6xl font-black font-mono text-white">
                        {selectedMatch.awayScore ?? 0}
                      </span>
                    </div>
                  )}
                  <span className="text-xs text-slate-400 font-semibold">{selectedMatch.stadium}</span>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-3 w-40 text-center">
                  <img
                    src={selectedMatch.awayTeam?.logo}
                    alt={selectedMatch.awayTeam?.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-xl"
                  />
                  <h3 className="text-lg sm:text-xl font-black text-white">{selectedMatch.awayTeam?.name}</h3>
                </div>
              </div>

              {/* Broadcast Details & Action */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/90 flex items-center justify-between gap-4 z-10">
                <div className="space-y-1 text-xs">
                  <div className="text-slate-300">
                    📺 القناة: <span className="text-emerald-400 font-bold">{selectedMatch.channel}</span>
                  </div>
                  <div className="text-slate-400">
                    🎙️ المعلق: <span className="text-amber-300 font-bold">{selectedMatch.commentator}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectMatchForStream(selectedMatch)}
                  className="px-6 sm:px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-emerald-600/40 hover:scale-105 transition-all cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>{selectedMatch.status === 'live' ? 'مشاهدة البث المباشر فوراً' : 'فتح تفاصيل وسيرفرات المباراة'}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              لا توجد مباريات متاحة في هذا اليوم
            </div>
          )}
        </div>

        {/* Right Column: Scrollable List of Matches */}
        <div className="col-span-12 lg:col-span-5 flex flex-col bg-slate-900/60 border border-slate-800 rounded-3xl p-4 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 px-2">
            <h2 className="font-extrabold text-sm sm:text-base text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>جدول مباريات ({filteredMatches.length})</span>
            </h2>
            <span className="text-[11px] text-slate-400">استخدم أسهم الريموت 🔼 🔽 للتنقل</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {filteredMatches.map((m, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={m.id}
                  ref={(el) => {
                    matchCardsRef.current[idx] = el;
                  }}
                  onClick={() => {
                    setSelectedIndex(idx);
                    onSelectMatchForStream(m);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 shadow-xl shadow-emerald-600/20 scale-[1.02]'
                      : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center gap-2 shrink-0">
                      <img src={m.homeTeam?.logo} alt="" className="w-7 h-7 object-contain" />
                      <span className="text-xs font-bold text-white truncate max-w-[80px] sm:max-w-[100px]">
                        {m.homeTeam?.name}
                      </span>
                    </div>

                    <div className="px-2 py-0.5 bg-slate-900 rounded-lg text-xs font-mono font-black text-emerald-400 shrink-0">
                      {m.status === 'upcoming' ? m.time : `${m.homeScore ?? 0} - ${m.awayScore ?? 0}`}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-white truncate max-w-[80px] sm:max-w-[100px]">
                        {m.awayTeam?.name}
                      </span>
                      <img src={m.awayTeam?.logo} alt="" className="w-7 h-7 object-contain" />
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {m.status === 'live' && (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    )}
                    {isSelected && (
                      <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Remote Control Help Bar */}
      <div className="h-12 bg-slate-950 border-t border-slate-800/80 px-6 flex items-center justify-between text-xs text-slate-400 shrink-0">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">▲ ▼</kbd>
            <span>التنقل بين المباريات</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">◀ ▶</kbd>
            <span>التبديل بين (الأمس / اليوم / الغد)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">Enter / OK</kbd>
            <span>مشاهدة البث</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">Esc / Back</kbd>
            <span>خروج</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-bold">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>سيرفرات البث تعمل بكامل طاقتها على Google Cloud</span>
        </div>
      </div>
    </div>
  );
};
