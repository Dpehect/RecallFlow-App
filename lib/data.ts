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
  { id: "short-stories", name: "Kısa Öyküler", icon: "📖", description: "Edebi değere sahip derinlikli kısa metinler" }
];

export const LISTENING_CATEGORIES: Category[] = [
  { id: "social-chat", name: "Sosyal Sohbetler", icon: "🗣️", description: "Doğal tempoda sohbet dinlemeleri" },
  { id: "travel-reservations", name: "Seyahat & Otel", icon: "🏨", description: "Resepsiyon ve ulaşım diyalogları" },
  { id: "business-interviews", name: "İş Görüşmeleri", icon: "🎙️", description: "Mülakat ve toplantı ses kayıtları" },
  { id: "daily-news", name: "Günlük Haberler", icon: "📻", description: "Güncel haber bültenleri ve ses kayıtları" }
];

// Rich Contextual Vocabulary Dataset
const vocabPacks: VocabItem[] = [
  // English
  { id: "v-en-1", language: "english", langCode: "en-US", category: "daily-life", word: "resilience", phonetic: "/rɪˈzɪl.jəns/", translation: "Dayanıklılık / Esneklik", type: "İsim", level: "B2", exampleTarget: "Her remarkable resilience during the crisis inspired the entire team to persevere.", exampleTranslation: "Kriz sırasındaki olağanüstü dayanıklılığı tüm ekibe azimle devam etme ilhamı verdi." },
  { id: "v-en-2", language: "english", langCode: "en-US", category: "work-business", word: "streamline", phonetic: "/ˈstriːm.laɪn/", translation: "Yalınlaştırmak / Verimli Kılmak", type: "Fiil", level: "B1", exampleTarget: "The management decided to streamline the production pipeline to minimize operational costs.", exampleTranslation: "Yönetim, operasyonel maliyetleri en aza indirmek için üretim sürecini verimli hale getirmeye karar verdi." },
  { id: "v-en-3", language: "english", langCode: "en-US", category: "cafe-travel", word: "itinerary", phonetic: "/aɪˈtɪn.ər.ər.i/", translation: "Gezi Programı / Seyahat Rotası", type: "İsim", level: "B1", exampleTarget: "Before boarding the flight, double-check your travel itinerary to ensure all hotel bookings are confirmed.", exampleTranslation: "Uçağa binmeden önce tüm otel rezervasyonlarının onaylandığından emin olmak için seyahat programınızı tekrar kontrol edin." },
  { id: "v-en-4", language: "english", langCode: "en-US", category: "cafe-travel", word: "coffee", phonetic: "/ˈkɒf.i/", translation: "Kahve", type: "İsim", level: "A1", exampleTarget: "I always order a strong black coffee to start my morning productively.", exampleTranslation: "Sabahıma verimli başlamak için her zaman koyu bir sade kahve sipariş ederim." },
  { id: "v-en-5", language: "english", langCode: "en-US", category: "city-emergency", word: "pharmacy", phonetic: "/ˈfɑː.mə.si/", translation: "Eczane", type: "İsim", level: "A1", exampleTarget: "Could you please direct me to the nearest 24-hour pharmacy in this neighborhood?", exampleTranslation: "Lütfen beni bu mahalledeki en yakın 24 saat açık eczaneye yönlendirebilir misiniz?" },

  // German
  { id: "v-de-1", language: "german", langCode: "de-DE", category: "cafe-travel", word: "Kaffee", phonetic: "[ˈkafe]", translation: "Kahve", type: "İsim (m)", level: "A1", exampleTarget: "Ich trinke morgens vor der Arbeit immer einen frisch gemahlenen Kaffee.", exampleTranslation: "Sabahları işten önce her zaman taze çekilmiş bir kahve içerim." },
  { id: "v-de-2", language: "german", langCode: "de-DE", category: "cafe-travel", word: "bestellen", phonetic: "[bəˈʃtɛlən]", translation: "Sipariş Vermek", type: "Fiil", level: "A1", exampleTarget: "Wir möchten gerne zwei Cappuccino und ein Stück Apfelkuchen bestellen.", exampleTranslation: "İki kapuçino ve bir dilim elmalı pasta sipariş etmek istiyoruz." },
  { id: "v-de-3", language: "german", langCode: "de-DE", category: "work-business", word: "Verantwortung", phonetic: "[fɛɐ̯ˈʔantvɔʁtʊŋ]", translation: "Sorumluluk", type: "İsim (f)", level: "B2", exampleTarget: "Als Projektleiter trägt er die volle Verantwortung für das Erreichen der Meilensteine.", exampleTranslation: "Proje lideri olarak, kilometre taşlarına ulaşılmasından tam sorumluluk taşır." },

  // Spanish
  { id: "v-es-1", language: "spanish", langCode: "es-ES", category: "cafe-travel", word: "café", phonetic: "/kaˈfe/", translation: "Kahve", type: "İsim", level: "A1", exampleTarget: "Por favor, tráigame un café cortado sin azúcar y un vaso de agua.", exampleTranslation: "Lütfen bana şekersiz bir cortado kahve ve bir bardak su getirin." },
  { id: "v-es-2", language: "spanish", langCode: "es-ES", category: "work-business", word: "desarrollo", phonetic: "/desaˈroʎo/", translation: "Geliştirme / İlerleme", type: "İsim", level: "B1", exampleTarget: "El desarrollo constante de nuevas habilidades es fundamental para el éxito profesional.", exampleTranslation: "Yeni becerilerin sürekli geliştirilmesi, mesleki başarı için esastır." },

  // French
  { id: "v-fr-1", language: "french", langCode: "fr-FR", category: "cafe-travel", word: "café", phonetic: "/ka.fe/", translation: "Kahve", type: "İsim (m)", level: "A1", exampleTarget: "J'aimerais commander un café crème avec un croissant au beurre, s'il vous plaît.", exampleTranslation: "Lütfen terayağlı bir kruvasan ile sütlü bir kahve sipariş etmek isterim." },
  { id: "v-fr-2", language: "french", langCode: "fr-FR", category: "daily-life", word: "habitude", phonetic: "/a.bi.tyd/", translation: "Alışkanlık", type: "İsim (f)", level: "B1", exampleTarget: "Prendre l'habitude de lire chaque soir améliore considérablement le vocabulaire.", exampleTranslation: "Her akşam okuma alışkanlığı edinmek kelime dağarcığını önemli ölçüde geliştirir." },

  // Portuguese
  { id: "v-pt-1", language: "portuguese", langCode: "pt-PT", category: "cafe-travel", word: "pastel de nata", phonetic: "/pɐʃˈtɛl dɨ ˈnatɐ/", translation: "Kremalı Çörek", type: "İsim", level: "A1", exampleTarget: "Sempre que me sento nesta esplanada, peço um café expresso e um pastel de nata quente.", exampleTranslation: "Ne zaman bu terasta otursam, sıcak bir espresso ve kremalı çörek söylerim." }
];

