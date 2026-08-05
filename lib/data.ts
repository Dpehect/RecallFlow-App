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
  rule: string;
  examples: { target: string; translation: string }[];
}

export interface ReadingSentence {
  speaker: string;
  targetText: string;
  translation: string;
  audioText: string;
}

export interface ReadingStory {
  id: string;
  language: string;
  langCode: string;
  category: string;
  title: string;
  summary: string;
  level: string;
  sentences: ReadingSentence[];
}

export interface ListeningItem {
  id: string;
  language: string;
  langCode: string;
  level: string;
  title: string;
  targetText: string;
  translation: string;
  options: string[];
}

export interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const LANGUAGES: Language[] = [
  { id: 'german', name: 'German (Almanca)', code: 'de-DE', flag: '🇩🇪' },
  { id: 'spanish', name: 'Spanish (İspanyolca)', code: 'es-ES', flag: '🇪🇸' },
  { id: 'portuguese', name: 'Portuguese (Portekizce)', code: 'pt-PT', flag: '🇵🇹' },
  { id: 'english', name: 'English (İngilizce)', code: 'en-US', flag: '🇬🇧' }
];

export const CATEGORIES: Category[] = [
  { id: 'cafe-travel', name: 'Kafe & Seyahat', icon: '☕' },
  { id: 'daily-life', name: 'Günlük Yaşam', icon: '🏠' },
  { id: 'work-business', name: 'İş & Kariyer', icon: '💼' },
  { id: 'city-emergency', name: 'Şehir & Acil Durum', icon: '🏙️' }
];

export const RECALLFLOW_ENTERPRISE_DATA = {
  vocabPacks: [
    { id: 'v-de-1', language: 'german', langCode: 'de-DE', category: 'cafe-travel', word: 'Kaffee', translation: 'Kahve', type: 'İsim (m)', level: 'A1', exampleTarget: 'Ich trinke morgens gerne Kaffee.', exampleTranslation: 'Sabahları kahve içmeyi severim.' },
    { id: 'v-de-2', language: 'german', langCode: 'de-DE', category: 'cafe-travel', word: 'bestellen', translation: 'Sipariş vermek', type: 'Fiil', level: 'A1', exampleTarget: 'Wir möchten zwei Kaffee bestellen.', exampleTranslation: 'İki kahve sipariş etmek istiyoruz.' },
    { id: 'v-de-3', language: 'german', langCode: 'de-DE', category: 'daily-life', word: 'aufstehen', translation: 'Kalkmak / Uyanmak', type: 'Fiil', level: 'A1', exampleTarget: 'Ich stehe um 7 Uhr auf.', exampleTranslation: 'Saat 7'de kalkıyorum.' },
    { id: 'v-es-1', language: 'spanish', langCode: 'es-ES', category: 'cafe-travel', word: 'café', translation: 'Kahve', type: 'İsim', level: 'A1', exampleTarget: 'Un café con leche, por favor.', exampleTranslation: 'Sütlü bir kahve lütfen.' },
    { id: 'v-pt-1', language: 'portuguese', langCode: 'pt-PT', category: 'cafe-travel', word: 'pastel de nata', translation: 'Kremalı çörek', type: 'İsim', level: 'A1', exampleTarget: 'Gosto de pastel de nata.', exampleTranslation: 'Kremalı çöreği severim.' },
    { id: 'v-en-1', language: 'english', langCode: 'en-US', category: 'daily-life', word: 'coffee', translation: 'Kahve', type: 'İsim', level: 'A1', exampleTarget: 'I drink coffee every morning.', exampleTranslation: 'Her sabah kahve içerim.' }
  ],

  grammarGuides: [
    { id: 'g-de-a1', language: 'german', level: 'A1', title: 'Der, Die, Das — Almanca Artikel Yapısı', rule: 'Almancada isimler Eril (der), Dişil (die) veya Nötr (das) cinsiyetler alır.', examples: [{ target: 'Der Kaffee ist heiß.', translation: 'Kahve sıcak.' }, { target: 'Die Sonne scheint.', translation: 'Güneş açıyor.' }] },
    { id: 'g-es-a1', language: 'spanish', level: 'A1', title: 'Ser vs Estar — İspanyolca Olmak Fiili', rule: 'Ser kalıcı durumlar için, Estar geçici durumlar için kullanılır.', examples: [{ target: 'Ella es profesora.', translation: 'O bir öğretmen.' }] }
  ],

  readingStories: [
    {
      id: 'r-de-1',
      language: 'german',
      langCode: 'de-DE',
      category: 'cafe-travel',
      title: 'Ein Morgen im Berliner Café',
      summary: 'Berlindeki bir kafede sipariş verme hikayesi.',
      level: 'A1',
      sentences: [
        { speaker: 'Kellner', targetText: 'Guten Tag! Was möchten Sie trinken?', translation: 'İyi günler! Ne içmek istersiniz?', audioText: 'Guten Tag! Was möchten Sie trinken?' },
        { speaker: 'Anna', targetText: 'Ich möchte einen heißen Kaffee mit Milch, bitte.', translation: 'Sütlü sıcak bir kahve istiyorum, lütfen.', audioText: 'Ich möchte einen heißen Kaffee mit Milch bitte.' },
        { speaker: 'Kellner', targetText: 'Sehr gerne. Das macht 3 Euro.', translation: 'Memnuniyetle. 3 Euro yapıyor.', audioText: 'Sehr gerne. Das macht 3 Euro.' }
      ]
    },
    {
      id: 'r-es-1',
      language: 'spanish',
      langCode: 'es-ES',
      category: 'cafe-travel',
      title: 'Un café en Madrid',
      summary: 'Madrid merkezinde kahve içme diyalogu.',
      level: 'A1',
      sentences: [
        { speaker: 'Camarero', targetText: '¡Buenos días! ¿Qué desea tomar?', translation: 'Günaydın! Ne almak istersiniz?', audioText: '¡Buenos días! ¿Qué desea tomar?' },
        { speaker: 'Carlos', targetText: 'Un café con leche y la cuenta, por favor.', translation: 'Sütlü bir kahve ve hesap lütfen.', audioText: 'Un café con leche y la cuenta por favor.' }
      ]
    }
  ],

  listeningItems: [
    {
      id: 'l-de-1',
      language: 'german',
      langCode: 'de-DE',
      level: 'A1',
      title: 'Dinleme Pratigi: İçecek Siparişi',
      targetText: 'Ich trinke einen heißen Kaffee.',
      translation: 'Sıcak bir kahve içiyorum.',
      options: ['Ich trinke einen heißen Kaffee.', 'Ich trinke kalte Milch.', 'Wir bestellen Tee.']
    },
    {
      id: 'l-es-1',
      language: 'spanish',
      langCode: 'es-ES',
      level: 'A1',
      title: 'Dinleme Pratiği: Selamlaşma',
      targetText: 'Un café con leche por favor.',
      translation: 'Sütlü bir kahve lütfen.',
      options: ['Un café con leche por favor.', 'Buenas noches a todos.', 'Hasta mañana amigo.']
    }
  ]
};
