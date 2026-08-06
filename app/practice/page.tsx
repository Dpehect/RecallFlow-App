'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import { LANGUAGES, VOCAB_CATEGORIES, RECALLFLOW_ENTERPRISE_DATA } from '@/lib/data';
import { Bot, CheckCircle2, XCircle, ArrowRight, RefreshCw, Volume2, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface PracticePrompt {
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

const PRACTICE_DATABASE: PracticePrompt[] = [
  // --- GERMAN (ALMANCA) ---
  {
    id: "p-de-a1-1",
    language: "german",
    langCode: "de-DE",
    level: "A1",
    category: "cafe-travel",
    turkishSentence: "Sabahları sütlü ve sıcak bir kahve içmeyi severim.",
    expectedTarget: "Ich trinke morgens gerne einen heißen Kaffee mit Milch.",
    grammarNote: "Almancada düz cümlede fiil (trinke) 2. sıradadır. Nesne akuzatif (einen heißen Kaffee) alır.",
    keyWords: ["trinke", "morgens", "gerne", "Kaffee", "Milch"]
  },
  {
    id: "p-de-a1-2",
    language: "german",
    langCode: "de-DE",
    level: "A1",
    category: "cafe-travel",
    turkishSentence: "İki kapuçino ve bir elmalı pasta sipariş etmek istiyoruz.",
    expectedTarget: "Wir möchten zwei Cappuccino und einen Apfelkuchen bestellen.",
    grammarNote: "Möchten istemek fiilidir, bestellen esas fiili cümlenin en sonuna gider.",
    keyWords: ["möchten", "zwei", "Cappuccino", "bestellen"]
  },
  {
    id: "p-de-a1-3",
    language: "german",
    langCode: "de-DE",
    level: "A1",
    category: "daily-life",
    turkishSentence: "Her gün saat yedi civarında uyanıyorum.",
    expectedTarget: "Ich stehe jeden Tag um sieben Uhr auf.",
    grammarNote: "Aufstehen ayrılabilen bir fiildir. 'Stehe' 2. sırada, 'auf' öneki en sondadır.",
    keyWords: ["stehe", "Tag", "sieben", "Uhr", "auf"]
  },
  {
    id: "p-de-a2-1",
    language: "german",
    langCode: "de-DE",
    level: "A2",
    category: "work-business",
    turkishSentence: "Bugün yeni proje için önemli bir toplantımız var.",
    expectedTarget: "Heute haben wir ein wichtiges Treffen für das neue Projekt.",
    grammarNote: "Zaman zarfı (Heute) başa geldiğinde fiil (haben) 2. sırada, özne (wir) 3. sırada kalır.",
    keyWords: ["Heute", "haben", "Treffen", "Projekt"]
  },
  {
    id: "p-de-b1-1",
    language: "german",
    langCode: "de-DE",
    level: "B1",
    category: "work-business",
    turkishSentence: "Berlin'de çalışmak istediğim için yoğun bir şekilde Almanca öğreniyorum.",
    expectedTarget: "Ich lerne intensiv Deutsch, weil ich in Berlin arbeiten möchte.",
    grammarNote: "Weil bağlacı çekimli yardımcı fiili (möchte) yan cümlenin en sonuna iter.",
    keyWords: ["lerne", "intensiv", "weil", "arbeiten", "möchte"]
  },

  // --- ENGLISH (İNGİLİZCE) ---
  {
    id: "p-en-a1-1",
    language: "english",
    langCode: "en-US",
    level: "A1",
    category: "cafe-travel",
    turkishSentence: "Sabahları her zaman koyu bir sade kahve sipariş ederim.",
    expectedTarget: "I always order a strong black coffee in the morning.",
    grammarNote: "İngilizcede sıklık zarfı (always) özne ile ana fiil arasına yerleştirilir.",
    keyWords: ["always", "order", "strong", "black", "coffee"]
  },
  {
    id: "p-en-a2-1",
    language: "english",
    langCode: "en-US",
    level: "A2",
    category: "daily-life",
    turkishSentence: "Bütün gün bilgisayar başında çalışmak gözleri yorabilir.",
    expectedTarget: "Working at the computer all day can strain your eyes.",
    grammarNote: "Gerund (Working) cümle öznesi olarak kullanılmıştır.",
    keyWords: ["working", "computer", "strain", "eyes"]
  },
  {
    id: "p-en-b1-1",
    language: "english",
    langCode: "en-US",
    level: "B1",
    category: "work-business",
    turkishSentence: "Operasyonel maliyetleri düşürmek için üretim sürecimizi verimli hale getirmeliyiz.",
    expectedTarget: "We need to streamline our workflow to reduce operational costs.",
    grammarNote: "Need to + fiil yalın halde kullanılır. Amaç bildiren 'to reduce' yapısına dikkat edin.",
    keyWords: ["need", "streamline", "workflow", "reduce", "costs"]
  },

  // --- SPANISH (İSPANYOLCA) ---
  {
    id: "p-es-a1-1",
    language: "spanish",
    langCode: "es-ES",
    level: "A1",
    category: "cafe-travel",
    turkishSentence: "Lütfen bana şekersiz bir sütlü kahve ve bir bardak su getirin.",
    expectedTarget: "Por favor, tráigame un café con leche sin azúcar y un vaso de agua.",
    grammarNote: "İspanyolca emretme/rica kalıbında 'tráigame' fiili nezaket kipiyle kullanılır.",
    keyWords: ["favor", "tráigame", "café", "leche", "azúcar", "agua"]
  },

  // --- FRENCH (FRANSIZCA) ---
  {
    id: "p-fr-a1-1",
    language: "french",
    langCode: "fr-FR",
    level: "A1",
    category: "cafe-travel",
    turkishSentence: "Lütfen tereyağlı bir kruvasan ve sütlü bir kahve sipariş etmek isterim.",
    expectedTarget: "J'aimerais commander un croissant au beurre et un café crème s'il vous plaît.",
    grammarNote: "Nezaketle isteme ifadesi için 'J'aimerais' (koşul kipi) kullanılır.",
    keyWords: ["aimerais", "commander", "croissant", "beurre", "café"]
  },

  // --- PORTUGUESE (PORTEKİZCE) ---
  {
    id: "p-pt-a1-1",
    language: "portuguese",
    langCode: "pt-PT",
    level: "A1",
    category: "cafe-travel",
    turkishSentence: "Ne zaman bu kafede otursam sıcak bir kremalı çörek söylerim.",
    expectedTarget: "Sempre que me sento neste café peço um pastel de nata quente.",
    grammarNote: "'Sempre que' zaman bağlacıdır. 'Pastel de nata' Portekiz geleneksel tatlısıdır.",
    keyWords: ["Sempre", "sento", "café", "pastel", "nata"]
  }
];

export default function PracticePage() {
  const [selectedLang, setSelectedLang] = useState('english');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{
    score: number;
    isCorrect: boolean;
    explanation: string;
    missingWords: string[];
  } | null>(null);

  const [scoreHistory, setScoreHistory] = useState({ totalCompleted: 0, totalScore: 0 });

  // Filter prompts by Language, Level, and Category
  const filteredPrompts = PRACTICE_DATABASE.filter(p => {
    const langMatch = p.language === selectedLang;
    const levelMatch = selectedLevel === 'ALL' || p.level === selectedLevel;
    const catMatch = selectedCategory === 'ALL' || p.category === selectedCategory;
    return langMatch && levelMatch && catMatch;
  });

  const activePool = filteredPrompts.length > 0 
    ? filteredPrompts 
    : PRACTICE_DATABASE.filter(p => p.language === selectedLang);

  const finalPool = activePool.length > 0 ? activePool : PRACTICE_DATABASE;

  const currentPrompt = finalPool[currentPromptIndex % finalPool.length] || PRACTICE_DATABASE[0];

  const generateNewPrompt = useCallback(() => {
    setCurrentPromptIndex(prev => (prev + 1) % finalPool.length);
    setUserAnswer('');
    setFeedback(null);
  }, [finalPool.length]);

  useEffect(() => {
    setCurrentPromptIndex(0);
    setUserAnswer('');
    setFeedback(null);
  }, [selectedLang, selectedLevel, selectedCategory]);

  const normalizeText = (str: string) => {
    return str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
  };

  const evaluateAnswer = () => {
    if (!userAnswer.trim()) return;

    const normUser = normalizeText(userAnswer);
    const normExpected = normalizeText(currentPrompt.expectedTarget);

    if (normUser === normExpected) {
      setFeedback({
        score: 100,
        isCorrect: true,
        explanation: "Mükemmel! Cümleyi kelime ve gramer açısından eksiksiz çevirdiniz.",
        missingWords: []
      });
      sounds.playCorrect();
      setScoreHistory(prev => ({ totalCompleted: prev.totalCompleted + 1, totalScore: prev.totalScore + 100 }));
      return;
    }

    const userWords = normUser.split(/\s+/);
    const missing = currentPrompt.keyWords.filter(kw => !userWords.some(uw => uw.includes(kw.toLowerCase())));

    const matchedWordsCount = currentPrompt.keyWords.length - missing.length;
    const matchRatio = matchedWordsCount / currentPrompt.keyWords.length;
    const calculatedScore = Math.max(30, Math.round(matchRatio * 90));

    const isGood = calculatedScore >= 70;

    let note = "";
    if (missing.length > 0) {
      note = `Eksik veya hatalı kullanılan kritik kelimeler: ${missing.join(', ')}. `;
    } else {
      note = "Tüm kritik kelimeleri kullandınız, ancak kelime sırası veya bağlaç uyumuna dikkat edin. ";
    }

    setFeedback({
      score: calculatedScore,
      isCorrect: isGood,
      explanation: `${note}${currentPrompt.grammarNote}`,
      missingWords: missing
    });

    if (isGood) sounds.playCorrect(); else sounds.playWrong();
    setScoreHistory(prev => ({ totalCompleted: prev.totalCompleted + 1, totalScore: prev.totalScore + calculatedScore }));
  };

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F1EA] text-[#141413]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8 flex-1 w-full font-mono">
        {/* Editorial Header */}
        <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-black bg-[#EA580C] text-white px-3 py-1 border border-black inline-block uppercase">
              ÇOK DİLLİ AI PRATİK ROBOTU
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black text-black mt-2 tracking-tight italic">
              AI Cümle & Çeviri Robotu
            </h1>
            <p className="text-xs text-slate-800 mt-1 font-bold">
              Türkçe verilen cümlelerin hedef dildeki karşılığını yazın, sistem anında kelime ve gramer analizi yapsın.
            </p>
          </div>

          {/* Practice Stats */}
          <div className="flex items-center space-x-4 bg-[#FAF8F5] p-3 border-2 border-black shadow-[3px_3px_0px_0px_#121212]">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Çözülen Cümle</span>
              <span className="font-editorial text-2xl font-black text-black">{scoreHistory.totalCompleted}</span>
            </div>
            <div className="text-right border-l-2 border-black pl-4">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Ortalama Skor</span>
              <span className="font-editorial text-2xl font-black text-[#65A30D]">
                {scoreHistory.totalCompleted > 0 ? Math.round(scoreHistory.totalScore / scoreHistory.totalCompleted) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* LANGUAGE SELECTOR BAR */}
        <div className="space-y-2">
          <span className="text-xs font-black text-black uppercase block">1. PRATİK YAPILACAK DİLİ SEÇİN:</span>
          <div className="flex flex-wrap gap-2 bg-[#FAF8F5] p-2 border-2 border-black shadow-[3px_3px_0px_0px_#121212]">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-4 py-2 font-mono text-xs font-black uppercase transition border-2 border-black flex items-center space-x-2 ${
                  selectedLang === lang.id
                    ? 'bg-[#EAB308] text-black shadow-[2px_2px_0px_0px_#121212]'
                    : 'bg-white text-black hover:bg-[#F2EFE9]'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CONTROLS BAR: LEVEL & CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#121212]">
          {/* Level Switcher */}
          <div className="space-y-1">
            <span className="text-xs font-black text-slate-700 uppercase block">2. SEVİYE SEÇİMİ:</span>
            <div className="flex gap-1.5 flex-wrap">
              {['A1', 'A2', 'B1', 'B2', 'ALL'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 border-2 border-black font-black text-xs transition ${
                    selectedLevel === lvl
                      ? 'bg-[#65A30D] text-white shadow-[2px_2px_0px_0px_#121212]'
                      : 'bg-white text-black hover:bg-[#F2EFE9]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Switcher */}
          <div className="space-y-1">
            <span className="text-xs font-black text-slate-700 uppercase block">3. KATEGORİ SEÇİMİ:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border-2 border-black bg-white text-xs font-black uppercase focus:outline-none shadow-[2px_2px_0px_0px_#121212]"
            >
              <option value="ALL">✨ Tüm Kategoriler</option>
              {VOCAB_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* MAIN PRACTICE ROBOT CARD */}
        {currentPrompt && (
          <div className="bg-[#FAF8F5] border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] space-y-6">
            <div className="flex justify-between items-center border-b-2 border-black pb-3">
              <span className="text-xs font-black bg-[#EAB308] text-black px-3 py-1 border border-black uppercase flex items-center gap-1.5">
                <Bot className="w-4 h-4" /> {currentLangObj.flag} {currentLangObj.name} ({currentPrompt.level}) — AI PRATİK
              </span>

              <button
                onClick={generateNewPrompt}
                className="bg-[#EA580C] hover:bg-[#DC2626] text-white border-2 border-black text-xs font-black px-4 py-2 shadow-[2px_2px_0px_0px_#121212] hover:translate-x-[-1px] hover:translate-y-[-1px] transition flex items-center gap-1.5 uppercase"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Yeni Cümle Üret</span>
              </button>
            </div>

            {/* Prompt Target Sentence */}
            <div className="bg-white p-6 border-2 border-black shadow-[3px_3px_0px_0px_#121212] space-y-2">
              <span className="text-xs font-black text-[#EA580C] uppercase block">Çevrilecek Türkçe Cümle:</span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-black text-black italic leading-tight">
                "{currentPrompt.turkishSentence}"
              </h2>
            </div>

            {/* User Translation Input Area */}
            <div className="space-y-3">
              <label className="text-xs font-black text-black uppercase block">
                {currentLangObj.name} Çevirinizi Yazın:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') evaluateAnswer(); }}
                  placeholder={`${currentLangObj.name} cümlenizi buraya yazın...`}
                  className="flex-1 p-4 border-2 border-black bg-white text-sm font-bold text-black focus:outline-none shadow-[3px_3px_0px_0px_#121212]"
                />
                <button
                  onClick={evaluateAnswer}
                  className="bg-[#EA580C] hover:bg-[#DC2626] text-white border-2 border-black font-black text-xs px-6 py-4 shadow-[4px_4px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#121212] transition-all uppercase tracking-wider whitespace-nowrap"
                >
                  KONTROL ET ➔
                </button>
              </div>
            </div>

            {/* AI FEEDBACK ANALYSIS DISPLAY */}
            {feedback && (
              <div className={`p-6 border-2 border-black shadow-[4px_4px_0px_0px_#121212] space-y-4 ${
                feedback.isCorrect ? 'bg-[#4ADE80]/30' : 'bg-[#F87171]/30'
              }`}>
                <div className="flex justify-between items-center border-b-2 border-black pb-3">
                  <div className="flex items-center space-x-2">
                    {feedback.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-[#65A30D]" />
                    ) : (
                      <XCircle className="w-6 h-6 text-[#DC2626]" />
                    )}
                    <span className="font-editorial text-2xl font-black italic text-black">
                      {feedback.isCorrect ? 'Başarılı Çeviri!' : 'Geliştirilebilir Çeviri'}
                    </span>
                  </div>

                  <span className="font-editorial text-2xl font-black bg-black text-white px-3 py-1 border border-black">
                    SKOR: {feedback.score}%
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-black text-slate-700 uppercase block">AI Analiz & Gramer Notu:</span>
                    <p className="text-xs font-bold text-black bg-white p-3 border-2 border-black mt-1">
                      {feedback.explanation}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-black text-slate-700 uppercase block">Beklenen Doğru {currentLangObj.name} Versiyon:</span>
                    <div className="flex items-center justify-between bg-white p-3 border-2 border-black mt-1">
                      <span className="font-bold text-base text-black italic">"{currentPrompt.expectedTarget}"</span>
                      <button
                        onClick={() => sounds.speak(currentPrompt.expectedTarget, currentPrompt.langCode)}
                        className="p-2 bg-[#65A30D] text-white border-2 border-black shadow-[2px_2px_0px_0px_#121212] hover:translate-x-[-1px] hover:translate-y-[-1px] transition"
                        title="Dinle"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={generateNewPrompt}
                    className="bg-black text-white border-2 border-black font-black text-xs px-5 py-2.5 shadow-[2px_2px_0px_0px_#121212] hover:bg-slate-900 transition flex items-center gap-2"
                  >
                    <span>Sonraki Cümleye Geç</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-[#FAF8F5] border-t-2 border-black py-6 text-center text-xs font-mono font-bold text-slate-800">
        RECALLFLOW MULTILINGUAL AI PRACTICE ROBOT & SENTENCE EVALUATOR
      </footer>
    </div>
  );
}
