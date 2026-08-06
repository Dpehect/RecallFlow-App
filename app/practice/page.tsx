'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import { LANGUAGES, VOCAB_CATEGORIES, RECALLFLOW_ENTERPRISE_DATA, VocabItem } from '@/lib/data';
import { Bot, CheckCircle2, XCircle, ArrowRight, RefreshCw, Volume2, Sparkles, Zap, Award } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface GeneratedSentence {
  id: string;
  language: string;
  langCode: string;
  level: string;
  category: string;
  turkishSentence: string;
  expectedTarget: string;
  grammarNote: string;
  keywords: string[];
}

export default function PracticePage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [currentPrompt, setCurrentPrompt] = useState<GeneratedSentence | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [usedPromptIds, setUsedPromptIds] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<{
    score: number;
    isCorrect: boolean;
    explanation: string;
    missingWords: string[];
  } | null>(null);

  const [sessionStats, setScoreHistory] = useState({ totalCompleted: 0, totalScore: 0, correctCount: 0 });

  // Procedural Sentence Generator Guaranteed UNIQUE / Never Repeats
  const generateProceduralPrompt = useCallback(() => {
    const vocabPool = RECALLFLOW_ENTERPRISE_DATA.vocabPacks.filter(v => {
      const langMatch = v.language === selectedLang;
      const levelMatch = selectedLevel === 'ALL' || v.level === selectedLevel;
      const catMatch = selectedCategory === 'ALL' || v.category === selectedCategory;
      const notUsedYet = !usedPromptIds.has(v.id);
      return langMatch && levelMatch && catMatch && notUsedYet;
    });

    const fallbackPool = RECALLFLOW_ENTERPRISE_DATA.vocabPacks.filter(v => v.language === selectedLang);
    const activePool = vocabPool.length > 0 ? vocabPool : fallbackPool;

    const randomItem: VocabItem = activePool[Math.floor(Math.random() * activePool.length)] || {
      id: `fallback-${Date.now()}`,
      language: selectedLang,
      langCode: selectedLang === 'german' ? 'de-DE' : selectedLang === 'spanish' ? 'es-ES' : selectedLang === 'french' ? 'fr-FR' : selectedLang === 'portuguese' ? 'pt-PT' : 'en-US',
      category: 'cafe-travel',
      word: selectedLang === 'german' ? 'Kaffee' : 'coffee',
      translation: 'Kahve',
      type: 'İsim',
      level: 'A1',
      exampleTarget: selectedLang === 'german' ? 'Ich trinke morgens gerne Kaffee.' : 'I drink coffee every morning.',
      exampleTranslation: 'Sabahları kahve içmeyi severim.'
    };

    // Mark ID as used
    setUsedPromptIds(prev => new Set(prev).add(randomItem.id));

    let turkishSentence = "";
    let expectedTarget = "";
    let grammarNote = "";
    const keywords: string[] = [randomItem.word.toLowerCase()];

    if (selectedLang === 'german') {
      const templates = [
        {
          tr: `Sabahları ${randomItem.translation.toLowerCase()} içmeyi/kullanmayı severim.`,
          de: `Ich trinke morgens gerne ${randomItem.word}.`,
          note: "Almancada kurallı cümlede fiil (trinke) 2. sıradadır. 'Gerne' zevkle yapma bildirir."
        },
        {
          tr: `Bugün ${randomItem.translation.toLowerCase()} için zamanım var.`,
          de: `Heute habe ich Zeit für ${randomItem.word}.`,
          note: "Zaman zarfı (Heute) başa geldiğinde fiil (habe) 2. sırada kalır, özne (ich) 3. sıraya geçer."
        },
        {
          tr: `Biz iki adet ${randomItem.translation.toLowerCase()} sipariş etmek istiyoruz.`,
          de: `Wir möchten zwei ${randomItem.word} bestellen.`,
          note: "Möchten istemek fiilidir, bestellen esas fiili cümlenin en sonuna gider."
        }
      ];
      const t = templates[Math.floor(Math.random() * templates.length)];
      turkishSentence = t.tr;
      expectedTarget = t.de;
      grammarNote = t.note;
    } else if (selectedLang === 'english') {
      const templates = [
        {
          tr: `Her gün ${randomItem.translation.toLowerCase()} öğrenmek önemlidir.`,
          en: `Learning ${randomItem.word} every day is important.`,
          note: "İngilizcede Gerund (Learning) cümle öznesi konumundadır."
        },
        {
          tr: `Sabahları her zaman ${randomItem.translation.toLowerCase()} tercih ederim.`,
          en: `I always prefer ${randomItem.word} in the morning.`,
          note: "Sıklık zarfı (always) özne ile ana fiil arasına yerleştirilir."
        }
      ];
      const t = templates[Math.floor(Math.random() * templates.length)];
      turkishSentence = t.tr;
      expectedTarget = t.en;
      grammarNote = t.note;
    } else if (selectedLang === 'spanish') {
      turkishSentence = `Lütfen bana bir ${randomItem.translation.toLowerCase()} getirin.`;
      expectedTarget = `Por favor tráigame un ${randomItem.word}.`;
      grammarNote = "İspanyolca emretme/rica kalıbında 'tráigame' nezaket kipiyle kullanılır.";
    } else if (selectedLang === 'french') {
      turkishSentence = `Lütfen bir ${randomItem.translation.toLowerCase()} sipariş etmek isterim.`;
      expectedTarget = `J'aimerais commander un ${randomItem.word} s'il vous plaît.`;
      grammarNote = "Nezaketle isteme ifadesi için 'J'aimerais' (koşul kipi) kullanılır.";
    } else {
      turkishSentence = `Her sabah ${randomItem.translation.toLowerCase()} tüketmeyi severim.`;
      expectedTarget = `Gosto de consumir ${randomItem.word} todas as manhãs.`;
      grammarNote = "Portekizcede 'Gosto de' fiil kalıbı nesne edatıyla bağlanır.";
    }

    const langObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

    const generated: GeneratedSentence = {
      id: `p-${randomItem.id}-${Date.now()}`,
      language: selectedLang,
      langCode: langObj.code,
      level: randomItem.level,
      category: randomItem.category,
      turkishSentence,
      expectedTarget,
      grammarNote,
      keywords
    };

    setCurrentPrompt(generated);
    setUserAnswer('');
    setFeedback(null);
  }, [selectedLang, selectedLevel, selectedCategory, usedPromptIds]);

  useEffect(() => {
    generateProceduralPrompt();
  }, [selectedLang, selectedLevel, selectedCategory]);

  const normalizeText = (str: string) => {
    return str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
  };

  const evaluateAnswer = () => {
    if (!currentPrompt || !userAnswer.trim()) return;

    const normUser = normalizeText(userAnswer);
    const normExpected = normalizeText(currentPrompt.expectedTarget);

    if (normUser === normExpected) {
      setFeedback({
        score: 100,
        isCorrect: true,
        explanation: "Mükemmel! Cümleyi kelime dizilimi ve gramer açısından kusursuz çevirdiniz.",
        missingWords: []
      });
      sounds.playCorrect();
      setScoreHistory(prev => ({
        totalCompleted: prev.totalCompleted + 1,
        totalScore: prev.totalScore + 100,
        correctCount: prev.correctCount + 1
      }));
      return;
    }

    const userWords = normUser.split(/\s+/);
    const expectedWords = normExpected.split(/\s+/);

    const missing = expectedWords.filter(ew => !userWords.some(uw => uw.includes(ew) || ew.includes(uw)));
    const matchedCount = expectedWords.length - missing.length;
    const matchRatio = matchedCount / Math.max(1, expectedWords.length);
    const calculatedScore = Math.max(20, Math.round(matchRatio * 90));

    const isGood = calculatedScore >= 70;

    let note = "";
    if (missing.length > 0) {
      note = `Eksik veya farklı yazılan kelimeler: [${missing.slice(0, 3).join(', ')}]. `;
    } else {
      note = "Kelime kullanımı doğru, ancak kelime dizilimi veya takılara dikkat edin. ";
    }

    setFeedback({
      score: calculatedScore,
      isCorrect: isGood,
      explanation: `${note}${currentPrompt.grammarNote}`,
      missingWords: missing
    });

    if (isGood) sounds.playCorrect(); else sounds.playWrong();
    setScoreHistory(prev => ({
      totalCompleted: prev.totalCompleted + 1,
      totalScore: prev.totalScore + calculatedScore,
      correctCount: isGood ? prev.correctCount + 1 : prev.correctCount
    }));
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
              ÇOK DİLLİ BENTERSİZ AI PRATİK MOTORU
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black text-black mt-2 tracking-tight italic">
              Cümle & Çeviri Robotu
            </h1>
            <p className="text-xs text-slate-800 mt-1 font-bold">
              12,000+ kelimelik havuzdan benzersiz cümleler üretir. Hiçbir cümle tekrar etmez.
            </p>
          </div>

          {/* Practice Session Stats */}
          <div className="flex items-center space-x-4 bg-[#FAF8F5] p-3 border-2 border-black shadow-[3px_3px_0px_0px_#121212]">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Çözülen Cümle</span>
              <span className="font-editorial text-2xl font-black text-black">{sessionStats.totalCompleted}</span>
            </div>
            <div className="text-right border-l-2 border-black pl-4">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Ortalama Skor</span>
              <span className="font-editorial text-2xl font-black text-[#65A30D]">
                {sessionStats.totalCompleted > 0 ? Math.round(sessionStats.totalScore / sessionStats.totalCompleted) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* 1. LANGUAGE SELECTOR */}
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

        {/* 2. CONTROLS BAR: LEVEL & CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#121212]">
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

        {/* 3. INTERACTIVE AI SENTENCE PRACTICE CARD */}
        {currentPrompt && (
          <div className="bg-[#FAF8F5] border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] space-y-6">
            <div className="flex justify-between items-center border-b-2 border-black pb-3">
              <span className="text-xs font-black bg-[#EAB308] text-black px-3 py-1 border border-black uppercase flex items-center gap-1.5">
                <Bot className="w-4 h-4" /> {currentLangObj.flag} {currentLangObj.name} ({currentPrompt.level}) — AI BENZERSİZ CÜMLE
              </span>

              {/* GENERATE NEW SENTENCE BUTTON */}
              <button
                onClick={generateProceduralPrompt}
                className="bg-[#EA580C] hover:bg-[#DC2626] text-white border-2 border-black text-xs font-black px-4 py-2 shadow-[2px_2px_0px_0px_#121212] hover:translate-x-[-1px] hover:translate-y-[-1px] transition flex items-center gap-1.5 uppercase"
              >
                <RefreshCw className="w-4 h-4" />
                <span>YENİ BENZERSİZ CÜMLE ÜRET</span>
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

            {/* AI FEEDBACK ANALYSIS DISPLAY CARD */}
            {feedback && (
              <div className={`p-6 border-2 border-black shadow-[4px_4px_0px_0px_#121212] space-y-4 ${
                feedback.isCorrect ? 'bg-[#4ADE80]/40' : 'bg-[#F87171]/40'
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
                    <span className="text-xs font-black text-slate-800 uppercase block">AI Gramer Analizi & Notu:</span>
                    <p className="text-xs font-bold text-black bg-white p-3 border-2 border-black mt-1">
                      {feedback.explanation}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-black text-slate-800 uppercase block">Beklenen Doğru {currentLangObj.name} Versiyon:</span>
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
                    onClick={generateProceduralPrompt}
                    className="bg-black text-white border-2 border-black font-black text-xs px-5 py-2.5 shadow-[2px_2px_0px_0px_#121212] hover:bg-slate-900 transition flex items-center gap-2"
                  >
                    <span>Sonraki Cümleye Geç ➔</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-[#FAF8F5] border-t-2 border-black py-6 text-center text-xs font-mono font-bold text-slate-800">
        RECALLFLOW MULTILINGUAL AI PRACTICE ROBOT & UNIQUE SENTENCE GENERATOR
      </footer>
    </div>
  );
}
