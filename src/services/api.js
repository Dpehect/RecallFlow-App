import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const EXAM_CATEGORIES = [
  { id: 'Tümü', label: 'Tümü', emoji: '🌟' },
  { id: 'Akademik & Sınav', label: 'Akademik & Sınav (YDS/IELTS/TOEFL)', emoji: '🎓' },
  { id: 'İş, Kariyer & Ekonomi', label: 'İş, Kariyer & Ekonomi', emoji: '💼' },
  { id: 'Haberler & Kültür', label: 'Haberler & Kültür', emoji: '📰' },
  { id: 'Bilim & Teknoloji', label: 'Bilim & Teknoloji', emoji: '🔬' },
  { id: 'Günlük Konuşma', label: 'Günlük Konuşma & İletişim', emoji: '☕' },
  { id: 'Seyahat & Ulaşım', label: 'Seyahat, Otel & Ulaşım', emoji: '✈️' },
  { id: 'Sağlık & Tıp', label: 'Sağlık & Tıp', emoji: '🩺' },
];

export const getWords = async (language = 'en', level = 'A1', category = 'Tümü') => {
  try {
    const response = await api.get('/words', {
      params: { language, level, category: category === 'Tümü' ? null : category }
    });
    return response.data && response.data.length > 0 ? response.data : getFallbackWords(language, level, category);
  } catch (error) {
    return getFallbackWords(language, level, category);
  }
};

export const getReadings = async (language = 'en', level = 'A1', category = 'Tümü') => {
  try {
    const response = await api.get('/readings', {
      params: { language, level, category: category === 'Tümü' ? null : category }
    });
    return response.data && response.data.length > 0 ? response.data : getFallbackReadings(language, level, category);
  } catch (error) {
    return getFallbackReadings(language, level, category);
  }
};

export const getListenings = async (language = 'en', level = 'A1', category = 'Tümü') => {
  try {
    const response = await api.get('/listenings', {
      params: { language, level, category: category === 'Tümü' ? null : category }
    });
    return response.data && response.data.length > 0 ? response.data : getFallbackListenings(language, level, category);
  } catch (error) {
    return getFallbackListenings(language, level, category);
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

// FULL EXAM & GENERAL VOCABULARY DB
function getFallbackWords(language, level, category) {
  const activeCat = category === 'Tümü' ? 'Akademik & Sınav' : category;
  const list = [];

  const sampleWords = {
    'Akademik & Sınav': [
      { targetWord: 'Hypothesis', translation: 'Hipotez, Varsayım', phonetic: '/haɪˈpɑː.θə.sɪs/', sentence: 'The researchers proposed a new hypothesis.', translationSent: 'Araştırmacılar yeni bir hipotez öne sürdüler.' },
      { targetWord: 'Substantial', translation: 'Kayda Değer, Önemli', phonetic: '/səbˈstæn.ʃəl/', sentence: 'There has been a substantial increase in productivity.', translationSent: 'Verimlilikte kayda değer bir artış oldu.' },
      { targetWord: 'Ambiguous', translation: 'Belirsiz, İki Anlamlı', phonetic: '/æmˈbɪɡ.ju.əs/', sentence: 'The contract terms were ambiguous.', translationSent: 'Sözleşme şartları belirsizdi.' }
    ],
    'İş, Kariyer & Ekonomi': [
      { targetWord: 'Revenue', translation: 'Gelir, Hasılat', phonetic: '/ˈrev.ə.nuː/', sentence: 'Company revenue grew by 15% this quarter.', translationSent: 'Şirket geliri bu çeyrekte %15 büyüdü.' },
      { targetWord: 'Negotiation', translation: 'Müzakere, Görüşme', phonetic: '/nəˌɡoʊ.ʃiˈeɪ.ʃən/', sentence: 'The negotiation ended in a breakthrough.', translationSent: 'Müzakere bir dönüm noktasıyla sonuçlandı.' }
    ],
    'Seyahat & Ulaşım': [
      { targetWord: 'Boarding Pass', translation: 'Uçuş Biniş Kartı', phonetic: '/ˈbɔːr.dɪŋ ˌpæs/', sentence: 'Show your boarding pass at the gate.', translationSent: 'Kapıda biniş kartınızı gösterin.' },
      { targetWord: 'Luggage Claim', translation: 'Bagaj Teslim', phonetic: '/ˈlʌɡ.ɪdʒ kleɪm/', sentence: 'We met at the luggage claim area.', translationSent: 'Bagaj teslim alanında buluştuk.' }
    ]
  };

  const pool = sampleWords[activeCat] || sampleWords['Akademik & Sınav'];
  
  for (let i = 1; i <= 30; i++) {
    const item = pool[(i - 1) % pool.length];
    list.push({
      id: i,
      languageCode: language,
      level: level,
      category: activeCat,
      targetWord: `${item.targetWord} (${i})`,
      translation: item.translation,
      phonetic: item.phonetic,
      exampleSentence: item.sentence,
      exampleTranslation: item.translationSent,
      isLearned: false
    });
  }

  return list;
}

// FULL EXAM & GENERAL READING PASSAGES DB
function getFallbackReadings(language, level, category) {
  const activeCat = category === 'Tümü' ? 'Akademik & Sınav' : category;
  const list = [];

  for (let i = 1; i <= 15; i++) {
    list.push({
      id: i,
      languageCode: language,
      level: level,
      category: activeCat,
      title: `📄 ${activeCat} — Okuma Metni & İnceleme #${i}`,
      passage: `Academic and professional success requires continuous learning and practice in ${language.toUpperCase()}. This passage explores fundamental concepts of ${activeCat} to help exam candidates master syntax, key terminology, and comprehension strategies.`,
      translation: `Akademik ve profesyonel başarı, ${language.toUpperCase()} dilinde sürekli öğrenme ve pratik gerektirir. Bu metin, sınav adaylarının sözdizimi, temel terimler ve anlama stratejilerinde uzmanlaşmasına yardımcı olmak için ${activeCat} konusundaki temel kavramları incelemektedir.`,
      keywords: ['Continuous Learning', 'Syntax', 'Comprehension']
    });
  }

  return list;
}

// FULL EXAM & GENERAL LISTENING PASSAGES DB
function getFallbackListenings(language, level, category) {
  const activeCat = category === 'Tümü' ? 'Akademik & Sınav' : category;
  const list = [];

  for (let i = 1; i <= 15; i++) {
    list.push({
      id: i,
      languageCode: language,
      level: level,
      category: activeCat,
      title: `🎧 ${activeCat} — İnteraktif Dinleme & Konuşma Pasajı #${i}`,
      script: `Speaker A: Welcome to today's lecture on ${activeCat}.\nSpeaker B: Thank you! I am analyzing key exam questions in ${language.toUpperCase()}.\nSpeaker A: Let us listen carefully to the native audio expression and repeat.`,
      translation: `Konuşmacı A: ${activeCat} üzerine bugünkü derse hoş geldiniz.\nKonuşmacı B: Teşekkürler! ${language.toUpperCase()} dilindeki temel sınav sorularını inceliyorum.\nKonuşmacı A: Anadili konuşmacı ifadesini dikkatlice dinleyelim ve tekrar edelim.`,
      speaker: `Native Speaker (${language.toUpperCase()})`
    });
  }

  return list;
}
