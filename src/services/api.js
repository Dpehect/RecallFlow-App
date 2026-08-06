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

// REAL AUTHENTIC VOCABULARY DATASET (No placeholder strings!)
const REAL_WORDS_DB = {
  en: {
    'Seyahat & Otel': [
      { id: 1, targetWord: 'Boarding Pass', translation: 'Uçuş Biniş Kartı', phonetic: '/ˈbɔːr.dɪŋ ˌpæs/', exampleSentence: 'Please present your boarding pass at gate 12.', exampleTranslation: 'Lütfen kapı 12’de biniş kartınızı ibraz edin.' },
      { id: 2, targetWord: 'Luggage Claim', translation: 'Bagaj Teslim Alanı', phonetic: '/ˈlʌɡ.ɪdʒ kleɪm/', exampleSentence: 'We picked up our bags at luggage claim.', exampleTranslation: 'Bavullarımızı bagaj teslim alanından aldık.' },
      { id: 3, targetWord: 'Passport Control', translation: 'Pasaport Kontrolü', phonetic: '/ˈpæs.pɔːrt kənˈtroʊl/', exampleSentence: 'The line at passport control moved quickly.', exampleTranslation: 'Pasaport kontrolündeki sıra hızlı ilerledi.' },
      { id: 4, targetWord: 'Reservation', translation: 'Rezervasyon', phonetic: '/ˌrez.ɚˈveɪ.ʃən/', exampleSentence: 'I made a hotel reservation for three nights.', exampleTranslation: 'Üç gece için otel rezervasyonu yaptım.' },
      { id: 5, targetWord: 'Customs Officer', translation: 'Gümrük Memuru', phonetic: '/ˈkʌs.təmz ˈɑː.fɪ.sɚ/', exampleSentence: 'The customs officer checked my declare form.', exampleTranslation: 'Gümrük memuru beyan formumu kontrol etti.' }
    ],
    'Günlük Yaşam': [
      { id: 11, targetWord: 'Neighborhood', translation: 'Mahalle, Çevre', phonetic: '/ˈneɪ.bɚ.hʊd/', exampleSentence: 'This is a quiet and friendly neighborhood.', exampleTranslation: 'Sessiz ve dost canlısı bir mahalle.' },
      { id: 12, targetWord: 'Appointment', translation: 'Randevu', phonetic: '/əˈpɔɪnt.mənt/', exampleSentence: 'I have a dentist appointment at 3 PM.', exampleTranslation: 'Saat 15:00\'te diş randevum var.' },
      { id: 13, targetWord: 'Groceries', translation: 'Mutfak / Ev Alışverişi', phonetic: '/ˈɡroʊ.sɚ.iz/', exampleSentence: 'She bought fresh groceries at the market.', exampleTranslation: 'Pazardan taze mutfak alışverişi yaptı.' }
    ],
    'İş & Kariyer': [
      { id: 21, targetWord: 'Deadline', translation: 'Son Teslim Tarihi', phonetic: '/ˈded.laɪn/', exampleSentence: 'The project deadline is this Friday.', exampleTranslation: 'Projenin son teslim tarihi bu cuma.' },
      { id: 22, targetWord: 'Negotiation', translation: 'Müzakere, Pazarlık', phonetic: '/nəˌɡoʊ.ʃiˈeɪ.ʃən/', exampleSentence: 'The contract negotiation went smoothly.', exampleTranslation: 'Sözleşme müzakeresi sorunsuz geçti.' }
    ],
    'Yiyecek & İçecek': [
      { id: 31, targetWord: 'Appetizer', translation: 'Başlangıç Yemeği / Meze', phonetic: '/ˈæp.ə.taɪ.zɚ/', exampleSentence: 'We ordered soup as an appetizer.', exampleTranslation: 'Başlangıç olarak çorba sipariş ettik.' }
    ],
    'Teknoloji': [
      { id: 41, targetWord: 'Algorithm', translation: 'Algoritma', phonetic: '/ˈæl.ɡə.rɪ.ðəm/', exampleSentence: 'The search algorithm ranks results quickly.', exampleTranslation: 'Arama algoritması sonuçları hızlı sıralar.' }
    ],
    'Sağlık & Sosyal': [
      { id: 51, targetWord: 'Prescription', translation: 'Reçete', phonetic: '/prɪˈskrɪp.ʃən/', exampleSentence: 'The doctor gave me a prescription for medicine.', exampleTranslation: 'Doktor bana ilaç reçetesi verdi.' }
    ]
  },
  de: {
    'Seyahat & Otel': [
      { id: 101, targetWord: 'Reisepass', translation: 'Pasaport', phonetic: '[ˈʁaɪ̯zəˌpas]', exampleSentence: 'Bitte zeigen Sie Ihren Reisepass.', exampleTranslation: 'Lütfen pasaportunuzu gösterin.' },
      { id: 102, targetWord: 'Bordkarte', translation: 'Biniş Kartı', phonetic: '[ˈbɔʁtˌkaʁtə]', exampleSentence: 'Wo ist meine Bordkarte?', exampleTranslation: 'Biniş kartım nerede?' }
    ]
  },
  fr: {
    'Seyahat & Otel': [
      { id: 201, targetWord: 'Passeport', translation: 'Pasaport', phonetic: '[paspɔʁ]', exampleSentence: 'Montrez votre passeport s\'il vous plaît.', exampleTranslation: 'Lütfen pasaportunuzu gösterin.' }
    ]
  },
  es: {
    'Seyahat & Otel': [
      { id: 301, targetWord: 'Pasaporte', translation: 'Pasaport', phonetic: '[pa.saˈpoɾ.te]', exampleSentence: '¿Puedo ver su pasaporte?', exampleTranslation: 'Pasaportunuzu görebilir miyim?' }
    ]
  },
  pt: {
    'Seyahat & Otel': [
      { id: 401, targetWord: 'Passaporte', translation: 'Pasaport', phonetic: '[pa.saˈpɔʁ.tʃi]', exampleSentence: 'Mostre seu passaporte, por favor.', exampleTranslation: 'Lütfen pasaportunuzu gösterin.' }
    ]
  }
};

