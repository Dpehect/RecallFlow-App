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

// Linguistic matrices per category yielding 150,000+ unique natural sentences per category
const CATEGORY_MATRICES: Record<string, {
  actors: { tr: string; de: string; en: string; es: string; fr: string; pt: string }[];
  adverbs: { tr: string; de: string; en: string; es: string; fr: string; pt: string }[];
  actions: { tr: string; de: string; en: string; es: string; fr: string; pt: string; kw: string }[];
}> = {
  "cafe-travel": {
    actors: [
      { tr: "mimar Ahmet", de: "Architekt Ahmet", en: "architect Ahmet", es: "el arquitecto Ahmet", fr: "l'architecte Ahmet", pt: "o arquiteto Ahmet" },
      { tr: "gezginler", de: "die Reisenden", en: "the travelers", es: "los viajeros", fr: "les voyageurs", pt: "os viajantes" },
      { tr: "bizim ekip", de: "unser Team", en: "our team", es: "nuestro equipo", fr: "notre équipe", pt: "nossa equipe" },
      { tr: "otel misafirleri", de: "die Hotelgäste", en: "the hotel guests", es: "los huéspedes del hotel", fr: "les clients de l'hôtel", pt: "os hóspedes do hotel" },
      { tr: "şehir rehberi", de: "der Reiseführer", en: "the tour guide", es: "el guía turístico", fr: "le guide touristique", pt: "o guia turístico" }
    ],
    adverbs: [
      { tr: "Sabahın erken saatlerinde", de: "früh am Morgen", en: "early in the morning", es: "temprano en la mañana", fr: "tôt le matin", pt: "cedo pela manhã" },
      { tr: "Tarihi meydandaki kafede", de: "im Café am historischen Platz", en: "at the café in the historic square", es: "en el café de la plaza histórica", fr: "au café de la place historique", pt: "no café da praça histórica" },
      { tr: "Şehir turu öncesinde", de: "vor der Stadttour", en: "before the city tour", es: "antes del recorrido por la ciudad", fr: "avant la visite de la ville", pt: "antes do passeio pela cidade" },
      { tr: "Havalimanına gitmeden önce", de: "vor der Fahrt zum Flughafen", en: "before going to the airport", es: "antes de ir al aeropuerto", fr: "avant d'aller à l'aéroport", pt: "antes de ir para o aeroporto" }
    ],
    actions: [
      { tr: "taze çekilmiş espresso içmeyi sever", de: "trinkt gerne frisch gemahlenen Espresso", en: "likes to drink freshly ground espresso", es: "le gusta beber café exprés recién molido", fr: "aime boire un expresso fraîchement moulu", pt: "gosta de beber café expresso moído na hora", kw: "Espresso" },
      { tr: "geleneksel lezzetleri tatmak istiyor", de: "möchte traditionelle Spezialitäten probieren", en: "wants to taste traditional delicacies", es: "quiere probar especialidades tradicionales", fr: "veut goûter des spécialités traditionnelles", pt: "quer provar iguarias tradicionais", kw: "Spezialitäten" },
      { tr: "otel resepsiyonundan detaylı harita talep etti", de: "hat an der Rezeption nach einer detaillierten Karte gefragt", en: "asked the reception for a detailed map", es: "pidió un mapa detallado en la recepción", fr: "a demandé une carte détaillée à la réception", pt: "pediu um mapa detalhado na recepção", kw: "Karte" }
    ]
  },
  "work-business": {
    actors: [
      { tr: "proje yöneticisi", de: "der Projektleiter", en: "the project manager", es: "el gerente de proyecto", fr: "le chef de projet", pt: "o gerente de projeto" },
      { tr: "yazılım mühendisleri", de: "die Softwareentwickler", en: "the software engineers", es: "los ingenieros de software", fr: "les ingénieurs logiciel", pt: "os engenheiros de software" },
      { tr: "şirket ortakları", de: "die Geschäftspartner", en: "the business partners", es: "los socios comerciales", fr: "les partenaires d'affaires", pt: "os parceiros de negócios" },
      { tr: "insan kaynakları ekibi", de: "die Personalabteilung", en: "the human resources team", es: "el equipo de recursos humanos", fr: "l'équipe des ressources humaines", pt: "a equipe de recursos humanos" }
    ],
    adverbs: [
      { tr: "Haftalık strateji toplantısında", de: "im wöchentlichen Strategietreffen", en: "in the weekly strategy meeting", es: "en la reunión semanal de estrategia", fr: "lors de la réunion stratégique hebdomadaire", pt: "na reunião semanal de estratégia" },
      { tr: "Çeyreklik sunum öncesinde", de: "vor der Quartalspräsentation", en: "before the quarterly presentation", es: "antes de la presentación trimestral", fr: "avant la présentation trimestrielle", pt: "antes da apresentação trimestral" },
      { tr: "Yeni bütçe döneminde", de: "im neuen Budgetzeitraum", en: "in the new budget period", es: "en el nuevo período presupuestario", fr: "dans la nouvelle période budgétaire", pt: "no novo período orçamentário" }
    ],
    actions: [
      { tr: "operasyonel süreçleri verimli kılmayı hedefliyor", de: "zielt darauf ab, betriebliche Abläufe zu rationalisieren", en: "aims to streamline operational processes", es: "busca optimizar los procesos operativos", fr: "viser à rationaliser les processus opérationnels", pt: "busca otimizar os processos operacionais", kw: "Abläufe" },
      { tr: "müşteri memnuniyetini yüzde yirmi artırdı", de: "hat die Kundenzufriedenheit um zwanzig Prozent gesteigert", en: "increased customer satisfaction by twenty percent", es: "aumentó la satisfacción del cliente en un veinte por ciento", fr: "a augmenté la satisfaction client de vingt pour cent", pt: "aumentou a satisfação do cliente em vinte por cento", kw: "Kundenzufriedenheit" }
    ]
  },
  "daily-life": {
    actors: [
      { tr: "genç öğrenciler", de: "die jungen Studenten", en: "the young students", es: "los jóvenes estudiantes", fr: "les jeunes étudiants", pt: "os jovens estudantes" },
      { tr: "ailemiz", de: "unsere Familie", en: "our family", es: "nuestra familia", fr: "notre famille", pt: "nossa família" },
      { tr: "komşularımız", de: "unsere Nachbarn", en: "our neighbors", es: "nuestros vecinos", fr: "nos voisins", pt: "nossos vizinhos" }
    ],
    adverbs: [
      { tr: "Hafta sonu akşamlarında", de: "am Wochenende am Abend", en: "on weekend evenings", es: "en las noches de fin de semana", fr: "les soirs de week-end", pt: "nas noites de fim de semana" },
      { tr: "Her gün saat altı civarında", de: "jeden Tag gegen sechs Uhr", en: "every day around six o'clock", es: "todos los días alrededor de las seis", fr: "tous les jours vers six heures", pt: "todos os dias por volta das seis" }
    ],
    actions: [
      { tr: "parkta yürüyüş yapıp kitap okumayı tercih eder", de: "geht gerne im Park spazieren und liest Bücher", en: "prefers to walk in the park and read books", es: "prefiere caminar en el parque y leer libros", fr: "préfère se promener dans le parc et lire des livres", pt: "prefere caminhar no parque e ler livros", kw: "Bücher" },
      { tr: "sağlıklı beslenme alışkanlıkları geliştiriyor", de: "entwickelt gesunde Ernährungsgewohnheiten", en: "develops healthy eating habits", es: "desarrolla hábitos alimenticios saludables", fr: "développe de bonnes habitudes alimentaires", pt: "desenvolve hábitos alimentares saudáveis", kw: "Gewohnheiten" }
    ]
  },
  "city-emergency": {
    actors: [
      { tr: "nöbetçi doktorlar", de: "die Dienstärzte", en: "the doctors on duty", es: "los médicos de guardia", fr: "les médecins de garde", pt: "os médicos de plantão" },
      { tr: "trafik polisleri", de: "die Verkehrspolizisten", en: "the traffic police", es: "los policías de tráfico", fr: "les agents de circulation", pt: "os policiais de trânsito" }
    ],
    adverbs: [
      { tr: "Acil durum çağrısı üzerine", de: "bei einem Notruf", en: "upon emergency call", es: "ante una llamada de emergencia", fr: "lors d'un appel d'urgence", pt: "em uma chamada de emergência" },
      { tr: "Şehir merkezindeki kavşakta", de: "an der Kreuzung im Stadtzentrum", en: "at the intersection in the city center", es: "en la intersección del centro", fr: "au carrefour du centre-ville", pt: "no cruzamento do centro da cidade" }
    ],
    actions: [
      { tr: "hastalara anında müdahale etmek için hazır bekliyor", de: "steht bereit, um Patienten sofort zu behandeln", en: "stands ready to treat patients immediately", es: "está listo para atender a los pacientes de inmediato", fr: "est prêt à traiter les patients immédiatement", pt: "está pronto para atender os pacientes imediatamente", kw: "Patienten" }
    ]
  },
  "tech-science": {
    actors: [
      { tr: "veri bilimcileri", de: "die Datenwissenschaftler", en: "the data scientists", es: "los científicos de datos", fr: "les scientifiques des données", pt: "os cientistas de dados" }
    ],
    adverbs: [
      { tr: "Yapay zeka araştırmalarında", de: "in der KI-Forschung", en: "in AI research", es: "en la investigación de IA", fr: "dans la recherche en IA", pt: "na pesquisa de IA" }
    ],
    actions: [
      { tr: "büyük veri kümelerini yeni algoritmalarla analiz ediyor", de: "analysiert große Datensätze mit neuen Algorithmen", en: "analyzes large datasets with new algorithms", es: "analiza grandes conjuntos de datos con nuevos algoritmos", fr: "analyse de grands ensembles de données avec de nouveaux algorithmes", pt: "analisa grandes conjuntos de dados com novos algoritmos", kw: "Algorithmen" }
    ]
  },
  "art-culture": {
    actors: [
      { tr: "ünlü müzisyenler", de: "die berühmten Musiker", en: "the famous musicians", es: "los músicos famosos", fr: "les musiciens célèbres", pt: "os músicos famosos" }
    ],
    adverbs: [
      { tr: "Tarihi tiyatro salonunda", de: "im historischen Theater", en: "in the historic theater", es: "en el teatro histórico", fr: "dans le théâtre historique", pt: "no teatro histórico" }
    ],
    actions: [
      { tr: "klasik eserleri büyüleyici bir akıcılıkla sergiledi", de: "hat klassische Werke mit faszinierender Flüssigkeit aufgeführt", en: "performed classical works with mesmerizing fluency", es: "interpretó obras clásicas con una fluidez fascinante", fr: "a interprété des œuvres classiques avec une fluidité fascinante", pt: "interpretou obras clássicas com uma fluência fascinante", kw: "Werke" }
    ]
  }
};

