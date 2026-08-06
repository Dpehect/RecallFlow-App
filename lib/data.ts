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
  description: string;
}

export interface VocabItem {
  id: string;
  language: string;
  langCode: string;
  category: string;
  word: string;
  phonetic?: string;
  translation: string;
  type: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  exampleTarget: string;
  exampleTranslation: string;
}

export interface GrammarLesson {
  id: string;
  language: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  category: string;
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
  level: 'A1' | 'A2' | 'B1' | 'B2';
  sentences: ReadingSentence[];
}

export interface ListeningItem {
  id: string;
  language: string;
  langCode: string;
  category: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  title: string;
  targetText: string;
  translation: string;
  options: string[];
}

export const LANGUAGES: Language[] = [
  { id: "english", name: "English (İngilizce)", code: "en-US", flag: "🇬🇧" },
  { id: "german", name: "German (Almanca)", code: "de-DE", flag: "🇩🇪" },
  { id: "spanish", name: "Spanish (İspanyolca)", code: "es-ES", flag: "🇪🇸" },
  { id: "french", name: "French (Fransızca)", code: "fr-FR", flag: "🇫🇷" },
  { id: "portuguese", name: "Portuguese (Portekizce)", code: "pt-PT", flag: "🇵🇹" }
];

export const VOCAB_CATEGORIES: Category[] = [
  { id: "cafe-travel", name: "Kafe & Seyahat", icon: "☕", description: "Sipariş verme, otel rezervasyonu ve gezinti kelimeleri" },
  { id: "daily-life", name: "Günlük Yaşam", icon: "🏠", description: "Ev, aile, hobiler ve günlük rutin ifadeleri" },
  { id: "work-business", name: "İş & Kariyer", icon: "💼", description: "Ofis, toplantı, e-posta ve profesyonel terimler" },
  { id: "city-emergency", name: "Şehir & Acil Durum", icon: "🏙️", description: "Yön tarifleri, hastane, eczane ve acil durumlar" },
  { id: "tech-science", name: "Teknoloji & Bilim", icon: "💻", description: "Yazılım, dijital dünya ve bilimsel terimler" },
  { id: "art-culture", name: "Sanat & Kültür", icon: "🎨", description: "Sinema, müzik, edebiyat ve kültürel terimler" }
];

export const GRAMMAR_CATEGORIES: Category[] = [
  { id: "sentence-structure", name: "Temel Cümle Yapısı", icon: "🧩", description: "Özne, yüklem, nesne dizilimi ve temel kurallar" },
  { id: "tenses-verbs", name: "Zamanlar & Fiiller", icon: "⏳", description: "Şimdiki zaman, geçmiş zaman, gelecek zaman ve fiil çekimleri" },
  { id: "nouns-articles", name: "İsimler & Edatlar", icon: "📌", description: "Tanımlıklar (artikel), ismin halleri ve yön edatları" },
  { id: "clauses-connectors", name: "Bağlaçlar & Karmaşık Cümleler", icon: "🔗", description: "Neden-sonuç bağlaçları, yan cümleler ve koşul yapıları" }
];

export const READING_CATEGORIES: Category[] = [
  { id: "daily-dialogues", name: "Günlük Diyaloglar", icon: "💬", description: "İki kişi arasındaki doğal sohbet metinleri" },
  { id: "travel-stories", name: "Seyahat & Kültür", icon: "✈️", description: "Şehir rehberleri ve gezi anıları" },
  { id: "business-articles", name: "İş & Ekonomi", icon: "📈", description: "Kurumsal makaleler ve e-posta örnekleri" },
  { id: "short-stories", name: "Kısa Öyküler", icon: "📖", description: "Sürükleyici edebi kısa metinler" }
];

export const LISTENING_CATEGORIES: Category[] = [
  { id: "social-chat", name: "Sosyal Sohbetler", icon: "🗣️", description: "Günlük konuşmaları dinleme ve anlama" },
  { id: "travel-reservations", name: "Seyahat & Otel", icon: "🏨", description: "Bilet alma ve resepsiyon diyalogları" },
  { id: "business-interviews", name: "İş Görüşmeleri", icon: "🎙️", description: "Mülakat soruları ve iş yeri sunumları" },
  { id: "daily-news", name: "Günlük Haberler", icon: "📻", description: "Kısa haber bültenleri ve duyurular" }
];

