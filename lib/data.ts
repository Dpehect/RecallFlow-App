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
  category: string;
  word: string;
  translation: string;
  type: string;
  level: string;
  exampleTarget: string;
  exampleTranslation: string;
}

export interface DialogueLine {
  speaker: string;
  targetText: string;
  translation: string;
  audioText: string;
}

export interface Story {
  id: string;
  language: string;
  langCode: string;
  category: string;
  title: string;
  summary: string;
  level: string;
  type: 'dialogue' | 'short-story';
  lines: DialogueLine[];
  vocabHighlighted: string[];
}

export const LANGUAGES = [
  { id: 'german', name: 'German (Almanca)', code: 'de-DE', flag: '🇩🇪' },
  { id: 'spanish', name: 'Spanish (İspanyolca)', code: 'es-ES', flag: '🇪🇸' },
  { id: 'portuguese', name: 'Portuguese (Portekizce)', code: 'pt-PT', flag: '🇵🇹' },
  { id: 'english', name: 'English (İngilizce)', code: 'en-US', flag: '🇬🇧' }
];

export const CATEGORIES = [
  { id: 'cafe-travel', name: 'Kafe & Seyahat', icon: '☕' },
  { id: 'daily-life', name: 'Günlük Yaşam', icon: '🏠' },
  { id: 'work-business', name: 'İş & Kariyer', icon: '💼' },
  { id: 'city-emergency', name: 'Şehir & Acil Durum', icon: '🏙️' }
];

