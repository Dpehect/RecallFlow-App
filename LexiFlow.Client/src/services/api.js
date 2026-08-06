import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getWords = async (language = 'en', level = 'A1', category = 'Tümü') => {
  try {
    const response = await api.get('/words', {
      params: { language, level, category: category === 'Tümü' ? null : category }
    });
    return response.data;
  } catch (error) {
    return getFallbackWords(language, level, category);
  }
};

export const getDialogues = async (language = 'en', level = 'A1', category = 'Tümü') => {
  try {
    const response = await api.get('/dialogues', {
      params: { language, level, category: category === 'Tümü' ? null : category }
    });
    return response.data;
  } catch (error) {
    return getFallbackDialogues(language, level, category);
  }
};

export const updateWordStatus = async (id, isLearned) => {
  try {
    const response = await api.patch(`/words/${id}/status`, { isLearned });
    return response.data;
  } catch (error) {
    return { id, isLearned };
  }
};

function getFallbackWords(language, level, category) {
  const baseWords = [
    { id: 1, languageCode: language, level, category: 'Günlük Yaşam', targetWord: 'Ephemeral', translation: 'Kısa ömürlü, geçici', phonetic: '/ɪˈfem.ər.əl/', exampleSentence: 'Fame can be ephemeral.', exampleTranslation: 'Ün geçici olabilir.', isLearned: false },
    { id: 2, languageCode: language, level, category: 'Seyahat & Otel', targetWord: 'Wanderlust', translation: 'Seyahat arzusu', phonetic: '/ˈvɑːn.dɚ.lʌst/', exampleSentence: 'Her wanderlust led her abroad.', exampleTranslation: 'Seyahat arzusu onu yurt dışına götürdü.', isLearned: false },
    { id: 3, languageCode: language, level, category: 'İş & Kariyer', targetWord: 'Synergy', translation: 'Sinerji, ortak güç', phonetic: '/ˈsɪn.ɚ.dʒi/', exampleSentence: 'We created great synergy.', exampleTranslation: 'Büyük bir sinerji oluşturduk.', isLearned: false }
  ];

  if (category && category !== 'Tümü') {
    return baseWords.filter((w) => w.category === category);
  }
  return baseWords;
}

function getFallbackDialogues(language, level, category) {
  const list = [];
  const activeCategory = category === 'Tümü' ? 'Günlük Yaşam' : category;

  for (let i = 1; i <= 30; i++) {
    list.push({
      id: i,
      languageCode: language,
      level: level,
      category: activeCategory,
      type: i % 2 === 0 ? 'Dialogue' : 'Reading',
      title: `${activeCategory} — Diyalog / Okuma Metni #${i}`,
      content: `A: Welcome to the ${activeCategory} practice module (${language.toUpperCase()})!\nB: Thank you! I am ready to improve my reading and listening skills.`,
      translation: `A: ${activeCategory} pratik modülüne hoş geldiniz!\nB: Teşekkür ederim! Okuma ve dinleme becerilerimi geliştirmeye hazırım.`
    });
  }

  return list;
}
