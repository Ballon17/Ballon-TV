import React, { useState } from 'react';
import { Match } from '../types';
import { Play, Star, Tv, Mic, MapPin, Radio, Clock, CheckCircle2, Edit3, Share2, Check } from 'lucide-react';

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
  const [homeLogoError, setHomeLogoError] = useState(false);
  const [awayLogoError, setAwayLogoError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/?match=${encodeURIComponent(match.id)}`;
    const shareTitle = `🔴 بث مباشر: ${match.homeTeam.name} ضد ${match.awayTeam.name}`;
    const shareText = `شاهد الآن البث المباشر لمباراة ${match.homeTeam.name} ضد ${match.awayTeam.name} (${match.leagueName}) بجودة عالية وبدون تقطيع!`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy match URL', err);
    }
  };

  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const isUpcoming = match.status === 'upcoming';

  return (
    <div
      id={`match-card-${match.id}`}
      onClick={() => onWatchMatch(match)}
      className={`group relative rounded-2xl transition-all duration-200 overflow-hidden border cursor-pointer select-none ${
        isLive
          ? 'bg-gradient-to-b from-slate-900/95 via-slate-950/90 to-slate-950 border-red-500/50 shadow-[0_8px_25px_rgba(239,68,68,0.15)] hover:border-red-400 active:scale-[0.99]'
          : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800/90 hover:border-slate-700 shadow-md active:scale-[0.99]'
      }`}
    >
      {/* Top League & Status Header */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          {match.leagueLogo ? (
            <img
              src={match.leagueLogo}
              alt=""
              className="w-4 h-4 object-contain rounded shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <span className={`w-2 h-2 rounded-full shrink-0 ${isLive ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
          )}
          <span className="font-extrabold text-slate-200 truncate text-[11px] sm:text-xs">
            {match.leagueName}
          </span>
          {match.leagueRound && (
            <>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 text-[10px] sm:text-xs hidden sm:inline truncate">
                {match.leagueRound}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          {match.isHotMatch && (
            <span className="bg-amber-500/15 text-amber-300 font-bold px-2 py-0.5 rounded text-[10px] border border-amber-500/30 flex items-center gap-1">
              <span>قمة</span>
              <span>🔥</span>
            </span>
          )}

          {/* Share Match Link Button */}
          <button
            onClick={handleShare}
            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
              isCopied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'hover:bg-slate-800 text-slate-400 hover:text-emerald-400'
            }`}
            title="مشاركة رابط المباراة ومباشرتها عبر واتساب وتويتر"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          {onEditMatch && (
            <button
              onClick={() => onEditMatch(match)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
              title="تعديل سيرفرات ورابط هذه المباراة"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => onToggleFavorite(match.id)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
            title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Teams Matchup and Live Scoreboard */}
      <div className="p-3.5 sm:p-5">
        <div className="grid grid-cols-7 items-center gap-2">
          {/* Home Team (3 cols) */}
          <div className="col-span-3 flex flex-col items-center sm:flex-row sm:gap-3 text-center sm:text-right min-w-0">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-950/80 p-2 border border-slate-800 flex items-center justify-center shadow-inner shrink-0 group-hover:border-emerald-500/40 transition-colors">
              {match.homeTeam?.logo && !homeLogoError ? (
                <img
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  onError={() => setHomeLogoError(true)}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">
                  {match.homeTeam?.shortName || match.homeTeam?.name?.slice(0, 3) || 'HOM'}
                </span>
              )}
            </div>
            <div className="mt-1.5 sm:mt-0 min-w-0 w-full">
              <h3 className="font-extrabold text-xs sm:text-base text-white tracking-tight line-clamp-2 leading-tight">
                {match.homeTeam?.name || 'الفريق المضيف'}
              </h3>
              {match.homeTeam?.country && (
                <span className="text-[10px] text-slate-400 hidden sm:block truncate mt-0.5">
                  {match.homeTeam.country}
                </span>
              )}
            </div>
          </div>

          {/* Center Scoreboard / Time Indicator (1 col) */}
          <div className="col-span-1 flex flex-col items-center justify-center text-center shrink-0">
            {isLive ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-md shadow-red-600/40 animate-pulse mb-1 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>د {match.currentMinute || 0}'</span>
                </div>
                <div className="text-lg sm:text-2xl font-black font-mono tracking-wider text-emerald-300 bg-slate-950 px-2 sm:px-3 py-1 rounded-xl border border-emerald-500/30 shadow-inner">
                  {match.homeScore ?? 0} - {match.awayScore ?? 0}
                </div>
              </div>
            ) : isFinished ? (
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded-full mb-1 flex items-center gap-1 whitespace-nowrap">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>انتهت</span>
                </span>
                <div className="text-lg sm:text-2xl font-black font-mono tracking-wider text-slate-200 bg-slate-950 px-2 sm:px-3 py-1 rounded-xl border border-slate-800">
                  {match.homeScore ?? 0} - {match.awayScore ?? 0}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full mb-1 border border-amber-500/30 whitespace-nowrap">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>لم تبدأ</span>
                </div>
                <div className="text-base sm:text-xl font-black font-mono text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 whitespace-nowrap">
                  {match.time}
                </div>
              </div>
            )}
          </div>

          {/* Away Team (3 cols) */}
          <div className="col-span-3 flex flex-col sm:flex-row-reverse sm:gap-3 items-center text-center sm:text-left min-w-0">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-950/80 p-2 border border-slate-800 flex items-center justify-center shadow-inner shrink-0 group-hover:border-emerald-500/40 transition-colors">
              {match.awayTeam?.logo && !awayLogoError ? (
                <img
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  onError={() => setAwayLogoError(true)}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm sm:text-base font-black text-blue-400 font-mono">
                  {match.awayTeam?.shortName || match.awayTeam?.name?.slice(0, 3) || 'AWY'}
                </span>
              )}
            </div>
            <div className="mt-1.5 sm:mt-0 min-w-0 w-full">
              <h3 className="font-extrabold text-xs sm:text-base text-white tracking-tight line-clamp-2 leading-tight">
                {match.awayTeam?.name || 'الفريق الضيف'}
              </h3>
              {match.awayTeam?.country && (
                <span className="text-[10px] text-slate-400 hidden sm:block truncate mt-0.5">
                  {match.awayTeam.country}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match Metadata Info Bar: Channel, Commentator, Stadium */}
      <div className="px-3 sm:px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] text-slate-300 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-1.5 truncate min-w-0">
          <Tv className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-slate-400 hidden sm:inline">القناة:</span>
          <span className="font-bold text-slate-200 truncate">{match.channel || 'beIN Sports'}</span>
        </div>

        <div className="flex items-center gap-1.5 truncate min-w-0">
          <Mic className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-slate-400 hidden sm:inline">المعلق:</span>
          <span className="font-bold text-slate-200 truncate">{match.commentator || 'معلق مميز'}</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="text-slate-400">الملعب:</span>
          <span className="font-semibold text-slate-200 truncate">{match.stadium || 'الملعب الرئيسي'}</span>
        </div>
      </div>

      {/* Mobile Action Bar: Server Count & Watch Button */}
      <div className="p-2.5 sm:p-3 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Radio className={`w-3.5 h-3.5 ${isLive ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`} />
          <span>{match.servers?.length || 4} سيرفرات</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onWatchMatch(match);
          }}
          className={`min-h-[40px] px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
            isLive
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 animate-pulse'
              : isFinished
              ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/20'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
          }`}
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
          <span>
            {isLive
              ? 'شاهد البث المباشر الآن 🔴'
              : isFinished
              ? 'ملخص وأهداف المباراة 🎬'
              : 'تفاصيل المباراة وتجهيز البث'}
          </span>
        </button>
      </div>
    </div>
  );
};
