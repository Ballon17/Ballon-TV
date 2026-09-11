import React from 'react';
import { Tv, Radio, Search, Calendar, Star, Volume2, VolumeX, Shield, Trophy, Plus, Settings, MonitorPlay } from 'lucide-react';
import { Match } from '../types';

interface HeaderProps {
  activeDate: 'yesterday' | 'today' | 'tomorrow' | 'all';
  onSelectDate: (date: 'yesterday' | 'today' | 'tomorrow' | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedLeague: string;
  onSelectLeague: (leagueId: string) => void;
  statusFilter: 'all' | 'live' | 'upcoming' | 'finished';
  onStatusFilterChange: (status: 'all' | 'live' | 'upcoming' | 'finished') => void;
  activeView: 'matches' | 'standings' | 'news';
  onViewChange: (view: 'matches' | 'standings' | 'news') => void;
  liveCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  favoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  matches: Match[];
  onOpenAddMatch: () => void;
  onToggleTVMode?: () => void;
  onOpenAdminStreamModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeDate,
  onSelectDate,
  searchQuery,
  onSearchChange,
  selectedLeague,
  onSelectLeague,
  statusFilter,
  onStatusFilterChange,
  activeView,
  onViewChange,
  liveCount,
  soundEnabled,
  onToggleSound,
  favoritesOnly,
  onToggleFavorites,
  favoritesCount,
  matches,
  onOpenAddMatch,
  onToggleTVMode,
  onOpenAdminStreamModal,
}) => {
  const leagues = [
    { id: 'all', name: 'جميع البطولات', icon: '🏆' },
    { id: 'ucl', name: 'دوري أبطال أوروبا', icon: '⭐' },
    { id: 'premier', name: 'الدوري الإنجليزي', icon: '🦁' },
    { id: 'laliga', name: 'الدوري الإسباني', icon: '🇪🇸' },
    { id: 'spl', name: 'دوري روشن السعودي', icon: '🇸🇦' },
    { id: 'caf', name: 'دوري أبطال أفريقيا', icon: '🌍' },
    { id: 'seriea', name: 'الدوري الإيطالي', icon: '🇮🇹' },
  ];

  // Count matches in current day or all
  const dayMatches = activeDate === 'all' ? matches : matches.filter(m => m.date === activeDate);
  const yesterdayCount = matches.filter(m => m.date === 'yesterday').length;
  const todayCount = matches.filter(m => m.date === 'today').length;
  const tomorrowCount = matches.filter(m => m.date === 'tomorrow').length;
  const liveMatchesInDay = dayMatches.filter(m => m.status === 'live').length;
  const upcomingMatchesInDay = dayMatches.filter(m => m.status === 'upcoming').length;
  const finishedMatchesInDay = dayMatches.filter(m => m.status === 'finished').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      {/* Top Notification & Live Bar */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-b border-emerald-500/20 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-400">بث مباشر 24/7:</span>
            <span className="text-slate-300">سيرفرات فائقة السرعة ومتعددة الجودات للمباريات العالمية والعربية مجاناً</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onToggleSound}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
                soundEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
              }`}
              title="تنبيهات صوتية للأهداف"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'صوت الأهداف مفعل' : 'صامت'}</span>
            </button>

            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>بدون تقطيع وبدون إعلانات مزعجة</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Tv className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1">
                  <span>كورة</span>
                  <span className="text-emerald-400">لايف</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-red-600 text-white rounded">
                  HD مباشر
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                جدول وبث مباريات اليوم مباشرة بجودات متعددة
              </p>
            </div>
          </div>

          {/* Navigation Views: Matches / Standings / News */}
          <nav className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => onViewChange('matches')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'matches'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>جدول المباريات</span>
              {liveCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => onViewChange('standings')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'standings'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>ترتيب الدوريات والهدافين</span>
            </button>
          </nav>

          {/* Search & Favorites */}
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث عن فريق، معلق، أو بطولة..."
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs rounded-xl pr-9 pl-3 py-2 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* TV Mode Switcher */}
            {onToggleTVMode && (
              <button
                onClick={onToggleTVMode}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-blue-950/70 hover:bg-blue-900/80 text-blue-300 border border-blue-500/40 shadow-md shadow-blue-500/10 transition-all cursor-pointer"
                title="تفعيل وضع التلفاز الذكي Smart TV"
              >
                <MonitorPlay className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">وضع التلفاز 📺</span>
              </button>
            )}

            {/* Admin Stream Controls */}
            {onOpenAdminStreamModal && (
              <button
                onClick={onOpenAdminStreamModal}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-md transition-all cursor-pointer"
                title="لوحة تحكم المشرف لتعديل روابط وسيرفرات البث و DRM"
              >
                <Settings className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline">لوحة التحكم ⚙️</span>
              </button>
            )}

            <button
              onClick={onToggleFavorites}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                favoritesOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
              title="عرض المباريات المفضلة"
            >
              <Star className={`w-4 h-4 ${favoritesOnly ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">المفضلة</span>
              {favoritesCount > 0 && (
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Add Match / Stream Button */}
            <button
              onClick={onOpenAddMatch}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer"
              title="إضافة أو تعديل مباراة ورابط البث"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">إضافة مباراة / بث</span>
              <span className="sm:hidden">+ مباراة</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن فريق، معلق، أو بطولة..."
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs rounded-xl pr-9 pl-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Date Tabs (Yesterday, Today, Tomorrow, All) - Essential for daily match sites */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
            <button
              onClick={() => onSelectDate('yesterday')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeDate === 'yesterday'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>مباريات الأمس</span>
              <span className="bg-slate-800/90 text-slate-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {yesterdayCount}
              </span>
            </button>

            <button
              onClick={() => onSelectDate('today')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeDate === 'today'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>مباريات اليوم</span>
              <span className="bg-emerald-800/80 text-emerald-200 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {todayCount}
              </span>
            </button>

            <button
              onClick={() => onSelectDate('tomorrow')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeDate === 'tomorrow'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>مباريات الغد</span>
              <span className="bg-slate-800/90 text-slate-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {tomorrowCount}
              </span>
            </button>

            <button
              onClick={() => onSelectDate('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeDate === 'all'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>جميع الأيام</span>
              <span className="bg-slate-800/90 text-slate-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {matches.length}
              </span>
            </button>
          </div>

          {/* Match Status Filters: All, Live, Upcoming, Finished */}
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => onStatusFilterChange('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              الكل ({dayMatches.length})
            </button>

            <button
              onClick={() => onStatusFilterChange('live')}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                statusFilter === 'live'
                  ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                  : 'text-red-400 hover:bg-red-950/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>مباشر ({liveMatchesInDay})</span>
            </button>

            <button
              onClick={() => onStatusFilterChange('upcoming')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'upcoming'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              لم تبدأ ({upcomingMatchesInDay})
            </button>

            <button
              onClick={() => onStatusFilterChange('finished')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'finished'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              انتهت ({finishedMatchesInDay})
            </button>
          </div>
        </div>

        {/* League Selector Ribbon */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {leagues.map((lg) => (
            <button
              key={lg.id}
              onClick={() => onSelectLeague(lg.id)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap font-semibold flex items-center gap-1.5 border transition-all ${
                selectedLeague === lg.id
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span>{lg.icon}</span>
              <span>{lg.name}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
