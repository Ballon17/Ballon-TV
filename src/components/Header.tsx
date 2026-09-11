import React, { useState } from 'react';
import { Tv, Radio, Search, Calendar, Star, Volume2, VolumeX, Shield, Trophy, Plus, Settings, MonitorPlay, X, Zap } from 'lucide-react';
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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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
  const dayMatches = activeDate === 'all' ? matches : matches.filter((m) => m.date === activeDate);
  const yesterdayCount = matches.filter((m) => m.date === 'yesterday').length;
  const todayCount = matches.filter((m) => m.date === 'today').length;
  const tomorrowCount = matches.filter((m) => m.date === 'tomorrow').length;
  const liveMatchesInDay = dayMatches.filter((m) => m.status === 'live').length;
  const upcomingMatchesInDay = dayMatches.filter((m) => m.status === 'upcoming').length;
  const finishedMatchesInDay = dayMatches.filter((m) => m.status === 'finished').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      {/* Top Notification & Live Bar - Mobile compact */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-b border-emerald-500/20 px-3 sm:px-4 py-1 text-[11px] sm:text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-emerald-400 shrink-0">بث مباشر 24/7:</span>
            <span className="text-slate-300 truncate text-[11px]">سيرفرات فائقة السرعة بدون تقطيع للهواتف</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onToggleSound}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] transition-colors ${
                soundEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
              title="تنبيهات صوتية للأهداف"
            >
              {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              <span className="hidden xs:inline">{soundEnabled ? 'صوت الأهداف' : 'صامت'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
            onClick={() => {
              onViewChange('matches');
              onSelectDate('today');
            }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Tv className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center gap-0.5">
                  <span>كورة</span>
                  <span className="text-emerald-400">لايف</span>
                </h1>
                <span className="text-[9px] sm:text-[10px] uppercase font-black px-1.5 py-0.5 bg-red-600 text-white rounded-md shadow-sm">
                  مباشر 🔴
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                جدول وبث مباريات اليوم مباشرة بجودات متعددة
              </p>
            </div>
          </div>

          {/* Desktop Navigation Views (Hidden on Mobile, handled by bottom dock) */}
          <nav className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
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
              {liveCount > 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
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
              <span>ترتيب الدوريات</span>
            </button>
          </nav>

          {/* Action Icons Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop Search Input */}
            <div className="relative hidden md:block w-44 lg:w-60">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث عن فريق أو معلق..."
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

            {/* Mobile Search Toggle Icon */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className={`p-2 rounded-xl text-xs md:hidden border transition-all ${
                isMobileSearchOpen || searchQuery
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}
              title="بحث عن مباراة"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* TV Mode Button */}
            {onToggleTVMode && (
              <button
                onClick={onToggleTVMode}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-extrabold bg-blue-950/70 hover:bg-blue-900/80 text-blue-300 border border-blue-500/40 shadow-sm transition-all cursor-pointer"
                title="تفعيل وضع التلفاز الذكي Smart TV"
              >
                <div className="flex items-center gap-1.5">
                  <MonitorPlay className="w-4 h-4 text-blue-400" />
                  <span className="hidden lg:inline">وضع التلفاز</span>
                </div>
              </button>
            )}

            {/* Admin Stream Controls */}
            {onOpenAdminStreamModal && (
              <button
                onClick={onOpenAdminStreamModal}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm transition-all cursor-pointer"
                title="لوحة تحكم السيرفرات وروابط البث"
              >
                <div className="flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">السيرفرات ⚙️</span>
                </div>
              </button>
            )}

            {/* Desktop Favorites Button (Mobile has it in bottom nav) */}
            <button
              onClick={onToggleFavorites}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                favoritesOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
              title="عرض المباريات المفضلة"
            >
              <Star className={`w-4 h-4 ${favoritesOnly ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span>المفضلة</span>
              {favoritesCount > 0 && (
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Add Match Button */}
            <button
              onClick={onOpenAddMatch}
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
              title="إضافة مباراة جديدة"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">إضافة مباراة</span>
            </button>
          </div>
        </div>

        {/* Expandable Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 md:hidden animate-in fade-in duration-200">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث عن فريق، معلق، أو بطولة..."
                autoFocus
                className="w-full bg-slate-900 border border-emerald-500/50 text-slate-100 placeholder-slate-500 text-xs rounded-xl pr-9 pl-8 py-2.5 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile-First Segmented Date Switcher Pills */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80">
          <div className="grid grid-cols-4 gap-1 sm:gap-2 bg-slate-900/90 p-1 rounded-2xl border border-slate-800/90 text-center">
            {/* Yesterday */}
            <button
              onClick={() => onSelectDate('yesterday')}
              className={`min-h-[40px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                activeDate === 'yesterday'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/50'
              }`}
            >
              <span className="truncate">الأمس</span>
              <span className="bg-slate-950/80 text-slate-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {yesterdayCount}
              </span>
            </button>

            {/* Today */}
            <button
              onClick={() => onSelectDate('today')}
              className={`min-h-[40px] py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                activeDate === 'today'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-400 hover:text-white active:bg-slate-800/50'
              }`}
            >
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>اليوم</span>
              </span>
              <span className="bg-emerald-950/90 text-emerald-200 text-[10px] px-1.5 py-0.2 rounded-full font-mono border border-emerald-500/20">
                {todayCount}
              </span>
            </button>

            {/* Tomorrow */}
            <button
              onClick={() => onSelectDate('tomorrow')}
              className={`min-h-[40px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                activeDate === 'tomorrow'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/50'
              }`}
            >
              <span className="truncate">الغد</span>
              <span className="bg-slate-950/80 text-slate-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {tomorrowCount}
              </span>
            </button>

            {/* All Days */}
            <button
              onClick={() => onSelectDate('all')}
              className={`min-h-[40px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                activeDate === 'all'
                  ? 'bg-slate-800 text-emerald-300 shadow-sm border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/50'
              }`}
            >
              <span className="truncate">الكل</span>
              <span className="bg-slate-950/80 text-slate-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {matches.length}
              </span>
            </button>
          </div>

          {/* Match Status Filters (Scrollable on Mobile) */}
          <div className="mt-2 flex items-center justify-between gap-1 overflow-x-auto pb-0.5 text-xs scrollbar-none">
            <button
              onClick={() => onStatusFilterChange('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all border ${
                statusFilter === 'all'
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-slate-900/60 text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              الكل ({dayMatches.length})
            </button>

            <button
              onClick={() => onStatusFilterChange('live')}
              className={`px-3 py-1.5 rounded-xl font-black whitespace-nowrap flex items-center gap-1.5 transition-all border ${
                statusFilter === 'live'
                  ? 'bg-red-600 text-white border-red-500 shadow-sm shadow-red-600/30'
                  : 'bg-red-950/30 text-red-400 border-red-500/20 hover:bg-red-950/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>مباشر الآن ({liveMatchesInDay})</span>
            </button>

            <button
              onClick={() => onStatusFilterChange('upcoming')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all border ${
                statusFilter === 'upcoming'
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-slate-900/60 text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              لم تبدأ ({upcomingMatchesInDay})
            </button>

            <button
              onClick={() => onStatusFilterChange('finished')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all border ${
                statusFilter === 'finished'
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-slate-900/60 text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              انتهت ({finishedMatchesInDay})
            </button>
          </div>
        </div>

        {/* Leagues Ribbon (Scrollable horizontally) */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {leagues.map((lg) => (
            <button
              key={lg.id}
              onClick={() => onSelectLeague(lg.id)}
              className={`min-h-[34px] px-3 py-1 rounded-full whitespace-nowrap font-bold flex items-center gap-1.5 border transition-all ${
                selectedLeague === lg.id
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900/90 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
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