// Rich Contextual Grammar Data
const grammarGuides: GrammarLesson[] = [
  // German
  {
    id: "g-de-a1-1",
    language: "german",
    level: "A1",
    category: "nouns-articles",
    title: "Der, Die, Das — Almanca Artikel Hiyerarşisi",
    rule: "Almancada tüm isimler cinsiyetlerine göre Der (eril), Die (dişil) veya Das (nötr) belirli tanımlıklarını alır. İsimlerin baş harfi her zaman büyük yazılır.",
    examples: [
      { target: "Der Kaffee ist heiß und steht auf dem Tisch.", translation: "Kahve sıcak ve masanın üzerinde duruyor." },
      { target: "Die Sonne scheint heute sehr hell.", translation: "Güneş bugün çok parlak açıyor." },
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
      { target: "Heute lerne ich intensiv Deutsch.", translation: "Bugün yoğun şekilde Almanca öğreniyorum." }
    ]
  },

  // English
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

  // Spanish
  {
    id: "g-es-a1-1",
    language: "spanish",
    level: "A1",
    category: "tenses-verbs",
    title: "Ser vs Estar — Olmak Fiili Ayrımı",
    rule: "İspanyolcada 'Ser' öznel kimlik, milliyet, meslek ve kalıcı nitelikler için kullanılırken; 'Estar' konum, geçici duygu ve anlık durumlar için kullanılır.",
    examples: [
      { target: "Ella es arquitecta y es muy dedicada.", translation: "O mimardır ve çok özverilidir (kalıcı meslek/nitelik)." },
      { target: "Ella está en la oficina y está muy ocupada.", translation: "O ofistedir ve çok meşguldür (geçici konum/durum)." }
    ]
  },

  // French
  {
    id: "g-fr-a1-1",
    language: "french",
    level: "A1",
    category: "nouns-articles",
    title: "Les Articles Définis: Le, La, L', Les",
    rule: "Fransızca belirli tanımlıklar ismin cinsiyetine ve sessiz/sesli harfle başlamasına göre seçilir: Le (eril), La (dişil), L' (sesli harfle başlayan tekiller) ve Les (çoğul).",
    examples: [
      { target: "Le professeur explique la leçon clairement.", translation: "Öğretmen dersi anlaşılır şekilde açıklıyor." },
      { target: "L'étudiant écoute attentivement les conseils.", translation: "Öğrenci tavsiyeleri dikkatle dinliyor." }
    ]
  },

  // Portuguese
  {
    id: "g-pt-a1-1",
    language: "portuguese",
    level: "A1",
    category: "sentence-structure",
    title: "Verbos Ser e Estar em Português",
    rule: "Portekizce 'Ser' doğuştan gelen ve kalıcı durumları ifade ederken; 'Estar' konumu, hava durumunu ve geçici hisleri temsil eder.",
    examples: [
      { target: "Ele é engenheiro civil e muito competente.", translation: "O inşaat mühendisidir ve çok yetkindir." },
      { target: "Eles estão no escritório em Lisboa.", translation: "Onlar Lizbon'daki ofistedir." }
    ]
  }
];

