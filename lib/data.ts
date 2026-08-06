export interface VocabItem {
  id: string;
  language: string;
  langCode: string;
  category: string;
  word: string;
  phonetic?: string;
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
  { id: "english", name: "English (İngilizce)", code: "en-US", flag: "🇬🇧" },
  { id: "german", name: "German (Almanca)", code: "de-DE", flag: "🇩🇪" },
  { id: "spanish", name: "Spanish (İspanyolca)", code: "es-ES", flag: "🇪🇸" },
  { id: "french", name: "French (Fransızca)", code: "fr-FR", flag: "🇫🇷" },
  { id: "portuguese", name: "Portuguese (Portekizce)", code: "pt-PT", flag: "🇵🇹" }
];

export const CATEGORIES: Category[] = [
  { id: "cafe-travel", name: "Kafe & Seyahat", icon: "☕" },
  { id: "daily-life", name: "Günlük Yaşam", icon: "🏠" },
  { id: "work-business", name: "İş & Kariyer", icon: "💼" },
  { id: "city-emergency", name: "Şehir & Acil Durum", icon: "🏙️" }
];

export const RECALLFLOW_ENTERPRISE_DATA = {
  vocabPacks: [
    // English
    {
      id: "v-en-1",
      language: "english",
      langCode: "en-US",
      category: "daily-life",
      word: "resilience",
      phonetic: "/rɪˈzɪl.jəns/",
      translation: "Dayanıklılık / Esneklik",
      type: "İsim",
      level: "B2",
      exampleTarget: "Building resilience helps you recover from failure quickly.",
      exampleTranslation: "Dayanıklılık geliştirmek, başarısızlıktan hızlıca toparlanmanıza yardımcı olur."
    },
    {
      id: "v-en-2",
      language: "english",
      langCode: "en-US",
      category: "work-business",
      word: "streamline",
      phonetic: "/ˈstriːm.laɪn/",
      translation: "Yalınlaştırmak / Verimli hale getirmek",
      type: "Fiil",
      level: "B1",
      exampleTarget: "We need to streamline our workflow to save time.",
      exampleTranslation: "Zaman kazanmak için iş akışımızı verimli hale getirmeliyiz."
    },
    {
      id: "v-en-3",
      language: "english",
      langCode: "en-US",
      category: "cafe-travel",
      word: "itinerary",
      phonetic: "/aɪˈtɪn.ər.ər.i/",
      translation: "Gezi programı / Seyahat rotası",
      type: "İsim",
      level: "B1",
      exampleTarget: "Please share the travel itinerary before our departure.",
      exampleTranslation: "Lütfen yola çıkmadan önce seyahat programını paylaşın."
    },
    {
      id: "v-en-4",
      language: "english",
      langCode: "en-US",
      category: "daily-life",
      word: "coffee",
      phonetic: "/ˈkɒf.i/",
      translation: "Kahve",
      type: "İsim",
      level: "A1",
      exampleTarget: "I drink black coffee every morning.",
      exampleTranslation: "Her sabah sade kahve içerim."
    },

    // German
    {
      id: "v-de-1",
      language: "german",
      langCode: "de-DE",
      category: "cafe-travel",
      word: "Kaffee",
      phonetic: "[ˈkafe, kaˈfeː]",
      translation: "Kahve",
      type: "İsim (m)",
      level: "A1",
      exampleTarget: "Ich trinke morgens gerne Kaffee.",
      exampleTranslation: "Sabahları kahve içmeyi severim."
    },
    {
      id: "v-de-2",
      language: "german",
      langCode: "de-DE",
      category: "cafe-travel",
      word: "bestellen",
      phonetic: "[bəˈʃtɛlən]",
      translation: "Sipariş vermek",
      type: "Fiil",
      level: "A1",
      exampleTarget: "Wir möchten zwei Kaffee bestellen.",
      exampleTranslation: "İki kahve sipariş etmek istiyoruz."
    },
    {
      id: "v-de-3",
      language: "german",
      langCode: "de-DE",
      category: "work-business",
      word: "Verantwortung",
      phonetic: "[fɛɐ̯ˈʔantvɔʁtʊŋ]",
      translation: "Sorumluluk",
      type: "İsim (f)",
      level: "B2",
      exampleTarget: "Er übernimmt die volle Verantwortung für das Projekt.",
      exampleTranslation: "Proje için tüm sorumluluğu üstleniyor."
    },
    {
      id: "v-de-4",
      language: "german",
      langCode: "de-DE",
      category: "daily-life",
      word: "aufstehen",
      phonetic: "[ˈaʊ̯fˌʃteːən]",
      translation: "Kalkmak / Uyanmak",
      type: "Fiil",
      level: "A1",
      exampleTarget: "Ich stehe jeden Tag um 7 Uhr auf.",
      exampleTranslation: "Her gün saat 7'de kalkıyorum."
    },

    // Spanish
    {
      id: "v-es-1",
      language: "spanish",
      langCode: "es-ES",
      category: "cafe-travel",
      word: "café",
      phonetic: "/kaˈfe/",
      translation: "Kahve",
      type: "İsim",
      level: "A1",
      exampleTarget: "Un café con leche, por favor.",
      exampleTranslation: "Sütlü bir kahve lütfen."
    },
    {
      id: "v-es-2",
      language: "spanish",
      langCode: "es-ES",
      category: "work-business",
      word: "desarrollo",
      phonetic: "/desaˈroʎo/",
      translation: "Gelişim / Geliştirme",
      type: "İsim",
      level: "B1",
      exampleTarget: "El desarrollo de software requiere práctica constante.",
      exampleTranslation: "Yazılım geliştirme sürekli pratik gerektirir."
    },

    // French
    {
      id: "v-fr-1",
      language: "french",
      langCode: "fr-FR",
      category: "cafe-travel",
      word: "café",
      phonetic: "/ka.fe/",
      translation: "Kahve",
      type: "İsim (m)",
      level: "A1",
      exampleTarget: "Un café s'il vous plaît.",
      exampleTranslation: "Bir kahve lütfen."
    },
    {
      id: "v-fr-2",
      language: "french",
      langCode: "fr-FR",
      category: "daily-life",
      word: "habitude",
      phonetic: "/a.bi.tyd/",
      translation: "Alışkanlık",
      type: "İsim (f)",
      level: "B1",
      exampleTarget: "C'est une bonne habitude de lire tous les jours.",
      exampleTranslation: "Her gün kitap okumak iyi bir alışkanlıktır."
    },

    // Portuguese
    {
      id: "v-pt-1",
      language: "portuguese",
      langCode: "pt-PT",
      category: "cafe-travel",
      word: "pastel de nata",
      phonetic: "/pɐʃˈtɛl dɨ ˈnatɐ/",
      translation: "Kremalı çörek",
      type: "İsim",
      level: "A1",
      exampleTarget: "Gosto de comer pastel de nata no café.",
      exampleTranslation: "Kafede kremalı çörek yemeyi severim."
    }
  ],
  grammarGuides: [
    {
      id: "g-de-a1",
      language: "german",
      level: "A1",
      title: "Der, Die, Das — Almanca Artikel Yapısı",
      rule: "Almancada isimler Eril (der), Dişil (die) veya Nötr (das) cinsiyetler alır.",
      examples: [
        { target: "Der Kaffee ist heiß.", translation: "Kahve sıcak." },
        { target: "Die Sonne scheint.", translation: "Güneş açıyor." }
      ]
    },
    {
      id: "g-en-b1",
      language: "english",
      level: "B1",
      title: "Present Perfect vs Past Simple",
      rule: "Zamanı belirsiz tecrübelerde Present Perfect, zamanı belli geçmiş eylemlerde Past Simple kullanılır.",
      examples: [
        { target: "I have visited Berlin twice.", translation: "Berlin'i iki kez ziyaret ettim." },
        { target: "I visited Berlin in 2024.", translation: "Berlin'i 2024'te ziyaret ettim." }
      ]
    }
  ],
  readingStories: [
    {
      id: "r-de-1",
      language: "german",
      langCode: "de-DE",
      category: "cafe-travel",
      title: "Ein Morgen im Berliner Café",
      summary: "Berlindeki bir kafede sipariş verme hikayesi.",
      level: "A1",
      sentences: [
        { speaker: "Kellner", targetText: "Guten Tag! Was möchten Sie trinken?", translation: "İyi günler! Ne içmek istersiniz?", audioText: "Guten Tag! Was möchten Sie trinken?" },
        { speaker: "Anna", targetText: "Ich möchte einen heißen Kaffee mit Milch, bitte.", translation: "Sütlü sıcak bir kahve istiyorum, lütfen.", audioText: "Ich möchte einen heißen Kaffee mit Milch bitte." }
      ]
    }
  ],
  listeningItems: [
    {
      id: "l-de-1",
      language: "german",
      langCode: "de-DE",
      level: "A1",
      title: "Dinleme Pratiği: İçecek Siparişi",
      targetText: "Ich trinke einen heißen Kaffee.",
      translation: "Sıcak bir kahve içiyorum.",
      options: ["Ich trinke einen heißen Kaffee.", "Ich trinke kalte Milch.", "Wir bestellen Tee."]
    }
  ]
};
