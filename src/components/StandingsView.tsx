import React, { useState } from 'react';
import { mockLeagues, LeagueData } from '../data/mockStandings';
import { Trophy, Award, TrendingUp, Target } from 'lucide-react';

export const StandingsView: React.FC = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('spl');

  const currentLeague: LeagueData =
    mockLeagues.find((lg) => lg.id === selectedLeagueId) || mockLeagues[0];

  return (
    <div className="space-y-6">
      {/* League Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {mockLeagues.map((league) => (
          <button
            key={league.id}
            onClick={() => setSelectedLeagueId(league.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
              selectedLeagueId === league.id
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>{league.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* League Table (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-950/80 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-extrabold text-white text-base">{currentLeague.name}</h3>
                <span className="text-xs text-slate-400">الموسم الحالي: {currentLeague.season}</span>
              </div>
            </div>
            <span className="text-xs bg-emerald-950/60 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
              تحديث مباشر للترتيب
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-950/90 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">#</th>
                  <th className="py-3 px-4">الفريق</th>
                  <th className="py-3 px-2 text-center">لعب</th>
                  <th className="py-3 px-2 text-center">فاز</th>
                  <th className="py-3 px-2 text-center">تعادل</th>
                  <th className="py-3 px-2 text-center">خسر</th>
                  <th className="py-3 px-2 text-center">له</th>
                  <th className="py-3 px-2 text-center">عليه</th>
                  <th className="py-3 px-2 text-center">الفارق</th>
                  <th className="py-3 px-3 text-center font-bold text-white">النقاط</th>
                  <th className="py-3 px-3 text-center hidden sm:table-cell">آخر 5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {currentLeague.standings.map((team) => (
                  <tr
                    key={team.rank}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      team.rank === 1 ? 'bg-emerald-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-center font-bold font-mono">
                      <span
                        className={`w-6 h-6 inline-flex items-center justify-center rounded-lg text-xs ${
                          team.rank === 1
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : team.rank <= 3
                            ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
                            : 'text-slate-400'
                        }`}
                      >
                        {team.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <span className="text-base">{team.teamLogo}</span>
                      <span>{team.team}</span>
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-slate-300">{team.played}</td>
                    <td className="py-3 px-2 text-center font-mono text-emerald-400 font-bold">{team.won}</td>
                    <td className="py-3 px-2 text-center font-mono text-amber-400">{team.drawn}</td>
                    <td className="py-3 px-2 text-center font-mono text-rose-400">{team.lost}</td>
                    <td className="py-3 px-2 text-center font-mono text-slate-300">{team.goalsFor}</td>
                    <td className="py-3 px-2 text-center font-mono text-slate-400">{team.goalsAgainst}</td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-slate-200">
                      {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-black text-sm text-emerald-400">
                      {team.points}
                    </td>
                    <td className="py-3 px-3 text-center hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {team.form.map((res, i) => (
                          <span
                            key={i}
                            className={`w-4 h-4 rounded text-[9px] font-bold inline-flex items-center justify-center text-white ${
                              res === 'W'
                                ? 'bg-emerald-600'
                                : res === 'D'
                                ? 'bg-amber-600'
                                : 'bg-rose-600'
                            }`}
                          >
                            {res === 'W' ? 'ف' : res === 'D' ? 'ت' : 'خ'}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Scorers (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="bg-slate-950/80 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-white text-base">قائمة الهدافين</h3>
            </div>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="p-4 divide-y divide-slate-800/80 flex-1">
            {currentLeague.topScorers.map((scorer) => (
              <div key={scorer.rank} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                      scorer.rank === 1
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {scorer.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">{scorer.player}</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <span>{scorer.teamLogo}</span>
                      <span>{scorer.team}</span>
                    </span>
                  </div>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1 text-emerald-400 font-mono font-black text-base">
                    <span>{scorer.goals}</span>
                    <span className="text-[10px] text-slate-400 font-sans">أهداف</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    صنع {scorer.assists} • {scorer.matches} مباراة
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
