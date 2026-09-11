import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import shaka from 'shaka-player';
import { StreamServer, Match } from '../types';
import { AlertCircle, RefreshCw, Radio, Play, Pause, Volume2, VolumeX, Maximize, Check } from 'lucide-react';

interface StreamEnginePlayerProps {
  server: StreamServer;
  match: Match;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export const StreamEnginePlayer: React.FC<StreamEnginePlayerProps> = ({
  server,
  match,
  isPlaying,
  isMuted,
  volume,
  onTogglePlay,
  onToggleMute
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const shakaRef = useRef<shaka.Player | null>(null);

  const [activeEngine, setActiveEngine] = useState<'hls' | 'shaka' | 'html5' | 'iframe' | 'canvas'>('canvas');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const rawUrl = (server.videoUrl || server.url || '').trim();

  // Helper to detect if URL is an iframe embed
  const isIframeEmbed = (url: string) => {
    return (
      url.includes('youtube.com/embed/') ||
      url.includes('youtube.com/watch') ||
      url.includes('youtu.be/') ||
      url.includes('twitch.tv') ||
      url.includes('dailymotion.com') ||
      url.includes('/embed/') ||
      url.includes('player.') ||
      url.endsWith('.html') ||
      url.includes('iframe')
    );
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=${isMuted ? 1 : 0}`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=${isMuted ? 1 : 0}`;
    }
    return url;
  };

  useEffect(() => {
    setLoadError(null);

    // Clean up previous engines
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (shakaRef.current) {
      shakaRef.current.destroy();
      shakaRef.current = null;
    }

    if (!rawUrl) {
      setActiveEngine('canvas');
      return;
    }

    const videoElement = videoRef.current;
    setIsLoading(true);

    // Engine Selection Logic
    const specifiedEngine = server.engine || 'auto';

    const hasClearKey = !!server.clearKey;
    const isMpd = rawUrl.includes('.mpd');
    const isM3u8 = rawUrl.includes('.m3u8');

    if (specifiedEngine === 'iframe' || isIframeEmbed(rawUrl)) {
      setActiveEngine('iframe');
      setIsLoading(false);
      return;
    }

    if (hasClearKey || isMpd || specifiedEngine === 'shaka') {
      // Use Google Shaka Player (DRM ClearKey / DASH / HLS)
      initShakaPlayer(rawUrl);
    } else if (isM3u8 || specifiedEngine === 'hls') {
      // Use HLS.js
      initHlsPlayer(rawUrl);
    } else {
      // Direct HTML5 video (.mp4, direct stream)
      initHtml5Player(rawUrl);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (shakaRef.current) {
        shakaRef.current.destroy();
        shakaRef.current = null;
      }
    };
  }, [rawUrl, server.clearKey, server.engine]);

  // Handle Play/Pause & Volume changes on video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, volume]);

  const initHlsPlayer = (url: string) => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60,
        xhrSetup: (xhr) => {
          // Custom HTTP headers configured by admin
          if (server.referer) {
            try { xhr.setRequestHeader('Referer', server.referer); } catch (_) {}
          }
          if (server.origin) {
            try { xhr.setRequestHeader('Origin', server.origin); } catch (_) {}
          }
        }
      });

      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        setActiveEngine('hls');
        if (isPlaying) {
          video.play().catch(() => {});
        }
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.warn('HLS.js fatal error:', data.type, data.details);
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              setLoadError(`تعذر تشغيل سيرفر HLS (${data.details})`);
              setIsLoading(false);
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari iOS/Mac HLS
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        setActiveEngine('hls');
      });
    } else {
      setLoadError('المتصفح لا يدعم بث HLS بشكل مباشر.');
      setIsLoading(false);
    }
  };

  const initShakaPlayer = async (url: string) => {
    const video = videoRef.current;
    if (!video) return;

    try {
      shaka.polyfill.installAll();
      if (!shaka.Player.isBrowserSupported()) {
        console.warn('Browser not supported by Shaka Player, falling back to HLS');
        initHlsPlayer(url);
        return;
      }

      const player = new shaka.Player(video);
      shakaRef.current = player;

      // Configure DRM ClearKey if present
      if (server.clearKey) {
        try {
          // Parse format "key_id:key_hex" or JSON
          let clearKeysConfig: Record<string, string> = {};
          if (server.clearKey.includes('{')) {
            clearKeysConfig = JSON.parse(server.clearKey);
          } else if (server.clearKey.includes(':')) {
            const parts = server.clearKey.split(':');
            const keyId = parts[0].trim();
            const key = parts[1].trim();
            clearKeysConfig[keyId] = key;
          }

          player.configure({
            drm: {
              clearKeys: clearKeysConfig
            }
          });
        } catch (e) {
          console.warn('ClearKey parse error:', e);
        }
      }

      // Configure network filters for custom Referer/Origin/User-Agent
      player.getNetworkingEngine()?.registerRequestFilter((_type, request) => {
        if (server.referer) {
          request.headers['Referer'] = server.referer;
        }
        if (server.origin) {
          request.headers['Origin'] = server.origin;
        }
      });

      player.addEventListener('error', (event) => {
        console.warn('Shaka Player error:', event);
        setLoadError('حدث خطأ في فك تشفير سيرفر البث أو الاتصال.');
        setIsLoading(false);
      });

      await player.load(url);
      setIsLoading(false);
      setActiveEngine('shaka');
      if (isPlaying) {
        video.play().catch(() => {});
      }
    } catch (err: any) {
      console.warn('Shaka load failure:', err);
      setLoadError('تعذر تشغيل السيرفر عبر محرك DRM.');
      setIsLoading(false);
    }
  };

  const initHtml5Player = (url: string) => {
    const video = videoRef.current;
    if (!video) return;

    video.src = url;
    video.onloadeddata = () => {
      setIsLoading(false);
      setActiveEngine('html5');
      if (isPlaying) video.play().catch(() => {});
    };
    video.onerror = () => {
      setIsLoading(false);
      setLoadError('تعذر تحميل رابط الفيديو المباشر.');
    };
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm text-center p-4">
          <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-3" />
          <p className="text-xs font-bold text-white mb-1">جاري الاتصال بالسيرفر {server.name}...</p>
          <p className="text-[11px] text-slate-400 font-mono">تهيئة محرك البث والتعليق العربي</p>
        </div>
      )}

      {/* Error Overlay */}
      {loadError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 p-4 text-center">
          <AlertCircle className="w-10 h-10 text-amber-400 mb-2" />
          <h4 className="text-sm font-bold text-white mb-1">تعذر تشغيل هذا السيرفر حالياً</h4>
          <p className="text-xs text-slate-400 max-w-sm mb-3">{loadError}</p>
          <p className="text-[11px] text-emerald-400 mb-3">
            يرجى التبديل إلى سيرفر آخر من القائمة أدناه، أو تعديل الرابط في لوحة التحكم.
          </p>
          <button
            onClick={() => {
              setLoadError(null);
              setIsLoading(true);
              if (rawUrl) initHlsPlayer(rawUrl);
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة</span>
          </button>
        </div>
      )}

      {/* Video Element (Used by HLS, Shaka, HTML5) */}
      <video
        ref={videoRef}
        playsInline
        webkit-playsinline="true"
        className={`w-full h-full object-contain ${
          activeEngine === 'iframe' || activeEngine === 'canvas' ? 'hidden' : 'block'
        }`}
      />

      {/* Iframe Embed Element */}
      {activeEngine === 'iframe' && rawUrl && (
        <iframe
          ref={iframeRef}
          src={getEmbedUrl(rawUrl)}
          title="Live Match Broadcast"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy={server.referer ? 'no-referrer-when-downgrade' : 'no-referrer'}
        />
      )}

      {/* Fallback Football Pitch Simulation Canvas when no stream URL is provided */}
      {activeEngine === 'canvas' && !rawUrl && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950/80 via-slate-950 to-slate-950 p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20 animate-pulse">
            <Radio className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-black text-white mb-1">
            {server.name || 'سيرفر البث المباشر'}
          </h3>
          <p className="text-xs text-slate-300 max-w-md mb-2">
            بث مباشر لمباراة <span className="text-emerald-400 font-bold">{match.homeTeam?.name}</span> ضد <span className="text-emerald-400 font-bold">{match.awayTeam?.name}</span>
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>الجودة: {server.quality} | المعلق: {server.commentator}</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-4">
            (يمكن للمشرف إضافة رابط البث الحقيقي m3u8 أو MPD من زر "لوحة التحكم ⚙️")
          </p>
        </div>
      )}

      {/* Live Badge Watermark */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2 pointer-events-none">
        <span className="flex items-center gap-1.5 bg-red-600/90 backdrop-blur-md text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-lg">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>مباشر LIVE</span>
        </span>
        <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-mono font-bold px-2 py-1 rounded-lg border border-slate-700">
          {server.quality}
        </span>
      </div>

      {/* Engine Badge */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span className="bg-slate-950/70 backdrop-blur-md text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800">
          {activeEngine === 'shaka' ? 'Google Shaka (ClearKey)' : activeEngine === 'hls' ? 'HLS.js Engine' : activeEngine === 'iframe' ? 'Iframe Player' : 'Live Player'}
        </span>
      </div>
    </div>
  );
};
