export interface UserProgressRecord {
  id: string;
  word: string;
  language: string;
  level: string;
  category: string;
  repetition: number;
  interval: number;
  easeFactor: number;
  nextReview: string;
  lastReviewed?: string;
  state: 'new' | 'learning' | 'review' | 'mastered';
}

export interface UserProfileRecord {
  id: string;
  streak: number;
  lastActiveDate: string;
  totalReviewed: number;
  totalMastered: number;
  dailyGoal: number;
  todayCount: number;
}

const DB_NAME = 'RecallFlowDB_v2';
const DB_VERSION = 1;
const STORE_PROGRESS = 'user_progress';
const STORE_PROFILE = 'user_profile';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject('IndexedDB not available');
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_PROGRESS)) {
        db.createObjectStore(STORE_PROGRESS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_PROFILE)) {
        db.createObjectStore(STORE_PROFILE, { keyPath: 'id' });
      }
    };

    request.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
    request.onerror = (e) => reject((e.target as IDBOpenDBRequest).error);
  });
}

export async function getProgressFromDB(): Promise<Record<string, UserProgressRecord>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_PROGRESS, 'readonly');
      const store = tx.objectStore(STORE_PROGRESS);
      const req = store.getAll();
      req.onsuccess = () => {
        const records: UserProgressRecord[] = req.result || [];
        const map: Record<string, UserProgressRecord> = {};
        records.forEach(r => map[r.id] = r);
        resolve(map);
      };
      req.onerror = () => resolve({});
    });
  } catch (e) {
    return {};
  }
}

export async function saveProgressToDB(item: UserProgressRecord): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_PROGRESS, 'readwrite');
    const store = tx.objectStore(STORE_PROGRESS);
    store.put(item);
  } catch (e) {}
}

export async function getProfileFromDB(): Promise<UserProfileRecord> {
  const defaultProfile: UserProfileRecord = {
    id: 'current_user',
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    totalReviewed: 0,
    totalMastered: 0,
    dailyGoal: 20,
    todayCount: 0
  };

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_PROFILE, 'readonly');
      const store = tx.objectStore(STORE_PROFILE);
      const req = store.get('current_user');
      req.onsuccess = () => {
        const prof = req.result;
        if (!prof) {
          saveProfileToDB(defaultProfile);
          resolve(defaultProfile);
        } else {
          resolve(prof);
        }
      };
      req.onerror = () => resolve(defaultProfile);
    });
  } catch (e) {
    return defaultProfile;
  }
}

export async function saveProfileToDB(profile: UserProfileRecord): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_PROFILE, 'readwrite');
    const store = tx.objectStore(STORE_PROFILE);
    store.put(profile);
  } catch (e) {}
}
