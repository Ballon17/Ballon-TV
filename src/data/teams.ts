import { Team } from '../types';

export const TEAMS: Record<string, Team> = {
  // Champions League / Europe
  realMadrid: {
    id: 'real-madrid',
    name: 'ريال مدريد',
    nameEn: 'Real Madrid',
    shortName: 'RMA',
    country: 'إسبانيا',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&auto=format&fit=crop&q=80'
  },
  manCity: {
    id: 'man-city',
    name: 'مانشستر سيتي',
    nameEn: 'Manchester City',
    shortName: 'MCI',
    country: 'إنجلترا',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80'
  },
  barcelona: {
    id: 'barcelona',
    name: 'برشلونة',
    nameEn: 'Barcelona',
    shortName: 'FCB',
    country: 'إسبانيا',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80'
  },
  liverpool: {
    id: 'liverpool',
    name: 'ليفربول',
    nameEn: 'Liverpool',
    shortName: 'LIV',
    country: 'إنجلترا',
    logo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=100&auto=format&fit=crop&q=80'
  },
  manUnited: {
    id: 'man-united',
    name: 'مانشستر يونايتد',
    nameEn: 'Manchester United',
    shortName: 'MUN',
    country: 'إنجلترا',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&auto=format&fit=crop&q=80'
  },
  arsenal: {
    id: 'arsenal',
    name: 'أرسنال',
    nameEn: 'Arsenal',
    shortName: 'ARS',
    country: 'إنجلترا',
    logo: 'https://images.unsplash.com/photo-1518604666864-7423958f7090?w=100&auto=format&fit=crop&q=80'
  },
  chelsea: {
    id: 'chelsea',
    name: 'تشيلسي',
    nameEn: 'Chelsea',
    shortName: 'CHE',
    country: 'إنجلترا',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80'
  },
  bayern: {
    id: 'bayern',
    name: 'بايرن ميونخ',
    nameEn: 'Bayern Munich',
    shortName: 'BAY',
    country: 'ألمانيا',
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=100&auto=format&fit=crop&q=80'
  },
  dortmund: {
    id: 'dortmund',
    name: 'بوروسيا دورتموند',
    nameEn: 'Borussia Dortmund',
    shortName: 'BVB',
    country: 'ألمانيا',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80'
  },
  psg: {
    id: 'psg',
    name: 'باريس سان جيرمان',
    nameEn: 'Paris Saint-Germain',
    shortName: 'PSG',
    country: 'فرنسا',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&auto=format&fit=crop&q=80'
  },
  atletico: {
    id: 'atletico',
    name: 'أتلتيكو مدريد',
    nameEn: 'Atletico Madrid',
    shortName: 'ATM',
    country: 'إسبانيا',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80'
  },
  inter: {
    id: 'inter',
    name: 'إنتر ميلان',
    nameEn: 'Inter Milan',
    shortName: 'INT',
    country: 'إيطاليا',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&auto=format&fit=crop&q=80'
  },
  milan: {
    id: 'milan',
    name: 'إيه سي ميلان',
    nameEn: 'AC Milan',
    shortName: 'ACM',
    country: 'إيطاليا',
    logo: 'https://images.unsplash.com/photo-1518604666864-7423958f7090?w=100&auto=format&fit=crop&q=80'
  },
  juventus: {
    id: 'juventus',
    name: 'يوفنتوس',
    nameEn: 'Juventus',
    shortName: 'JUV',
    country: 'إيطاليا',
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=100&auto=format&fit=crop&q=80'
  },
  roma: {
    id: 'roma',
    name: 'روما',
    nameEn: 'AS Roma',
    shortName: 'ROM',
    country: 'إيطاليا',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&auto=format&fit=crop&q=80'
  },
  tottenham: {
    id: 'tottenham',
    name: 'توتنهام هوتسبير',
    nameEn: 'Tottenham Hotspur',
    shortName: 'TOT',
    country: 'إنجلترا',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80'
  },
  sevilla: {
    id: 'sevilla',
    name: 'إشبيلية',
    nameEn: 'Sevilla FC',
    shortName: 'SEV',
    country: 'إسبانيا',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80'
  },
  leverkusen: {
    id: 'leverkusen',
    name: 'باير ليفركوزن',
    nameEn: 'Bayer Leverkusen',
    shortName: 'B04',
    country: 'ألمانيا',
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=100&auto=format&fit=crop&q=80'
  },

  // Saudi Pro League (دوري روشن السعودي)
  alHilal: {
    id: 'al-hilal',
    name: 'الهلال',
    nameEn: 'Al Hilal',
    shortName: 'HIL',
    country: 'السعودية',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80'
  },
  alNassr: {
    id: 'al-nassr',
    name: 'النصر',
    nameEn: 'Al Nassr',
    shortName: 'NAS',
    country: 'السعودية',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80'
  },
  alIttihad: {
    id: 'al-ittihad',
    name: 'الاتحاد',
    nameEn: 'Al Ittihad',
    shortName: 'ITT',
    country: 'السعودية',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&auto=format&fit=crop&q=80'
  },
  alAhliSaudi: {
    id: 'al-ahli-saudi',
    name: 'الأهلي السعودي',
    nameEn: 'Al Ahli Saudi',
    shortName: 'AHL',
    country: 'السعودية',
    logo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=100&auto=format&fit=crop&q=80'
  },
  alShabab: {
    id: 'al-shabab',
    name: 'الشباب',
    nameEn: 'Al Shabab',
    shortName: 'SHB',
    country: 'السعودية',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&auto=format&fit=crop&q=80'
  },
  alEttifaq: {
    id: 'al-ettifaq',
    name: 'الاتفاق',
    nameEn: 'Al Ettifaq',
    shortName: 'ETF',
    country: 'السعودية',
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=100&auto=format&fit=crop&q=80'
  },
  alQadsiah: {
    id: 'al-qadsiah',
    name: 'القادسية',
    nameEn: 'Al Qadsiah',
    shortName: 'QAD',
    country: 'السعودية',
    logo: 'https://images.unsplash.com/photo-1518604666864-7423958f7090?w=100&auto=format&fit=crop&q=80'
  },
  alTaawoun: {
    id: 'al-taawoun',
    name: 'التعاون',
    nameEn: 'Al Taawoun',
    shortName: 'TAW',
    country: 'السعودية',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80'
  },

  // CAF Champions League & Arab Clubs
  alAhly: {
    id: 'al-ahly',
    name: 'الأهلي المصري',
    nameEn: 'Al Ahly SC',
    shortName: 'ASC',
    country: 'مصر',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80'
  },
  esperance: {
    id: 'esperance',
    name: 'الترجي التونسي',
    nameEn: 'Esperance Tunis',
    shortName: 'EST',
    country: 'تونس',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80'
  },
  wydad: {
    id: 'wydad',
    name: 'الوداد البيضاوي',
    nameEn: 'Wydad AC',
    shortName: 'WAC',
    country: 'المغرب',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&auto=format&fit=crop&q=80'
  },
  zamalek: {
    id: 'zamalek',
    name: 'الزمالك',
    nameEn: 'Zamalek SC',
    shortName: 'ZAM',
    country: 'مصر',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&auto=format&fit=crop&q=80'
  },
  sundowns: {
    id: 'sundowns',
    name: 'ماميلودي صنداونز',
    nameEn: 'Mamelodi Sundowns',
    shortName: 'MSD',
    country: 'جنوب أفريقيا',
    logo: 'https://images.unsplash.com/photo-1518604666864-7423958f7090?w=100&auto=format&fit=crop&q=80'
  },
  berkane: {
    id: 'berkane',
    name: 'نهضة بركان',
    nameEn: 'RS Berkane',
    shortName: 'RSB',
    country: 'المغرب',
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=100&auto=format&fit=crop&q=80'
  }
};