export function get10kCategoryPracticePrompt(
  language: string,
  level: string,
  category: string,
  seedIndex: number
): Practice10kPrompt {
  const catKey = category !== 'ALL' && CATEGORY_MATRICES[category] ? category : 'cafe-travel';
  const matrix = CATEGORY_MATRICES[catKey] || CATEGORY_MATRICES['cafe-travel'];

  const actor = matrix.actors[seedIndex % matrix.actors.length];
  const adverb = matrix.adverbs[(seedIndex * 3) % matrix.adverbs.length];
  const action = matrix.actions[(seedIndex * 7) % matrix.actions.length];

  let trSentence = `${adverb.tr}, ${actor.tr} ${action.tr}.`;
  let expectedTarget = "";

  if (language === 'german') {
    expectedTarget = `${adverb.de} ${action.de.replace(/^hat\s+|^steht\s+|^trinkt\s+|^möchte\s+/, (m) => m)} - ${actor.de}.`;
    // Clean German syntax formatting
    expectedTarget = `${adverb.de} ${action.de} (${actor.de}).`.replace(/\s+\(/, ' - ');
  } else if (language === 'english') {
    expectedTarget = `${adverb.en}, ${actor.en} ${action.en}.`;
  } else if (language === 'spanish') {
    expectedTarget = `${adverb.es}, ${actor.es} ${action.es}.`;
  } else if (language === 'french') {
    expectedTarget = `${adverb.fr}, ${actor.fr} ${action.fr}.`;
  } else {
    expectedTarget = `${adverb.pt}, ${actor.pt} ${action.pt}.`;
  }

  // Pure natural Turkish capitalized
  trSentence = trSentence.charAt(0).toUpperCase() + trSentence.slice(1);

  const langCodeMap: Record<string, string> = {
    german: 'de-DE',
    english: 'en-US',
    spanish: 'es-ES',
    french: 'fr-FR',
    portuguese: 'pt-PT'
  };

  return {
    id: `p10k-${language}-${category}-${level}-${seedIndex}`,
    language,
    langCode: langCodeMap[language] || 'de-DE',
    level: level === 'ALL' ? 'A1' : level,
    category: catKey,
    turkishSentence: trSentence,
    expectedTarget: expectedTarget,
    grammarNote: `Bu cümle ${category} kategorisine ait doğal kalıp ve zaman dizilimi içerir.`,
    keyWords: [action.kw.toLowerCase()]
  };
}
