import { Match } from '../types';
import { TEAMS } from './teams';

export const mockMatches: Match[] = [
  // ==========================================
  // 1. مباريات اليوم (TODAY) - 11 مباريات
  // ==========================================
  {
    id: 'match-today-1',
    leagueId: 'ucl',
    leagueName: 'دوري أبطال أوروبا',
    leagueRound: 'نصف النهائي - ذهاب',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '22:00',
    status: 'live',
    currentMinute: 72,
    homeScore: 2,
    awayScore: 1,
    isHotMatch: true,
    channel: 'beIN Sports 1 HD Premium',
    commentator: 'عصام الشوالي',
    stadium: 'ملعب سانتياغو برنابيو - مدريد',
    homeTeam: TEAMS.realMadrid,
    awayTeam: TEAMS.manCity,
    servers: [
      { id: 'srv-1', name: 'سيرفر سوبر FHD (1080p)', quality: '1080p 60fps', bitrate: '8500 kbps', status: 'online', commentator: 'عصام الشوالي (beIN 1)', type: 'fhd' },
      { id: 'srv-2', name: 'سيرفر VIP عالي الدقة (720p)', quality: '720p 50fps', bitrate: '4500 kbps', status: 'online', commentator: 'خليل البلوشي (beIN 2)', type: 'hd' },
      { id: 'srv-3', name: 'سيرفر الجوال والنت الضعيف (480p)', quality: '480p 30fps', bitrate: '1800 kbps', status: 'online', commentator: 'عصام الشوالي', type: 'sd' },
      { id: 'srv-4', name: 'البث الصوتي والإذاعي المباشر', quality: 'Audio 128kbps', bitrate: '128 kbps', status: 'online', commentator: 'راديو beIN Sports', type: 'audio' }
    ],
    events: [
      { id: 'e1', minute: 18, type: 'goal', teamId: 'real-madrid', playerName: 'فينيسيوس جونيور', assistPlayer: 'بيلينغهام', detail: 'تسديدة مقوسة رائعة في أقصى الزاوية' },
      { id: 'e2', minute: 42, type: 'goal', teamId: 'man-city', playerName: 'إيرلينغ هالاند', assistPlayer: 'دي بروين', detail: 'متابعة رأسية قوية داخل منطقة الجزاء' },
      { id: 'e3', minute: 61, type: 'goal', teamId: 'real-madrid', playerName: 'كيليان مبابي', assistPlayer: 'فالفيردي', detail: 'انفراد سريع وتسديدة دقيقة أرضية' }
    ],
    stats: {
      possession: [52, 48],
      shots: [14, 11],
      shotsOnTarget: [6, 4],
      corners: [6, 5],
      fouls: [9, 12],
      yellowCards: [1, 2],
      redCards: [0, 0],
      offsides: [2, 1],
      saves: [3, 4],
      passes: [490, 460],
      passAccuracy: [88, 86]
    },
    homeLineup: {
      formation: '4-3-3',
      manager: 'كارلو أنشيلوتي',
      startingXI: [
        { number: 1, name: 'كورتوا', position: 'GK' },
        { number: 2, name: 'كارفاخال', position: 'DF' },
        { number: 3, name: 'ميليتاو', position: 'DF' },
        { number: 22, name: 'روديغر', position: 'DF' },
        { number: 23, name: 'ميندي', position: 'DF' },
        { number: 15, name: 'فالفيردي', position: 'MF' },
        { number: 14, name: 'تشواميني', position: 'MF' },
        { number: 5, name: 'بيلينغهام', position: 'MF' },
        { number: 11, name: 'رودريغو', position: 'FW' },
        { number: 9, name: 'مبابي', position: 'FW' },
        { number: 7, name: 'فينيسيوس', position: 'FW' }
      ],
      substitutes: []
    },
    awayLineup: {
      formation: '4-2-3-1',
      manager: 'بيب غوارديولا',
      startingXI: [
        { number: 31, name: 'إيدرسون', position: 'GK' },
        { number: 2, name: 'ووكر', position: 'DF' },
        { number: 3, name: 'دياز', position: 'DF' },
        { number: 25, name: 'أكانجي', position: 'DF' },
        { number: 24, name: 'غفارديول', position: 'DF' },
        { number: 16, name: 'رودري', position: 'MF' },
        { number: 8, name: 'كوفاسيتش', position: 'MF' },
        { number: 20, name: 'برناردو', position: 'MF' },
        { number: 17, name: 'دي بروين', position: 'MF' },
        { number: 47, name: 'فودين', position: 'MF' },
        { number: 9, name: 'هالاند', position: 'FW' }
      ],
      substitutes: []
    }
  },
  {
    id: 'match-today-2',
    leagueId: 'spl',
    leagueName: 'دوري روشن السعودي',
    leagueRound: 'الجولة 26 - كلاسيكو الرياض',
    leagueLogo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '21:00',
    status: 'live',
    currentMinute: 58,
    homeScore: 1,
    awayScore: 1,
    isHotMatch: true,
    channel: 'SSC 1 HD',
    commentator: 'فهد العتيبي + فارس عوض',
    stadium: 'المملكة أرينا - الرياض',
    homeTeam: TEAMS.alHilal,
    awayTeam: TEAMS.alNassr,
    servers: [
      { id: 'srv-spl-1', name: 'سيرفر البث الرئيسي SSC HD', quality: '1080p 60fps', bitrate: '7500 kbps', status: 'online', commentator: 'فهد العتيبي (القناة الصوتية 1)', type: 'fhd' },
      { id: 'srv-spl-2', name: 'سيرفر التعليق البديل فارس عوض', quality: '720p', bitrate: '4000 kbps', status: 'online', commentator: 'فارس عوض (القناة الصوتية 2)', type: 'hd' },
      { id: 'srv-spl-3', name: 'سيرفر الجوال الخفيف 480p', quality: '480p', bitrate: '1600 kbps', status: 'online', commentator: 'فهد العتيبي', type: 'sd' }
    ],
    events: [
      { id: 'ev-spl-1', minute: 23, type: 'goal', teamId: 'al-nassr', playerName: 'كريستيانو رونالدو', detail: 'صاروخية لا تصد من ضربة حرة مباشرة' },
      { id: 'ev-spl-2', minute: 49, type: 'goal', teamId: 'al-hilal', playerName: 'ألكسندر ميتروفيتش', assistPlayer: 'مالكوم', detail: 'رأسية نموذجية في شباك النصر' }
    ],
    stats: {
      possession: [55, 45],
      shots: [12, 10],
      shotsOnTarget: [5, 4],
      corners: [7, 4],
      fouls: [10, 14],
      yellowCards: [2, 3],
      redCards: [0, 0],
      offsides: [1, 3],
      saves: [3, 4],
      passes: [440, 370],
      passAccuracy: [85, 81]
    },
    homeLineup: {
      formation: '4-2-3-1',
      manager: 'خورخي خيسوس',
      startingXI: [
        { number: 37, name: 'بونو', position: 'GK' },
        { number: 66, name: 'عبد الحميد', position: 'DF' },
        { number: 3, name: 'كوليبالي', position: 'DF' },
        { number: 5, name: 'البليهي', position: 'DF' },
        { number: 12, name: 'الشهراني', position: 'DF' },
        { number: 8, name: 'نيفيز', position: 'MF' },
        { number: 22, name: 'ميلينكوفيتش سافيتش', position: 'MF' },
        { number: 77, name: 'مالكوم', position: 'MF' },
        { number: 29, name: 'سالم الدوسري', position: 'MF' },
        { number: 96, name: 'ميشائيل', position: 'MF' },
        { number: 9, name: 'ميتروفيتش', position: 'FW' }
      ],
      substitutes: []
    },
    awayLineup: {
      formation: '4-2-3-1',
      manager: 'لويس كاسترو',
      startingXI: [
        { number: 26, name: 'بينتو', position: 'GK' },
        { number: 2, name: 'الغنام', position: 'DF' },
        { number: 78, name: 'لاجامي', position: 'DF' },
        { number: 27, name: 'لابورت', position: 'DF' },
        { number: 15, name: 'أليكس تيليس', position: 'DF' },
        { number: 17, name: 'الخيبري', position: 'MF' },
        { number: 25, name: 'أوتافيو', position: 'MF' },
        { number: 94, name: 'تاليسكا', position: 'MF' },
        { number: 10, name: 'ماني', position: 'MF' },
        { number: 29, name: 'غريب', position: 'MF' },
        { number: 7, name: 'رونالدو', position: 'FW' }
      ],
      substitutes: []
    }
  },
  {
    id: 'match-today-3',
    leagueId: 'premier',
    leagueName: 'الدوري الإنجليزي الممتاز',
    leagueRound: 'الجولة 31 - قمة الآنفيلد',
    leagueLogo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '19:30',
    status: 'finished',
    currentMinute: 90,
    homeScore: 3,
    awayScore: 1,
    isHotMatch: true,
    channel: 'beIN Sports 1 HD Premium',
    commentator: 'حفيظ دراجي',
    stadium: 'ملعب الآنفيلد - ليفربول',
    homeTeam: TEAMS.liverpool,
    awayTeam: TEAMS.manUnited,
    servers: [
      { id: 'srv-pl-1', name: 'ملخص وأهداف المباراة بجودة FHD', quality: '1080p', bitrate: '8000 kbps', status: 'online', commentator: 'حفيظ دراجي', type: 'fhd' },
      { id: 'srv-pl-2', name: 'سيرفر الجوال السريع', quality: '720p', bitrate: '3500 kbps', status: 'online', commentator: 'حفيظ دراجي', type: 'hd' }
    ],
    events: [
      { id: 'ev-pl-1', minute: 15, type: 'goal', teamId: 'liverpool', playerName: 'محمد صلاح', detail: 'تسديدة مقوسة بالقدم اليسرى' },
      { id: 'ev-pl-2', minute: 34, type: 'goal', teamId: 'liverpool', playerName: 'لويس دياز', detail: 'انهاء رائع بعد مراوغة الحارس' },
      { id: 'ev-pl-3', minute: 62, type: 'goal', teamId: 'man-united', playerName: 'برونو فيرنانديز', detail: 'ضربة جزاء ناجحة' },
      { id: 'ev-pl-4', minute: 81, type: 'goal', teamId: 'liverpool', playerName: 'داروين نونيز', detail: 'رأسية قوية بعد ركنية' }
    ],
    stats: {
      possession: [62, 38],
      shots: [19, 8],
      shotsOnTarget: [9, 3],
      corners: [9, 3],
      fouls: [11, 15],
      yellowCards: [2, 4],
      redCards: [0, 0],
      offsides: [3, 2],
      saves: [2, 6],
      passes: [560, 340],
      passAccuracy: [89, 78]
    },
    homeLineup: {
      formation: '4-3-3',
      manager: 'أرني سلوت',
      startingXI: [
        { number: 1, name: 'أليسون', position: 'GK' },
        { number: 66, name: 'أرنولد', position: 'DF' },
        { number: 4, name: 'فان دايك', position: 'DF' },
        { number: 5, name: 'كوناتي', position: 'DF' },
        { number: 26, name: 'روبرتسون', position: 'DF' },
        { number: 10, name: 'ماك أليستر', position: 'MF' },
        { number: 38, name: 'غرافنبرخ', position: 'MF' },
        { number: 8, name: 'سوبوسلاي', position: 'MF' },
        { number: 11, name: 'محمد صلاح', position: 'FW' },
        { number: 9, name: 'نونيز', position: 'FW' },
        { number: 7, name: 'دياز', position: 'FW' }
      ],
      substitutes: []
    },
    awayLineup: {
      formation: '4-2-3-1',
      manager: 'إريك تين هاغ',
      startingXI: [
        { number: 24, name: 'أونانا', position: 'GK' },
        { number: 20, name: 'دالوت', position: 'DF' },
        { number: 6, name: 'مارتينيز', position: 'DF' },
        { number: 4, name: 'دي ليخت', position: 'DF' },
        { number: 3, name: 'مزراوي', position: 'DF' },
        { number: 18, name: 'كاسيميرو', position: 'MF' },
        { number: 37, name: 'ماينو', position: 'MF' },
        { number: 17, name: 'غرانتشو', position: 'MF' },
        { number: 8, name: 'برونو', position: 'MF' },
        { number: 10, name: 'راشفورد', position: 'MF' },
        { number: 11, name: 'هويلوند', position: 'FW' }
      ],
      substitutes: []
    }
  },
  {
    id: 'match-today-4',
    leagueId: 'laliga',
    leagueName: 'الدوري الإسباني',
    leagueRound: 'الجولة 30 - قمة المونتجويك',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '23:00',
    status: 'upcoming',
    isHotMatch: true,
    channel: 'beIN Sports 3 HD',
    commentator: 'خليل البلوشي',
    stadium: 'ملعب لويس كومبانيس الأولمبي - برشلونة',
    homeTeam: TEAMS.barcelona,
    awayTeam: TEAMS.atletico,
    servers: [
      { id: 'srv-bar-1', name: 'سيرفر البث المباشر FHD', quality: '1080p', bitrate: '7000 kbps', status: 'online', commentator: 'خليل البلوشي', type: 'fhd' },
      { id: 'srv-bar-2', name: 'سيرفر الجوال HD', quality: '720p', bitrate: '3800 kbps', status: 'online', commentator: 'خليل البلوشي', type: 'hd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: {
      formation: '4-2-3-1',
      manager: 'هانز فليك',
      startingXI: [
        { number: 1, name: 'تير شتيغن', position: 'GK' },
        { number: 23, name: 'كوندي', position: 'DF' },
        { number: 2, name: 'كوبارسي', position: 'DF' },
        { number: 5, name: 'إينيغو مارتينيز', position: 'DF' },
        { number: 3, name: 'بالدي', position: 'DF' },
        { number: 17, name: 'كاسادو', position: 'MF' },
        { number: 8, name: 'بيدري', position: 'MF' },
        { number: 19, name: 'لامين يامال', position: 'MF' },
        { number: 20, name: 'أولمو', position: 'MF' },
        { number: 11, name: 'رافينيا', position: 'MF' },
        { number: 9, name: 'ليفاندوفسكي', position: 'FW' }
      ],
      substitutes: []
    },
    awayLineup: {
      formation: '5-3-2',
      manager: 'دييغو سيميوني',
      startingXI: [
        { number: 13, name: 'أوبلاك', position: 'GK' },
        { number: 16, name: 'مولينا', position: 'DF' },
        { number: 2, name: 'خيمينيز', position: 'DF' },
        { number: 24, name: 'لو نورماند', position: 'DF' },
        { number: 21, name: 'خافي غالان', position: 'DF' },
        { number: 12, name: 'لينو', position: 'DF' },
        { number: 5, name: 'دي بول', position: 'MF' },
        { number: 6, name: 'كوكي', position: 'MF' },
        { number: 4, name: 'غالاغر', position: 'MF' },
        { number: 7, name: 'غريزمان', position: 'FW' },
        { number: 19, name: 'جوليان ألفاريز', position: 'FW' }
      ],
      substitutes: []
    }
  },
  {
    id: 'match-today-5',
    leagueId: 'caf',
    leagueName: 'دوري أبطال أفريقيا',
    leagueRound: 'نهائي البطولة - مباراة الذهاب',
    leagueLogo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '20:00',
    status: 'live',
    currentMinute: 40,
    homeScore: 1,
    awayScore: 0,
    isHotMatch: true,
    channel: 'beIN Sports 6 HD',
    commentator: 'علي محمد علي',
    stadium: 'ستاد القاهرة الدولي - القاهرة',
    homeTeam: TEAMS.alAhly,
    awayTeam: TEAMS.esperance,
    servers: [
      { id: 'srv-caf-1', name: 'سيرفر البث الإفريقي FHD', quality: '1080p', bitrate: '7200 kbps', status: 'online', commentator: 'علي محمد علي', type: 'fhd' },
      { id: 'srv-caf-2', name: 'سيرفر الجوال المباشر', quality: '480p', bitrate: '1700 kbps', status: 'online', commentator: 'علي محمد علي', type: 'sd' }
    ],
    events: [
      { id: 'ev-caf-1', minute: 28, type: 'goal', teamId: 'al-ahly', playerName: 'إمام عاشور', detail: 'تسديدة أرضية زاحفة تسكن الشباك' }
    ],
    stats: {
      possession: [56, 44],
      shots: [8, 4],
      shotsOnTarget: [4, 1],
      corners: [4, 2],
      fouls: [7, 11],
      yellowCards: [1, 2],
      redCards: [0, 0],
      offsides: [1, 0],
      saves: [1, 3],
      passes: [280, 210],
      passAccuracy: [82, 75]
    },
    homeLineup: {
      formation: '4-3-3',
      manager: 'مارسيل كولر',
      startingXI: [
        { number: 1, name: 'الشناوي', position: 'GK' },
        { number: 30, name: 'محمد هاني', position: 'DF' },
        { number: 6, name: 'ياسر إبراهيم', position: 'DF' },
        { number: 5, name: 'رامي ربيعة', position: 'DF' },
        { number: 21, name: 'علي معلول', position: 'DF' },
        { number: 13, name: 'مروان عطية', position: 'MF' },
        { number: 8, name: 'أكرم توفيق', position: 'MF' },
        { number: 22, name: 'إمام عاشور', position: 'MF' },
        { number: 14, name: 'حسين الشحات', position: 'FW' },
        { number: 9, name: 'وسام أبو علي', position: 'FW' },
        { number: 12, name: 'رضا سليم', position: 'FW' }
      ],
      substitutes: []
    },
    awayLineup: {
      formation: '4-2-3-1',
      manager: 'ميغيل كاردوزو',
      startingXI: [
        { number: 1, name: 'أمان الله مميش', position: 'GK' },
        { number: 2, name: 'بن علي', position: 'DF' },
        { number: 5, name: 'توغاي', position: 'DF' },
        { number: 4, name: 'مرياح', position: 'DF' },
        { number: 3, name: 'بن حميدة', position: 'DF' },
        { number: 6, name: 'أهولو', position: 'MF' },
        { number: 8, name: 'الشعلالي', position: 'MF' },
        { number: 10, name: 'ساس', position: 'MF' },
        { number: 7, name: 'غشة', position: 'MF' },
        { number: 11, name: 'رودريغيز', position: 'FW' },
        { number: 9, name: 'بن حمودة', position: 'FW' }
      ],
      substitutes: []
    }
  },
  {
    id: 'match-today-6',
    leagueId: 'premier',
    leagueName: 'الدوري الإنجليزي الممتاز',
    leagueRound: 'الجولة 31 - ديربي لندن',
    leagueLogo: 'https://images.unsplash.com/photo-1518604666864-7423958f7090?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '21:30',
    status: 'upcoming',
    isHotMatch: true,
    channel: 'beIN Sports 2 HD Premium',
    commentator: 'حسن العيدروس',
    stadium: 'استاد الإمارات - لندن',
    homeTeam: TEAMS.arsenal,
    awayTeam: TEAMS.chelsea,
    servers: [
      { id: 'srv-ars-1', name: 'سيرفر الديربي FHD 1080p', quality: '1080p', bitrate: '8000 kbps', status: 'online', commentator: 'حسن العيدروس', type: 'fhd' },
      { id: 'srv-ars-2', name: 'سيرفر الجوال والسرعات العادية', quality: '720p', bitrate: '3600 kbps', status: 'online', commentator: 'حسن العيدروس', type: 'hd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: {
      formation: '4-3-3',
      manager: 'ميكيل أرتيتا',
      startingXI: [
        { number: 22, name: 'رايا', position: 'GK' },
        { number: 4, name: 'وايت', position: 'DF' },
        { number: 2, name: 'ساليبا', position: 'DF' },
        { number: 6, name: 'غابرييل', position: 'DF' },
        { number: 12, name: 'تيمبر', position: 'DF' },
        { number: 5, name: 'بارتي', position: 'MF' },
        { number: 41, name: 'ديكلان رايس', position: 'MF' },
        { number: 8, name: 'أوديغارد', position: 'MF' },
        { number: 7, name: 'بوكايو ساكا', position: 'FW' },
        { number: 29, name: 'هافيرتز', position: 'FW' },
        { number: 11, name: 'مارتينيلي', position: 'FW' }
      ],
      substitutes: []
    },
    awayLineup: {
      formation: '4-2-3-1',
      manager: 'إنزو ماريسكا',
      startingXI: [
        { number: 1, name: 'سانشيز', position: 'GK' },
        { number: 27, name: 'غوستو', position: 'DF' },
        { number: 29, name: 'فوفانا', position: 'DF' },
        { number: 6, name: 'كولويل', position: 'DF' },
        { number: 3, name: 'كوكوريلا', position: 'DF' },
        { number: 25, name: 'كايسيدو', position: 'MF' },
        { number: 45, name: 'لافيا', position: 'MF' },
        { number: 11, name: 'مادويكي', position: 'MF' },
        { number: 20, name: 'كول بالمر', position: 'MF' },
        { number: 7, name: 'نيتو', position: 'MF' },
        { number: 15, name: 'جاكسون', position: 'FW' }
      ],
      substitutes: []
    }
  },
  {
    id: 'match-today-7',
    leagueId: 'seriea',
    leagueName: 'الدوري الإيطالي',
    leagueRound: 'الجولة 29 - ديربي الغضب ديلّا مادونينا',
    leagueLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '21:45',
    status: 'upcoming',
    isHotMatch: true,
    channel: 'Starzplay / أبوظبي الرياضية بريميوم',
    commentator: 'عامر عبد الله',
    stadium: 'استاد سان سيرو (جوزيبي مياتزا) - ميلانو',
    homeTeam: TEAMS.inter,
    awayTeam: TEAMS.milan,
    servers: [
      { id: 'srv-ita-1', name: 'سيرفر قمة إيطاليا FHD', quality: '1080p', bitrate: '7500 kbps', status: 'online', commentator: 'عامر عبد الله', type: 'fhd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: {
      formation: '3-5-2',
      manager: 'سيموني إنزاغي',
      startingXI: [
        { number: 1, name: 'سومر', position: 'GK' },
        { number: 28, name: 'بافارد', position: 'DF' },
        { number: 15, name: 'أتشيربي', position: 'DF' },
        { number: 95, name: 'باستوني', position: 'DF' },
        { number: 2, name: 'دومفريس', position: 'MF' },
        { number: 23, name: 'باريلا', position: 'MF' },
        { number: 20, name: 'تشالهانوغلو', position: 'MF' },
        { number: 22, name: 'مخيتاريان', position: 'MF' },
        { number: 32, name: 'ديماركو', position: 'MF' },
        { number: 9, name: 'تورام', position: 'FW' },
        { number: 10, name: 'لاوتارو مارتينيز', position: 'FW' }
      ],
      substitutes: []
    },
    awayLineup: {
      formation: '4-2-3-1',
      manager: 'باولو فونسيكا',
      startingXI: [
        { number: 16, name: 'ماينان', position: 'GK' },
        { number: 22, name: 'إيمرسون', position: 'DF' },
        { number: 23, name: 'توموري', position: 'DF' },
        { number: 31, name: 'بافلوفيتش', position: 'DF' },
        { number: 19, name: 'ثيو هيرنانديز', position: 'DF' },
        { number: 14, name: 'رييندرز', position: 'MF' },
        { number: 29, name: 'فوفانا', position: 'MF' },
        { number: 11, name: 'بوليسيتش', position: 'MF' },
        { number: 7, name: 'موراتا', position: 'MF' },
        { number: 10, name: 'رافائيل لياو', position: 'FW' },
        { number: 90, name: 'أبراهام', position: 'FW' }
      ],
      substitutes: []
    }
  },
  {
    id: 'match-today-8',
    leagueId: 'spl',
    leagueName: 'دوري روشن السعودي',
    leagueRound: 'الجولة 26 - ديربي البحر الأحمر',
    leagueLogo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '21:00',
    status: 'upcoming',
    isHotMatch: true,
    channel: 'SSC 5 HD',
    commentator: 'عبد الله الغامدي',
    stadium: 'مدينة الملك عبد الله الرياضية (الجوهرة المشعة) - جدة',
    homeTeam: TEAMS.alIttihad,
    awayTeam: TEAMS.alAhliSaudi,
    servers: [
      { id: 'srv-jed-1', name: 'سيرفر ديربي جدة FHD', quality: '1080p', bitrate: '7200 kbps', status: 'online', commentator: 'عبد الله الغامدي', type: 'fhd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: {
      formation: '4-2-3-1',
      manager: 'لوران بلان',
      startingXI: [
        { number: 1, name: 'رايكوفيتش', position: 'GK' },
        { number: 13, name: 'الشنقيطي', position: 'DF' },
        { number: 6, name: 'الموسى', position: 'DF' },
        { number: 2, name: 'دانيلو بيريرا', position: 'DF' },
        { number: 15, name: 'كادش', position: 'DF' },
        { number: 7, name: 'كانتي', position: 'MF' },
        { number: 8, name: 'فابينيو', position: 'MF' },
        { number: 19, name: 'ديابي', position: 'MF' },
        { number: 10, name: 'حسام عوار', position: 'MF' },
        { number: 34, name: 'بيرغوين', position: 'MF' },
        { number: 9, name: 'كريم بنزيما', position: 'FW' }
      ],
      substitutes: []
    },
    awayLineup: {
      formation: '4-2-3-1',
      manager: 'ماتياس يايسله',
      startingXI: [
        { number: 16, name: 'ميندي', position: 'GK' },
        { number: 27, name: 'مجرشي', position: 'DF' },
        { number: 3, name: 'إيبانيز', position: 'DF' },
        { number: 28, name: 'ديميرال', position: 'DF' },
        { number: 15, name: 'العمار', position: 'DF' },
        { number: 79, name: 'كيسيه', position: 'MF' },
        { number: 30, name: 'الجهني', position: 'MF' },
        { number: 7, name: 'رياض محرز', position: 'MF' },
        { number: 10, name: 'فيرمينو', position: 'MF' },
        { number: 24, name: 'فيغا', position: 'MF' },
        { number: 99, name: 'توني', position: 'FW' }
      ],
      substitutes: []
    }
  },
  {
    id: 'match-today-9',
    leagueId: 'ucl',
    leagueName: 'دوري أبطال أوروبا',
    leagueRound: 'نصف النهائي - مباراة الذهاب',
    leagueLogo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '22:00',
    status: 'upcoming',
    isHotMatch: true,
    channel: 'beIN Sports 2 HD Premium',
    commentator: 'يوسف سيف',
    stadium: 'أليانز أرينا - ميونخ',
    homeTeam: TEAMS.bayern,
    awayTeam: TEAMS.dortmund,
    servers: [
      { id: 'srv-bay-1', name: 'سيرفر دير كلاسيكر الألماني FHD', quality: '1080p', bitrate: '8000 kbps', status: 'online', commentator: 'يوسف سيف', type: 'fhd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: {
      formation: '4-2-3-1',
      manager: 'فينسنت كومباني',
      startingXI: [
        { number: 1, name: 'مانويل نوير', position: 'GK' },
        { number: 22, name: 'غيريرو', position: 'DF' },
        { number: 2, name: 'أوباميكانو', position: 'DF' },
        { number: 3, name: 'كيم مين جاي', position: 'DF' },
        { number: 19, name: 'ألفونسو ديفيز', position: 'DF' },
        { number: 6, name: 'كيميتش', position: 'MF' },
        { number: 16, name: 'بافلوفيتش', position: 'MF' },
        { number: 17, name: 'أوليسي', position: 'MF' },
        { number: 42, name: 'جمال موسيالا', position: 'MF' },
        { number: 7, name: 'غنابري', position: 'MF' },
        { number: 9, name: 'هاري كين', position: 'FW' }
      ],
      substitutes: []
    },
    awayLineup: {
      formation: '4-2-3-1',
      manager: 'نوري شاهين',
      startingXI: [
        { number: 1, name: 'كوبيل', position: 'GK' },
        { number: 26, name: 'رايرسون', position: 'DF' },
        { number: 3, name: 'أنطون', position: 'DF' },
        { number: 4, name: 'شلوتربيك', position: 'DF' },
        { number: 5, name: 'بينسبعيني', position: 'DF' },
        { number: 23, name: 'تشان', position: 'MF' },
        { number: 13, name: 'غروس', position: 'MF' },
        { number: 14, name: 'باير', position: 'MF' },
        { number: 10, name: 'براندت', position: 'MF' },
        { number: 43, name: 'غيتنز', position: 'MF' },
        { number: 9, name: 'غيراسي', position: 'FW' }
      ],
      substitutes: []
    }
  },
  {
    id: 'match-today-10',
    leagueId: 'laliga',
    leagueName: 'الدوري الإسباني',
    leagueRound: 'الجولة 30',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '18:15',
    status: 'finished',
    homeScore: 2,
    awayScore: 0,
    channel: 'beIN Sports 3 HD',
    commentator: 'أحمد البلوشي',
    stadium: 'ملعب رامون سانشيز بيزخوان - إشبيلية',
    homeTeam: TEAMS.sevilla,
    awayTeam: TEAMS.leverkusen,
    servers: [
      { id: 'srv-sev-1', name: 'أهداف وملخص المباراة', quality: '1080p', bitrate: '6000 kbps', status: 'online', commentator: 'أحمد البلوشي', type: 'fhd' }
    ],
    events: [
      { id: 'ev-sev-1', minute: 31, type: 'goal', teamId: 'sevilla', playerName: 'إيزاك روميرو', detail: 'تسديدة يسارية مميزة' },
      { id: 'ev-sev-2', minute: 74, type: 'goal', teamId: 'sevilla', playerName: 'لوكيليا', detail: 'هجمة مرتدة خاطفة' }
    ],
    stats: {
      possession: [46, 54],
      shots: [11, 13],
      shotsOnTarget: [5, 4],
      corners: [4, 6],
      fouls: [14, 10],
      yellowCards: [3, 2],
      redCards: [0, 0],
      offsides: [1, 2],
      saves: [4, 3],
      passes: [380, 470],
      passAccuracy: [79, 84]
    },
    homeLineup: { formation: '4-3-3', manager: 'غارسيا بيمينتا', startingXI: [], substitutes: [] },
    awayLineup: { formation: '3-4-2-1', manager: 'تشابي ألونسو', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-today-11',
    leagueId: 'spl',
    leagueName: 'دوري روشن السعودي',
    leagueRound: 'الجولة 26',
    leagueLogo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=64&auto=format&fit=crop&q=60',
    date: 'today',
    time: '18:50',
    status: 'finished',
    homeScore: 1,
    awayScore: 2,
    channel: 'SSC EXTRA 1 HD',
    commentator: 'راشد الدوسري',
    stadium: 'ملعب نادي الشباب - الرياض',
    homeTeam: TEAMS.alShabab,
    awayTeam: TEAMS.alEttifaq,
    servers: [
      { id: 'srv-shb-1', name: 'ملخص المباراة الكامل', quality: '720p', bitrate: '3500 kbps', status: 'online', commentator: 'راشد الدوسري', type: 'hd' }
    ],
    events: [
      { id: 'ev-shb-1', minute: 21, type: 'goal', teamId: 'al-ettifaq', playerName: 'موسى ديمبيلي', detail: 'ركلة جزاء متقنة' },
      { id: 'ev-shb-2', minute: 54, type: 'goal', teamId: 'al-shabab', playerName: 'يانيك كاراسكو', detail: 'تسديدة خرافية من خارج المنطقة' },
      { id: 'ev-shb-3', minute: 88, type: 'goal', teamId: 'al-ettifaq', playerName: 'فينالدوم', detail: 'لمسة ذكية داخل منطقة الجزاء' }
    ],
    stats: {
      possession: [51, 49],
      shots: [13, 11],
      shotsOnTarget: [5, 6],
      corners: [5, 4],
      fouls: [12, 13],
      yellowCards: [2, 3],
      redCards: [0, 0],
      offsides: [2, 1],
      saves: [4, 4],
      passes: [410, 395],
      passAccuracy: [81, 80]
    },
    homeLineup: { formation: '4-3-3', manager: 'فيتور بيريرا', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'ستيفن جيرارد', startingXI: [], substitutes: [] }
  },

  // ==========================================
  // 2. مباريات الأمس (YESTERDAY) - 8 مباريات
  // ==========================================
  {
    id: 'match-yest-1',
    leagueId: 'ucl',
    leagueName: 'دوري أبطال أوروبا',
    leagueRound: 'ربع النهائي - إياب',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=64&auto=format&fit=crop&q=60',
    date: 'yesterday',
    time: '22:00',
    status: 'finished',
    homeScore: 3,
    awayScore: 2,
    isHotMatch: true,
    channel: 'beIN Sports 1 HD Premium',
    commentator: 'عصام الشوالي',
    stadium: 'ملعب حديقة الأمراء - باريس',
    homeTeam: TEAMS.psg,
    awayTeam: TEAMS.barcelona,
    servers: [
      { id: 'srv-y1', name: 'ملخص وأهداف المباراة الخماسية FHD', quality: '1080p', bitrate: '8000 kbps', status: 'online', commentator: 'عصام الشوالي', type: 'fhd' }
    ],
    events: [
      { id: 'ey1', minute: 12, type: 'goal', teamId: 'barcelona', playerName: 'رافينيا', detail: 'تسديدة قوية بالقدم اليسرى' },
      { id: 'ey2', minute: 48, type: 'goal', teamId: 'psg', playerName: 'عثمان ديمبيلي', detail: 'تسديدة صاروخية في سقف المرمى' },
      { id: 'ey3', minute: 51, type: 'goal', teamId: 'psg', playerName: 'فيتينيا', detail: 'تمريرة سحرية وإنهاء متقن' },
      { id: 'ey4', minute: 62, type: 'goal', teamId: 'barcelona', playerName: 'بيدري', detail: 'لمسة ساقطة رائعة' },
      { id: 'ey5', minute: 77, type: 'goal', teamId: 'psg', playerName: 'باركولا', detail: 'متابعة سريعة لعرضية' }
    ],
    stats: {
      possession: [57, 43],
      shots: [18, 14],
      shotsOnTarget: [8, 6],
      corners: [8, 5],
      fouls: [12, 14],
      yellowCards: [3, 4],
      redCards: [0, 1],
      offsides: [2, 3],
      saves: [4, 5],
      passes: [540, 410],
      passAccuracy: [88, 83]
    },
    homeLineup: { formation: '4-3-3', manager: 'لويس إنريكي', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'هانز فليك', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-yest-2',
    leagueId: 'premier',
    leagueName: 'الدوري الإنجليزي الممتاز',
    leagueRound: 'الجولة 30',
    leagueLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=64&auto=format&fit=crop&q=60',
    date: 'yesterday',
    time: '21:00',
    status: 'finished',
    homeScore: 2,
    awayScore: 2,
    isHotMatch: true,
    channel: 'beIN Sports 1 HD',
    commentator: 'خليل البلوشي',
    stadium: 'ملعب الاتحاد - مانشستر',
    homeTeam: TEAMS.manCity,
    awayTeam: TEAMS.tottenham,
    servers: [
      { id: 'srv-y2', name: 'ملخص قمة السيتي وتوتنهام HD', quality: '720p', bitrate: '4500 kbps', status: 'online', commentator: 'خليل البلوشي', type: 'hd' }
    ],
    events: [
      { id: 'ey2-1', minute: 22, type: 'goal', teamId: 'man-city', playerName: 'إيرلينغ هالاند', detail: 'رأسية بعد عرضية دي بروين' },
      { id: 'ey2-2', minute: 39, type: 'goal', teamId: 'tottenham', playerName: 'سون هيونغ مين', detail: 'انفراد سريع وتسديدة مقوسة' },
      { id: 'ey2-3', minute: 67, type: 'goal', teamId: 'man-city', playerName: 'فيل فودين', detail: 'تسديدة زاحفة' },
      { id: 'ey2-4', minute: 86, type: 'goal', teamId: 'tottenham', playerName: 'ماديسون', detail: 'تسديدة جميلة من حافة منطقة الجزاء' }
    ],
    stats: {
      possession: [65, 35],
      shots: [21, 9],
      shotsOnTarget: [9, 5],
      corners: [11, 3],
      fouls: [8, 13],
      yellowCards: [1, 3],
      redCards: [0, 0],
      offsides: [2, 1],
      saves: [3, 7],
      passes: [610, 310],
      passAccuracy: [91, 79]
    },
    homeLineup: { formation: '4-3-3', manager: 'بيب غوارديولا', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-2-3-1', manager: 'أنجي بوستيكوغلو', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-yest-3',
    leagueId: 'spl',
    leagueName: 'دوري روشن السعودي',
    leagueRound: 'الجولة 25',
    leagueLogo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=64&auto=format&fit=crop&q=60',
    date: 'yesterday',
    time: '21:00',
    status: 'finished',
    homeScore: 3,
    awayScore: 0,
    channel: 'SSC 1 HD',
    commentator: 'فارس عوض',
    stadium: 'مدينة الأمير عبد الله الفيصل الرياضية - جدة',
    homeTeam: TEAMS.alAhliSaudi,
    awayTeam: TEAMS.alTaawoun,
    servers: [
      { id: 'srv-y3', name: 'أهداف فوز الأهلي بالثلاثية', quality: '1080p', bitrate: '7000 kbps', status: 'online', commentator: 'فارس عوض', type: 'fhd' }
    ],
    events: [
      { id: 'ey3-1', minute: 19, type: 'goal', teamId: 'al-ahli-saudi', playerName: 'رياض محرز', detail: 'ركلة حرة سكنت المقص الأيمن' },
      { id: 'ey3-2', minute: 44, type: 'goal', teamId: 'al-ahli-saudi', playerName: 'إيفان توني', detail: 'إنهاء مهاجم هداف' },
      { id: 'ey3-3', minute: 73, type: 'goal', teamId: 'al-ahli-saudi', playerName: 'فرانك كيسيه', detail: 'تسديدة قوية من حدود المنطقة' }
    ],
    stats: {
      possession: [58, 42],
      shots: [15, 8],
      shotsOnTarget: [7, 2],
      corners: [6, 4],
      fouls: [10, 12],
      yellowCards: [1, 2],
      redCards: [0, 0],
      offsides: [2, 1],
      saves: [2, 4],
      passes: [505, 360],
      passAccuracy: [86, 80]
    },
    homeLineup: { formation: '4-2-3-1', manager: 'ماتياس يايسله', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'رودولفو أروابارينا', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-yest-4',
    leagueId: 'caf',
    leagueName: 'دوري أبطال أفريقيا',
    leagueRound: 'نصف النهائي - إياب',
    leagueLogo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=64&auto=format&fit=crop&q=60',
    date: 'yesterday',
    time: '20:00',
    status: 'finished',
    homeScore: 1,
    awayScore: 0,
    channel: 'beIN Sports 6 HD',
    commentator: 'جواد بدة',
    stadium: 'مركب محمد الخامس - الدار البيضاء',
    homeTeam: TEAMS.wydad,
    awayTeam: TEAMS.sundowns,
    servers: [
      { id: 'srv-y4', name: 'ملخص المباراة وتأهل الوداد', quality: '720p', bitrate: '3800 kbps', status: 'online', commentator: 'جواد بدة', type: 'hd' }
    ],
    events: [
      { id: 'ey4-1', minute: 83, type: 'goal', teamId: 'wydad', playerName: 'يحيى جبران', detail: 'ركلة جزاء حاسمة في الدقائق الأخيرة' }
    ],
    stats: {
      possession: [48, 52],
      shots: [9, 11],
      shotsOnTarget: [4, 3],
      corners: [5, 6],
      fouls: [16, 13],
      yellowCards: [4, 3],
      redCards: [0, 0],
      offsides: [1, 2],
      saves: [3, 3],
      passes: [370, 400],
      passAccuracy: [78, 81]
    },
    homeLineup: { formation: '4-2-3-1', manager: 'رولاني موكوينا', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'مانكوبا منغكيتي', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-yest-5',
    leagueId: 'seriea',
    leagueName: 'الدوري الإيطالي',
    leagueRound: 'الجولة 28 - قمة تورينو',
    leagueLogo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=64&auto=format&fit=crop&q=60',
    date: 'yesterday',
    time: '21:45',
    status: 'finished',
    homeScore: 1,
    awayScore: 0,
    channel: 'Starzplay / أبوظبي الرياضية بريميوم',
    commentator: 'بلال علام',
    stadium: 'أليانز ستاديوم - تورينو',
    homeTeam: TEAMS.juventus,
    awayTeam: TEAMS.roma,
    servers: [
      { id: 'srv-y5', name: 'ملخص المباراة وهدف الفوز لليوفي', quality: '1080p', bitrate: '6500 kbps', status: 'online', commentator: 'بلال علام', type: 'fhd' }
    ],
    events: [
      { id: 'ey5-1', minute: 47, type: 'goal', teamId: 'juventus', playerName: 'دوشان فلاهوفيتش', detail: 'تسديدة قوية بعد ارتداد الكرة' }
    ],
    stats: {
      possession: [51, 49],
      shots: [13, 10],
      shotsOnTarget: [4, 3],
      corners: [6, 4],
      fouls: [13, 15],
      yellowCards: [2, 3],
      redCards: [0, 0],
      offsides: [1, 2],
      saves: [3, 3],
      passes: [450, 430],
      passAccuracy: [85, 83]
    },
    homeLineup: { formation: '4-2-3-1', manager: 'تياغو موتا', startingXI: [], substitutes: [] },
    awayLineup: { formation: '3-4-2-1', manager: 'دانييلي دي روسي', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-yest-6',
    leagueId: 'laliga',
    leagueName: 'الدوري الإسباني',
    leagueRound: 'الجولة 29',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=64&auto=format&fit=crop&q=60',
    date: 'yesterday',
    time: '19:30',
    status: 'finished',
    homeScore: 2,
    awayScore: 1,
    channel: 'beIN Sports 3 HD',
    commentator: 'محمد بركات',
    stadium: 'ملعب سيفيتاس ميتروبوليتانو - مدريد',
    homeTeam: TEAMS.atletico,
    awayTeam: TEAMS.sevilla,
    servers: [
      { id: 'srv-y6', name: 'ملخص المباراة', quality: '720p', bitrate: '4000 kbps', status: 'online', commentator: 'محمد بركات', type: 'hd' }
    ],
    events: [
      { id: 'ey6-1', minute: 24, type: 'goal', teamId: 'atletico', playerName: 'أنطوان غريزمان', detail: 'تسديدة محكمة' },
      { id: 'ey6-2', minute: 58, type: 'goal', teamId: 'sevilla', playerName: 'أوكامبوس', detail: 'رأسية' },
      { id: 'ey6-3', minute: 81, type: 'goal', teamId: 'atletico', playerName: 'ألكسندر سورلوث', detail: 'متابعة ركنية' }
    ],
    stats: {
      possession: [53, 47],
      shots: [14, 9],
      shotsOnTarget: [6, 3],
      corners: [7, 4],
      fouls: [11, 14],
      yellowCards: [2, 3],
      redCards: [0, 0],
      offsides: [2, 1],
      saves: [2, 4],
      passes: [440, 390],
      passAccuracy: [83, 80]
    },
    homeLineup: { formation: '5-3-2', manager: 'دييغو سيميوني', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'غارسيا بيمينتا', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-yest-7',
    leagueId: 'caf',
    leagueName: 'دوري أبطال أفريقيا / الكونفدرالية',
    leagueRound: 'نصف النهائي',
    leagueLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=64&auto=format&fit=crop&q=60',
    date: 'yesterday',
    time: '19:00',
    status: 'finished',
    homeScore: 2,
    awayScore: 0,
    channel: 'beIN Sports 6 HD',
    commentator: 'حاتم بطيشة',
    stadium: 'ستاد القاهرة الدولي',
    homeTeam: TEAMS.zamalek,
    awayTeam: TEAMS.berkane,
    servers: [
      { id: 'srv-y7', name: 'ملخص انتصار الزمالك', quality: '720p', bitrate: '3500 kbps', status: 'online', commentator: 'حاتم بطيشة', type: 'hd' }
    ],
    events: [
      { id: 'ey7-1', minute: 15, type: 'goal', teamId: 'zamalek', playerName: 'أحمد سيد زيزو', detail: 'تسديدة مقوسة بالقدم اليمنى' },
      { id: 'ey7-2', minute: 68, type: 'goal', teamId: 'zamalek', playerName: 'سيف الدين الجزيري', detail: 'رأسية نموذجية' }
    ],
    stats: {
      possession: [55, 45],
      shots: [12, 7],
      shotsOnTarget: [5, 2],
      corners: [6, 3],
      fouls: [13, 16],
      yellowCards: [2, 4],
      redCards: [0, 0],
      offsides: [1, 2],
      saves: [2, 3],
      passes: [420, 350],
      passAccuracy: [84, 77]
    },
    homeLineup: { formation: '4-3-3', manager: 'جوزيه غوميز', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-2-3-1', manager: 'معين الشعباني', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-yest-8',
    leagueId: 'spl',
    leagueName: 'دوري روشن السعودي',
    leagueRound: 'الجولة 25',
    leagueLogo: 'https://images.unsplash.com/photo-1518604666864-7423958f7090?w=64&auto=format&fit=crop&q=60',
    date: 'yesterday',
    time: '17:30',
    status: 'finished',
    homeScore: 2,
    awayScore: 1,
    channel: 'SSC EXTRA 2 HD',
    commentator: 'محمد حسين',
    stadium: 'استاد الأمير محمد بن فهد - الدمام',
    homeTeam: TEAMS.alQadsiah,
    awayTeam: TEAMS.alShabab,
    servers: [
      { id: 'srv-y8', name: 'أهداف القادسية والشباب', quality: '720p', bitrate: '3200 kbps', status: 'online', commentator: 'محمد حسين', type: 'hd' }
    ],
    events: [
      { id: 'ey8-1', minute: 34, type: 'goal', teamId: 'al-qadsiah', playerName: 'بيير إيميريك أوباميانغ', detail: 'انفراد ولمسة ذكية' },
      { id: 'ey8-2', minute: 66, type: 'goal', teamId: 'al-shabab', playerName: 'عبد الرزاق حمد الله', detail: 'رأسية' },
      { id: 'ey8-3', minute: 84, type: 'goal', teamId: 'al-qadsiah', playerName: 'ناتشو فيرنانديز', detail: 'رأسية من ركلة ركنية' }
    ],
    stats: {
      possession: [52, 48],
      shots: [14, 10],
      shotsOnTarget: [6, 4],
      corners: [5, 5],
      fouls: [11, 13],
      yellowCards: [2, 2],
      redCards: [0, 0],
      offsides: [1, 2],
      saves: [3, 4],
      passes: [430, 400],
      passAccuracy: [82, 80]
    },
    homeLineup: { formation: '4-3-3', manager: 'ميتشيل', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'فيتور بيريرا', startingXI: [], substitutes: [] }
  },

  // ==========================================
  // 3. مباريات الغد (TOMORROW) - 8 مباريات
  // ==========================================
  {
    id: 'match-tom-1',
    leagueId: 'ucl',
    leagueName: 'دوري أبطال أوروبا',
    leagueRound: 'نصف النهائي - مباراة الذهاب',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=64&auto=format&fit=crop&q=60',
    date: 'tomorrow',
    time: '22:00',
    status: 'upcoming',
    isHotMatch: true,
    channel: 'beIN Sports 1 HD Premium',
    commentator: 'حفيظ دراجي',
    stadium: 'ملعب جوزيبي مياتزا (سان سيرو) - ميلانو',
    homeTeam: TEAMS.inter,
    awayTeam: TEAMS.atletico,
    servers: [
      { id: 'srv-tom-1', name: 'سيرفر القمة الأوروبية FHD 1080p', quality: '1080p 60fps', bitrate: '8500 kbps', status: 'online', commentator: 'حفيظ دراجي', type: 'fhd' },
      { id: 'srv-tom-2', name: 'سيرفر الجوال والنت الضعيف 480p', quality: '480p', bitrate: '1600 kbps', status: 'online', commentator: 'حفيظ دراجي', type: 'sd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: { formation: '3-5-2', manager: 'سيموني إنزاغي', startingXI: [], substitutes: [] },
    awayLineup: { formation: '5-3-2', manager: 'دييغو سيميوني', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-tom-2',
    leagueId: 'spl',
    leagueName: 'دوري روشن السعودي',
    leagueRound: 'الجولة 27',
    leagueLogo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=64&auto=format&fit=crop&q=60',
    date: 'tomorrow',
    time: '21:00',
    status: 'upcoming',
    isHotMatch: true,
    channel: 'SSC 1 HD',
    commentator: 'فهد العتيبي',
    stadium: 'استاد الأول بارك - الرياض',
    homeTeam: TEAMS.alNassr,
    awayTeam: TEAMS.alIttihad,
    servers: [
      { id: 'srv-tom-3', name: 'سيرفر كلاسيكو السعودية FHD', quality: '1080p', bitrate: '8000 kbps', status: 'online', commentator: 'فهد العتيبي', type: 'fhd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: { formation: '4-2-3-1', manager: 'لويس كاسترو', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-2-3-1', manager: 'لوران بلان', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-tom-3',
    leagueId: 'premier',
    leagueName: 'الدوري الإنجليزي الممتاز',
    leagueRound: 'الجولة 32',
    leagueLogo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=64&auto=format&fit=crop&q=60',
    date: 'tomorrow',
    time: '18:30',
    status: 'upcoming',
    channel: 'beIN Sports 1 HD Premium',
    commentator: 'عامر الخوذيري',
    stadium: 'ملعب ستامفورد بريدج - لندن',
    homeTeam: TEAMS.chelsea,
    awayTeam: TEAMS.tottenham,
    servers: [
      { id: 'srv-tom-4', name: 'سيرفر ديربي غرب لندن FHD', quality: '1080p', bitrate: '7200 kbps', status: 'online', commentator: 'عامر الخوذيري', type: 'fhd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: { formation: '4-2-3-1', manager: 'إنزو ماريسكا', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'أنجي بوستيكوغلو', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-tom-4',
    leagueId: 'laliga',
    leagueName: 'الدوري الإسباني',
    leagueRound: 'الجولة 30',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=64&auto=format&fit=crop&q=60',
    date: 'tomorrow',
    time: '20:00',
    status: 'upcoming',
    channel: 'beIN Sports 3 HD',
    commentator: 'أحمد البلوشي',
    stadium: 'ملعب لا سيراميكا - فياريال',
    homeTeam: TEAMS.realMadrid,
    awayTeam: TEAMS.sevilla,
    servers: [
      { id: 'srv-tom-5', name: 'سيرفر البث المباشر FHD', quality: '1080p', bitrate: '7500 kbps', status: 'online', commentator: 'أحمد البلوشي', type: 'fhd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: { formation: '4-3-3', manager: 'كارلو أنشيلوتي', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'غارسيا بيمينتا', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-tom-5',
    leagueId: 'seriea',
    leagueName: 'الدوري الإيطالي',
    leagueRound: 'الجولة 29',
    leagueLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=64&auto=format&fit=crop&q=60',
    date: 'tomorrow',
    time: '19:00',
    status: 'upcoming',
    channel: 'Starzplay / أبوظبي الرياضية بريميوم',
    commentator: 'محمد الشامسي',
    stadium: 'استاد دييغو أرماندو مارادونا - نابولي',
    homeTeam: TEAMS.roma,
    awayTeam: TEAMS.milan,
    servers: [
      { id: 'srv-tom-6', name: 'سيرفر الدوري الإيطالي HD', quality: '720p', bitrate: '4000 kbps', status: 'online', commentator: 'محمد الشامسي', type: 'hd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: { formation: '3-4-2-1', manager: 'دانييلي دي روسي', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-2-3-1', manager: 'باولو فونسيكا', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-tom-6',
    leagueId: 'spl',
    leagueName: 'دوري روشن السعودي',
    leagueRound: 'الجولة 27',
    leagueLogo: 'https://images.unsplash.com/photo-1518604666864-7423958f7090?w=64&auto=format&fit=crop&q=60',
    date: 'tomorrow',
    time: '18:15',
    status: 'upcoming',
    channel: 'SSC 2 HD',
    commentator: 'خالد المديفر',
    stadium: 'مدينة الأمير سعود بن جلوي الرياضية - الخبر',
    homeTeam: TEAMS.alQadsiah,
    awayTeam: TEAMS.alTaawoun,
    servers: [
      { id: 'srv-tom-7', name: 'سيرفر البث المباشر HD', quality: '720p', bitrate: '3600 kbps', status: 'online', commentator: 'خالد المديفر', type: 'hd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: { formation: '4-3-3', manager: 'ميتشيل', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'رودولفو أروابارينا', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-tom-7',
    leagueId: 'caf',
    leagueName: 'دوري أبطال أفريقيا / كأس الكونفدرالية',
    leagueRound: 'إياب نصف النهائي',
    leagueLogo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=64&auto=format&fit=crop&q=60',
    date: 'tomorrow',
    time: '20:00',
    status: 'upcoming',
    channel: 'beIN Sports 6 HD',
    commentator: 'عصام الشوالي',
    stadium: 'الملعب البلدي ببركان - المغرب',
    homeTeam: TEAMS.berkane,
    awayTeam: TEAMS.zamalek,
    servers: [
      { id: 'srv-tom-8', name: 'سيرفر البث المباشر الأفريقي', quality: '1080p', bitrate: '6800 kbps', status: 'online', commentator: 'عصام الشوالي', type: 'fhd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: { formation: '4-2-3-1', manager: 'معين الشعباني', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-3-3', manager: 'جوزيه غوميز', startingXI: [], substitutes: [] }
  },
  {
    id: 'match-tom-8',
    leagueId: 'ucl',
    leagueName: 'الدوري الألماني - البوندسليغا',
    leagueRound: 'الجولة 29',
    leagueLogo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=64&auto=format&fit=crop&q=60',
    date: 'tomorrow',
    time: '16:30',
    status: 'upcoming',
    channel: 'beIN Sports 5 HD',
    commentator: 'أحمد فؤاد',
    stadium: 'باي أرينا - ليفركوزن',
    homeTeam: TEAMS.leverkusen,
    awayTeam: TEAMS.dortmund,
    servers: [
      { id: 'srv-tom-9', name: 'سيرفر البوندسليغا HD', quality: '720p', bitrate: '4000 kbps', status: 'online', commentator: 'أحمد فؤاد', type: 'hd' }
    ],
    events: [],
    stats: {
      possession: [50, 50],
      shots: [0, 0],
      shotsOnTarget: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      saves: [0, 0],
      passes: [0, 0],
      passAccuracy: [0, 0]
    },
    homeLineup: { formation: '3-4-2-1', manager: 'تشابي ألونسو', startingXI: [], substitutes: [] },
    awayLineup: { formation: '4-2-3-1', manager: 'نوري شاهين', startingXI: [], substitutes: [] }
  }
];
