export interface SRSItem {
  id: string;
  word: string;
  phonetic?: string;
  type?: string;
  translation: string;
  example: string;
  exampleTranslation: string;
  language: string;
  level: string;
  repetition: number;
  interval: number;
  easeFactor: number;
  nextReview: string;
  lastReviewed?: string;
  state: 'new' | 'learning' | 'review' | 'mastered';
}

export type ReviewGrade = 1 | 2 | 3 | 4; // 1: Tekrar, 2: Zor, 3: İyi, 4: Kolay

export function calculateSM2(item: SRSItem, grade: ReviewGrade): SRSItem {
  let { repetition, interval, easeFactor } = item;
  const sm2Grade = grade === 1 ? 0 : grade === 2 ? 3 : grade === 3 ? 4 : 5;

  if (sm2Grade >= 3) {
    if (repetition === 0) interval = 1;
    else if (repetition === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetition += 1;
  } else {
    repetition = 0;
    interval = 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - sm2Grade) * (0.08 + (5 - sm2Grade) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    ...item,
    repetition,
    interval,
    easeFactor,
    nextReview: nextDate.toISOString(),
    lastReviewed: new Date().toISOString(),
    state: repetition >= 5 ? 'mastered' : repetition > 0 ? 'review' : 'learning'
  };
}
