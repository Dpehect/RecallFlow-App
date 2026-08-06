import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getWords = async (language = 'en', level = 'A1', unlearnedOnly = false) => {
  try {
    const response = await api.get('/words', {
      params: { language, level, unlearnedOnly }
    });
    return response.data;
  } catch (error) {
    console.warn("API offline or error, serving fallback words.", error);
    // Fallback data if backend is offline during demo
    return getFallbackWords(language, level);
  }
};

export const updateWordStatus = async (id, isLearned) => {
  try {
    const response = await api.patch(`/words/${id}/status`, { isLearned });
    return response.data;
  } catch (error) {
    console.warn(`API offline: status update for word ${id} mocked locally.`, error);
    return { id, isLearned };
  }
};

export const getStats = async (language = 'en', level = 'A1') => {
  try {
    const response = await api.get('/words/stats', { params: { language, level } });
    return response.data;
  } catch (error) {
    return { languageCode: language, level, totalWords: 10, learnedWords: 4 };
  }
};

// Fallback Mock Data Generator
function getFallbackWords(language, level) {
  const mockDatabase = {
    en: [
      { id: 101, languageCode: 'en', level: 'A1', targetWord: 'Ephemeral', translation: 'Kısa ömürlü, geçici', phonetic: '/ɪˈfem.ər.əl/', exampleSentence: 'Fame in the world of pop music can be ephemeral.', exampleTranslation: 'Pop müziği dünyasındaki ün geçici olabilir.', category: 'Adjectives', isLearned: false },
      { id: 102, languageCode: 'en', level: 'A1', targetWord: 'Resilient', translation: 'Dayanıklı, esnek', phonetic: '/rɪˈzɪl.jənt/', exampleSentence: 'She is a resilient person who bounces back easily.', exampleTranslation: 'O kolayca toparlanan dayanıklı bir insandır.', category: 'Adjectives', isLearned: false },
      { id: 103, languageCode: 'en', level: 'A1', targetWord: 'Serendipity', translation: 'Tatlı şanslı tesadüf', phonetic: '/ˌser.ənˈdɪp.ə.ti/', exampleSentence: 'Finding this place was pure serendipity.', exampleTranslation: 'Bu yeri bulmak tamamen şanslı bir tesadüftü.', category: 'Nouns', isLearned: false }
    ],
    de: [
      { id: 201, languageCode: 'de', level: 'A1', targetWord: 'Fernweh', translation: 'Uzak diyarları özleme arzusu', phonetic: '[ˈfɛrnveː]', exampleSentence: 'Ich habe großes Fernweh nach Asien.', exampleTranslation: 'Asya\'ya karşı büyük bir uzak diyar özlemim var.', category: 'Nouns', isLearned: false },
      { id: 202, languageCode: 'de', level: 'A1', targetWord: 'Gemütlichkeit', translation: 'Sıcaklık, huzurlu ortam', phonetic: '[ɡəˈmyːtlɪçkaɪ̯t]', exampleSentence: 'Dieses Haus strahlt Gemütlichkeit aus.', exampleTranslation: 'Bu ev sıcaklık ve huzur saçıyor.', category: 'Nouns', isLearned: false }
    ],
    fr: [
      { id: 301, languageCode: 'fr', level: 'A1', targetWord: 'Épanouissement', translation: 'Kişisel gelişim, çiçeklenme', phonetic: '[epanwismɑ̃]', exampleSentence: 'Le travail favorise son épanouissement.', exampleTranslation: 'İş onun gelişimini destekliyor.', category: 'Nouns', isLearned: false }
    ],
    es: [
      { id: 401, languageCode: 'es', level: 'A1', targetWord: 'Madrugada', translation: 'Sabahın seher vakti', phonetic: '[maðɾuˈɣaða]', exampleSentence: 'Llegamos a la madrugada.', exampleTranslation: 'Sabahın seher vaktinde vardık.', category: 'Nouns', isLearned: false }
    ],
    pt: [
      { id: 501, languageCode: 'pt', level: 'A1', targetWord: 'Saudade', translation: 'Derin özlem', phonetic: '[sawˈda.dʒi]', exampleSentence: 'Tenho saudade de você.', exampleTranslation: 'Sana karşı derin bir özlem duyuyorum.', category: 'Nouns', isLearned: false }
    ]
  };

  return mockDatabase[language] || mockDatabase.en;
}
