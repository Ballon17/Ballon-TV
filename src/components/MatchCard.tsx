import React from 'react';
import { Match } from '../types';
import { Play, Star, Tv, Mic, MapPin, Radio, Clock, CheckCircle2, Edit3 } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
  onWatchMatch: (match: Match) => void;
  onEditMatch?: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  isFavorite,
  onToggleFavorite,
  onWatchMatch,
  onEditMatch,
}) => {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const isUpcoming = match.status === 'upcoming';

  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 overflow-hidden border ${
        isLive
          ? 'bg-gradient-to-b from-slate-900/90 to-slate-950 border-red-500/40 shadow-xl shadow-red-950/20 hover:border-red-500'
          : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700 shadow-md'
      }`}
    >
      {/* Top League Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/60 border-b border-slate-800/60 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="font-bold text-slate-200">{match.leagueName}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">{match.leagueRound}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {match.isHotMatch && (
            <span className="bg-amber-500/15 text-amber-300 font-bold px-2 py-0.5 rounded text-[10px] border border-amber-500/30">
              قمة الجولة 🔥
            </span>
          )}

          {onEditMatch && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditMatch(match);
              }}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
              title="تعديل بيانات ورابط هذه المباراة"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(match.id);
            }}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
            title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Teams & Score Center */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-7 items-center gap-2">
          {/* Home Team (3 cols) */}
          <div className="col-span-3 flex flex-col sm:flex-row items-center sm:gap-3 text-center sm:text-right">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-800/80 p-2 border border-slate-700 flex items-center justify-center shadow-inner group-hover:border-emerald-500/40 transition-colors">
              <span className="text-lg font-black text-emerald-400 font-mono">
                {match.homeTeam?.shortName || match.homeTeam?.name?.slice(0, 3).toUpperCase() || 'HOM'}
              </span>
            </div>
            <div className="mt-2 sm:mt-0">
              <h3 className="font-bold text-sm sm:text-base text-white tracking-wide">
                {match.homeTeam?.name || 'الفريق المضيف'}
              </h3>
              <span className="text-[11px] text-slate-400 block">{match.homeTeam?.country || ''}</span>
            </div>
          </div>

          {/* Center Scoreboard / Time (1 col) */}
          <div className="col-span-1 flex flex-col items-center justify-center text-center">
            {isLive ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 bg-red-600 text-white font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-full shadow-lg shadow-red-600/40 animate-pulse mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>د {match.currentMinute || 0}'</span>
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono tracking-widest text-emerald-400 bg-slate-950 px-2 sm:px-3 py-1 rounded-xl border border-slate-800 shadow-inner">
                  {match.homeScore ?? 0} - {match.awayScore ?? 0}
                </div>
              </div>
            ) : isFinished ? (
              <div className="flex flex-col items-center">
                <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-slate-400" />
                  <span>انتهت</span>
                </span>
                <div className="text-xl sm:text-2xl font-black font-mono tracking-widest text-slate-100 bg-slate-950 px-2 sm:px-3 py-1 rounded-xl border border-slate-800">
                  {match.homeScore ?? 0} - {match.awayScore ?? 0}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-full mb-1 border border-amber-500/20">
                  <Clock className="w-3 h-3" />
                  <span>لم تبدأ</span>
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-emerald-300 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                  {match.time}
                </div>
              </div>
            )}
          </div>

          {/* Away Team (3 cols) */}
          <div className="col-span-3 flex flex-col-reverse sm:flex-row-reverse items-center sm:gap-3 text-center sm:text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-800/80 p-2 border border-slate-700 flex items-center justify-center shadow-inner group-hover:border-emerald-500/40 transition-colors">
              <span className="text-lg font-black text-blue-400 font-mono">
                {match.awayTeam?.shortName || match.awayTeam?.name?.slice(0, 3).toUpperCase() || 'AWY'}
              </span>
            </div>
            <div className="mt-2 sm:mt-0">
              <h3 className="font-bold text-sm sm:text-base text-white tracking-wide">
                {match.awayTeam?.name || 'الفريق الضيف'}
              </h3>
              <span className="text-[11px] text-slate-400 block">{match.awayTeam?.country || ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Match Metadata Info Bar: Channel, Commentator, Stadium */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
        <div className="flex items-center gap-1.5 truncate">
          <Tv className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-slate-400">القناة:</span>
          <span className="font-semibold text-slate-200 truncate">{match.channel}</span>
        </div>

        <div className="flex items-center gap-1.5 truncate">
          <Mic className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-slate-400">المعلق:</span>
          <span className="font-semibold text-slate-200 truncate">{match.commentator}</span>
        </div>

        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="text-slate-400">الملعب:</span>
          <span className="font-semibold text-slate-200 truncate">{match.stadium}</span>
        </div>
      </div>

      {/* Action Watch Button */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>{match.servers?.length || 0} سيرفرات بث متاحة</span>
        </div>

        <button
          onClick={() => onWatchMatch(match)}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md ${
            isLive
              ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 animate-pulse'
              : isFinished
              ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/20'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>
            {isLive
              ? 'شاهد البث المباشر الآن 🔴'
              : isFinished
              ? 'أهداف وملخص المباراة'
              : 'تفاصيل المباراة وتجهيز البث'}
          </span>
        </button>
      </div>
    </div>
  );
};
