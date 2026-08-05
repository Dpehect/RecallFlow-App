export interface WordBreakdown {
  word: string;
  mean: string;
  type: string;
}

export interface Card {
  id: string;
  targetText: string;
  nativeTranslation: string;
  breakdown: WordBreakdown[];
  audioText: string;
  options: string[];
  solution: string[];
}

export interface Module {
  id: string;
  language: 'german' | 'portuguese' | 'english' | 'spanish';
  langCode: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  tagline: string;
  timePerDay: string;
  grammarFocus: string;
  cards: Card[];
}

export interface VocabItem {
  id: string;
  language: string;
  langCode: string;
  word: string;
  translation: string;
  type: string;
  level: string;
  example: string;
}

export interface GrammarLesson {
  id: string;
  language: string;
  level: string;
  title: string;
  rule: string;
  examples: { target: string; translation: string }[];
}

export const LANGUAGES = [
  { id: 'german', name: 'German (Almanca)', code: 'de-DE', flag: '🇩🇪' },
  { id: 'spanish', name: 'Spanish (İspanyolca)', code: 'es-ES', flag: '🇪🇸' },
  { id: 'portuguese', name: 'Portuguese (Portekizce)', code: 'pt-PT', flag: '🇵🇹' },
  { id: 'english', name: 'English (İngilizce)', code: 'en-US', flag: '🇬🇧' }
];

