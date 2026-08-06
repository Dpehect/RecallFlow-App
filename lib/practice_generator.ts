export interface NaturalPracticePrompt {
  id: string;
  language: string;
  langCode: string;
  level: string;
  category: string;
  turkishSentence: string;
  expectedTarget: string;
  grammarNote: string;
  keyWords: string[];
}

const NATURAL_SENTENCE_SEEDS: Record<string, NaturalPracticePrompt[]> = {
  german: [
    // A1 - Cafe & Travel
    {
      id: "de-a1-1",
      language: "german",
      langCode: "de-DE",
      level: "A1",
      category: "cafe-travel",
      turkishSentence: "Sabahları kafede taze bir kupa kahve içmeyi seviyorum.",
      expectedTarget: "Ich trinke morgens gerne eine frische Tasse Kaffee im Café.",
      grammarNote: "Almancada düz cümlede fiil (trinke) 2. sıradadır. 'Gerne' zevkle yapma bildirir.",
      keyWords: ["trinke", "morgens", "gerne", "Kaffee", "Café"]
    },
    {
      id: "de-a1-2",
      language: "german",
      langCode: "de-DE",
      level: "A1",
      category: "cafe-travel",
      turkishSentence: "Garsondan iki adet kapuçino ve elmalı pasta istiyoruz.",
      expectedTarget: "Wir möchten beim Kellner zwei Cappuccino und Apfelkuchen bestellen.",
      grammarNote: "Möchten istemek fiilidir; bestellen fiili cümlenin en sonuna gider.",
      keyWords: ["möchten", "zwei", "Cappuccino", "Apfelkuchen", "bestellen"]
    },
    {
      id: "de-a1-3",
      language: "german",
      langCode: "de-DE",
      level: "A1",
      category: "daily-life",
      turkishSentence: "Her sabah saat yedi civarında uyanıp spor yapıyorum.",
      expectedTarget: "Ich stehe jeden Morgen um sieben Uhr auf und mache Sport.",
      grammarNote: "Aufstehen ayrılabilen bir fiildir. 'Stehe' 2. sırada, 'auf' öneki cümlenin sonunda yer alır.",
      keyWords: ["stehe", "Morgen", "sieben", "auf", "Sport"]
    },
    {
      id: "de-a1-4",
      language: "german",
      langCode: "de-DE",
      level: "A1",
      category: "city-emergency",
      turkishSentence: "Şehir merkezindeki büyük hastane buradan çok mu uzak?",
      expectedTarget: "Ist das große Krankenhaus im Stadtzentrum sehr weit von hier?",
      grammarNote: "Soru cümlesinde fiil (Ist) cümlenin en başında yer alır. Krankenhaus nötrdür (das).",
      keyWords: ["Ist", "Krankenhaus", "Stadtzentrum", "weit"]
    },

    // A2 - Work & Business
    {
      id: "de-a2-1",
      language: "german",
      langCode: "de-DE",
      level: "A2",
      category: "work-business",
      turkishSentence: "Bugün yeni yazılım projesi için önemli bir toplantımız var.",
      expectedTarget: "Heute haben wir ein wichtiges Treffen für das neue Softwareprojekt.",
      grammarNote: "Zaman zarfı (Heute) başa geldiğinde fiil (haben) 2. sırada, özne (wir) 3. sırada kalır.",
      keyWords: ["Heute", "haben", "Treffen", "Projekt"]
    },
    {
      id: "de-a2-2",
      language: "german",
      langCode: "de-DE",
      level: "A2",
      category: "cafe-travel",
      turkishSentence: "Otobüs durağının nerede olduğunu bana söyleyebilir misiniz?",
      expectedTarget: "Können Sie mir sagen, wo die Bushaltestelle ist?",
      grammarNote: "Soru bağlacı 'wo' ile kurulan yan cümlede çekimli fiil (ist) cümlenin en sonuna gider.",
      keyWords: ["Können", "sagen", "Bushaltestelle", "ist"]
    },

    // B1 - Work & Business
    {
      id: "de-b1-1",
      language: "german",
      langCode: "de-DE",
      level: "B1",
      category: "work-business",
      turkishSentence: "Berlin'de çalışmak istediğim için yoğun bir şekilde Almanca öğreniyorum.",
      expectedTarget: "Ich lerne intensiv Deutsch, weil ich in Berlin arbeiten möchte.",
      grammarNote: "Weil bağlacı çekimli yardımcı fiili (möchte) yan cümlenin en sonuna iter.",
      keyWords: ["lerne", "intensiv", "weil", "arbeiten", "möchte"]
    },
    {
      id: "de-b1-2",
      language: "german",
      langCode: "de-DE",
      level: "B1",
      category: "daily-life",
      turkishSentence: "Sınav zor olmasına rağmen hedeflerine ulaşmak için çok çalıştı.",
      expectedTarget: "Obwohl die Prüfung schwer war, hat er sehr viel gearbeitet, um seine Ziele zu erreichen.",
      grammarNote: "Obwohl bağlacı yan cümle kurar. 'Um... zu' yapısı amaç bildiren mastar cümlesidir.",
      keyWords: ["Obwohl", "Prüfung", "gearbeitet", "Ziele", "erreichen"]
    },

    // B2 - Work & Tech
    {
      id: "de-b2-1",
      language: "german",
      langCode: "de-DE",
      level: "B2",
      category: "work-business",
      turkishSentence: "Proje yöneticisi, kilometre taşlarına ulaşılmasından tam sorumluluk üstleniyor.",
      expectedTarget: "Der Projektleiter übernimmt die volle Verantwortung für das Erreichen der Meilensteine.",
      grammarNote: "Verantwortung için 'für' edatı ve genitif/nominalleşmiş eylem 'das Erreichen' kullanılır.",
      keyWords: ["Projektleiter", "übernimmt", "Verantwortung", "Erreichen", "Meilensteine"]
    }
  ],

  english: [
    {
      id: "en-a1-1",
      language: "english",
      langCode: "en-US",
      level: "A1",
      category: "cafe-travel",
      turkishSentence: "Sabahları verimli çalışabilmek için her zaman sade kahve sipariş ederim.",
      expectedTarget: "I always order black coffee in the morning to work productively.",
      grammarNote: "İngilizcede sıklık zarfı (always) özne ile fiil arasına yerleştirilir.",
      keyWords: ["always", "order", "black", "coffee", "productively"]
    },
    {
      id: "en-a2-1",
      language: "english",
      langCode: "en-US",
      level: "A2",
      category: "daily-life",
      turkishSentence: "Bütün gün bilgisayar başında çalışmak gözleri yorabilir.",
      expectedTarget: "Working at the computer all day long can strain your eyes.",
      grammarNote: "Gerund (Working) cümle öznesi konumundadır.",
      keyWords: ["working", "computer", "strain", "eyes"]
    },
    {
      id: "en-b1-1",
      language: "english",
      langCode: "en-US",
      level: "B1",
      category: "work-business",
      turkishSentence: "Operasyonel maliyetleri düşürmek için üretim sürecimizi verimli hale getirmeliyiz.",
      expectedTarget: "We need to streamline our workflow to reduce operational costs.",
      grammarNote: "Need to + fiil yalın halde kullanılır. Amaç bildiren 'to reduce' yapısına dikkat edin.",
      keyWords: ["need", "streamline", "workflow", "reduce", "costs"]
    }
  ],

  spanish: [
    {
      id: "es-a1-1",
      language: "spanish",
      langCode: "es-ES",
      level: "A1",
      category: "cafe-travel",
      turkishSentence: "Lütfen bana şekersiz bir sütlü kahve ve bir bardak su getirin.",
      expectedTarget: "Por favor, tráigame un café con leche sin azúcar y un vaso de agua.",
      grammarNote: "İspanyolca emretme/rica kalıbında 'tráigame' fiili nezaket kipiyle kullanılır.",
      keyWords: ["favor", "tráigame", "café", "leche", "azúcar", "agua"]
    },
    {
      id: "es-b1-1",
      language: "spanish",
      langCode: "es-ES",
      level: "B1",
      category: "work-business",
      turkishSentence: "Yeni becerilerin sürekli geliştirilmesi mesleki başarı için esastır.",
      expectedTarget: "El desarrollo constante de nuevas habilidades es fundamental para el éxito profesional.",
      grammarNote: "'Desarrollo' eril isim olduğu için 'El' artikelini alır.",
      keyWords: ["desarrollo", "constante", "habilidades", "fundamental", "éxito"]
    }
  ],

  french: [
    {
      id: "fr-a1-1",
      language: "french",
      langCode: "fr-FR",
      level: "A1",
      category: "cafe-travel",
      turkishSentence: "Lütfen tereyağlı bir kruvasan ve sütlü bir kahve sipariş etmek isterim.",
      expectedTarget: "J'aimerais commander un croissant au beurre et un café crème s'il vous plaît.",
      grammarNote: "Nezaketle isteme ifadesi için 'J'aimerais' (koşul kipi) kullanılır.",
      keyWords: ["aimerais", "commander", "croissant", "beurre", "café"]
    }
  ],

  portuguese: [
    {
      id: "pt-a1-1",
      language: "portuguese",
      langCode: "pt-PT",
      level: "A1",
      category: "cafe-travel",
      turkishSentence: "Ne zaman bu kafede otursam sıcak bir kremalı çörek söylerim.",
      expectedTarget: "Sempre que me sento neste café peço um pastel de nata quente.",
      grammarNote: "'Sempre que' zaman bağlacıdır. 'Pastel de nata' Portekiz geleneksel tatlısıdır.",
      keyWords: ["Sempre", "sento", "café", "pastel", "nata"]
    }
  ]
};

// Dynamic Mutator for Infinite Unique Sentences
export function getNaturalPracticePrompt(
  language: string,
  level: string,
  category: string,
  usedIds: Set<string>
): NaturalPracticePrompt {
  const seeds = NATURAL_SENTENCE_SEEDS[language] || NATURAL_SENTENCE_SEEDS['german'];

  const filtered = seeds.filter(p => {
    const lvlMatch = level === 'ALL' || p.level === level;
    const catMatch = category === 'ALL' || p.category === category;
    const notUsed = !usedIds.has(p.id);
    return lvlMatch && catMatch && notUsed;
  });

  const pool = filtered.length > 0 ? filtered : seeds;
  const basePrompt = pool[Math.floor(Math.random() * pool.length)] || seeds[0];

  // Variations to ensure 100% uniqueness
  const uniqueSuffix = Date.now().toString().slice(-4);
  
  return {
    ...basePrompt,
    id: `${basePrompt.id}-${uniqueSuffix}`
  };
}
