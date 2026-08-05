export interface VocabItem {
  id: string;
  language: string;
  langCode: string;
  category: string;
  word: string;
  translation: string;
  type: string;
  level: string;
  exampleTarget: string;
  exampleTranslation: string;
}

export interface GrammarLesson {
  id: string;
  language: string;
  level: string;
  title: string;
  content: string;
  examples?: { target: string; translation: string }[];
}

export interface Story {
  id: string;
  language: string;
  level: string;
  title: string;
  text: string;
}

export const vocabPacks: VocabItem[] = [
  { 
    id: 'v-de-1', 
    language: 'german', 
    langCode: 'de-DE', 
    category: 'cafe-travel', 
    word: 'Kaffee', 
    translation: 'Kahve', 
    type: 'İsim (m)', 
    level: 'A1', 
    exampleTarget: 'Ich trinke morgens gerne Kaffee.', 
    exampleTranslation: 'Sabahları kahve içmeyi severim.' 
  },
  { 
    id: 'v-de-2', 
    language: 'german', 
    langCode: 'de-DE', 
    category: 'cafe-travel', 
    word: 'bestellen', 
    translation: 'Sipariş vermek', 
    type: 'Fiil', 
    level: 'A1', 
    exampleTarget: 'Wir möchten zwei Kaffee bestellen.', 
    exampleTranslation: 'İki kahve sipariş etmek istiyoruz.' 
  },
  { 
    id: 'v-de-3', 
    language: 'german', 
    langCode: 'de-DE', 
    category: 'daily-life', 
    word: 'aufstehen', 
    translation: 'Kalkmak / Uyanmak', 
    type: 'Fiil', 
    level: 'A1', 
    exampleTarget: 'Ich stehe um 7 Uhr auf.', 
    exampleTranslation: "Saat 7'de kalkıyorum." 
  },
  { 
    id: 'v-es-1', 
    language: 'spanish', 
    langCode: 'es-ES', 
    category: 'cafe-travel', 
    word: 'café', 
    translation: 'Kahve', 
    type: 'İsim', 
    level: 'A1', 
    exampleTarget: 'Un café con leche, por favor.', 
    exampleTranslation: 'Sütlü bir kahve lütfen.' 
  },
  { 
    id: 'v-pt-1', 
    language: 'portuguese', 
    langCode: 'pt-PT', 
    category: 'cafe-travel', 
    word: 'pastel de nata', 
    translation: 'Kremalı çörek', 
    type: 'İsim', 
    level: 'A1', 
    exampleTarget: 'Gosto de pastel de nata.', 
    exampleTranslation: 'Günün tatlısını severim.' 
  },
  { 
    id: 'v-en-1', 
    language: 'english', 
    langCode: 'en-US', 
    category: 'daily-life', 
    word: 'coffee', 
    translation: 'Kahve', 
    type: 'İsim', 
    level: 'A1', 
    exampleTarget: 'I drink coffee every morning.', 
    exampleTranslation: 'Her sabah kahve içerim.' 
  }
];

export const LANGUAGES = [
  { id: 'english', name: 'İngilizce', code: 'en-US' },
  { id: 'german', name: 'Almanca', code: 'de-DE' },
  { id: 'spanish', name: 'İspanyolca', code: 'es-ES' },
  { id: 'portuguese', name: 'Portekizce', code: 'pt-PT' }
];

export const CATEGORIES = [
  { id: 'cafe-travel', name: 'Kafe & Seyahat' },
  { id: 'daily-life', name: 'Günlük Yaşam' }
];

export const RECALLFLOW_ENTERPRISE_DATA = {
  version: '1.0.0',
  languages: LANGUAGES,
  categories: CATEGORIES,
  vocabPacks: vocabPacks,
  grammarLessons: [] as GrammarLesson[],
  stories: [] as Story[],
  modules: [
    { language: 'german', level: 'A1', title: 'Temel Almanca Modülü' },
    { language: 'spanish', level: 'A1', title: 'Temel İspanyolca Modülü' },
    { language: 'portuguese', level: 'A1', title: 'Temel Portekizce Modülü' },
    { language: 'english', level: 'A1', title: 'Temel İngilizce Modülü' }
  ]
};
