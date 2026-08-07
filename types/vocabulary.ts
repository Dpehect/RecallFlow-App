export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface ExampleSentence {
  id: string;
  en: string;
  tr: string;
  contextNote?: string;
}

export interface WordItem {
  id: string;
  word: string;
  translation: string;
  category: string;
  level: CEFRLevel;
  phonetic?: string;
  audioUrl?: string;
  examples: ExampleSentence[];
  isLearned?: boolean;
}

export type CategoryFilterType = 'All' | 'Daily' | 'People' | 'Objects' | 'Travel' | 'Business';
