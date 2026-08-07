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

export function getStoredStats(): UserStats {
  return getUserStats();
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('recallflow_user_stats', JSON.stringify(stats));
  } catch (e) {
    console.error('UserStats kaydedilemedi:', e);
  }
}

export function getStoredItems(): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('recallflow_srs_items');
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveStoredItem(item: any): void {
  if (typeof window === 'undefined') return;
  try {
    const items = getStoredItems();
    const index = items.findIndex((i: any) => i.id === item.id);
    if (index >= 0) {
      items[index] = item;
    } else {
      items.push(item);
    }
    localStorage.setItem('recallflow_srs_items', JSON.stringify(items));
  } catch (e) {
    console.error('saveStoredItem kaydedilemedi:', e);
  }
}

// ---------------------------------------------------------------------------
// Persistent "used sentence" tracking, scoped per category+difficulty.
// This is what actually guarantees a sentence is never shown twice, even
// across page reloads / tab switches (previously the "no repeat" check only
// looked at the last 50 sentences held in a component's in-memory state).
// ---------------------------------------------------------------------------
const USED_SENTENCES_KEY = 'recallflow_used_sentences_v1';

type UsedSentencesMap = Record<string, string[]>;

function readUsedSentencesMap(): UsedSentencesMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(USED_SENTENCES_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function writeUsedSentencesMap(map: UsedSentencesMap): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USED_SENTENCES_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Kullanılan cümleler kaydedilemedi:', e);
  }
}

export function scopeKey(category: string, difficulty: string): string {
  return `${category}:${difficulty}`;
}

/** All sentences already shown for this category+difficulty pair. */
export function getUsedSentences(category: string, difficulty: string): Set<string> {
  const map = readUsedSentencesMap();
  return new Set(map[scopeKey(category, difficulty)] || []);
}

/** Record a newly-shown sentence so it is never generated again for this scope. */
export function addUsedSentence(category: string, difficulty: string, sentence: string): void {
  if (!sentence) return;
  const map = readUsedSentencesMap();
  const key = scopeKey(category, difficulty);
  const list = map[key] || [];
  if (!list.includes(sentence)) {
    list.push(sentence);
  }
  map[key] = list;
  writeUsedSentencesMap(map);
}

/**
 * When a category+difficulty pool is fully exhausted, drop the oldest half
 * of its used-sentence history instead of clearing it entirely - this keeps
 * the sentences that get recycled as far apart in time as possible.
 */
export function rotateUsedSentences(category: string, difficulty: string): void {
  const map = readUsedSentencesMap();
  const key = scopeKey(category, difficulty);
  const list = map[key] || [];
  map[key] = list.slice(Math.floor(list.length / 2));
  writeUsedSentencesMap(map);
}

export function recordReview(itemId: string, grade: any): void {
  if (typeof window === 'undefined') return;
  try {
    incrementUserProgress(15);
  } catch (e) {
    console.error('recordReview kaydedilemedi:', e);
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