// Rich Contextual Reading Data
const readingStories: ReadingStory[] = [
  // German
  {
    id: "r-de-1",
    language: "german",
    langCode: "de-DE",
    category: "travel-stories",
    title: "Ein Morgen im Berliner Café",
    summary: "Berlin'in tarihi Mitte semtindeki geleneksel bir kafede geçen sipariş ve sohbet diyalogu.",
    level: "A1",
    sentences: [
      { speaker: "Kellner", targetText: "Guten Tag! Willkommen im Café Mitte. Was darf ich Ihnen bringen?", translation: "İyi günler! Café Mitte'ye hoş geldiniz. Size ne getirebilirim?", audioText: "Guten Tag! Willkommen im Café Mitte. Was darf ich Ihnen bringen?" },
      { speaker: "Anna", targetText: "Ich hätte gerne einen heißen Cappuccino mit Hafermilch und ein frisches Croissant.", translation: "Yulaf sütlü sıcak bir kapuçino ve taze bir kruvasan almak isterim.", audioText: "Ich hätte gerne einen heißen Cappuccino mit Hafermilch und ein frisches Croissant." },
      { speaker: "Kellner", targetText: "Sehr gerne. Das macht zusammen vier Euro fünfzig. Zahlen Sie mit Karte?", translation: "Memnuniyetle. Toplam dört euro elli sent yapıyor. Kartla mı ödeyeceksiniz?", audioText: "Sehr gerne. Das macht zusammen vier Euro fünfzig. Zahlen Sie mit Karte?" }
    ]
  },

  // English
  {
    id: "r-en-1",
    language: "english",
    langCode: "en-US",
    category: "daily-dialogues",
    title: "Strategic Morning Briefing",
    summary: "Kurumsal bir teknoloji şirketindeki sabah toplantısı sohbeti.",
    level: "A1",
    sentences: [
      { speaker: "Sarah", targetText: "Good morning David! Did you review the quarterly product roadmap before our standup?", translation: "Günaydın David! Standup toplantımızdan önce çeyreklik ürün yol haritasını inceledin mi?", audioText: "Good morning David! Did you review the quarterly product roadmap before our standup?" },
      { speaker: "David", targetText: "Yes Sarah, all core metrics look promising and the new user feedback is overwhelmingly positive.", translation: "Evet Sarah, tüm temel metrikler umut verici görünüyor ve yeni kullanıcı geri bildirimleri son derece olumlu.", audioText: "Yes Sarah, all core metrics look promising and the new user feedback is overwhelmingly positive." }
    ]
  },

  // Spanish
  {
    id: "r-es-1",
    language: "spanish",
    langCode: "es-ES",
    category: "travel-stories",
    title: "Un café en el centro de Madrid",
    summary: "Madrid'in merkezindeki tarihi Plaza Mayor meydanında kahve siparişi.",
    level: "A1",
    sentences: [
      { speaker: "Camarero", targetText: "¡Buenos días! ¿Qué se le ofrece tomar en esta hermosa mañana?", translation: "Günaydın! Bu güzel sabahta ne almak istersiniz?", audioText: "¡Buenos días! ¿Qué se le ofrece tomar en esta hermosa mañana?" },
      { speaker: "Carlos", targetText: "Un café con leche bien caliente y la cuenta, por favor.", translation: "Sıcak bir sütlü kahve ve hesap lütfen.", audioText: "Un café con leche bien caliente y la cuenta por favor." }
    ]
  },

  // French
  {
    id: "r-fr-1",
    language: "french",
    langCode: "fr-FR",
    category: "daily-dialogues",
    title: "Un matin à la boulangerie parisienne",
    summary: "Paris'te tipik bir fırın siparişi diyalogu.",
    level: "A1",
    sentences: [
      { speaker: "Boulanger", targetText: "Bonjour Madame! Que désiriez-vous aujourd'hui?", translation: "Günaydın Hanımefendi! Bugün ne arzu ederdiniz?", audioText: "Bonjour Madame! Que désiriez-vous aujourd'hui?" },
      { speaker: "Marie", targetText: "Un croissant au beurre frais et un café crème, s'il vous plaît.", translation: "Taze tereyağlı bir kruvasan ve sütlü bir kahve lütfen.", audioText: "Un croissant au beurre frais et un café crème s'il vous plaît." }
    ]
  },

  // Portuguese
  {
    id: "r-pt-1",
    language: "portuguese",
    langCode: "pt-PT",
    category: "travel-stories",
    title: "Uma manhã tradicional em Lisboa",
    summary: "Lizbon'un tarihi Chiado semtinde kafe sohbeti.",
    level: "A1",
    sentences: [
      { speaker: "Garçom", targetText: "Bom dia! Seja bem-vindo ao Chiado. O que deseja tomar?", translation: "Günaydın! Chiado'ya hoş geldiniz. Ne almak istersiniz?", audioText: "Bom dia! Seja bem-vindo ao Chiado. O que deseja tomar?" },
      { speaker: "João", targetText: "Um café expresso forte e um pastel de nata bem quente, por favor.", translation: "Sert bir espresso ve çok sıcak bir kremalı çörek lütfen.", audioText: "Um café expresso forte e um pastel de nata bem quente por favor." }
    ]
  }
];

