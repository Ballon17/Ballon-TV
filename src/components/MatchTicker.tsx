import React from 'react';
import { Match } from '../types';
import { PlayCircle, Clock } from 'lucide-react';

interface MatchTickerProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

export const MatchTicker: React.FC<MatchTickerProps> = ({ matches, onSelectMatch }) => {
  if (!matches.length) return null;

  return (
    <div className="bg-slate-900/90 border-b border-slate-800/80 py-2 px-4 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 whitespace-nowrap pl-3 border-l border-slate-700/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>أبرز المباريات:</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {matches.map((match) => (
            <button
              key={match.id}
              onClick={() => onSelectMatch(match)}
              className="flex items-center gap-2.5 bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap text-right group shadow-sm"
            >
              {/* Status Pill */}
              {match.status === 'live' ? (
                <span className="flex items-center gap-1 bg-red-600/20 text-red-400 font-bold px-1.5 py-0.5 rounded text-[10px] border border-red-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>د {match.currentMinute}'</span>
                </span>
              ) : match.status === 'finished' ? (
                <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                  انتهت
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{match.time}</span>
                </span>
              )}

              {/* Match Teams & Score */}
              <div className="flex items-center gap-2 font-medium text-slate-200">
                <span className="font-semibold text-slate-100">{match.homeTeam?.name || ''}</span>
                {match.status !== 'upcoming' ? (
                  <span className="font-mono font-black text-emerald-400 px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">
                    {match.homeScore ?? 0} - {match.awayScore ?? 0}
                  </span>
                ) : (
                  <span className="text-slate-500 font-mono text-[11px]">vs</span>
                )}
                <span className="font-semibold text-slate-100">{match.awayTeam?.name || ''}</span>
              </div>

              {match.status === 'live' && (
                <PlayCircle className="w-3.5 h-3.5 text-red-400 group-hover:text-red-300 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
