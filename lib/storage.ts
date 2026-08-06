import { SRSItem } from './srs';
import { getProgressFromDB, saveProgressToDB, getProfileFromDB, saveProfileToDB, UserProgressRecord, UserProfileRecord } from './db';

export interface UserStats {
  streak: number;
  lastActiveDate: string;
  totalReviewed: number;
  totalMastered: number;
  dailyGoal: number;
  todayCount: number;
}

const LOCAL_KEY_STATS = 'lexiflow_user_stats_v2';
const LOCAL_KEY_ITEMS = 'lexiflow_srs_items_v2';

export async function getStoredStats(): Promise<UserStats> {
  if (typeof window === 'undefined') {
    return { streak: 1, lastActiveDate: new Date().toISOString().split('T')[0], totalReviewed: 0, totalMastered: 0, dailyGoal: 20, todayCount: 0 };
  }

  // First try IndexedDB
  const dbProfile = await getProfileFromDB();
  const today = new Date().toISOString().split('T')[0];

  let stats: UserStats = {
    streak: dbProfile.streak || 1,
    lastActiveDate: dbProfile.lastActiveDate || today,
    totalReviewed: dbProfile.totalReviewed || 0,
    totalMastered: dbProfile.totalMastered || 0,
    dailyGoal: dbProfile.dailyGoal || 20,
    todayCount: dbProfile.todayCount || 0
  };

  if (stats.lastActiveDate !== today) {
    const lastDate = new Date(stats.lastActiveDate);
    const currDate = new Date(today);
    const diffDays = Math.floor((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays > 1) {
      stats.streak = 0;
    }
    stats.todayCount = 0;
  }

  return stats;
}

export async function recordReview(isMastered: boolean): Promise<UserStats> {
  const stats = await getStoredStats();
  const today = new Date().toISOString().split('T')[0];

  if (stats.lastActiveDate !== today) {
    const lastDate = new Date(stats.lastActiveDate);
    const currDate = new Date(today);
    const diffDays = Math.floor((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays === 1) {
      stats.streak += 1;
    } else if (diffDays > 1) {
      stats.streak = 1;
    }
    stats.lastActiveDate = today;
    stats.todayCount = 0;
  }

  stats.totalReviewed += 1;
  stats.todayCount += 1;
  if (isMastered) stats.totalMastered += 1;

  // Persist to IndexedDB
  const profileRecord: UserProfileRecord = {
    id: 'current_user',
    ...stats
  };
  await saveProfileToDB(profileRecord);

  // Fallback LocalStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_KEY_STATS, JSON.stringify(stats));
  }

  return stats;
}

export async function getStoredItems(): Promise<Record<string, SRSItem>> {
  if (typeof window === 'undefined') return {};
  
  const dbMap = await getProgressFromDB();
  const result: Record<string, SRSItem> = {};

  Object.values(dbMap).forEach(rec => {
    result[rec.id] = {
      id: rec.id,
      word: rec.word,
      translation: '',
      example: '',
      exampleTranslation: '',
      language: rec.language,
      level: rec.level,
      repetition: rec.repetition,
      interval: rec.interval,
      easeFactor: rec.easeFactor,
      nextReview: rec.nextReview,
      lastReviewed: rec.lastReviewed,
      state: rec.state
    };
  });

  return result;
}

export async function saveStoredItem(item: SRSItem): Promise<void> {
  const rec: UserProgressRecord = {
    id: item.id,
    word: item.word,
    language: item.language,
    level: item.level,
    category: item.level,
    repetition: item.repetition,
    interval: item.interval,
    easeFactor: item.easeFactor,
    nextReview: item.nextReview,
    lastReviewed: item.lastReviewed,
    state: item.state
  };

  await saveProgressToDB(rec);

  // Fallback LocalStorage
  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem(LOCAL_KEY_ITEMS);
      const map = existing ? JSON.parse(existing) : {};
      map[item.id] = item;
      localStorage.setItem(LOCAL_KEY_ITEMS, JSON.stringify(map));
    } catch (e) {}
  }
}