// Rich Contextual Listening Data
const listeningItems: ListeningItem[] = [
  // German
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

  // English
  {
    id: "l-en-1",
    language: "english",
    langCode: "en-US",
    category: "social-chat",
    level: "A1",
    title: "Listening Practice: Strategic Greeting",
    targetText: "It is an absolute pleasure to meet you at this conference!",
    translation: "Bu konferansta sizinle tanışmak mutlak bir zevkti!",
    options: [
      "It is an absolute pleasure to meet you at this conference!",
      "Good night see you at the airport tomorrow.",
      "Where can I find the nearest pharmacy around here?"
    ]
  },

  // Spanish
  {
    id: "l-es-1",
    language: "spanish",
    langCode: "es-ES",
    category: "social-chat",
    level: "A1",
    title: "Práctica de escucha: Saludo Profesional",
    targetText: "¡Es un verdadero placer conocerlo en esta reunión!",
    translation: "Bu toplantıda sizinle tanışmak gerçek bir zevkti!",
    options: [
      "¡Es un verdadero placer conocerlo en esta reunión!",
      "Hasta luego mi amigo nos vemos mañana.",
      "Por favor tráigame la cuenta inmediatamente."
    ]
  },

  // French
  {
    id: "l-fr-1",
    language: "french",
    langCode: "fr-FR",
    category: "social-chat",
    level: "A1",
    title: "Pratique d'écoute: Salutation Professionnelle",
    targetText: "C'est un véritable plaisir de vous rencontrer aujourd'hui!",
    translation: "Bugün sizinle tanışmak gerçek bir zevkti!",
    options: [
      "C'est un véritable plaisir de vous rencontrer aujourd'hui!",
      "Au revoir à demain matin à l'aéroport.",
      "Un café crème s'il vous plaît."
    ]
  },

  // Portuguese
  {
    id: "l-pt-1",
    language: "portuguese",
    langCode: "pt-PT",
    category: "social-chat",
    level: "A1",
    title: "Prática de escuta: Saudação Profissional",
    targetText: "É um enorme prazer conhecê-lo nesta conferência!",
    translation: "Bu konferansta sizinle tanışmak büyük bir zevkti!",
    options: [
      "É um enorme prazer conhecê-lo nesta conferência!",
      "Boa noite até amanhã de manhã.",
      "Onde fica a farmácia mais próxima?"
    ]
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