export const RECALLFLOW_ENTERPRISE_DATA = {
  stories: [
    {
      id: 'de-s1',
      language: 'german',
      langCode: 'de-DE',
      category: 'cafe-travel',
      title: 'Ein Morgen im Berliner Café (Berlindeki Kafede Bir Sabah)',
      summary: 'Lerne wie man auf Deutsch Kaffee und Kuchen bestellt.',
      level: 'A1',
      type: 'dialogue',
      vocabHighlighted: ['Kaffee', 'bestellen', 'bitte', 'Rechnung'],
      lines: [
        { speaker: 'Kellner', targetText: 'Guten Tag! Was möchten Sie trinken?', translation: 'İyi günler! Ne içmek istersiniz?', audioText: 'Guten Tag! Was möchten Sie trinken?' },
        { speaker: 'Anna', targetText: 'Guten Tag! Ich möchte einen heißen Kaffee mit Milch, bitte.', translation: 'İyi günler! Sütlü sıcak bir kahve istiyorum, lütfen.', audioText: 'Guten Tag! Ich möchte einen heißen Kaffee mit Milch bitte.' },
        { speaker: 'Kellner', targetText: 'Sehr gerne. Möchten Sie auch ein Stück Kuchen essen?', translation: 'Memnuniyetle. Bir dilim de pasta yemek ister misiniz?', audioText: 'Sehr gerne. Möchten Sie auch ein Stück Kuchen essen?' },
        { speaker: 'Anna', targetText: 'Ja, ein Stück Käsekuchen, bitte.', translation: 'Evet, bir dilim cheesecake lütfen.', audioText: 'Ja ein Stück Käsekuchen bitte.' },
        { speaker: 'Anna', targetText: 'Entschuldigung, kann ich bitte bezahlen?', translation: 'Affedersiniz, hesabı ödeyebilir miyim lütfen?', audioText: 'Entschuldigung kann ich bitte bezahlen?' },
        { speaker: 'Kellner', targetText: 'Das macht zusammen 7 Euro und 50 Cent.', translation: 'Toplamda 7 Euro 50 Cent yapıyor.', audioText: 'Das macht zusammen 7 Euro und 50 Cent.' }
      ]
    },
    {
      id: 'de-s2',
      language: 'german',
      langCode: 'de-DE',
      category: 'daily-life',
      title: 'Mein Alltag in München (Münih’teki Günlük Hayatım)',
      summary: 'Ein kurzer Text über morgendliche Routinen und Arbeit.',
      level: 'A1-A2',
      type: 'short-story',
      vocabHighlighted: ['aufstehen', 'arbeiten', 'wohnen', 'Abend'],
      lines: [
        { speaker: 'Erzähler', targetText: 'Jeden Morgen stehe ich um 7 Uhr auf.', translation: "Her sabah saat 7'de kalkarım.", audioText: 'Jeden Morgen stehe ich um 7 Uhr auf.' },
        { speaker: 'Erzähler', targetText: 'Ich trinke einen Tee und fahre mit der U-Bahn zur Arbeit.', translation: 'Bir çay içerim ve metroyla işe giderim.', audioText: 'Ich trinke einen Tee und fahre mit der U-Bahn zur Arbeit.' },
        { speaker: 'Erzähler', targetText: 'Ich wohne in München und arbeite in einem Technologieunternehmen.', translation: "Münih'te yaşıyorum ve bir teknoloji şirketinde çalışıyorum.", audioText: 'Ich wohne in München und arbeite in einem Technologieunternehmen.' },
        { speaker: 'Erzähler', targetText: 'Am Abend koche ich leckeres Essen und lese ein Buch.', translation: 'Akşamları lezzetli yemek pişiririm ve kitap okurum.', audioText: 'Am Abend koche ich leckeres Essen und lese ein Buch.' }
      ]
    },
    {
      id: 'es-s1',
      language: 'spanish',
      langCode: 'es-ES',
      category: 'cafe-travel',
      title: 'Un café en Madrid (Madrids’de Bir Kahve)',
      summary: 'Aprende a pedir comida y pagar en un restaurante español.',
      level: 'A1',
      type: 'dialogue',
      vocabHighlighted: ['café', 'por favor', 'cuenta', 'gracias'],
      lines: [
        { speaker: 'Camarero', targetText: '¡Buenos días! ¿Qué desea tomar?', translation: 'Günaydın! Ne almak istersiniz?', audioText: '¡Buenos días! ¿Qué desea tomar?' },
        { speaker: 'Carlos', targetText: 'Hola, un café con leche y un cruasán, por favor.', translation: 'Merhaba, sütlü bir kahve ve bir kruvasan lütfen.', audioText: 'Hola un café con leche y un cruasán por favor.' },
        { speaker: 'Camarero', targetText: 'Muy bien. ¿Algo más?', translation: 'Çok iyi. Başka bir şey?', audioText: 'Muy bien. ¿Algo más?' },
        { speaker: 'Carlos', targetText: 'No, nada más. La cuenta, por favor.', translation: 'Hayır, başka bir şey yok. Hesap lütfen.', audioText: 'No nada más. La cuenta por favor.' }
      ]
    },
    {
      id: 'pt-s1',
      language: 'portuguese',
      langCode: 'pt-PT',
      category: 'cafe-travel',
      title: 'Manhã em Lisboa (Lizbon’da Bir Sabah)',
      summary: 'Como pedir um café e pastel de nata em Portugal.',
      level: 'A1',
      type: 'dialogue',
      vocabHighlighted: ['café', 'pastel de nata', 'obrigado', 'conta'],
      lines: [
        { speaker: 'Empregado', targetText: 'Bom dia! O que vai desejar?', translation: 'Günaydın! Ne arzu edersiniz?', audioText: 'Bom dia! O que vai desejar?' },
        { speaker: 'Maria', targetText: 'Bom dia! Um café e um pastel de nata, por favor.', translation: 'Günaydın! Bir kahve ve bir kremalı çörek lütfen.', audioText: 'Bom dia! Um café e um pastel de nata por favor.' },
        { speaker: 'Maria', targetText: 'Com licença, posso pagar com cartão?', translation: 'Affedersiniz, kartla ödeyebilir miyim?', audioText: 'Com licença posso pagar com cartão?' },
        { speaker: 'Empregado', targetText: 'Sim, claro. Muito obrigado!', translation: 'Evet, tabii ki. Çok teşekkürler!', audioText: 'Sim claro. Muito obrigado!' }
      ]
    },
    {
      id: 'en-s1',
      language: 'english',
      langCode: 'en-US',
      category: 'cafe-travel',
      title: 'Coffee Shop Order in London (Londra’da Kahve Siparişi)',
      summary: 'Learn how to order drinks and snacks in English.',
      level: 'A1',
      type: 'dialogue',
      vocabHighlighted: ['coffee', 'please', 'bill', 'thanks'],
      lines: [
        { speaker: 'Barista', targetText: 'Good morning! What can I get for you today?', translation: 'Günaydın! Bugün sizin için ne alabilirim?', audioText: 'Good morning! What can I get for you today?' },
        { speaker: 'John', targetText: 'Hello! I would like a cappuccino and a muffin, please.', translation: 'Merhaba! Bir kapuçino ve bir kek almak istiyorum, lütfen.', audioText: 'Hello! I would like a cappuccino and a muffin please.' },
        { speaker: 'Barista', targetText: 'Sure thing. That will be 6 pounds, please.', translation: 'Tabii ki. Toplam 6 Sterlin yapıyor, lütfen.', audioText: 'Sure thing. That will be 6 pounds please.' },
        { speaker: 'John', targetText: 'Here you go. Thank you very much!', translation: 'Buyurun. Çok teşekkür ederim!', audioText: 'Here you go. Thank you very much!' }
      ]
    }
  ],

  modules: [
    { id: 'de-a1', language: 'german', langCode: 'de-DE', level: 'A1', title: 'Almanca A1 Temel', tagline: 'Selamlaşma, kafe ve günlük ihtiyaçlar.', timePerDay: '3 DK / GÜN', grammarFocus: 'Artikel Yapısı (Der/Die/Das)', cards: [{ id: 'de-a1-1', targetText: 'Ich trinke Kaffee.', nativeTranslation: 'Ben kahve içiyorum.', breakdown: [{ word: 'Ich', mean: 'Ben', type: 'Zamir' }, { word: 'trinke', mean: 'içiyorum', type: 'Fiil' }, { word: 'Kaffee.', mean: 'kahve.', type: 'İsim' }], audioText: 'Ich trinke Kaffee', options: ['Ich', 'trinke', 'Kaffee.'], solution: ['Ich', 'trinke', 'Kaffee.'] }] },
    { id: 'es-a1', language: 'spanish', langCode: 'es-ES', level: 'A1', title: 'İspanyolca A1 Temel', tagline: 'Selamlaşma, yemek siparişi ve diyaloglar.', timePerDay: '3 DK / GÜN', grammarFocus: 'Ser vs Estar Kullanımı', cards: [{ id: 'es-a1-1', targetText: 'Un café por favor.', nativeTranslation: 'Bir kahve lütfen.', breakdown: [{ word: 'Un', mean: 'Bir', type: 'Artikel' }], audioText: 'Un café por favor', options: ['Un', 'café', 'por', 'favor.'], solution: ['Un', 'café', 'por', 'favor.'] }] },
    { id: 'pt-a1', language: 'portuguese', langCode: 'pt-PT', level: 'A1', title: 'Portekizce A1 Temel', tagline: 'Lizbon kafeleri ve günlük tanışma.', timePerDay: '3 DK / GÜN', grammarFocus: 'Ser / Estar / Ter', cards: [{ id: 'pt-a1-1', targetText: 'Um café por favor.', nativeTranslation: 'Bir kahve lütfen.', breakdown: [{ word: 'Um', mean: 'Bir', type: 'Artikel' }], audioText: 'Um café por favor', options: ['Um', 'café', 'por', 'favor.'], solution: ['Um', 'café', 'por', 'favor.'] }] },
    { id: 'en-a1', language: 'english', langCode: 'en-US', level: 'A1', title: 'İngilizce A1 Temel', tagline: 'Temel ihtiyaçlar, konuşma ve diyaloglar.', timePerDay: '3 DK / GÜN', grammarFocus: 'Geniş Zaman', cards: [{ id: 'en-a1-1', targetText: 'I drink coffee every day.', nativeTranslation: 'Her gün kahve içerim.', breakdown: [{ word: 'I', mean: 'Ben', type: 'Zamir' }], audioText: 'I drink coffee every day', options: ['I', 'drink', 'coffee', 'every', 'day.'], solution: ['I', 'drink', 'coffee', 'every', 'day.'] }] }
  ],

  grammarGuides: [
    { id: 'g-de-a1', language: 'german', level: 'A1', title: 'Der, Die, Das — Almanca Artikel Yapısı', rule: 'Almancada isimler Eril (der), Dişil (die) veya Nötr (das) cinsiyetler alır.', examples: [{ target: 'Der Kaffee ist heiß.', translation: 'Kahve sıcak.' }] }
  ],

  vocabPacks: [
    { id: 'v-de-1', language: 'german', langCode: 'de-DE', category: 'cafe-travel', word: 'Kaffee', translation: 'Kahve', type: 'İsim (m)', level: 'A1', exampleTarget: 'Ich trinke morgens gerne Kaffee.', exampleTranslation: 'Sabahları kahve içmeyi severim.' },
    { id: 'v-de-2', language: 'german', langCode: 'de-DE', category: 'cafe-travel', word: 'bestellen', translation: 'Sipariş vermek', type: 'Fiil', level: 'A1', exampleTarget: 'Wir möchten zwei Kaffee bestellen.', exampleTranslation: 'İki kahve sipariş etmek istiyoruz.' },
    { id: 'v-de-3', language: 'german', langCode: 'de-DE', category: 'daily-life', word: 'aufstehen', translation: 'Kalkmak / Uyanmak', type: 'Fiil', level: 'A1', exampleTarget: 'Ich stehe um 7 Uhr auf.', exampleTranslation: "Saat 7'de kalkıyorum." },
    { id: 'v-es-1', language: 'spanish', langCode: 'es-ES', category: 'cafe-travel', word: 'café', translation: 'Kahve', type: 'İsim', level: 'A1', exampleTarget: 'Un café con leche, por favor.', exampleTranslation: 'Sütlü bir kahve lütfen.' },
    { id: 'v-pt-1', language: 'portuguese', langCode: 'pt-PT', category: 'cafe-travel', word: 'pastel de nata', translation: 'Kremalı çörek', type: 'İsim', level: 'A1', exampleTarget: 'Gosto de pastel de nata.', exampleTranslation: 'Kremalı çöreği severim.' },
    { id: 'v-en-1', language: 'english', langCode: 'en-US', category: 'daily-life', word: 'coffee', translation: 'Kahve', type: 'İsim', level: 'A1', exampleTarget: 'I drink coffee every morning.', exampleTranslation: 'Her sabah kahve içerim.' }
  ]
};