// Comprehensive Vocab Data
const vocabPacks: VocabItem[] = [
  // English
  { id: "v-en-1", language: "english", langCode: "en-US", category: "daily-life", word: "resilience", phonetic: "/rɪˈzɪl.jəns/", translation: "Dayanıklılık / Esneklik", type: "İsim", level: "B2", exampleTarget: "Building resilience helps you recover from failure quickly.", exampleTranslation: "Dayanıklılık geliştirmek, başarısızlıktan hızlıca toparlanmanıza yardımcı olur." },
  { id: "v-en-2", language: "english", langCode: "en-US", category: "work-business", word: "streamline", phonetic: "/ˈstriːm.laɪn/", translation: "Verimli hale getirmek", type: "Fiil", level: "B1", exampleTarget: "We need to streamline our workflow to save time.", exampleTranslation: "Zaman kazanmak için iş akışımızı verimli hale getirmeliyiz." },
  { id: "v-en-3", language: "english", langCode: "en-US", category: "cafe-travel", word: "itinerary", phonetic: "/aɪˈtɪn.ər.ər.i/", translation: "Gezi programı", type: "İsim", level: "B1", exampleTarget: "Please share the travel itinerary before our departure.", exampleTranslation: "Lütfen yola çıkmadan önce seyahat programını paylaşın." },
  { id: "v-en-4", language: "english", langCode: "en-US", category: "cafe-travel", word: "coffee", phonetic: "/ˈkɒf.i/", translation: "Kahve", type: "İsim", level: "A1", exampleTarget: "I drink black coffee every morning.", exampleTranslation: "Her sabah sade kahve içerim." },
  { id: "v-en-5", language: "english", langCode: "en-US", category: "city-emergency", word: "pharmacy", phonetic: "/ˈfɑː.mə.si/", translation: "Eczane", type: "İsim", level: "A1", exampleTarget: "Is there an open pharmacy near the hotel?", exampleTranslation: "Otel yakınında açık bir eczane var mı?" },
  { id: "v-en-6", language: "english", langCode: "en-US", category: "tech-science", word: "algorithm", phonetic: "/ˈæl.ɡə.rɪ.ðəm/", translation: "Algoritma", type: "İsim", level: "A2", exampleTarget: "The algorithm optimizes the review intervals.", exampleTranslation: "Algoritma tekrar aralıklarını optimize eder." },

  // German
  { id: "v-de-1", language: "german", langCode: "de-DE", category: "cafe-travel", word: "Kaffee", phonetic: "[ˈkafe]", translation: "Kahve", type: "İsim (m)", level: "A1", exampleTarget: "Ich trinke morgens gerne Kaffee.", exampleTranslation: "Sabahları kahve içmeyi severim." },
  { id: "v-de-2", language: "german", langCode: "de-DE", category: "cafe-travel", word: "bestellen", phonetic: "[bəˈʃtɛlən]", translation: "Sipariş vermek", type: "Fiil", level: "A1", exampleTarget: "Wir möchten zwei Kaffee bestellen.", exampleTranslation: "İki kahve sipariş etmek istiyoruz." },
  { id: "v-de-3", language: "german", langCode: "de-DE", category: "work-business", word: "Verantwortung", phonetic: "[fɛɐ̯ˈʔantvɔʁtʊŋ]", translation: "Sorumluluk", type: "İsim (f)", level: "B2", exampleTarget: "Er übernimmt die volle Verantwortung für das Projekt.", exampleTranslation: "Proje için tüm sorumluluğu üstleniyor." },
  { id: "v-de-4", language: "german", langCode: "de-DE", category: "daily-life", word: "aufstehen", phonetic: "[ˈaʊ̯fˌʃteːən]", translation: "Uyanmak / Kalkmak", type: "Fiil", level: "A1", exampleTarget: "Ich stehe jeden Tag um 7 Uhr auf.", exampleTranslation: "Her gün saat 7'de kalkıyorum." },
  { id: "v-de-5", language: "german", langCode: "de-DE", category: "city-emergency", word: "Krankenhaus", phonetic: "[ˈkʁaŋkənˌhaʊ̯s]", translation: "Hastane", type: "İsim (n)", level: "A2", exampleTarget: "Das Krankenhaus ist nicht weit von hier.", exampleTranslation: "Hastane buradan uzak değil." },

  // Spanish
  { id: "v-es-1", language: "spanish", langCode: "es-ES", category: "cafe-travel", word: "café", phonetic: "/kaˈfe/", translation: "Kahve", type: "İsim", level: "A1", exampleTarget: "Un café con leche, por favor.", exampleTranslation: "Sütlü bir kahve lütfen." },
  { id: "v-es-2", language: "spanish", langCode: "es-ES", category: "work-business", word: "desarrollo", phonetic: "/desaˈroʎo/", translation: "Gelişim / Yazılım", type: "İsim", level: "B1", exampleTarget: "El desarrollo de software requiere práctica.", exampleTranslation: "Yazılım geliştirme pratik gerektirir." },
  { id: "v-es-3", language: "spanish", langCode: "es-ES", category: "daily-life", word: "despertar", phonetic: "/despaʁˈtaɾ/", translation: "Uyanmak", type: "Fiil", level: "A1", exampleTarget: "Me despierto a las seis de la mañana.", exampleTranslation: "Sabah saat altıda uyanıyorum." },

  // French
  { id: "v-fr-1", language: "french", langCode: "fr-FR", category: "cafe-travel", word: "café", phonetic: "/ka.fe/", translation: "Kahve", type: "İsim (m)", level: "A1", exampleTarget: "Un café s'il vous plaît.", exampleTranslation: "Bir kahve lütfen." },
  { id: "v-fr-2", language: "french", langCode: "fr-FR", category: "daily-life", word: "habitude", phonetic: "/a.bi.tyd/", translation: "Alışkanlık", type: "İsim (f)", level: "B1", exampleTarget: "C'est une bonne habitude de lire.", exampleTranslation: "Okumak iyi bir alışkanlıktır." },
  { id: "v-fr-3", language: "french", langCode: "fr-FR", category: "work-business", word: "entreprise", phonetic: "/ɑ̃.tʁə.pʁiz/", translation: "Şirket / Firma", type: "İsim (f)", level: "B2", exampleTarget: "L'entreprise développe de nouvelles technologies.", exampleTranslation: "Şirket yeni teknolojiler geliştiriyor." },

  // Portuguese
  { id: "v-pt-1", language: "portuguese", langCode: "pt-PT", category: "cafe-travel", word: "pastel de nata", phonetic: "/pɐʃˈtɛl dɨ ˈnatɐ/", translation: "Kremalı çörek", type: "İsim", level: "A1", exampleTarget: "Gosto de comer pastel de nata no café.", exampleTranslation: "Kafede kremalı çörek yemeyi severim." },
  { id: "v-pt-2", language: "portuguese", langCode: "pt-PT", category: "daily-life", word: "obrigado", phonetic: "/o.bɾiˈɡa.du/", translation: "Teşekkür ederim", type: "İnterjeksiyon", level: "A1", exampleTarget: "Muito obrigado pela sua ajuda.", exampleTranslation: "Yardımınız için çok teşekkür ederim." }
];