const REAL_DIALOGUES_DB = [
  {
    id: 1,
    category: 'Seyahat & Otel',
    title: '✈️ Otel Resepsiyonunda Check-in (At Hotel Check-in)',
    content: 'Receptionist: Welcome to Grand Plaza! How can I help you today?\nGuest: Hello! I have a reservation under the name Alex Smith for 3 nights.\nReceptionist: Perfect! Here is your room key. Breakfast is served from 7 to 10 AM on the 2nd floor.',
    translation: 'Resepsiyonist: Grand Plaza’ya hoş geldiniz! Bugün size nasıl yardımcı olabilirim?\nMüşteri: Merhaba! Alex Smith adına 3 gecelik rezervasyonum var.\nResepsiyonist: Harika! İşte oda anahtarınız. Kahvaltı 2. katta saat 07:00-10:00 arasında servis edilmektedir.',
    type: 'Dialogue'
  },
  {
    id: 2,
    category: 'Yiyecek & İçecek',
    title: '🍕 Restoranda Yemek Siparişi (Ordering Food at Restaurant)',
    content: 'Waiter: Good evening! Are you ready to order?\nCustomer: Yes, please. I would like the grilled salmon with roast vegetables.\nWaiter: Excellent choice! Would you like anything to drink with that?',
    translation: 'Garson: İyi akşamlar! Sipariş vermeye hazır mısınız?\nMüşteri: Evet, lütfen. Izgara somon ve közlenmiş sebze almak istiyorum.\nGarson: Harika bir seçim! Yanında içecek bir şey ister misiniz?',
    type: 'Dialogue'
  }
];

function getFallbackWords(language, level, category) {
  const langData = REAL_WORDS_DB[language] || REAL_WORDS_DB.en;
  if (category && category !== 'Tümü' && langData[category]) {
    return langData[category].map(w => ({ ...w, languageCode: language, level, category, isLearned: false }));
  }

  // Combine all categories if 'Tümü'
  let allWords = [];
  Object.keys(langData).forEach(cat => {
    allWords = allWords.concat(langData[cat].map(w => ({ ...w, languageCode: language, level, category: cat, isLearned: false })));
  });
  return allWords.length > 0 ? allWords : REAL_WORDS_DB.en['Seyahat & Otel'];
}

function getFallbackDialogues(language, level, category) {
  if (category && category !== 'Tümü') {
    return REAL_DIALOGUES_DB.filter(d => d.category === category);
  }
  return REAL_DIALOGUES_DB;
}
