import { LeagueStanding, TopScorer } from '../types';

export interface LeagueData {
  id: string;
  name: string;
  country: string;
  season: string;
  standings: LeagueStanding[];
  topScorers: TopScorer[];
}

export const mockLeagues: LeagueData[] = [
  {
    id: 'spl',
    name: 'دوري روشن السعودي للمحترفين',
    country: 'السعودية',
    season: '2024 / 2025',
    standings: [
      { rank: 1, team: 'الهلال', teamLogo: '🔵', played: 23, won: 20, drawn: 3, lost: 0, goalsFor: 68, goalsAgainst: 18, goalDifference: 50, points: 63, form: ['W', 'W', 'W', 'W', 'W'] },
      { rank: 2, team: 'النصر', teamLogo: '🟡', played: 23, won: 18, drawn: 2, lost: 3, goalsFor: 64, goalsAgainst: 26, goalDifference: 38, points: 56, form: ['W', 'W', 'L', 'W', 'W'] },
      { rank: 3, team: 'الأهلي', teamLogo: '🟢', played: 23, won: 14, drawn: 5, lost: 4, goalsFor: 49, goalsAgainst: 25, goalDifference: 24, points: 47, form: ['W', 'D', 'W', 'W', 'D'] },
      { rank: 4, team: 'الاتحاد', teamLogo: '⚫', played: 23, won: 13, drawn: 4, lost: 6, goalsFor: 45, goalsAgainst: 31, goalDifference: 14, points: 43, form: ['W', 'W', 'W', 'L', 'W'] },
      { rank: 5, team: 'التعاون', teamLogo: '🟡', played: 23, won: 11, drawn: 6, lost: 6, goalsFor: 38, goalsAgainst: 28, goalDifference: 10, points: 39, form: ['D', 'W', 'L', 'D', 'W'] },
      { rank: 6, team: 'الاتفاق', teamLogo: '🟢', played: 23, won: 9, drawn: 7, lost: 7, goalsFor: 31, goalsAgainst: 29, goalDifference: 2, points: 34, form: ['D', 'D', 'W', 'L', 'W'] },
    ],
    topScorers: [
      { rank: 1, player: 'كريستيانو رونالدو', team: 'النصر', teamLogo: '🟡', goals: 28, assists: 11, matches: 23 },
      { rank: 2, player: 'ألكسندر ميتروفيتش', team: 'الهلال', teamLogo: '🔵', goals: 24, assists: 6, matches: 22 },
      { rank: 3, player: 'عبد الرزاق حمد الله', team: 'الشباب', teamLogo: '⚪', goals: 17, assists: 4, matches: 21 },
      { rank: 4, player: 'مالكوم أوليفيرا', team: 'الهلال', teamLogo: '🔵', goals: 14, assists: 8, matches: 23 },
      { rank: 5, player: 'رياض محرز', team: 'الأهلي', teamLogo: '🟢', goals: 12, assists: 13, matches: 22 }
    ]
  },
  {
    id: 'premier',
    name: 'الدوري الإنجليزي الممتاز (Premier League)',
    country: 'إنجلترا',
    season: '2024 / 2025',
    standings: [
      { rank: 1, team: 'ليفربول', teamLogo: '🔴', played: 30, won: 22, drawn: 6, lost: 2, goalsFor: 70, goalsAgainst: 26, goalDifference: 44, points: 72, form: ['W', 'W', 'W', 'D', 'W'] },
      { rank: 2, team: 'مانشستر سيتي', teamLogo: '🔵', played: 30, won: 21, drawn: 7, lost: 2, goalsFor: 71, goalsAgainst: 29, goalDifference: 42, points: 70, form: ['W', 'W', 'D', 'W', 'W'] },
      { rank: 3, team: 'أرسنال', teamLogo: '🔴', played: 30, won: 21, drawn: 5, lost: 4, goalsFor: 69, goalsAgainst: 24, goalDifference: 45, points: 68, form: ['W', 'W', 'W', 'W', 'D'] },
      { rank: 4, team: 'تشيلسي', teamLogo: '🔵', played: 30, won: 16, drawn: 6, lost: 8, goalsFor: 58, goalsAgainst: 39, goalDifference: 19, points: 54, form: ['W', 'L', 'W', 'W', 'D'] },
      { rank: 5, team: 'أستون فيلا', teamLogo: '🟣', played: 30, won: 15, drawn: 7, lost: 8, goalsFor: 52, goalsAgainst: 42, goalDifference: 10, points: 52, form: ['L', 'W', 'D', 'W', 'L'] },
      { rank: 6, team: 'توتنهام', teamLogo: '⚪', played: 30, won: 14, drawn: 5, lost: 11, goalsFor: 56, goalsAgainst: 45, goalDifference: 11, points: 47, form: ['W', 'L', 'L', 'W', 'W'] }
    ],
    topScorers: [
      { rank: 1, player: 'إيرلينغ هالاند', team: 'مانشستر سيتي', teamLogo: '🔵', goals: 26, assists: 4, matches: 28 },
      { rank: 2, player: 'محمد صلاح', team: 'ليفربول', teamLogo: '🔴', goals: 22, assists: 14, matches: 29 },
      { rank: 3, player: 'كول بالمر', team: 'تشيلسي', teamLogo: '🔵', goals: 18, assists: 9, matches: 28 },
      { rank: 4, player: 'ألكسندر إيزاك', team: 'نيوكاسل', teamLogo: '⚪', goals: 17, assists: 3, matches: 25 },
      { rank: 5, player: 'بوكايو ساكا', team: 'أرسنال', teamLogo: '🔴', goals: 15, assists: 11, matches: 27 }
    ]
  },
  {
    id: 'laliga',
    name: 'الدوري الإسباني (La Liga)',
    country: 'إسبانيا',
    season: '2024 / 2025',
    standings: [
      { rank: 1, team: 'برشلونة', teamLogo: '🔵🔴', played: 28, won: 22, drawn: 2, lost: 4, goalsFor: 77, goalsAgainst: 28, goalDifference: 49, points: 68, form: ['W', 'W', 'W', 'W', 'W'] },
      { rank: 2, team: 'ريال مدريد', teamLogo: '⚪', played: 28, won: 20, drawn: 6, lost: 2, goalsFor: 62, goalsAgainst: 22, goalDifference: 40, points: 66, form: ['W', 'D', 'W', 'W', 'W'] },
      { rank: 3, team: 'أتلتيكو مدريد', teamLogo: '🔴⚪', played: 28, won: 17, drawn: 8, lost: 3, goalsFor: 48, goalsAgainst: 20, goalDifference: 28, points: 59, form: ['W', 'W', 'D', 'W', 'L'] },
      { rank: 4, team: 'أتلتيك بيلباو', teamLogo: '🔴', played: 28, won: 14, drawn: 9, lost: 5, goalsFor: 44, goalsAgainst: 26, goalDifference: 18, points: 51, form: ['D', 'W', 'W', 'D', 'W'] },
      { rank: 5, team: 'فياريال', teamLogo: '🟡', played: 28, won: 13, drawn: 7, lost: 8, goalsFor: 46, goalsAgainst: 38, goalDifference: 8, points: 46, form: ['W', 'L', 'W', 'D', 'W'] }
    ],
    topScorers: [
      { rank: 1, player: 'روبرت ليفاندوفسكي', team: 'برشلونة', teamLogo: '🔵🔴', goals: 23, assists: 4, matches: 27 },
      { rank: 2, player: 'كيليان مبابي', team: 'ريال مدريد', teamLogo: '⚪', goals: 18, assists: 5, matches: 26 },
      { rank: 3, player: 'رافينيا دياز', team: 'برشلونة', teamLogo: '🔵🔴', goals: 16, assists: 12, matches: 27 },
      { rank: 4, player: 'فينيسيوس جونيور', team: 'ريال مدريد', teamLogo: '⚪', goals: 14, assists: 8, matches: 24 },
      { rank: 5, player: 'أنطوان غريزمان', team: 'أتلتيكو مدريد', teamLogo: '🔴⚪', goals: 12, assists: 7, matches: 26 }
    ]
  },
  {
    id: 'ucl',
    name: 'دوري أبطال أوروبا (UEFA Champions League)',
    country: 'أوروبا',
    season: '2024 / 2025',
    standings: [
      { rank: 1, team: 'ليفربول', teamLogo: '🔴', played: 8, won: 7, drawn: 0, lost: 1, goalsFor: 18, goalsAgainst: 4, goalDifference: 14, points: 21, form: ['W', 'W', 'W', 'W', 'L'] },
      { rank: 2, team: 'إنتر ميلان', teamLogo: '🔵', played: 8, won: 6, drawn: 1, lost: 1, goalsFor: 14, goalsAgainst: 2, goalDifference: 12, points: 19, form: ['W', 'W', 'D', 'W', 'W'] },
      { rank: 3, team: 'برشلونة', teamLogo: '🔵🔴', played: 8, won: 6, drawn: 1, lost: 1, goalsFor: 25, goalsAgainst: 9, goalDifference: 16, points: 19, form: ['W', 'W', 'W', 'W', 'D'] },
      { rank: 4, team: 'ريال مدريد', teamLogo: '⚪', played: 8, won: 5, drawn: 1, lost: 2, goalsFor: 19, goalsAgainst: 10, goalDifference: 9, points: 16, form: ['W', 'L', 'W', 'W', 'W'] },
      { rank: 5, team: 'بايرن ميونخ', teamLogo: '🔴', played: 8, won: 5, drawn: 0, lost: 3, goalsFor: 21, goalsAgainst: 11, goalDifference: 10, points: 15, form: ['W', 'W', 'L', 'W', 'W'] },
      { rank: 6, team: 'مانشستر سيتي', teamLogo: '🔵', played: 8, won: 4, drawn: 2, lost: 2, goalsFor: 16, goalsAgainst: 8, goalDifference: 8, points: 14, form: ['D', 'L', 'W', 'W', 'D'] }
    ],
    topScorers: [
      { rank: 1, player: 'هاري كين', team: 'بايرن ميونخ', teamLogo: '🔴', goals: 9, assists: 3, matches: 8 },
      { rank: 2, player: 'رافينيا', team: 'برشلونة', teamLogo: '🔵🔴', goals: 8, assists: 5, matches: 8 },
      { rank: 3, player: 'روبرت ليفاندوفسكي', team: 'برشلونة', teamLogo: '🔵🔴', goals: 8, assists: 1, matches: 8 },
      { rank: 4, player: 'فينيسيوس جونيور', team: 'ريال مدريد', teamLogo: '⚪', goals: 7, assists: 4, matches: 7 }
    ]
  }
];