// Comprehensive Grammar Data FOR ALL 5 LANGUAGES
const grammarGuides: GrammarLesson[] = [
  // German
  {
    id: "g-de-a1-1",
    language: "german",
    level: "A1",
    category: "nouns-articles",
    title: "Der, Die, Das — Almanca Artikel Yapısı",
    rule: "Almancada isimler Eril (der), Dişil (die) veya Nötr (das) cinsiyetler alır.",
    examples: [
      { target: "Der Kaffee ist heiß.", translation: "Kahve sıcak." },
      { target: "Die Sonne scheint.", translation: "Güneş açıyor." }
    ]
  },
  {
    id: "g-de-a1-2",
    language: "german",
    level: "A1",
    category: "sentence-structure",
    title: "Fiil Pozisyonu (Verb-Second Rule)",
    rule: "Düz cümlelerde ana fiil her zaman 2. pozisyonda yer alır.",
    examples: [
      { target: "Ich lerne heute Deutsch.", translation: "Bugün Almanca öğreniyorum." },
      { target: "Heute lerne ich Deutsch.", translation: "Bugün Almanca öğreniyorum." }
    ]
  },

  // English
  {
    id: "g-en-a1-1",
    language: "english",
    level: "A1",
    category: "sentence-structure",
    title: "Subject-Verb-Object (SVO) Cümle Yapısı",
    rule: "İngilizce cümle dizilimi sırasıyla Özne + Fiil + Nesne şeklindedir.",
    examples: [
      { target: "I learn English every day.", translation: "Her gün İngilizce öğreniyorum." },
      { target: "She drinks coffee in the morning.", translation: "O sabahları kahve içer." }
    ]
  },
  {
    id: "g-en-b1-1",
    language: "english",
    level: "B1",
    category: "tenses-verbs",
    title: "Present Perfect vs Past Simple",
    rule: "Zamanı belirsiz tecrübelerde Present Perfect, zamanı belli geçmiş eylemlerde Past Simple kullanılır.",
    examples: [
      { target: "I have visited Berlin twice.", translation: "Berlin'i iki kez ziyaret ettim." },
      { target: "I visited Berlin in 2024.", translation: "Berlin'i 2024'te ziyaret ettim." }
    ]
  },

  // Spanish
  {
    id: "g-es-a1-1",
    language: "spanish",
    level: "A1",
    category: "tenses-verbs",
    title: "Ser vs Estar — Olmak Fiilinin Kullanımı",
    rule: "İspanyolcada 'Ser' kalıcı özellikler, 'Estar' ise geçici durumlar ve konumlar için kullanılır.",
    examples: [
      { target: "Yo soy estudiante.", translation: "Ben öğrenciyim (kalıcı kimlik)." },
      { target: "Yo estoy en la cafetería.", translation: "Ben kafetaryadayım (geçici konum)." }
    ]
  },

  // French
  {
    id: "g-fr-a1-1",
    language: "french",
    level: "A1",
    category: "nouns-articles",
    title: "Le, La, Les — Fransızca Tanımlıklar",
    rule: "Fransızcada eril isimler 'Le', dişil isimler 'La', çoğul isimler 'Les' alır.",
    examples: [
      { target: "Le café est très chaud.", translation: "Kahve çok sıcak." },
      { target: "La voiture est rapide.", translation: "Araba hızlı." }
    ]
  },

  // Portuguese
  {
    id: "g-pt-a1-1",
    language: "portuguese",
    level: "A1",
    category: "sentence-structure",
    title: "Ser e Estar em Português",
    rule: "Portekizcede 'Ser' kalıcı nitelikler, 'Estar' geçici durumlar için kullanılır.",
    examples: [
      { target: "Ele é professor.", translation: "O bir öğretmendir." },
      { target: "Ela está feliz hoje.", translation: "O bugün mutlu." }
    ]
  }
];

