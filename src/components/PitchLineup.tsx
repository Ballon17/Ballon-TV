import React, { useState } from 'react';
import { Match, Player } from '../types';
import { UserCheck, Shield } from 'lucide-react';

interface PitchLineupProps {
  match: Match;
}

export const PitchLineup: React.FC<PitchLineupProps> = ({ match }) => {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');

  const currentTeam = selectedTeam === 'home' ? match.homeTeam : match.awayTeam;
  const currentLineup = selectedTeam === 'home' ? match.homeLineup : match.awayLineup;

  // Group players by position
  const gks = currentLineup.startingXI.filter(p => p.position === 'GK');
  const dfs = currentLineup.startingXI.filter(p => p.position === 'DF');
  const mfs = currentLineup.startingXI.filter(p => p.position === 'MF');
  const fws = currentLineup.startingXI.filter(p => p.position === 'FW');

  const renderPlayerBadge = (player: Player) => (
    <div key={player.number} className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
      <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-[11px] sm:text-xs shadow-lg border-2 ${
        player.position === 'GK'
          ? 'bg-amber-400 text-slate-950 border-amber-200'
          : selectedTeam === 'home'
          ? 'bg-emerald-500 text-slate-950 border-white'
          : 'bg-blue-500 text-white border-white'
      }`}>
        <span>{player.number}</span>
      </div>
      <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-950/90 backdrop-blur-xs text-[9px] sm:text-xs font-semibold text-white whitespace-nowrap border border-slate-700/60 flex items-center gap-1 shadow max-w-[68px] sm:max-w-none">
        {player.isCaptain && (
          <span className="bg-amber-400 text-slate-950 font-black text-[8px] sm:text-[9px] px-1 rounded-xs shrink-0">C</span>
        )}
        <span className="truncate">{player.name}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 rounded-2xl p-3 sm:p-4 border border-slate-800">
      {/* Team selector tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedTeam('home')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 ${
              selectedTeam === 'home'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>{match.homeTeam.name}</span>
            <span className="text-[10px] sm:text-xs bg-slate-950/50 px-1.5 py-0.5 rounded font-mono">
              {match.homeLineup.formation}
            </span>
          </button>

          <button
            onClick={() => setSelectedTeam('away')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 ${
              selectedTeam === 'away'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>{match.awayTeam.name}</span>
            <span className="text-[10px] sm:text-xs bg-slate-950/50 px-1.5 py-0.5 rounded font-mono">
              {match.awayLineup.formation}
            </span>
          </button>
        </div>

        <div className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">المدرب: <strong className="text-slate-200">{currentLineup.manager}</strong></span>
        </div>
      </div>

      {/* 2D Green Football Pitch */}
      <div className="relative w-full rounded-2xl overflow-hidden border-2 border-emerald-600/50 shadow-2xl bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-900 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-4 select-none">
        {/* Grass stripes overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,#000_40px,#000_80px)]" />

        {/* Pitch Field Markings (SVG layer) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
          {/* Halfway line */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="2" strokeDasharray="6 4" />
          {/* Center Circle */}
          <circle cx="50%" cy="50%" r="50" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="50%" cy="50%" r="4" fill="white" />
          {/* Top Penalty Area */}
          <rect x="25%" y="0" width="50%" height="18%" stroke="white" strokeWidth="2" fill="none" />
          <rect x="37%" y="0" width="26%" height="7%" stroke="white" strokeWidth="2" fill="none" />
          {/* Bottom Penalty Area */}
          <rect x="25%" y="82%" width="50%" height="18%" stroke="white" strokeWidth="2" fill="none" />
          <rect x="37%" y="93%" width="26%" height="7%" stroke="white" strokeWidth="2" fill="none" />
        </svg>

        {/* Attackers Line (FW) */}
        <div className="relative z-10 flex items-center justify-around w-full pt-3">
          {fws.map(renderPlayerBadge)}
        </div>

        {/* Midfielders Line (MF) */}
        <div className="relative z-10 flex items-center justify-around w-full py-2">
          {mfs.map(renderPlayerBadge)}
        </div>

        {/* Defenders Line (DF) */}
        <div className="relative z-10 flex items-center justify-around w-full py-2">
          {dfs.map(renderPlayerBadge)}
        </div>

        {/* Goalkeeper Line (GK) */}
        <div className="relative z-10 flex items-center justify-center w-full pb-2">
          {gks.map(renderPlayerBadge)}
        </div>
      </div>

      {/* Substitutes Bench */}
      {currentLineup.substitutes.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>قائمة البدلاء ({currentTeam.name}):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentLineup.substitutes.map((sub) => (
              <div
                key={sub.number}
                className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 flex items-center gap-1.5"
              >
                <span className="font-mono text-emerald-400 font-bold">{sub.number}</span>
                <span>{sub.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">({sub.position})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
