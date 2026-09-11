import React, { useState, useEffect } from 'react';
import { mockMatches } from './data/mockMatches';
import { Match, MatchEvent } from './types';
import { Header } from './components/Header';
import { MatchTicker } from './components/MatchTicker';
import { MatchCard } from './components/MatchCard';
import { LivePlayerModal } from './components/LivePlayerModal';
import { AddMatchModal } from './components/AddMatchModal';
import { StandingsView } from './components/StandingsView';
import { BroadcastGuide } from './components/BroadcastGuide';
import { Tv, Flame, Calendar, Trophy, Sparkles, BellRing, RefreshCw, Plus, RotateCcw } from 'lucide-react';

export default function App() {
  const [matches, setMatches] = useState<Match[]>(() => {
    try {
      const stored = localStorage.getItem('kora_live_matches_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load matches from localStorage:', e);
    }
    return mockMatches;
  });

  const [activeDate, setActiveDate] = useState<'yesterday' | 'today' | 'tomorrow' | 'all'>('today');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeView, setActiveView] = useState<'matches' | 'standings' | 'news'>('matches');
  const [favorites, setFavorites] = useState<string[]>(['match-1', 'match-2']);
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeStreamingMatch, setActiveStreamingMatch] = useState<Match | null>(null);
  const [goalAlert, setGoalAlert] = useState<{ match: Match; scorer: string; team: string } | null>(null);
  const [isAddMatchOpen, setIsAddMatchOpen] = useState<boolean>(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);

  // Persist matches to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kora_live_matches_v2', JSON.stringify(matches));
    } catch (e) {
      console.warn('Could not save matches to localStorage:', e);
    }
  }, [matches]);

  // Live match minutes increment simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setMatches((prev) =>
        prev.map((m) => {
          if (m.status === 'live' && m.currentMinute) {
            const nextMinute = m.currentMinute + 1;
            if (nextMinute > 95) {
              return { ...m, status: 'finished' as const };
            }
            return { ...m, currentMinute: nextMinute };
          }
          return m;
        })
      );
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  // Sync active streaming match when matches update
  useEffect(() => {
    if (activeStreamingMatch) {
      const updated = matches.find((m) => m.id === activeStreamingMatch.id);
      if (updated) {
        setActiveStreamingMatch(updated);
      }
    }
  }, [matches, activeStreamingMatch]);

  // Add or update match
  const handleAddOrUpdateMatch = (newMatch: Match) => {
    setMatches((prev) => {
      const exists = prev.some((m) => m.id === newMatch.id);
      if (exists) {
        return prev.map((m) => (m.id === newMatch.id ? newMatch : m));
      }
      return [newMatch, ...prev];
    });
  };

  // Delete match
  const handleDeleteMatch = (matchId: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== matchId));
  };

  // Reset to original 27 default matches
  const handleResetDefaults = () => {
    setMatches(mockMatches);
    try {
      localStorage.removeItem('kora_live_matches_v2');
    } catch (e) {
      // ignore
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (matchId: string) => {
    setFavorites((prev) =>
      prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId]
    );
  };

  // Simulate Goal trigger
  const handleSimulateGoal = (matchId: string, teamId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          const isHome = teamId === m.homeTeam.id;
          const scorerName = isHome
            ? m.homeLineup.startingXI.find((p) => p.position === 'FW')?.name || m.homeTeam.name
            : m.awayLineup.startingXI.find((p) => p.position === 'FW')?.name || m.awayTeam.name;

          const newScoreHome = isHome ? (m.homeScore || 0) + 1 : m.homeScore || 0;
          const newScoreAway = !isHome ? (m.awayScore || 0) + 1 : m.awayScore || 0;

          const newEvent: MatchEvent = {
            id: `goal-${Date.now()}`,
            minute: m.currentMinute || 70,
            type: 'goal',
            teamId,
            playerName: scorerName,
            detail: 'هدف رائع بعد تمريرة ساحرة داخل منطقة العمليات!'
          };

          const updatedMatch: Match = {
            ...m,
            homeScore: newScoreHome,
            awayScore: newScoreAway,
            events: [newEvent, ...m.events]
          };

          // Trigger Alert
          setGoalAlert({
            match: updatedMatch,
            scorer: scorerName,
            team: isHome ? m.homeTeam.name : m.awayTeam.name
          });

          setTimeout(() => {
            setGoalAlert(null);
          }, 6000);

          return updatedMatch;
        }
        return m;
      })
    );
  };

  // Filter matches
  const filteredMatches = matches.filter((m) => {
    // Date filter
    if (!searchQuery && activeDate !== 'all' && m.date !== activeDate) {
      return false;
    }

    // League filter
    if (selectedLeague !== 'all' && m.leagueId !== selectedLeague) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && m.status !== statusFilter) {
      return false;
    }

    // Favorites only
    if (favoritesOnly && !favorites.includes(m.id)) {
      return false;
    }

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const matchText = `${m.homeTeam.name} ${m.awayTeam.name} ${m.leagueName} ${m.commentator} ${m.channel} ${m.stadium}`.toLowerCase();
      if (!matchText.includes(q)) {
        return false;
      }
    }

    return true;
  });

  const liveMatches = matches.filter((m) => m.status === 'live');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Goal Notification Banner */}
      {goalAlert && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400/50 flex items-center gap-3 animate-bounce">
          <BellRing className="w-6 h-6 animate-spin" />
          <div>
            <div className="font-black text-sm flex items-center gap-1.5">
              <span>⚽ هدفففف لصالح {goalAlert.team}!</span>
              <span className="text-emerald-200">({goalAlert.scorer})</span>
            </div>
            <p className="text-xs text-emerald-100">
              {goalAlert.match.homeTeam.name} {goalAlert.match.homeScore} - {goalAlert.match.awayScore} {goalAlert.match.awayTeam.name}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        activeDate={activeDate}
        onSelectDate={setActiveDate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLeague={selectedLeague}
        onSelectLeague={setSelectedLeague}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        activeView={activeView}
        onViewChange={setActiveView}
        liveCount={liveMatches.length}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        favoritesOnly={favoritesOnly}
        onToggleFavorites={() => setFavoritesOnly(!favoritesOnly)}
        favoritesCount={favorites.length}
        matches={matches}
        onOpenAddMatch={() => {
          setEditingMatch(null);
          setIsAddMatchOpen(true);
        }}
      />

      {/* Live Match Ticker */}
      <MatchTicker
        matches={matches.filter((m) => m.status === 'live' || m.isHotMatch)}
        onSelectMatch={(m) => setActiveStreamingMatch(m)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeView === 'matches' ? (
          <div>
            {/* Section Header */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-7 bg-emerald-500 rounded-full" />
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <span>
                      {activeDate === 'today'
                        ? 'مباريات اليوم المنقولة مباشرة'
                        : activeDate === 'yesterday'
                        ? 'نتائج وأهداف مباريات الأمس'
                        : activeDate === 'tomorrow'
                        ? 'جدول مواعيد مباريات الغد'
                        : 'جدول جميع المباريات المنقولة'}
                    </span>
                    {searchQuery && (
                      <span className="text-xs text-emerald-400 font-normal">
                        (نتائج البحث عن: "{searchQuery}")
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    بث مباشر بدون تقطيع مع سيرفرات متعددة ومعلقين رياضيين مميزين
                  </p>
                </div>
              </div>

              {/* Reset Filters / Add Match / Count badge */}
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="bg-slate-900 border border-slate-800 text-slate-300 font-bold px-3 py-1.5 rounded-xl">
                  {filteredMatches.length} مباريات
                </span>

                <button
                  onClick={() => {
                    setEditingMatch(null);
                    setIsAddMatchOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة مباراة</span>
                </button>

                {(selectedLeague !== 'all' || statusFilter !== 'all' || favoritesOnly || searchQuery || activeDate !== 'today') && (
                  <button
                    onClick={() => {
                      setSelectedLeague('all');
                      setStatusFilter('all');
                      setFavoritesOnly(false);
                      setSearchQuery('');
                      setActiveDate('today');
                    }}
                    className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/20"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>إعادة ضبط</span>
                  </button>
                )}
              </div>
            </div>

            {/* Matches List */}
            {filteredMatches.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center">
                <Tv className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">لا توجد مباريات مطابقة للفلتر المحدد</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                  يمكنك الضغط على "عرض جميع المباريات" أو إضافة مباراة جديدة برابط بث فوري!
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      setSelectedLeague('all');
                      setStatusFilter('all');
                      setFavoritesOnly(false);
                      setSearchQuery('');
                      setActiveDate('all');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    عرض جميع الأيام ({matches.length} مباراة)
                  </button>

                  <button
                    onClick={handleResetDefaults}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>استعادة الجدول الافتراضي (27 مباراة)</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingMatch(null);
                      setIsAddMatchOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة مباراة الآن</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    isFavorite={favorites.includes(match.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onWatchMatch={(m) => setActiveStreamingMatch(m)}
                    onEditMatch={(m) => {
                      setEditingMatch(m);
                      setIsAddMatchOpen(true);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Broadcast Guide & Help */}
            <BroadcastGuide />
          </div>
        ) : (
          <StandingsView />
        )}
      </main>

      {/* Streaming Theater Modal */}
      {activeStreamingMatch && (
        <LivePlayerModal
          match={activeStreamingMatch}
          onClose={() => setActiveStreamingMatch(null)}
          onSimulateGoal={(teamId) => handleSimulateGoal(activeStreamingMatch.id, teamId)}
        />
      )}

      {/* Add or Edit Match Modal */}
      {isAddMatchOpen && (
        <AddMatchModal
          existingMatch={editingMatch}
          onClose={() => {
            setIsAddMatchOpen(false);
            setEditingMatch(null);
          }}
          onAddMatch={handleAddOrUpdateMatch}
          onDeleteMatch={handleDeleteMatch}
          onResetDefaults={handleResetDefaults}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-12 py-8 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300 text-sm">كورة لايف HD</span>
            <span>•</span>
            <span>بث مباشر لمباريات اليوم والقنوات الناقلة الرسمية</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>دوري أبطال أوروبا</span>
            <span>•</span>
            <span>الدوري الإنجليزي</span>
            <span>•</span>
            <span>الدوري الإسباني</span>
            <span>•</span>
            <span>دوري روشن السعودي</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