// Comprehensive Reading Data FOR ALL 5 LANGUAGES
const readingStories: ReadingStory[] = [
  // German
  {
    id: "r-de-1",
    language: "german",
    langCode: "de-DE",
    category: "travel-stories",
    title: "Ein Morgen im Berliner Café",
    summary: "Berlindeki bir kafede sipariş verme diyalogu.",
    level: "A1",
    sentences: [
      { speaker: "Kellner", targetText: "Guten Tag! Was möchten Sie trinken?", translation: "İyi günler! Ne içmek istersiniz?", audioText: "Guten Tag! Was möchten Sie trinken?" },
      { speaker: "Anna", targetText: "Ich möchte einen heißen Kaffee mit Milch, bitte.", translation: "Sütlü sıcak bir kahve istiyorum, lütfen.", audioText: "Ich möchte einen heißen Kaffee mit Milch bitte." }
    ]
  },

  // English
  {
    id: "r-en-1",
    language: "english",
    langCode: "en-US",
    category: "daily-dialogues",
    title: "Morning Coffee Routine",
    summary: "Sabah kahvesi sohbeti ve diyalog.",
    level: "A1",
    sentences: [
      { speaker: "Sarah", targetText: "Good morning! Would you like some coffee?", translation: "Günaydın! Biraz kahve ister misin?", audioText: "Good morning! Would you like some coffee?" },
      { speaker: "David", targetText: "Yes please, black with no sugar.", translation: "Evet lütfen, şekersiz ve sade.", audioText: "Yes please, black with no sugar." }
    ]
  },

  // Spanish
  {
    id: "r-es-1",
    language: "spanish",
    langCode: "es-ES",
    category: "travel-stories",
    title: "Un café en Madrid",
    summary: "Madrid merkezinde kahve içme diyalogu.",
    level: "A1",
    sentences: [
      { speaker: "Camarero", targetText: "¡Buenos días! ¿Qué desea tomar?", translation: "Günaydın! Ne almak istersiniz?", audioText: "¡Buenos días! ¿Qué desea tomar?" },
      { speaker: "Carlos", targetText: "Un café con leche y la cuenta, por favor.", translation: "Sütlü bir kahve ve hesap lütfen.", audioText: "Un café con leche y la cuenta por favor." }
    ]
  },

  // French
  {
    id: "r-fr-1",
    language: "french",
    langCode: "fr-FR",
    category: "daily-dialogues",
    title: "Un matin à Paris",
    summary: "Paris'te bir fırında diyalog.",
    level: "A1",
    sentences: [
      { speaker: "Boulanger", targetText: "Bonjour! Vous désirez?", translation: "Merhaba! Ne arzu edersiniz?", audioText: "Bonjour! Vous désirez?" },
      { speaker: "Marie", targetText: "Un croissant et un café s'il vous plaît.", translation: "Bir kruvasan ve bir kahve lütfen.", audioText: "Un croissant et un café s'il vous plaît." }
    ]
  },

  // Portuguese
  {
    id: "r-pt-1",
    language: "portuguese",
    langCode: "pt-PT",
    category: "travel-stories",
    title: "Uma manhã em Lisboa",
    summary: "Lizbon'da kafe sohbeti.",
    level: "A1",
    sentences: [
      { speaker: "Garçom", targetText: "Bom dia! O que deseja?", translation: "Günaydın! Ne arzu edersiniz?", audioText: "Bom dia! O que deseja?" },
      { speaker: "João", targetText: "Um café e um pastel de nata, por favor.", translation: "Bir kahve ve bir kremalı çörek lütfen.", audioText: "Um café e um pastel de nata por favor." }
    ]
  }
];

