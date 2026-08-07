export interface UserStats {
  todayCount: number;
  dailyGoal: number;
  xp: number;
  streak: number;
  level: number;
  totalSentences: number;
  totalMastered: number;
  totalReviewed: number;
  totalReviews?: number;
  totalWords?: number;
  lastActiveDate?: string;
}

export const DEFAULT_USER_STATS: UserStats = {
  todayCount: 0,
  dailyGoal: 10,
  xp: 0,
  streak: 0,
  level: 1,
  totalSentences: 0,
  totalMastered: 0,
  totalReviewed: 0,
  totalReviews: 0,
  totalWords: 0,
};

export function getUserStats(): UserStats {
  if (typeof window === 'undefined') return DEFAULT_USER_STATS;
  try {
    const data = localStorage.getItem('recallflow_user_stats');
    if (!data) return DEFAULT_USER_STATS;
    return { ...DEFAULT_USER_STATS, ...JSON.parse(data) };
  } catch (e) {
    return DEFAULT_USER_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('recallflow_user_stats', JSON.stringify(stats));
  } catch (e) {
    console.error('UserStats kaydedilemedi:', e);
  }
}

export function incrementUserProgress(xpEarned: number = 10): UserStats {
  const current = getUserStats();
  const today = new Date().toISOString().split('T')[0];

  let streak = current.streak;
  if (current.lastActiveDate) {
    const lastDate = new Date(current.lastActiveDate);
    const currentDate = new Date(today);
    const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }
  } else {
    streak = 1;
  }

  const updated: UserStats = {
    ...current,
    todayCount: (current.todayCount || 0) + 1,
    totalSentences: (current.totalSentences || 0) + 1,
    totalMastered: (current.totalMastered || 0) + 1,
    totalReviewed: (current.totalReviewed || 0) + 1,
    totalReviews: (current.totalReviews || 0) + 1,
    xp: (current.xp || 0) + xpEarned,
    level: Math.floor(((current.xp || 0) + xpEarned) / 100) + 1,
    streak: streak || 1,
    lastActiveDate: today,
  };

  saveUserStats(updated);
  return updated;
}
