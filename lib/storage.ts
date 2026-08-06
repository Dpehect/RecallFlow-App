import { SRSItem } from './srs';

export interface UserStats {
  streak: number;
  lastActiveDate: string;
  totalReviewed: number;
  totalMastered: number;
  dailyGoal: number;
  todayCount: number;
}

const STORAGE_KEY_ITEMS = 'lexiflow_srs_items_v1';
const STORAGE_KEY_STATS = 'lexiflow_user_stats_v1';

export function getStoredStats(): UserStats {
  if (typeof window === 'undefined') {
    return { streak: 1, lastActiveDate: new Date().toISOString().split('T')[0], totalReviewed: 0, totalMastered: 0, dailyGoal: 20, todayCount: 0 };
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY_STATS);
    if (!data) {
      const init: UserStats = { streak: 1, lastActiveDate: new Date().toISOString().split('T')[0], totalReviewed: 0, totalMastered: 0, dailyGoal: 20, todayCount: 0 };
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(init));
      return init;
    }
    const stats: UserStats = JSON.parse(data);
    const today = new Date().toISOString().split('T')[0];
    
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
  } catch (e) {
    return { streak: 1, lastActiveDate: new Date().toISOString().split('T')[0], totalReviewed: 0, totalMastered: 0, dailyGoal: 20, todayCount: 0 };
  }
}

export function saveStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  } catch (e) {}
}

export function recordReview(isMastered: boolean): UserStats {
  const stats = getStoredStats();
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

  saveStats(stats);
  return stats;
}

export function getStoredItems(): Record<string, SRSItem> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY_ITEMS);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function saveStoredItems(items: Record<string, SRSItem>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  } catch (e) {}
}
