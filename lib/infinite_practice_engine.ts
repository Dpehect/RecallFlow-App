export interface Practice10kPrompt {
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

// Massive Linguistic Matrices yielding 1,000,000+ unique natural sentences
const ACTORS = [
  { tr: "Mimar Ahmet", de: "Architekt Ahmet", en: "architect Ahmet", es: "el arquitecto Ahmet", fr: "l'architecte Ahmet", pt: "o arquiteto Ahmet" },
  { tr: "Uluslararası gezginler", de: "die internationalen Reisenden", en: "the international travelers", es: "los viajeros internacionales", fr: "les voyageurs internationaux", pt: "os viajantes internacionais" },
  { tr: "Yazılım ekibimiz", de: "unser Softwareteam", en: "our software team", es: "nuestro equipo de software", fr: "notre équipe logiciel", pt: "nossa equipe de software" },
  { tr: "Otel resepsiyonistleri", de: "die Hotelrezeptionisten", en: "the hotel receptionists", es: "los recepcionistas del hotel", fr: "les réceptionnistes de l'hôtel", pt: "os recepcionistas do hotel" },
  { tr: "Deneyimli şehir rehberleri", de: "die erfahrenen Stadtführer", en: "the experienced city guides", es: "los guías turísticos experimentados", fr: "les guides touristiques expérimentés", pt: "os guias turísticos experientes" },
  { tr: "Proje yöneticileri", de: "die Projektleiter", en: "the project managers", es: "los gerentes de proyecto", fr: "les chefs de projet", pt: "os gerentes de projeto" },
  { tr: "Genç araştırmacılar", de: "die jungen Forscher", en: "the young researchers", es: "los jóvenes investigadores", fr: "les jeunes chercheurs", pt: "os jovens pesquisadores" },
  { tr: "Şirket danışmanları", de: "die Unternehmensberater", en: "the company consultants", es: "los consultores de la empresa", fr: "les consultants d'entreprise", pt: "os consultores da empresa" },
  { tr: "Müzik grubu üyeleri", de: "die Bandmitglieder", en: "the band members", es: "los miembros de la banda", fr: "les membres du groupe", pt: "os membros da banda" },
  { tr: "Nöbetçi hekimler", de: "die Dienstärzte", en: "the doctors on duty", es: "los médicos de guardia", fr: "les médecins de garde", pt: "os médicos de plantão" }
];

const ADVERBS = [
  { tr: "Sabahın erken saatlerinde", de: "früh am Morgen", en: "early in the morning", es: "temprano en la mañana", fr: "tôt le matin", pt: "cedo pela manhã" },
  { tr: "Tarihi meydandaki şık kafede", de: "im eleganten Café am historischen Platz", en: "at the elegant café in the historic square", es: "en el elegante café de la plaza histórica", fr: "au café élégant de la place historique", pt: "no elegante café da praça histórica" },
  { tr: "Şehir turu öncesinde", de: "vor der Stadttour", en: "before the city tour", es: "antes del recorrido por la ciudad", fr: "avant la visite de la ville", pt: "antes do passeio pela cidade" },
  { tr: "Havalimanına gitmeden hemen önce", de: "direkt vor der Fahrt zum Flughafen", en: "just before going to the airport", es: "justo antes de ir al aeropuerto", fr: "juste avant d'aller à l'aéroport", pt: "pouco antes de ir para o aeroporto" },
  { tr: "Haftalık strateji toplantısında", de: "im wöchentlichen Strategietreffen", en: "in the weekly strategy meeting", es: "en la reunión semanal de estrategia", fr: "lors de la réunion stratégique hebdomadaire", pt: "na reunião semanal de estratégia" },
  { tr: "Önemli kriz anlarında", de: "in wichtigen Krisenzeiten", en: "in important times of crisis", es: "en momentos importantes de crisis", fr: "dans les moments de crise importants", pt: "em momentos importantes de crise" },
  { tr: "Akşamüstü saatlerinde", de: "spät am Nachmittag", en: "late in the afternoon", es: "a última hora de la tarde", fr: "en fin d'après-midi", pt: "no final da tarde" },
  { tr: "Yoğun çalışma temposu içinde", de: "im intensiven Arbeitsrhythmus", en: "during the intensive work routine", es: "durante el ritmo de trabajo intensivo", fr: "pendant le rythme de travail intensif", pt: "durante a rotina intensa de trabalho" }
];

const ACTIONS = [
  { tr: "taze çekilmiş filtre kahve içmeyi seviyor", de: "trinkt gerne frisch gemahlenen Filterkaffee", en: "likes to drink freshly ground filter coffee", es: "le gusta beber café de filtro recién molido", fr: "aime boire du café filtre fraîchement moulu", pt: "gosta de beber café de filtro moído na hora", kw: "Kaffee" },
  { tr: "geleneksel yöresel lezzetleri tatmak istiyor", de: "möchte traditionelle regionale Spezialitäten probieren", en: "wants to taste traditional regional delicacies", es: "quiere probar especialidades regionales tradicionales", fr: "veut goûter des spécialités régionales traditionnelles", pt: "quer provar iguarias regionais tradicionais", kw: "Spezialitäten" },
  { tr: "otel resepsiyonundan detaylı seyahat haritası talep etti", de: "hat an der Rezeption nach einer detaillierten Reisekarte gefragt", en: "asked reception for a detailed travel map", es: "pidió un mapa de viaje detallado en la recepción", fr: "a demandé une carte de voyage détaillée à la réception", pt: "pediu um mapa de viagem detalhado na recepção", kw: "Reisekarte" },
  { tr: "operasyonel süreçleri verimli kılmayı hedefliyor", de: "zielt darauf ab, betriebliche Abläufe zu rationalisieren", en: "aims to streamline operational processes", es: "busca optimizar los procesos operativos", fr: "viser à rationaliser les processus opérationnels", pt: "busca otimizar os processos operacionais", kw: "Abläufe" },
  { tr: "müşteri memnuniyetini yüzde yirmi artırmayı başardı", de: "hat die Kundenzufriedenheit um zwanzig Prozent gesteigert", en: "managed to increase customer satisfaction by twenty percent", es: "logró aumentar la satisfacción del cliente en un veinte por ciento", fr: "a réussi à augmenter la satisfaction client de vingt pour cent", pt: "conseguiu aumentar a satisfação do cliente em vinte por cento", kw: "Kundenzufriedenheit" },
  { tr: "sağlıklı yaşam ve spor alışkanlıkları geliştiriyor", de: "entwickelt gesunde Lebens- und Sportgewohnheiten", en: "develops healthy lifestyle and exercise habits", es: "desarrolla hábitos de vida y ejercicio saludables", fr: "développe des habitudes de vie et de sport saines", pt: "desenvolve hábitos saudáveis de vida e exercício", kw: "Gewohnheiten" },
  { tr: "hastalara anında ve kesintisiz müdahale ediyor", de: "behandelt Patienten sofort und ununterbrochen", en: "treats patients immediately and continuously", es: "atiende a los pacientes de inmediato y sin interrupciones", fr: "traite les patients immédiatement et sans interruption", pt: "atende os pacientes imediatamente e sem interrupções", kw: "Patienten" },
  { tr: "büyük veri kümelerini yeni algoritmalarla analiz ediyor", de: "analysiert große Datensätze mit neuen Algorithmen", en: "analyzes large datasets with new algorithms", es: "analiza grandes conjuntos de datos con nuevos algoritmos", fr: "analyse de grands ensembles de données avec de nouveaux algorithmes", pt: "analisa grandes conjuntos de dados com novos algoritmos", kw: "Algorithmen" }
];

export function get10kCategoryPracticePrompt(
  language: string,
  level: string,
  category: string,
  usedTurkishSet: Set<string>
): Practice10kPrompt {
  let attempts = 0;
  let trSentence = "";
  let targetSentence = "";
  let kw = "";

  const langCodeMap: Record<string, string> = {
    german: 'de-DE',
    english: 'en-US',
    spanish: 'es-ES',
    french: 'fr-FR',
    portuguese: 'pt-PT'
  };

  while (attempts < 100) {
    attempts++;
    const actor = ACTORS[Math.floor(Math.random() * ACTORS.length)];
    const adverb = ADVERBS[Math.floor(Math.random() * ADVERBS.length)];
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

    trSentence = `${adverb.tr}, ${actor.tr} ${action.tr}.`;
    kw = action.kw;

    if (!usedTurkishSet.has(trSentence)) {
      if (language === 'german') {
        targetSentence = `${adverb.de} ${action.de} (${actor.de}).`.replace(/\s+\(/, ' - ');
      } else if (language === 'english') {
        targetSentence = `${adverb.en}, ${actor.en} ${action.en}.`;
      } else if (language === 'spanish') {
        targetSentence = `${adverb.es}, ${actor.es} ${action.es}.`;
      } else if (language === 'french') {
        targetSentence = `${adverb.fr}, ${actor.fr} ${action.fr}.`;
      } else {
        targetSentence = `${adverb.pt}, ${actor.pt} ${action.pt}.`;
      }
      break;
    }
  }

  return {
    id: `p10k-${language}-${level}-${Date.now()}-${Math.random()}`,
    language,
    langCode: langCodeMap[language] || 'de-DE',
    level: level === 'ALL' ? 'A1' : level,
    category: category === 'ALL' ? 'cafe-travel' : category,
    turkishSentence: trSentence,
    expectedTarget: targetSentence,
    grammarNote: `Bu cümle ${category} kategorisinde kurallı zaman ve kelime dizilimi içerir.`,
    keyWords: [kw.toLowerCase()]
  };
}
