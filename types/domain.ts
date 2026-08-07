export const LANGUAGES = ["en", "de", "fr"] as const;
export const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
export const CATEGORIES = [
  "daily",
  "people",
  "food",
  "travel",
  "nature",
  "home",
  "work",
  "feelings",
] as const;

export type Lang = (typeof LANGUAGES)[number];
export type Level = (typeof LEVELS)[number];
export type Category = (typeof CATEGORIES)[number];

export interface LanguageMeta {
  name: string;
  native: string;
  flag: string;
  voice: string;
  color: string;
}
export interface Example {
  target: string;
  translation: string;
}
export interface Card {
  id: string;
  word: string;
  translation: string;
  category: Category;
  acceptedAnswers: string[];
  example: Example;
}
export interface Reading {
  title: string;
  text: string;
  duration: string;
}
export type QuizStatus = "idle" | "checking" | "correct" | "incorrect";
