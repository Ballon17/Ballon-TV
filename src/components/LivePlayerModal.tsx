import React, { useState, useEffect, useRef } from 'react';
import { Match, StreamServer, MatchEvent, ChatMessage } from '../types';
import { PitchLineup } from './PitchLineup';
import { StreamEnginePlayer } from './StreamEnginePlayer';
import {
  X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RefreshCw,
  Radio, Shield, MessageSquare, BarChart2, Users, Flame, Send,
  Tv, Sparkles, CheckCircle, Info, Settings
} from 'lucide-react';

interface LivePlayerModalProps {
  match: Match;
  onClose: () => void;
  onSimulateGoal?: (teamId: string) => void;
  onOpenAdminPanel?: () => void;
}

export const LivePlayerModal: React.FC<LivePlayerModalProps> = ({
  match,
  onClose,
  onSimulateGoal,
  onOpenAdminPanel
}) => {
  const [activeServer, setActiveServer] = useState<StreamServer>(match.servers?.[0] || {
    id: 'default',
    name: 'سيرفر FHD الأساسي',
    quality: '1080p',
    bitrate: '8000 kbps',
    status: 'online',
    commentator: match.commentator || 'المعلق الرياضي',
    type: 'fhd'
  });

  const [customStreamUrl, setCustomStreamUrl] = useState<string>(match.servers?.[0]?.videoUrl || '');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);

  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    const trimmed = url.trim();
    if (!trimmed) return null;
    if (trimmed.includes('youtube.com/watch?v=')) {
      const id = trimmed.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (trimmed.includes('youtu.be/')) {
      const id = trimmed.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return trimmed;
  };

  const activeVideoUrl = customStreamUrl || activeServer.videoUrl;
  const embedUrl = getEmbedUrl(activeVideoUrl);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<'timeline' | 'stats' | 'lineups' | 'chat' | 'info'>('timeline');

  // Live Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'أحمد المدريدي', text: 'يا رب الفوز للملكي الليلة! فينيسيوس مبدع 🔥', teamSide: 'home', timestamp: '22:14' },
    { id: '2', sender: 'خالد السيتي', text: 'هالاند قادر يسجل في أي لحظة دفاع مدريد لازم يحذر ⚠️', teamSide: 'away', timestamp: '22:15' },
    { id: '3', sender: 'أبو فهد', text: 'التعليق والسرعة خرافية يا شباب ما في أي تقطيع شكراً للموقع 👏', teamSide: 'neutral', timestamp: '22:16' },
    { id: '4', sender: 'سعود الهلالي', text: 'مباراة من أعلى طراز تكتيكي بين أنشيلوتي وغوارديولا 👑', teamSide: 'neutral', timestamp: '22:17' },
  ]);
  const [newChatText, setNewChatText] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Video canvas simulation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Audio Context for authentic stadium ambiance / cheering
  const audioContextRef = useRef<AudioContext | null>(null);

  const playCrowdSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate crowd cheering noise with bandpass filter
      const bufferSize = ctx.sampleRate * 2.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 450;
      filter.Q.value = 1.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08 * (isMuted ? 0 : volume), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio fallback
    }
  };

  // Canvas visual football simulation
  useEffect(() => {
    let animationFrameId: number;
    let ballX = 200;
    let ballY = 150;
    let dx = 2.4;
    let dy = 1.6;
    let frameCount = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      frameCount++;
      const w = canvas.width;
      const h = canvas.height;

      // Draw Pitch Grass
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#064e3b');
      gradient.addColorStop(0.5, '#047857');
      gradient.addColorStop(1, '#065f46');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Pitch lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;

      // Halfway line & center circle
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(w / 2, h / 2, h * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      // Penalty boxes
      ctx.strokeRect(0, h * 0.25, w * 0.15, h * 0.5);
      ctx.strokeRect(w * 0.85, h * 0.25, w * 0.15, h * 0.5);

      // Moving football
      if (isPlaying) {
        ballX += dx;
        ballY += dy;

        if (ballX > w - 30 || ballX < 30) dx = -dx;
        if (ballY > h - 30 || ballY < 30) dy = -dy;
      }

      // Ball shadow & ball
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(ballX, ballY + 12, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ballX, ballY, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Dynamic animated match status text in canvas center
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.roundRect(w / 2 - 140, h - 55, 280, 36, 12);
      ctx.fill();

      ctx.font = 'bold 13px Cairo, sans-serif';
      ctx.fillStyle = '#34d399';
      ctx.textAlign = 'center';
      ctx.fillText(
        isPlaying ? `● بث حي ومباشر | سيرفر: ${activeServer.name}` : '❚❚ البث متوقف مؤقتاً',
        w / 2,
        h - 32
      );

      // Channel watermark in top right
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('beIN SPORTS 1 HD MAX', w - 24, 38);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, activeServer]);

  // Periodic simulated live chat comments
  useEffect(() => {
    if (match.status !== 'live') return;

    const fanNames = ['سامي الجابر', 'محمد صلاح', 'كريم زيدان', 'علي الكعبي', 'طارق التايب', 'عمر كورة'];
    const fanComments = [
      'يا لهوي على الفرصة الضائعة!! 🔥🔥',
      'الحارس أنقذ هدف محقق بصراحة!',
      'مين يتوقع كم تنتهي المباراة؟ 🤔',
      'تسديدة خرافية مرت بجانب القائم مباشرة!',
      'هدف قادم في أي لحظة، الضغط عالي جداً ⚽',
      'البث هنا صراحة أسرع من شاشة التلفزيون ⚡'
    ];

    const interval = setInterval(() => {
      const randomName = fanNames[Math.floor(Math.random() * fanNames.length)];
      const randomText = fanComments[Math.floor(Math.random() * fanComments.length)];
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

      setChatMessages(prev => [
        ...prev.slice(-25),
        {
          id: Date.now().toString(),
          sender: randomName,
          text: randomText,
          timestamp: timeStr,
          teamSide: Math.random() > 0.5 ? 'home' : 'away'
        }
      ]);
    }, 12000);

    return () => clearInterval(interval);
  }, [match.status]);

  // Handle Send Chat
  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newChatText.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'أنت (مشاهد مباشر)',
        text: newChatText.trim(),
        teamSide: 'home',
        timestamp: timeStr
      }
    ]);
    setNewChatText('');
    playCrowdSound();

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRefreshStream = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 900);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto">
      {/* Top Header of the Stream Theater */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            title="رجوع للجدول"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base sm:text-lg text-white">
                {match.homeTeam.name} <span className="text-emerald-400">vs</span> {match.awayTeam.name}
              </h2>
              {match.status === 'live' && (
                <span className="bg-red-600 text-white font-extrabold text-xs px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>دقيقة {match.currentMinute}'</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {match.leagueName} • {match.channel} • تعليق: {match.commentator}
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {onSimulateGoal && match.status === 'live' && (
            <button
              onClick={() => {
                onSimulateGoal(match.homeTeam.id);
                playCrowdSound();
              }}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl transition-all"
              title="محاكاة تسجيل هدف وصيحة الجماهير"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>تسجيل هدف تجريبي ⚽</span>
            </button>
          )}

          {onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer"
              title="تعديل سيرفرات وروابط هذه المباراة (لوحة التحكم)"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">لوحة التحكم ⚙️</span>
            </button>
          )}

          <button
            onClick={() => setIsCinemaMode(!isCinemaMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors hidden md:block ${
              isCinemaMode ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'
            }`}
          >
            وضع السينما
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className={`flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 transition-all ${isCinemaMode ? 'max-w-full p-2' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Video Player Column (8 cols in standard mode) */}
          <div className={`${isCinemaMode ? 'lg:col-span-12' : 'lg:col-span-8'} flex flex-col gap-4`}>
            {/* Servers Switcher Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>سيرفرات البث:</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {match.servers.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setActiveServer(srv);
                      if (srv.videoUrl) setCustomStreamUrl(srv.videoUrl);
                      handleRefreshStream();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeServer.id === srv.id
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{srv.name}</span>
                    <span className="text-[10px] bg-slate-900/80 px-1.5 py-0.5 rounded font-mono">
                      {srv.quality}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Stream URL toggle */}
            <div className="mb-2 flex items-center justify-between text-xs">
              <button
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>{showUrlInput ? '▲ إخفاء خيار رابط البث المباشر' : '🔗 تشغيل رابط بث فيديو خارجي (YouTube أو m3u8 أو iframe)'}</span>
              </button>
              {embedUrl && (
                <span className="text-[11px] bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-md">
                  بث فيديو حي متصل
                </span>
              )}
            </div>

            {showUrlInput && (
              <div className="mb-3 p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-2">
                <input
                  type="text"
                  value={customStreamUrl}
                  onChange={(e) => setCustomStreamUrl(e.target.value)}
                  placeholder="ضع رابط يوتيوب أو فيديو مباشر هنا (مثال: https://youtube.com/watch?v=... أو https://example.com/live.mp4)"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                {customStreamUrl && (
                  <button
                    onClick={() => setCustomStreamUrl('')}
                    className="text-xs text-slate-400 hover:text-white px-2 py-1"
                  >
                    إعادة ضبط
                  </button>
                )}
              </div>
            )}

            {/* Video Player Display Screen */}
            <div
              ref={playerContainerRef}
              className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between group"
            >
              {/* Powerful Stream Engine Player */}
              <div className="absolute inset-0 w-full h-full">
                <StreamEnginePlayer
                  server={{
                    ...activeServer,
                    videoUrl: customStreamUrl || activeServer.videoUrl || activeServer.url
                  }}
                  match={match}
                  isPlaying={isPlaying}
                  isMuted={isMuted}
                  volume={volume}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  onToggleMute={() => setIsMuted(!isMuted)}
                />
              </div>

              {/* Top Video Score Overlay Bug */}
              <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
                {/* Scorebug */}
                <div className="bg-slate-950/85 backdrop-blur-md rounded-xl p-2 border border-slate-700/60 shadow-2xl flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-white text-xs sm:text-sm">{match.homeTeam.shortName}</span>
                    <span className="text-emerald-400 font-mono font-black text-sm sm:text-base px-2 py-0.5 bg-slate-900 rounded">
                      {match.homeScore ?? 0}
                    </span>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-400 font-mono font-black text-sm sm:text-base px-2 py-0.5 bg-slate-900 rounded">
                      {match.awayScore ?? 0}
                    </span>
                    <span className="font-black text-white text-xs sm:text-sm">{match.awayTeam.shortName}</span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-700" />
                  <div className="flex items-center gap-1 text-[11px] font-bold text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>{match.status === 'live' ? `د ${match.currentMinute}'` : match.status === 'finished' ? 'انتهت' : match.time}</span>
                  </div>
                </div>

                {/* Server Watermark */}
                <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-300 border border-slate-800">
                  {activeServer.quality} • {activeServer.bitrate}
                </div>
              </div>

              {/* Refreshing Spinner Overlay */}
              {isRefreshing && (
                <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-white">
                  <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin" />
                  <span className="text-sm font-bold">جاري تحميل البث من السيرفر...</span>
                </div>
              )}

              {/* Bottom Video Controls Toolbar */}
              <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex items-center justify-between gap-3 text-white opacity-95 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105"
                    title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (isMuted) playCrowdSound();
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    title={isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-16 sm:w-24 accent-emerald-500 hidden sm:block cursor-pointer"
                  />

                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>مباشر</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefreshStream}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="إعادة تحميل البث عند التقطيع"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="شاشة كاملة"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Broadcast Information & Stability Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>حالة السيرفر: <strong className="text-emerald-400">مستقر بنسبة 100%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>حماية ضد الحجب وضمان جودة متواصلة</span>
              </div>
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-amber-400" />
                <span>القناة: <strong className="text-white">{match.channel}</strong></span>
              </div>
            </div>

            {/* Tabs for Match Center (Timeline, Stats, Lineups) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="flex items-center border-b border-slate-800 bg-slate-950/60 overflow-x-auto text-xs sm:text-sm font-bold">
                <button
                  onClick={() => setSelectedTab('timeline')}
                  className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    selectedTab === 'timeline'
                      ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>مجريات وأهداف المباراة</span>
                </button>

                <button
                  onClick={() => setSelectedTab('stats')}
                  className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    selectedTab === 'stats'
                      ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>إحصائيات المباراة</span>
                </button>

                <button
                  onClick={() => setSelectedTab('lineups')}
                  className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    selectedTab === 'lineups'
                      ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>تشكيلة الفريقين</span>
                </button>

                <button
                  onClick={() => setSelectedTab('info')}
                  className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    selectedTab === 'info'
                      ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  <span>معلومات البث والقنوات</span>
                </button>
              </div>

              <div className="p-4 sm:p-5">
                {/* TAB 1: TIMELINE */}
                {selectedTab === 'timeline' && (
                  <div>
                    {match.events.length === 0 ? (
                      <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
                        لم تبدأ أحداث المباراة بعد أو لم يتم تسجيل أهداف حتى اللحظة.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {match.events.map((ev: MatchEvent) => (
                          <div
                            key={ev.id}
                            className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-black flex items-center justify-center shrink-0">
                                {ev.minute}'
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-extrabold text-white text-sm">
                                    {ev.playerName}
                                  </span>
                                  {ev.type === 'goal' && (
                                    <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                                      ⚽ هدففف
                                    </span>
                                  )}
                                  {ev.type === 'yellow_card' && (
                                    <span className="bg-yellow-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px]">
                                      🟨 بطاقة صفراء
                                    </span>
                                  )}
                                  {ev.type === 'substitution' && (
                                    <span className="bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">
                                      🔄 تبديل
                                    </span>
                                  )}
                                </div>
                                {ev.detail && (
                                  <p className="text-slate-400 mt-0.5">{ev.detail}</p>
                                )}
                                {ev.assistPlayer && (
                                  <span className="text-[11px] text-slate-500">
                                    صناعة: {ev.assistPlayer}
                                  </span>
                                )}
                              </div>
                            </div>

                            <span className="font-bold text-slate-400">
                              {ev.teamId === match.homeTeam.id ? match.homeTeam.name : match.awayTeam.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: STATS */}
                {selectedTab === 'stats' && (
                  <div className="space-y-4">
                    {/* Possession bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span className="text-emerald-400">{match.homeTeam.name} ({match.stats.possession[0]}%)</span>
                        <span className="text-slate-300">الاستحواذ</span>
                        <span className="text-blue-400">{match.awayTeam.name} ({match.stats.possession[1]}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                        <div
                          style={{ width: `${match.stats.possession[0]}%` }}
                          className="bg-emerald-500 h-full transition-all duration-500"
                        />
                        <div
                          style={{ width: `${match.stats.possession[1]}%` }}
                          className="bg-blue-500 h-full transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Stats List */}
                    {[
                      { label: 'إجمالي التسديدات', home: match.stats.shots[0], away: match.stats.shots[1] },
                      { label: 'التسديدات على المرمى', home: match.stats.shotsOnTarget[0], away: match.stats.shotsOnTarget[1] },
                      { label: 'الضربات الركنية', home: match.stats.corners[0], away: match.stats.corners[1] },
                      { label: 'الأخطاء المرتكبة', home: match.stats.fouls[0], away: match.stats.fouls[1] },
                      { label: 'البطاقات الصفراء', home: match.stats.yellowCards[0], away: match.stats.yellowCards[1] },
                      { label: 'حالات التسلل', home: match.stats.offsides[0], away: match.stats.offsides[1] },
                      { label: 'التصديات', home: match.stats.saves[0], away: match.stats.saves[1] },
                      { label: 'دقة التمرير', home: `${match.stats.passAccuracy[0]}%`, away: `${match.stats.passAccuracy[1]}%` },
                    ].map((st, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60">
                        <span className="font-mono font-bold text-emerald-400 w-12 text-right">{st.home}</span>
                        <span className="text-slate-400 font-semibold">{st.label}</span>
                        <span className="font-mono font-bold text-blue-400 w-12 text-left">{st.away}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 3: LINEUPS */}
                {selectedTab === 'lineups' && (
                  <PitchLineup match={match} />
                )}

                {/* TAB 4: INFO */}
                {selectedTab === 'info' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                        <Tv className="w-4 h-4 text-emerald-400" />
                        <span>بيانات القناة والتردد</span>
                      </h4>
                      <p className="text-slate-400">القناة: {match.channel}</p>
                      <p className="text-slate-400 mt-1">القمر الصناعي: نايل سات / سهيل سات</p>
                      <p className="text-slate-400 mt-1">التردد: 11013 أفقي H - معدل الترميز 27500</p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span>طاقم التحكيم والملعب</span>
                      </h4>
                      <p className="text-slate-400">الملعب: {match.stadium}</p>
                      <p className="text-slate-400 mt-1">المعلق الرياضي: {match.commentator}</p>
                      <p className="text-slate-400 mt-1">البطولة: {match.leagueName} ({match.leagueRound})</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Community Chat (4 cols) */}
          <div className="lg:col-span-4 flex flex-col h-[580px] lg:h-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-slate-950/80 border-b border-slate-800 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">شات المشاهدين المباشر</h3>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/20">
                14,280 مشاهد متصل
              </span>
            </div>

            {/* Messages Scroll area */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    msg.sender.includes('أنت')
                      ? 'bg-emerald-950/30 border-emerald-500/40 mr-4'
                      : 'bg-slate-950/70 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-extrabold text-slate-200">{msg.sender}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{msg.text}</p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Cheering Reactions */}
            <div className="p-2 bg-slate-950/90 border-t border-slate-800/60 flex items-center justify-around">
              {['⚽ هدففف', '🔥 مولعة', '👏 وحش', '👑 الأفضل', '🎯 تسديدة'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setNewChatText(tag);
                  }}
                  className="px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-emerald-600 text-[11px] text-slate-300 hover:text-white font-semibold transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                placeholder="اكتب تعليقك وتفاعل مع المشاهدين..."
                className="flex-1 bg-slate-900 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                title="إرسال"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
