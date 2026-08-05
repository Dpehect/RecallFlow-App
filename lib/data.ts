export interface WordBreakdown {
  word: string;
  mean: string;
  type: string;
}

export interface Card {
  id: string;
  german: string;
  english: string;
  breakdown: WordBreakdown[];
  audioText: string;
  options: string[];
  solution: string[];
}

export interface Module {
  id: string;
  level: string;
  title: string;
  tagline: string;
  timePerDay: string;
  grammarMode: string;
  audioMode: string;
  coverImage: string;
  cards: Card[];
}

export interface VocabItem {
  word: string;
  translation: string;
  type: string;
  level: string;
}

export const RECALLFLOW_DATA: { modules: Module[]; vocabPacks: VocabItem[] } = {
  modules: [
    {
      id: "a1-coffee",
      level: "A1",
      title: "Coffee & Travel",
      tagline: "Order drinks and navigate cafes with confidence.",
      timePerDay: "3 MINS / DAY",
      grammarMode: "ZERO GRAMMAR DRILLS",
      audioMode: "100% NATIVE AUDIO",
      coverImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      cards: [
        {
          id: "c1",
          german: "Ich trinke Kaffee.",
          english: "I drink coffee.",
          breakdown: [
            { word: "Ich", mean: "I", type: "Subject pronoun" },
            { word: "trinke", mean: "drink", type: "Present tense verb" },
            { word: "Kaffee.", mean: "coffee.", type: "Noun (Masculine)" }
          ],
          audioText: "Ich trinke Kaffee",
          options: ["Kaffee.", "Ich", "trinke", "Tee", "Wasser"],
          solution: ["Ich", "trinke", "Kaffee."]
        },
        {
          id: "c2",
          german: "Ein Espresso, bitte.",
          english: "An espresso, please.",
          breakdown: [
            { word: "Ein", mean: "An", type: "Article" },
            { word: "Espresso,", mean: "espresso,", type: "Noun" },
            { word: "bitte.", mean: "please.", type: "Adverb" }
          ],
          audioText: "Ein Espresso bitte",
          options: ["bitte.", "Ein", "Espresso,", "danke"],
          solution: ["Ein", "Espresso,", "bitte."]
        }
      ]
    },
    {
      id: "a1-chats",
      level: "A1",
      title: "Daily Chats",
      tagline: "Master greetings, small talk, and everyday encounters.",
      timePerDay: "3 MINS / DAY",
      grammarMode: "CONTEXT DRIVEN",
      audioMode: "AUDIO FIRST",
      coverImage: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80",
      cards: [
        {
          id: "c3",
          german: "Guten Tag! Wie geht es Ihnen?",
          english: "Good day! How are you?",
          breakdown: [
            { word: "Guten", mean: "Good", type: "Adjective" },
            { word: "Tag!", mean: "day!", type: "Noun" },
            { word: "Wie", mean: "How", type: "Question" },
            { word: "geht", mean: "goes", type: "Verb" },
            { word: "es", mean: "it", type: "Pronoun" },
            { word: "Ihnen?", mean: "you?", type: "Pronoun (Formal)" }
          ],
          audioText: "Guten Tag! Wie geht es Ihnen?",
          options: ["Wie", "Guten", "Tag!", "geht", "es", "Ihnen?"],
          solution: ["Guten", "Tag!", "Wie", "geht", "es", "Ihnen?"]
        }
      ]
    }
  ],
  vocabPacks: [
    { word: "Kaffee", translation: "Coffee", type: "Noun (m)", level: "A1" },
    { word: "trinken", translation: "to drink", type: "Verb", level: "A1" },
    { word: "Espresso", translation: "Espresso", type: "Noun (m)", level: "A1" },
    { word: "bitte", translation: "please", type: "Adverb", level: "A1" },
    { word: "Hauptbahnhof", translation: "Central Station", type: "Noun (m)", level: "A2" }
  ]
};