// Comprehensive Listening Data FOR ALL 5 LANGUAGES
const listeningItems: ListeningItem[] = [
  // German
  {
    id: "l-de-1",
    language: "german",
    langCode: "de-DE",
    category: "travel-reservations",
    level: "A1",
    title: "Dinleme Pratiği: İçecek Siparişi",
    targetText: "Ich trinke einen heißen Kaffee.",
    translation: "Sıcak bir kahve içiyorum.",
    options: ["Ich trinke einen heißen Kaffee.", "Ich trinke kalte Milch.", "Wir bestellen Tee."]
  },

  // English
  {
    id: "l-en-1",
    language: "english",
    langCode: "en-US",
    category: "social-chat",
    level: "A1",
    title: "Listening Practice: Greeting",
    targetText: "Nice to meet you!",
    translation: "Tanıştığıma memnun oldum!",
    options: ["Nice to meet you!", "Good night see you.", "Where is the hotel?"]
  },

  // Spanish
  {
    id: "l-es-1",
    language: "spanish",
    langCode: "es-ES",
    category: "social-chat",
    level: "A1",
    title: "Práctica de escucha: Saludo",
    targetText: "¡Mucho gusto en conocerte!",
    translation: "Tanıştığıma çok memnun oldum!",
    options: ["¡Mucho gusto en conocerte!", "Hasta luego mi amigo.", "Por favor una cuenta."]
  },

  // French
  {
    id: "l-fr-1",
    language: "french",
    langCode: "fr-FR",
    category: "social-chat",
    level: "A1",
    title: "Pratique d'écoute: Salutation",
    targetText: "Enchanté de vous rencontrer!",
    translation: "Sizinle tanıştığıma memnun oldum!",
    options: ["Enchanté de vous rencontrer!", "Au revoir à demain.", "Un café s'il vous plaît."]
  },

  // Portuguese
  {
    id: "l-pt-1",
    language: "portuguese",
    langCode: "pt-PT",
    category: "social-chat",
    level: "A1",
    title: "Prática de escuta: Saudação",
    targetText: "Prazer em conhecê-lo!",
    translation: "Tanıştığıma memnun oldum!",
    options: ["Prazer em conhecê-lo!", "Boa noite até amanhã.", "Onde fica o hotel?"]
  }
];

export const RECALLFLOW_ENTERPRISE_DATA = {
  vocabPacks,
  grammarGuides,
  readingStories,
  listeningItems,
  modules: [
    ...vocabPacks.map(v => ({ ...v, type: 'vocab' })),
    ...grammarGuides.map(g => ({ ...g, type: 'grammar' })),
    ...readingStories.map(r => ({ ...r, type: 'reading' })),
    ...listeningItems.map(l => ({ ...l, type: 'listening' }))
  ]
};
