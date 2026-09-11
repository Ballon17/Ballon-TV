import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Play, 
  Server, 
  Copy, 
  Save, 
  RotateCcw, 
  Key, 
  Globe, 
  Compass, 
  Sliders, 
  Radio, 
  Tv, 
  Eye, 
  EyeOff, 
  Download, 
  Upload,
  AlertCircle
} from 'lucide-react';
import { Match, StreamServer } from '../types';

interface AdminStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
  onUpdateMatchServers: (matchId: string, servers: StreamServer[]) => void;
  selectedMatchId?: string;
}

export const AdminStreamModal: React.FC<AdminStreamModalProps> = ({
  isOpen,
  onClose,
  matches,
  onUpdateMatchServers,
  selectedMatchId
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('kora_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>(() => {
    return localStorage.getItem('kora_admin_pin') || '1234';
  });

  const [activeMatchId, setActiveMatchId] = useState<string>(selectedMatchId || matches[0]?.id || '');
  const [editingServerIndex, setEditingServerIndex] = useState<number | null>(null);

  // Form states for server editing
  const [serverName, setServerName] = useState<string>('');
  const [serverUrl, setServerUrl] = useState<string>('');
  const [serverReferer, setServerReferer] = useState<string>('');
  const [serverUserAgent, setServerUserAgent] = useState<string>('');
  const [serverOrigin, setServerOrigin] = useState<string>('');
  const [serverClearKey, setServerClearKey] = useState<string>('');
  const [serverDrmKey, setServerDrmKey] = useState<string>('');
  const [serverQuality, setServerQuality] = useState<string>('1080p 60fps');
  const [serverType, setServerType] = useState<'fhd' | 'hd' | 'sd' | '4k'>('fhd');
  const [serverEngine, setServerEngine] = useState<'auto' | 'hls' | 'shaka' | 'html5' | 'iframe'>('auto');
  const [serverCommentator, setServerCommentator] = useState<string>('');
  const [serverStatus, setServerStatus] = useState<'online' | 'busy' | 'backup'>('online');

  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [testVideoUrl, setTestVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMatchId) {
      setActiveMatchId(selectedMatchId);
    }
  }, [selectedMatchId]);

  if (!isOpen) return null;

  const currentMatch = matches.find((m) => m.id === activeMatchId) || matches[0];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === adminPin || pinInput.trim() === '1234' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('kora_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('رمز المرور غير صحيح! (الرمز الافتراضي: 1234)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kora_admin_auth');
    setPinInput('');
  };

  const startEditServer = (server: StreamServer, index: number) => {
    setEditingServerIndex(index);
    setServerName(server.name || `سيرفر ${index + 1}`);
    setServerUrl(server.videoUrl || server.url || '');
    setServerReferer(server.referer || '');
    setServerUserAgent(server.userAgent || '');
    setServerOrigin(server.origin || '');
    setServerClearKey(server.clearKey || '');
    setServerDrmKey(server.drmKey || '');
    setServerQuality(server.quality || '1080p');
    setServerType(server.type === '4k' ? '4k' : server.type === 'sd' ? 'sd' : server.type === 'hd' ? 'hd' : 'fhd');
    setServerEngine(server.engine || 'auto');
    setServerCommentator(server.commentator || currentMatch?.commentator || 'عصام الشوالي');
    setServerStatus(server.status || 'online');
  };

  const startAddNewServer = () => {
    const nextNum = (currentMatch?.servers?.length || 0) + 1;
    setEditingServerIndex(-1); // -1 means new server
    setServerName(`سيرفر ${nextNum} - FHD`);
    setServerUrl('');
    setServerReferer('');
    setServerUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    setServerOrigin('');
    setServerClearKey('');
    setServerDrmKey('');
    setServerQuality('1080p 60fps');
    setServerType('fhd');
    setServerEngine('auto');
    setServerCommentator(currentMatch?.commentator || 'المعلق الرياضي');
    setServerStatus('online');
  };

  const handleSaveServer = () => {
    if (!currentMatch) return;
    const finalUrl = serverUrl.trim();

    const updatedServer: StreamServer = {
      id: editingServerIndex !== null && editingServerIndex >= 0 && currentMatch.servers[editingServerIndex]
        ? currentMatch.servers[editingServerIndex].id
        : `srv-${Date.now()}`,
      name: serverName.trim() || `سيرفر ${(currentMatch.servers?.length || 0) + 1}`,
      videoUrl: finalUrl || undefined,
      url: finalUrl || undefined,
      referer: serverReferer.trim() || undefined,
      userAgent: serverUserAgent.trim() || undefined,
      origin: serverOrigin.trim() || undefined,
      clearKey: serverClearKey.trim() || undefined,
      drmKey: serverDrmKey.trim() || undefined,
      quality: serverQuality,
      type: serverType,
      engine: serverEngine,
      commentator: serverCommentator.trim() || currentMatch.commentator,
      status: serverStatus,
      bitrate: serverType === '4k' ? '12500 kbps' : serverType === 'fhd' ? '8500 kbps' : serverType === 'hd' ? '4500 kbps' : '1800 kbps'
    };

    let updatedList: StreamServer[] = [];
    if (editingServerIndex === -1) {
      // Add new
      updatedList = [...(currentMatch.servers || []), updatedServer];
    } else if (editingServerIndex !== null && editingServerIndex >= 0) {
      // Update existing
      updatedList = currentMatch.servers.map((s, idx) => (idx === editingServerIndex ? updatedServer : s));
    }

    onUpdateMatchServers(currentMatch.id, updatedList);
    setEditingServerIndex(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteServer = (index: number) => {
    if (!currentMatch) return;
    if (window.confirm('هل أنت متأكد من حذف هذا السيرفر؟')) {
      const updated = currentMatch.servers.filter((_, idx) => idx !== index);
      onUpdateMatchServers(currentMatch.id, updated);
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(matches, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kora_live_streams_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto font-sans dir-rtl text-right">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>لوحة التحكم الخاصة بروابط البث المباشر</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  ADMIN ONLY
                </span>
              </h2>
              <p className="text-xs text-slate-400">إدارة سيرفرات HLS / ClearKey DRM / Referer / Origin</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="تسجيل الخروج"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">قفل اللوحة</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* PIN Protection Login View */
            <div className="max-w-md mx-auto py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">لوحة تحكم مشفرة ومحمية</h3>
                <p className="text-xs text-slate-400">
                  يرجى إدخال رمز المرور السري (PIN) الخاص بك للوصول إلى إدارة السيرفرات والروابط.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="أدخل رمز المشرف (الافتراضي: 1234)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-center text-lg font-mono text-emerald-400 tracking-widest focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1.5"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {pinError && (
                  <div className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded-xl border border-red-500/30">
                    {pinError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>فتح لوحة التحكم</span>
                </button>

                <div className="text-[11px] text-slate-500">
                  الرمز الافتراضي المبرمج: <span className="font-mono text-slate-400">1234</span> أو <span className="font-mono text-slate-400">admin</span>
                </div>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">
              {saveSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>تم حفظ وتحديث السيرفرات بنجاح في النظام!</span>
                </div>
              )}

              {/* Match Selector Bar */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  اختر المباراة لتعديل روابط وسيرفرات البث الخاصة بها:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={activeMatchId}
                    onChange={(e) => {
                      setActiveMatchId(e.target.value);
                      setEditingServerIndex(null);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
                  >
                    {matches.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.homeTeam?.name} vs {m.awayTeam?.name} ({m.leagueName}) - [{m.status === 'live' ? 'مباشر الآن' : m.time}]
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportJSON}
                      className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="تصدير نسخة احتياطية من كافة روابط المباريات"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تصدير السيرفرات (JSON)</span>
                    </button>
                    <button
                      onClick={startAddNewServer}
                      className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة سيرفر جديد</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Selected Match Info */}
              {currentMatch && (
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-white">{currentMatch.homeTeam?.name}</span>
                    <span className="text-xs px-2 py-0.5 bg-slate-800 rounded font-mono font-bold text-emerald-400">
                      {currentMatch.status === 'upcoming' ? currentMatch.time : `${currentMatch.homeScore ?? 0} - ${currentMatch.awayScore ?? 0}`}
                    </span>
                    <span className="text-sm font-black text-white">{currentMatch.awayTeam?.name}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    القناة: <span className="text-emerald-400 font-semibold">{currentMatch.channel}</span> | المعلق: <span className="text-amber-300 font-semibold">{currentMatch.commentator}</span>
                  </div>
                </div>
              )}

              {/* Edit/Add Server Form */}
              {editingServerIndex !== null ? (
                <div className="bg-slate-950 border-2 border-emerald-500/50 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                      <Edit3 className="w-4 h-4" />
                      <span>{editingServerIndex === -1 ? 'إضافة سيرفر جديد' : `تعديل ${serverName}`}</span>
                    </h3>
                    <button
                      onClick={() => setEditingServerIndex(null)}
                      className="text-xs text-slate-400 hover:text-white p-1"
                    >
                      إلغاء التعديل
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Server Name */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        اسم السيرفر (Server Name):
                      </label>
                      <input
                        type="text"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)}
                        placeholder="مثال: سيرفر 1 - beIN Sports 1 FHD"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Stream Engine */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        محرك التشغيل القوي (Engine):
                      </label>
                      <select
                        value={serverEngine}
                        onChange={(e) => setServerEngine(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-emerald-300 focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="auto">تلقائي Auto (يكتشف النوع تلقائياً)</option>
                        <option value="hls">محرك HLS.js (ملفات m3u8 المباشرة)</option>
                        <option value="shaka">محرك Shaka Player (Google ClearKey / DRM)</option>
                        <option value="html5">محرك HTML5 Video (فيديو مباشر mp4/ts)</option>
                        <option value="iframe">محرك Iframe Embed (تضمين البث الخارجي)</option>
                      </select>
                    </div>

                    {/* Stream URL */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        رابط البث المباشر (Stream URL - m3u8 / mpd / iframe):
                      </label>
                      <input
                        type="text"
                        value={serverUrl}
                        onChange={(e) => setServerUrl(e.target.value)}
                        placeholder="https://example.com/live/stream.m3u8 أو https://example.com/embed/player"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-mono text-emerald-400 focus:border-emerald-500 focus:outline-none dir-ltr text-left"
                      />
                    </div>

                    {/* Referer Header */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1">
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        <span>المرجع (Referer Header):</span>
                      </label>
                      <input
                        type="text"
                        value={serverReferer}
                        onChange={(e) => setServerReferer(e.target.value)}
                        placeholder="https://live.beinsports.com/"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none dir-ltr text-left"
                      />
                    </div>

                    {/* Origin Header */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1">
                        <Compass className="w-3.5 h-3.5 text-purple-400" />
                        <span>المصدر (Origin Header):</span>
                      </label>
                      <input
                        type="text"
                        value={serverOrigin}
                        onChange={(e) => setServerOrigin(e.target.value)}
                        placeholder="https://live.beinsports.com"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none dir-ltr text-left"
                      />
                    </div>

                    {/* User-Agent */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1">
                        <Radio className="w-3.5 h-3.5 text-amber-400" />
                        <span>وكيل المستخدم (User-Agent):</span>
                      </label>
                      <input
                        type="text"
                        value={serverUserAgent}
                        onChange={(e) => setServerUserAgent(e.target.value)}
                        placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 أو ExoPlayer"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none dir-ltr text-left"
                      />
                    </div>

                    {/* ClearKey DRM */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1">
                        <Key className="w-3.5 h-3.5 text-emerald-400" />
                        <span>مفتاح ClearKey (KeyId:Key Hex):</span>
                      </label>
                      <input
                        type="text"
                        value={serverClearKey}
                        onChange={(e) => setServerClearKey(e.target.value)}
                        placeholder="مثال: e210... : a45f..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:border-emerald-500 focus:outline-none dir-ltr text-left"
                      />
                    </div>

                    {/* DRM Key / License Server */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1">
                        <Key className="w-3.5 h-3.5 text-rose-400" />
                        <span>رابط خادم التراخيص (DRM License URL):</span>
                      </label>
                      <input
                        type="text"
                        value={serverDrmKey}
                        onChange={(e) => setServerDrmKey(e.target.value)}
                        placeholder="https://license.server/get-key"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none dir-ltr text-left"
                      />
                    </div>

                    {/* Quality & Status */}
                    <div className="grid grid-cols-2 gap-2 sm:col-span-2">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">الجودة الدقة:</label>
                        <select
                          value={serverType}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            setServerType(val);
                            if (val === '4k') setServerQuality('4K 2160p 60fps');
                            if (val === 'fhd') setServerQuality('1080p 60fps');
                            if (val === 'hd') setServerQuality('720p 60fps');
                            if (val === 'sd') setServerQuality('480p 30fps');
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="4k">4K Ultra HD</option>
                          <option value="fhd">FHD 1080p</option>
                          <option value="hd">HD 720p</option>
                          <option value="sd">SD 480p (جوال ضعيف)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">حالة السيرفر:</label>
                        <select
                          value={serverStatus}
                          onChange={(e) => setServerStatus(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="online">متصل وجاهز (Online)</option>
                          <option value="busy">سيرفر ضغط عالي (Busy)</option>
                          <option value="backup">سيرفر احتياطي (Backup)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingServerIndex(null)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveServer}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>حفظ السيرفر وتطبيقه الآن</span>
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Current Servers List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400">
                    السيرفرات الحالية المخصصة لهذه المباراة ({currentMatch?.servers?.length || 0} سيرفرات):
                  </h3>
                  <button
                    onClick={startAddNewServer}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة سيرفر جديد</span>
                  </button>
                </div>

                {(!currentMatch?.servers || currentMatch.servers.length === 0) ? (
                  <div className="p-8 text-center bg-slate-950/50 rounded-2xl border border-dashed border-slate-800 text-slate-500 text-xs">
                    لا يوجد سيرفرات مضافة بعد لهذه المباراة. اضغط على "إضافة سيرفر جديد" لإضافة روابطك.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentMatch.servers.map((server, idx) => (
                      <div
                        key={server.id || idx}
                        className="p-3.5 bg-slate-950 border border-slate-800/90 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 font-bold font-mono text-sm shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-white">{server.name}</h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                                {server.quality}
                              </span>
                              {server.clearKey && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                                  DRM ClearKey
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono truncate max-w-xs sm:max-w-md dir-ltr text-left">
                              {server.videoUrl || server.url || 'لا يوجد رابط مباشر مضاف (سيرفر تجريبي)'}
                            </p>
                            {server.referer && (
                              <p className="text-[10px] text-slate-500 truncate dir-ltr text-left">
                                Ref: {server.referer}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center">
                          <button
                            onClick={() => startEditServer(server, idx)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="تعديل السيرفر"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>تعديل</span>
                          </button>
                          <button
                            onClick={() => handleDeleteServer(idx)}
                            className="p-2 bg-red-950/40 hover:bg-red-900/50 text-red-400 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                            title="حذف السيرفر"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>محركات البث تدعم HLS (m3u8) و Google Shaka DRM ClearKey تلقائياً</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
