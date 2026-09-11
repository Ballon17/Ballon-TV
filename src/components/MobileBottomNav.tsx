import React from 'react';
import { Calendar, Radio, Star, Trophy, Settings, Flame } from 'lucide-react';

interface MobileBottomNavProps {
  activeView: 'matches' | 'standings' | 'news';
  onViewChange: (view: 'matches' | 'standings' | 'news') => void;
  statusFilter: 'all' | 'live' | 'upcoming' | 'finished';
  onStatusFilterChange: (status: 'all' | 'live' | 'upcoming' | 'finished') => void;
  liveCount: number;
  favoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  onOpenAdminPanel?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeView,
  onViewChange,
  statusFilter,
  onStatusFilterChange,
  liveCount,
  favoritesOnly,
  onToggleFavorites,
  favoritesCount,
  onOpenAdminPanel,
}) => {
  return (
    <nav
      id="mobile-bottom-dock"
      aria-label="التنقل الرئيسي للهاتف"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 shadow-[0_-8px_25px_rgba(0,0,0,0.6)] px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
        {/* 1. All Matches */}
        <button
          id="mobile-nav-matches"
          onClick={() => {
            onViewChange('matches');
            if (favoritesOnly) onToggleFavorites();
            if (statusFilter !== 'all') onStatusFilterChange('all');
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
            activeView === 'matches' && !favoritesOnly && statusFilter === 'all'
              ? 'text-emerald-400 bg-emerald-950/40 font-black'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">المباريات</span>
          {activeView === 'matches' && !favoritesOnly && statusFilter === 'all' && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5" />
          )}
        </button>

        {/* 2. Live Matches Now */}
        <button
          id="mobile-nav-live"
          onClick={() => {
            onViewChange('matches');
            if (favoritesOnly) onToggleFavorites();
            onStatusFilterChange('live');
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
            activeView === 'matches' && !favoritesOnly && statusFilter === 'live'
              ? 'text-red-400 bg-red-950/40 font-black'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Radio className={`w-5 h-5 mb-0.5 ${liveCount > 0 ? 'text-red-500 animate-pulse' : ''}`} />
            {liveCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50">
                {liveCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">مباشر الآن</span>
          {activeView === 'matches' && !favoritesOnly && statusFilter === 'live' && (
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-0.5" />
          )}
        </button>

        {/* 3. Favorites */}
        <button
          id="mobile-nav-favorites"
          onClick={() => {
            onViewChange('matches');
            if (!favoritesOnly) onToggleFavorites();
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
            favoritesOnly
              ? 'text-amber-400 bg-amber-950/40 font-black'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Star className={`w-5 h-5 mb-0.5 ${favoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">المفضلة</span>
          {favoritesOnly && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
          )}
        </button>

        {/* 4. Standings */}
        <button
          id="mobile-nav-standings"
          onClick={() => onViewChange('standings')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
            activeView === 'standings'
              ? 'text-emerald-400 bg-emerald-950/40 font-black'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">الترتيب</span>
          {activeView === 'standings' && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5" />
          )}
        </button>

        {/* 5. Stream Admin / Controls */}
        <button
          id="mobile-nav-admin"
          onClick={onOpenAdminPanel}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-400 hover:text-emerald-400 transition-all cursor-pointer"
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">السيرفرات</span>
        </button>
      </div>
    </nav>
  );
};