export const RECALLFLOW_ENTERPRISE_DATA = {
  modules: [
    // GERMAN (A1 - C2)
    {
      id: 'de-a1-coffee',
      language: 'german',
      langCode: 'de-DE',
      level: 'A1',
      title: 'Cafe & Survival Basics',
      tagline: 'Order food, introduce yourself, and navigate city centers.',
      timePerDay: '3 MINS / DAY',
      grammarFocus: 'Present Tense & Articles (Der/Die/Das)',
      cards: [
        {
          id: 'de-1',
          targetText: 'Ich trinke einen heißen Kaffee.',
          nativeTranslation: 'I am drinking a hot coffee.',
          breakdown: [
            { word: 'Ich', mean: 'I', type: 'Pronoun' },
            { word: 'trinke', mean: 'drink', type: 'Verb' },
            { word: 'einen', mean: 'a (masculine accusative)', type: 'Article' },
            { word: 'heißen', mean: 'hot', type: 'Adjective' },
            { word: 'Kaffee.', mean: 'coffee.', type: 'Noun' }
          ],
          audioText: 'Ich trinke einen heißen Kaffee',
          options: ['einen', 'Ich', 'heißen', 'trinke', 'Kaffee.', 'Tee'],
          solution: ['Ich', 'trinke', 'einen', 'heißen', 'Kaffee.']
        },
        {
          id: 'de-2',
          targetText: 'Entschuldigung, wo ist der Bahnhof?',
          nativeTranslation: 'Excuse me, where is the train station?',
          breakdown: [
            { word: 'Entschuldigung,', mean: 'Excuse me,', type: 'Interjection' },
            { word: 'wo', mean: 'where', type: 'Adverb' },
            { word: 'ist', mean: 'is', type: 'Verb' },
            { word: 'der', mean: 'the', type: 'Article' },
            { word: 'Bahnhof?', mean: 'train station?', type: 'Noun' }
          ],
          audioText: 'Entschuldigung wo ist der Bahnhof',
          options: ['wo', 'Entschuldigung,', 'ist', 'der', 'Bahnhof?'],
          solution: ['Entschuldigung,', 'wo', 'ist', 'der', 'Bahnhof?']
        }
      ]
    },
    {
      id: 'de-a2-work',
      language: 'german',
      langCode: 'de-DE',
      level: 'A2',
      title: 'Office & Everyday Routines',
      tagline: 'Email colleagues, discuss schedules, and make appointments.',
      timePerDay: '4 MINS / DAY',
      grammarFocus: 'Modal Verbs (können, müssen, wollen)',
      cards: [
        {
          id: 'de-3',
          targetText: 'Ich kann morgen den Bericht schreiben.',
          nativeTranslation: 'I can write the report tomorrow.',
          breakdown: [
            { word: 'Ich', mean: 'I', type: 'Pronoun' },
            { word: 'kann', mean: 'can', type: 'Modal Verb' },
            { word: 'morgen', mean: 'tomorrow', type: 'Adverb' },
            { word: 'den', mean: 'the', type: 'Article' },
            { word: 'Bericht', mean: 'report', type: 'Noun' },
            { word: 'schreiben.', mean: 'write.', type: 'Infinitive Verb' }
          ],
          audioText: 'Ich kann morgen den Bericht schreiben',
          options: ['Ich', 'morgen', 'kann', 'den', 'Bericht', 'schreiben.'],
          solution: ['Ich', 'kann', 'morgen', 'den', 'Bericht', 'schreiben.']
        }
      ]
    },
    {
      id: 'de-b1-debate',
      language: 'german',
      langCode: 'de-DE',
      level: 'B1',
      title: 'Expressing Opinions & Debates',
      tagline: 'Discuss social trends, environmental topics, and career choices.',
      timePerDay: '5 MINS / DAY',
      grammarFocus: 'Subordinate Clauses (weil, obwohl, dass)',
      cards: [
        {
          id: 'de-4',
          targetText: 'Ich glaube, dass Nachhaltigkeit sehr wichtig ist.',
          nativeTranslation: 'I believe that sustainability is very important.',
          breakdown: [
            { word: 'Ich', mean: 'I', type: 'Pronoun' },
            { word: 'glaube,', mean: 'believe,', type: 'Verb' },
            { word: 'dass', mean: 'that', type: 'Conjunction' },
            { word: 'Nachhaltigkeit', mean: 'sustainability', type: 'Noun' },
            { word: 'sehr', mean: 'very', type: 'Adverb' },
            { word: 'wichtig', mean: 'important', type: 'Adjective' },
            { word: 'ist.', mean: 'is.', type: 'Verb (End position)' }
          ],
          audioText: 'Ich glaube dass Nachhaltigkeit sehr wichtig ist',
          options: ['Ich', 'glaube,', 'dass', 'Nachhaltigkeit', 'sehr', 'wichtig', 'ist.'],
          solution: ['Ich', 'glaube,', 'dass', 'Nachhaltigkeit', 'sehr', 'wichtig', 'ist.']
        }
      ]
    },
    {
      id: 'de-b2-tech',
      language: 'german',
      langCode: 'de-DE',
      level: 'B2',
      title: 'Technology & Innovation',
      tagline: 'Analyze technological changes, AI developments, and industry dynamics.',
      timePerDay: '5 MINS / DAY',
      grammarFocus: 'Passive Voice & Subjunctive II (Konjunktiv II)',
      cards: [
        {
          id: 'de-5',
          targetText: 'Die neuen Algorithmen wurden erfolgreich optimiert.',
          nativeTranslation: 'The new algorithms were successfully optimized.',
          breakdown: [
            { word: 'Die', mean: 'The', type: 'Article' },
            { word: 'neuen', mean: 'new', type: 'Adjective' },
            { word: 'Algorithmen', mean: 'algorithms', type: 'Noun' },
            { word: 'wurden', mean: 'were', type: 'Auxiliary Verb (Passive)' },
            { word: 'erfolgreich', mean: 'successfully', type: 'Adverb' },
            { word: 'optimiert.', mean: 'optimized.', type: 'Past Participle' }
          ],
          audioText: 'Die neuen Algorithmen wurden erfolgreich optimiert',
          options: ['Die', 'neuen', 'Algorithmen', 'wurden', 'erfolgreich', 'optimiert.'],
          solution: ['Die', 'neuen', 'Algorithmen', 'wurden', 'erfolgreich', 'optimiert.']
        }
      ]
    },
    {
      id: 'de-c1-lit',
      language: 'german',
      langCode: 'de-DE',
      level: 'C1',
      title: 'Advanced Rhetoric & Nuance',
      tagline: 'Master complex prose, idiomatic nuances, and formal academic discourse.',
      timePerDay: '6 MINS / DAY',
      grammarFocus: 'Participle Constructions & Extended Modifiers',
      cards: [
        {
          id: 'de-6',
          targetText: 'In Anbetracht der Umstände ist die Entscheidung nachvollziehbar.',
          nativeTranslation: 'In view of the circumstances, the decision is understandable.',
          breakdown: [
            { word: 'In Anbetracht', mean: 'In view of', type: 'Genitive Preposition' },
            { word: 'der', mean: 'the', type: 'Article' },
            { word: 'Umstände', mean: 'circumstances', type: 'Noun' },
            { word: 'ist', mean: 'is', type: 'Verb' },
            { word: 'die', mean: 'the', type: 'Article' },
            { word: 'Entscheidung', mean: 'decision', type: 'Noun' },
            { word: 'nachvollziehbar.', mean: 'understandable.', type: 'Adjective' }
          ],
          audioText: 'In Anbetracht der Umstände ist die Entscheidung nachvollziehbar',
          options: ['In Anbetracht', 'der', 'Umstände', 'ist', 'die', 'Entscheidung', 'nachvollziehbar.'],
          solution: ['In Anbetracht', 'der', 'Umstände', 'ist', 'die', 'Entscheidung', 'nachvollziehbar.']
        }
      ]
    },
    {
      id: 'de-c2-mastery',
      language: 'german',
      langCode: 'de-DE',
      level: 'C2',
      title: 'Literary & Native Precision',
      tagline: 'Refine native-level eloquence, philosophy, and legal-scientific registers.',
      timePerDay: '6 MINS / DAY',
      grammarFocus: 'Stylistic Synthesis & Classical Registers',
      cards: [
        {
          id: 'de-7',
          targetText: 'Möge der Diskurs von gegenseitigem Respekt geprägt sein.',
          nativeTranslation: 'May the discourse be characterized by mutual respect.',
          breakdown: [
            { word: 'Möge', mean: 'May', type: 'Subjunctive I' },
            { word: 'der', mean: 'the', type: 'Article' },
            { word: 'Diskurs', mean: 'discourse', type: 'Noun' },
            { word: 'von', mean: 'by', type: 'Preposition' },
            { word: 'gegenseitigem', mean: 'mutual', type: 'Adjective' },
            { word: 'Respekt', mean: 'respect', type: 'Noun' },
            { word: 'geprägt', mean: 'shaped/characterized', type: 'Participle' },
            { word: 'sein.', mean: 'be.', type: 'Verb' }
          ],
          audioText: 'Möge der Diskurs von gegenseitigem Respekt geprägt sein',
          options: ['Möge', 'der', 'Diskurs', 'von', 'gegenseitigem', 'Respekt', 'geprägt', 'sein.'],
          solution: ['Möge', 'der', 'Diskurs', 'von', 'gegenseitigem', 'Respekt', 'geprägt', 'sein.']
        }
      ]
    },

    // SPANISH (A1 - C2)
    {
      id: 'es-a1-intro',
      language: 'spanish',
      langCode: 'es-ES',
      level: 'A1',
      title: 'Spanish Basics & Tapas',
      tagline: 'Order food, greet locals, and ask simple directions in Madrid.',
      timePerDay: '3 MINS / DAY',
      grammarFocus: 'Ser vs Estar & Basic Present Tense',
      cards: [
        {
          id: 'es-1',
          targetText: 'Un café con leche, por favor.',
          nativeTranslation: 'A coffee with milk, please.',
          breakdown: [
            { word: 'Un', mean: 'A', type: 'Article' },
            { word: 'café', mean: 'coffee', type: 'Noun' },
            { word: 'con', mean: 'with', type: 'Preposition' },
            { word: 'leche,', mean: 'milk,', type: 'Noun' },
            { word: 'por', mean: 'for', type: 'Preposition' },
            { word: 'favor.', mean: 'favor / please.', type: 'Noun' }
          ],
          audioText: 'Un café con leche por favor',
          options: ['café', 'Un', 'con', 'leche,', 'por', 'favor.'],
          solution: ['Un', 'café', 'con', 'leche,', 'por', 'favor.']
        }
      ]
    },
    {
      id: 'es-b1-travel',
      language: 'spanish',
      langCode: 'es-ES',
      level: 'B1',
      title: 'Spanish Culture & Storytelling',
      tagline: 'Share travel anecdotes, past events, and future ambitions.',
      timePerDay: '4 MINS / DAY',
      grammarFocus: 'Pretérito Indefinido vs Imperfecto',
      cards: [
        {
          id: 'es-2',
          targetText: 'Cuando era joven, viajaba a España cada verano.',
          nativeTranslation: 'When I was young, I used to travel to Spain every summer.',
          breakdown: [
            { word: 'Cuando', mean: 'When', type: 'Conjunction' },
            { word: 'era', mean: 'I was', type: 'Imperfect Verb' },
            { word: 'joven,', mean: 'young,', type: 'Adjective' },
            { word: 'viajaba', mean: 'I traveled', type: 'Imperfect Verb' },
            { word: 'a', mean: 'to', type: 'Preposition' },
            { word: 'España', mean: 'Spain', type: 'Noun' },
            { word: 'cada', mean: 'every', type: 'Determiner' },
            { word: 'verano.', mean: 'summer.', type: 'Noun' }
          ],
          audioText: 'Cuando era joven viajaba a España cada verano',
          options: ['Cuando', 'era', 'joven,', 'viajaba', 'a', 'España', 'cada', 'verano.'],
          solution: ['Cuando', 'era', 'joven,', 'viajaba', 'a', 'España', 'cada', 'verano.']
        }
      ]
    },

    // PORTUGUESE (A1 - C2)
    {
      id: 'pt-a1-lisbon',
      language: 'portuguese',
      langCode: 'pt-PT',
      level: 'A1',
      title: 'Lisbon Cafe & Greetings',
      tagline: 'Order pastéis de nata, greet locals, and ask simple questions.',
      timePerDay: '3 MINS / DAY',
      grammarFocus: 'Present Tense (Ser / Estar / Ter)',
      cards: [
        {
          id: 'pt-1',
          targetText: 'Um café e um pastel de nata, por favor.',
          nativeTranslation: 'A coffee and a custard tart, please.',
          breakdown: [
            { word: 'Um', mean: 'A', type: 'Article' },
            { word: 'café', mean: 'coffee', type: 'Noun' },
            { word: 'e', mean: 'and', type: 'Conjunction' },
            { word: 'um', mean: 'a', type: 'Article' },
            { word: 'pastel', mean: 'pastry', type: 'Noun' },
            { word: 'de', mean: 'of', type: 'Preposition' },
            { word: 'nata,', mean: 'cream,', type: 'Noun' },
            { word: 'por', mean: 'for', type: 'Preposition' },
            { word: 'favor.', mean: 'please.', type: 'Noun' }
          ],
          audioText: 'Um café e um pastel de nata por favor',
          options: ['Um', 'café', 'e', 'um', 'pastel', 'de', 'nata,', 'por', 'favor.'],
          solution: ['Um', 'café', 'e', 'um', 'pastel', 'de', 'nata,', 'por', 'favor.']
        }
      ]
    },

    // ENGLISH (A1 - C2)
    {
      id: 'en-a1-start',
      language: 'english',
      langCode: 'en-US',
      level: 'A1',
      title: 'Global English Essentials',
      tagline: 'Master basic conversation, introductions, and daily habits.',
      timePerDay: '3 MINS / DAY',
      grammarFocus: 'Simple Present & Essential Verbs',
      cards: [
        {
          id: 'en-1',
          targetText: 'I would like a cup of coffee, please.',
          nativeTranslation: 'Bir fincan kahve almak istiyorum, lütfen.',
          breakdown: [
            { word: 'I', mean: 'Ben', type: 'Pronoun' },
            { word: 'would', mean: 'istiyorum', type: 'Modal Verb' },
            { word: 'like', mean: 'almak', type: 'Verb' },
            { word: 'a', mean: 'bir', type: 'Article' },
            { word: 'cup', mean: 'fincan', type: 'Noun' },
            { word: 'of', mean: '...', type: 'Preposition' },
            { word: 'coffee,', mean: 'kahve,', type: 'Noun' },
            { word: 'please.', mean: 'lütfen.', type: 'Adverb' }
          ],
          audioText: 'I would like a cup of coffee please',
          options: ['I', 'would', 'like', 'a', 'cup', 'of', 'coffee,', 'please.'],
          solution: ['I', 'would', 'like', 'a', 'cup', 'of', 'coffee,', 'please.']
        }
      ]
    }
  ],

  vocabPacks: [
    { id: 'v1', language: 'german', langCode: 'de-DE', word: 'Kaffee', translation: 'Coffee', type: 'Noun (m)', level: 'A1', example: 'Ich trinke gern Kaffee.' },
    { id: 'v2', language: 'german', langCode: 'de-DE', word: 'Nachhaltigkeit', translation: 'Sustainability', type: 'Noun (f)', level: 'B1', example: 'Nachhaltigkeit ist wichtig.' },
    { id: 'v3', language: 'spanish', langCode: 'es-ES', word: 'Viajar', translation: 'To Travel', type: 'Verb', level: 'A1', example: 'Me gusta viajar por el mundo.' },
    { id: 'v4', language: 'portuguese', langCode: 'pt-PT', word: 'Obrigado', translation: 'Thank you', type: 'Interjection', level: 'A1', example: 'Muito obrigado pela ajuda.' },
    { id: 'v5', language: 'english', langCode: 'en-US', word: 'Resilience', translation: 'Dayanıklılık / Esneklik', type: 'Noun', level: 'B2', example: 'Resilience helps overcome challenges.' }
  ],

  grammarGuides: [
    {
      id: 'g-de-1',
      language: 'german',
      level: 'A1',
      title: 'Der, Die, Das — German Genders Unlocked',
      rule: 'Nouns in German are assigned masculine (der), feminine (die), or neuter (das) genders. Always learn nouns together with their definite article.',
      examples: [
        { target: 'Der Kaffee ist heiß.', translation: 'The coffee is hot. (Masculine)' },
        { target: 'Die Sonne scheint.', translation: 'The sun is shining. (Feminine)' },
        { target: 'Das Wasser ist kalt.', translation: 'The water is cold. (Neuter)' }
      ]
    },
    {
      id: 'g-es-1',
      language: 'spanish',
      level: 'A1',
      title: 'Ser vs Estar — Permanence vs State',
      rule: 'Use Ser for permanent traits, origin, and identity. Use Estar for temporary states, emotions, and locations.',
      examples: [
        { target: 'Ella es profesora.', translation: 'She is a teacher. (Identity / Ser)' },
        { target: 'Ella está feliz hoy.', translation: 'She is happy today. (State / Estar)' }
      ]
    }
  ]
};
