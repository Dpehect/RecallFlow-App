import { GENERATED_VOCAB_PACKS } from './vocab_data';
import { GENERATED_READING_STORIES } from './reading_data';

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
  { id: "cafe-travel", name: "Kafe & Seyahat", icon: "☕", description: "Sipariş verme, otel rezervasyonu ve seyahat terimleri" },
  { id: "daily-life", name: "Günlük Yaşam", icon: "🏠", description: "Ev, aile, rutinler ve günlük iletişim" },
  { id: "work-business", name: "İş & Kariyer", icon: "💼", description: "Kurumsal iletişim, mülakatlar ve strateji" },
  { id: "city-emergency", name: "Şehir & Acil Durum", icon: "🏙️", description: "Yön tarifleri, sağlık ve güvenlik ifadeleri" },
  { id: "tech-science", name: "Teknoloji & Bilim", icon: "💻", description: "Yazılım, yapay zeka ve bilimsel literatür" },
  { id: "art-culture", name: "Sanat & Kültür", icon: "🎨", description: "Edebiyat, sinema, felsefe ve sanat terimleri" }
];

export const GRAMMAR_CATEGORIES: Category[] = [
  { id: "sentence-structure", name: "Temel Cümle Yapısı", icon: "🧩", description: "Özne-yüklem uyumu ve kelime dizilimi" },
  { id: "tenses-verbs", name: "Zamanlar & Fiiller", icon: "⏳", description: "Fiil çekimleri, zamanlar ve kip yapıları" },
  { id: "nouns-articles", name: "İsimler & Edatlar", icon: "📌", description: "Tanımlıklar, ismin halleri ve bağlama edatları" },
  { id: "clauses-connectors", name: "Bağlaçlar & Karmaşık Cümleler", icon: "🔗", description: "Koşul cümleleri, neden-sonuç bağlaçları" }
];

export const READING_CATEGORIES: Category[] = [
  { id: "daily-dialogues", name: "Günlük Diyaloglar", icon: "💬", description: "Doğal konuşma akışına sahip günlük diyaloglar" },
  { id: "travel-stories", name: "Seyahat & Kültür", icon: "✈️", description: "Kültürel makaleler ve gezi yazıları" },
  { id: "business-articles", name: "İş & Ekonomi", icon: "📈", description: "Kurumsal e-postalar ve strateji raporları" },
  { id: "short-stories", name: "Kısa Öyküler", icon: "📖", description: "Sürükleyici edebi kısa metinler" }
];

export const LISTENING_CATEGORIES: Category[] = [
  { id: "social-chat", name: "Sosyal Sohbetler", icon: "🗣️", description: "Doğal tempoda sohbet dinlemeleri" },
  { id: "travel-reservations", name: "Seyahat & Otel", icon: "🏨", description: "Resepsiyon ve ulaşım diyalogları" },
  { id: "business-interviews", name: "İş Görüşmeleri", icon: "🎙️", description: "Mülakat ve toplantı ses kayıtları" },
  { id: "daily-news", name: "Günlük Haberler", icon: "📻", description: "Güncel haber bültenleri ve ses kayıtları" }
];

