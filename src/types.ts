export type MatchStatus = 'live' | 'upcoming' | 'finished';

export interface Team {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  shortName: string;
  country: string;
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'var';
  teamId: string;
  playerName: string;
  assistPlayer?: string;
  inPlayer?: string;
  outPlayer?: string;
  detail?: string;
}

export interface MatchStats {
  possession: [number, number]; // [home, away]
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  offsides: [number, number];
  saves: [number, number];
  passes: [number, number];
  passAccuracy: [number, number];
}

export interface Player {
  number: number;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  isCaptain?: boolean;
}

export interface Lineup {
  formation: string; // e.g., '4-3-3'
  manager: string;
  startingXI: Player[];
  substitutes: Player[];
}

export interface StreamServer {
  id: string;
  name: string;
  quality: string;
  bitrate: string;
  status: 'online' | 'busy' | 'backup';
  commentator: string;
  type: 'fhd' | 'hd' | 'sd' | 'audio';
  videoUrl?: string;
}

export interface Match {
  id: string;
  leagueId: string;
  leagueName: string;
  leagueRound: string;
  leagueLogo: string;
  date: string; // YYYY-MM-DD
  time: string; // 21:00
  status: MatchStatus;
  currentMinute?: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  channel: string;
  commentator: string;
  stadium: string;
  isHotMatch?: boolean;
  servers: StreamServer[];
  events: MatchEvent[];
  stats: MatchStats;
  homeLineup: Lineup;
  awayLineup: Lineup;
}

export interface LeagueStanding {
  rank: number;
  team: string;
  teamLogo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface TopScorer {
  rank: number;
  player: string;
  team: string;
  teamLogo: string;
  goals: number;
  assists: number;
  matches: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  teamSide?: 'home' | 'away' | 'neutral';
  timestamp: string;
  avatarBg?: string;
}
