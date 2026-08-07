export type Lang = 'en' | 'de' | 'fr' | 'tr' | 'es' | string;

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface LanguageMeta {
  name?: string;
  code?: string;
  flag?: string;
  [key: string]: any;
}

export interface Reading {
  id?: string;
  title?: string;
  content?: string;
  level?: Level;
  translation?: string;
  audioUrl?: string;
  [key: string]: any;
}

export interface Word {
  id?: string;
  word?: string;
  translation?: string;
  level?: Level;
  category?: string;
  examples?: any[];
  [key: string]: any;
}

export interface GrammarTopic {
  id?: string;
  title?: string;
  level?: Level;
  description?: string;
  [key: string]: any;
}

export interface QuizItem {
  id?: string;
  question?: string;
  options?: string[];
  answer?: string;
  [key: string]: any;
}

export type CEFRLevel = Level;