// Rich Contextual Grammar Lessons for All Languages & Categories
const grammarGuides: GrammarLesson[] = [
  {
    id: "g-de-a1-1",
    language: "german",
    level: "A1",
    category: "nouns-articles",
    title: "Der, Die, Das — Almanca Artikel Hiyerarşisi",
    rule: "Almancada tüm isimler cinsiyetlerine göre Der (eril), Die (dişil) veya Das (nötr) belirli tanımlıklarını alır. İsimlerin baş harfi her zaman büyük yazılır.",
    examples: [
      { target: "Der Kaffee ist heiß und steht auf dem Tisch.", translation: "Kahve sıcak ve masanın üzerinde duruyor." },
      { target: "Die Sonne scheint heute sehr hell am Himmel.", translation: "Güneş bugün gökyüzünde çok parlak parlıyor." },
      { target: "Das Buch liegt in der Bibliothek.", translation: "Kitap kütüphanede bulunuyor." }
    ]
  },
  {
    id: "g-de-a1-2",
    language: "german",
    level: "A1",
    category: "sentence-structure",
    title: "Fiil Pozisyonu (Verb-Second Rule)",
    rule: "Almanca kurallı bildirim cümlelerinde çekimli ana fiil istisnasız ikinci sırada yer alır. Cümle başı zaman belirteciyle başlasa dahi fiil konumunu korur.",
    examples: [
      { target: "Ich lerne jeden Tag intensiver Deutsch.", translation: "Her gün daha yoğun şekilde Almanca öğreniyorum." },
      { target: "Heute lerne ich intensiv Deutsch für die Prüfung.", translation: "Bugün sınav için yoğun şekilde Almanca öğreniyorum." }
    ]
  },
  {
    id: "g-de-b1-1",
    language: "german",
    level: "B1",
    category: "clauses-connectors",
    title: "Yan Cümle Bağlaçları: weil, dass, obwohl",
    rule: "Weil (çünkü), dass (-diği/ki) ve obwohl (rağmen) bağlaçları kullanıldığında yan cümledeki fiil cümlenin en sonuna gider.",
    examples: [
      { target: "Ich lerne Deutsch, weil ich in Berlin arbeiten möchte.", translation: "Almanca öğreniyorum çünkü Berlin'de çalışmak istiyorum." },
      { target: "Er weiß, dass die Prüfung schwer ist.", translation: "Sınavın zor olduğunu biliyor." }
    ]
  },

  {
    id: "g-en-a1-1",
    language: "english",
    level: "A1",
    category: "sentence-structure",
    title: "Subject-Verb-Object (SVO) Cümle Yapısı",
    rule: "İngilizce temel cümle dizilimi Özne + Fiil + Nesne katı sırasını takip eder. Zaman ifadeleri genellikle cümlenin en sonuna yerleştirilir.",
    examples: [
      { target: "Professional engineers design sustainable solutions every day.", translation: "Profesyonel mühendisler her gün sürdürülebilir çözümler tasarlar." },
      { target: "She drinks dark roasted coffee in the morning.", translation: "O sabahları koyu kavrulmuş kahve içer." }
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
      { target: "I have visited Berlin twice in my life.", translation: "Berlin'i hayatımda iki kez ziyaret ettim." },
      { target: "I visited Berlin in the summer of 2024.", translation: "Berlin'i 2024 yazında ziyaret ettim." }
    ]
  },

  {
    id: "g-es-a1-1",
    language: "spanish",
    level: "A1",
    category: "tenses-verbs",
    title: "Ser vs Estar — Olmak Fiili Ayrımı",
    rule: "İspanyolcada 'Ser' öznel kimlik, milliyet, meslek ve kalıcı nitelikler için kullanılırken; 'Estar' konum, geçici duygu ve anlık durumlar için kullanılır.",
    examples: [
      { target: "Ella es arquitecta y es muy dedicada a su trabajo.", translation: "O mimardır ve işine çok özverilidir." },
      { target: "Ella está en la oficina y está muy ocupada hoy.", translation: "O bugün ofistedir ve çok meşguldür." }
    ]
  },

  {
    id: "g-fr-a1-1",
    language: "french",
    level: "A1",
    category: "nouns-articles",
    title: "Les Articles Définis: Le, La, L', Les",
    rule: "Fransızca belirli tanımlıklar ismin cinsiyetine ve sessiz/sesli harfle başlamasına göre seçilir.",
    examples: [
      { target: "Le professeur explique la leçon clairement.", translation: "Öğretmen dersi anlaşılır şekilde açıklıyor." },
      { target: "L'étudiant écoute attentivement les conseils.", translation: "Öğrenci tavsiyeleri dikkatle dinliyor." }
    ]
  },

  {
    id: "g-pt-a1-1",
    language: "portuguese",
    level: "A1",
    category: "sentence-structure",
    title: "Verbos Ser e Estar em Português",
    rule: "Portekizce 'Ser' doğuştan gelen kalıcı durumları, 'Estar' ise konumu ve geçici hisleri temsil eder.",
    examples: [
      { target: "Ele é engenheiro civil e muito competente.", translation: "O inşaat mühendisidir ve çok yetkindir." },
      { target: "Eles estão no escritório em Lisboa hoje.", translation: "Onlar bugün Lizbon'daki ofistedir." }
    ]
  }
];

const listeningItems: ListeningItem[] = [
  {
    id: "l-de-1",
    language: "german",
    langCode: "de-DE",
    category: "travel-reservations",
    level: "A1",
    title: "Dinleme Pratiği: İçecek Siparişi",
    targetText: "Ich trinke morgens vor der Arbeit immer einen heißen Kaffee.",
    translation: "Sabahları işten önce her zaman sıcak bir kahve içerim.",
    options: [
      "Ich trinke morgens vor der Arbeit immer einen heißen Kaffee.",
      "Ich bestelle kalte Milch mit frischem Apfelkuchen.",
      "Wir fahren morgen früh direkt nach Berlin."
    ]
  },
  {
    id: "l-en-1",
    language: "english",
    langCode: "en-US",
    category: "business-interviews",
    level: "B1",
    title: "Listening Practice: Professional Interview",
    targetText: "It is an absolute pleasure to meet you at this technology conference!",
    translation: "Bu teknoloji konferansında sizinle tanışmak mutlak bir zevkti!",
    options: [
      "It is an absolute pleasure to meet you at this technology conference!",
      "Good night see you at the airport tomorrow morning.",
      "Where can I find the nearest pharmacy around here?"
    ]
  }
];

export const RECALLFLOW_ENTERPRISE_DATA = {
  vocabPacks: GENERATED_VOCAB_PACKS,
  grammarGuides,
  readingStories: GENERATED_READING_STORIES,
  listeningItems,
  modules: [
    ...GENERATED_VOCAB_PACKS.map(v => ({ ...v, type: 'vocab' })),
    ...grammarGuides.map(g => ({ ...g, type: 'grammar' })),
    ...GENERATED_READING_STORIES.map(r => ({ ...r, type: 'reading' })),
    ...listeningItems.map(l => ({ ...l, type: 'listening' }))
  ]
};
