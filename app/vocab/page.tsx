'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import GamificationBanner from '@/components/GamificationBanner';
import { LANGUAGES, VOCAB_CATEGORIES, RECALLFLOW_ENTERPRISE_DATA } from '@/lib/data';
import { SRSItem, calculateSM2, ReviewGrade } from '@/lib/srs';
import { getStoredItems, saveStoredItem, getStoredStats, recordReview, UserStats } from '@/lib/storage';
import { Volume2, RotateCw, CheckCircle2, Brain, Folder, Filter, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 20;

export default function VocabPage() {
  const [selectedLang, setSelectedLang] = useState('english');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>({});
  const [stats, setStats] = useState<UserStats>({ streak: 1, lastActiveDate: '', totalReviewed: 0, totalMastered: 0, dailyGoal: 20, todayCount: 0 });
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    async function loadData() {
      const loadedStats = await getStoredStats();
      setStats(loadedStats);
      const storedSrs = await getStoredItems();
      setSrsItems(storedSrs);
    }
    loadData();
  }, []);

  // Filter raw vocabulary
  const filteredRawPacks = RECALLFLOW_ENTERPRISE_DATA.vocabPacks.filter(item => {
    const langMatch = item.language === selectedLang;
    const catMatch = selectedCategory === 'ALL' || item.category === selectedCategory;
    const levelMatch = selectedLevel === 'ALL' || item.level === selectedLevel;
    return langMatch && catMatch && levelMatch;
  });

  const totalFilteredCount = filteredRawPacks.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / PAGE_SIZE));

  // Current Page Slice
  const pagePacks = filteredRawPacks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const currentDeck: SRSItem[] = pagePacks.map(raw => {
    if (srsItems[raw.id]) {
      return {
        ...srsItems[raw.id],
        translation: raw.translation,
        example: raw.exampleTarget,
        exampleTranslation: raw.exampleTranslation,
        phonetic: raw.phonetic
      };
    }
    return {
      id: raw.id,
      word: raw.word,
      phonetic: raw.phonetic,
      translation: raw.translation,
      example: raw.exampleTarget,
      exampleTranslation: raw.exampleTranslation,
      language: raw.language,
      level: raw.level,
      repetition: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReview: new Date().toISOString(),
      state: 'new'
    };
  });

  const activeItem = currentDeck[currentIndex] || null;

  const speakWord = useCallback((text: string, langCode: string, slow = false) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langObj = LANGUAGES.find(l => l.id === selectedLang);
    utterance.lang = langObj ? langObj.code : 'en-US';
    utterance.rate = slow ? 0.7 : 1.0;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [selectedLang]);

  const handleGrade = useCallback(async (grade: ReviewGrade) => {
    if (!activeItem) return;

    const updatedItem = calculateSM2(activeItem, grade);
    const isMastered = updatedItem.state === 'mastered';

    const newSrsMap = { ...srsItems, [updatedItem.id]: updatedItem };
    setSrsItems(newSrsMap);
    await saveStoredItem(updatedItem);

    const updatedStats = await recordReview(isMastered);
    setStats(updatedStats);

    setIsFlipped(false);
    if (currentIndex < currentDeck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      setCurrentIndex(0);
    } else {
      setCurrentIndex(0);
    }
  }, [activeItem, srsItems, currentIndex, currentDeck.length, currentPage, totalPages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (isFlipped) {
        if (e.key === '1') handleGrade(1);
        else if (e.key === '2') handleGrade(2);
        else if (e.key === '3') handleGrade(3);
        else if (e.key === '4') handleGrade(4);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, handleGrade]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F1EA] text-[#141413]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Editorial Header */}
        <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono font-black bg-[#EA580C] text-white px-3 py-1 border border-black inline-block uppercase">
              EDITORIAL KELİME & 600+ HAVUZ
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black text-black mt-2 tracking-tight italic">
              Kelime & Akıllı Kartlar
            </h1>
            <p className="text-xs font-mono text-slate-800 mt-1 font-bold">
              Seviye başına 600+ kelimelik tam veri havuzu ve SuperMemo SM-2 algoritması.
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex flex-wrap gap-2 bg-[#FAF8F5] p-2 border-2 border-black shadow-[3px_3px_0px_0px_#121212]">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => { setSelectedLang(lang.id); setCurrentPage(1); setCurrentIndex(0); setIsFlipped(false); }}
                className={`px-3 py-1.5 font-mono text-xs font-black uppercase transition border-2 border-black ${
                  selectedLang === lang.id
                    ? 'bg-[#EAB308] text-black shadow-[2px_2px_0px_0px_#121212]'
                    : 'bg-white text-black hover:bg-[#F2EFE9]'
                }`}
              >
                <span>{lang.flag}</span> <span className="ml-1">{lang.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gamification Banner */}
        <GamificationBanner stats={stats} />

        {/* CATEGORY EXPLORER */}
        <div className="space-y-3 font-mono">
          <div className="flex justify-between items-center text-xs font-bold uppercase">
            <span className="flex items-center gap-1.5 text-black">
              <Folder className="w-4 h-4 text-[#65A30D]" /> KATEGORİ SEÇİMİ
            </span>
            <span className="text-slate-600">Toplam {totalFilteredCount} Kelime Bulundu</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
            <button
              onClick={() => { setSelectedCategory('ALL'); setCurrentPage(1); setCurrentIndex(0); setIsFlipped(false); }}
              className={`p-3 border-2 border-black text-left transition space-y-1 ${
                selectedCategory === 'ALL'
                  ? 'bg-[#EAB308] text-black shadow-[4px_4px_0px_0px_#121212] font-black'
                  : 'bg-[#FAF8F5] text-black hover:bg-white shadow-[2px_2px_0px_0px_#121212]'
              }`}
            >
              <div className="text-lg">✨</div>
              <div className="text-xs font-black">Tüm Konular</div>
            </button>

            {VOCAB_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); setCurrentIndex(0); setIsFlipped(false); }}
                  className={`p-3 border-2 border-black text-left transition space-y-1 ${
                    isSelected
                      ? 'bg-[#EAB308] text-black shadow-[4px_4px_0px_0px_#121212] font-black'
                      : 'bg-[#FAF8F5] text-black hover:bg-white shadow-[2px_2px_0px_0px_#121212]'
                  }`}
                >
                  <div className="text-lg">{cat.icon}</div>
                  <div className="text-xs font-black truncate">{cat.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* LEVEL FILTER & CAPACITY BADGE */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FAF8F5] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#121212] font-mono">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold uppercase flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#65A30D]" /> SEVİYE:
            </span>
            <div className="flex gap-1.5">
              {['A1', 'A2', 'B1', 'B2', 'ALL'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => { setSelectedLevel(lvl); setCurrentPage(1); setCurrentIndex(0); setIsFlipped(false); }}
                  className={`px-3 py-1 font-black text-xs border-2 border-black transition ${
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

          {/* PAGE SWITCHER & CAPACITY COUNTER */}
          <div className="flex items-center space-x-4">
            <div className="text-xs font-black text-white bg-[#EA580C] px-3 py-1 border border-black flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3.5 h-3.5" /> SEVİYE BAŞINA {totalFilteredCount} KELİME AKTİF
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); setCurrentIndex(0); setIsFlipped(false); }}
                className="p-1.5 bg-white border-2 border-black disabled:opacity-40 font-black"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-black px-2">Sayfa {currentPage} / {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); setCurrentIndex(0); setIsFlipped(false); }}
                className="p-1.5 bg-white border-2 border-black disabled:opacity-40 font-black"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* FLASHCARD SECTION */}
        {activeItem ? (
          <div className="space-y-6 font-mono">
            <div className="flex justify-between items-center text-xs font-bold text-black border-b-2 border-black pb-2">
              <span className="flex items-center gap-1 text-[#65A30D]">
                <Brain className="w-4 h-4" /> SM-2 SRS ALGORİTMASI (DÜZEN: SAYFA {currentPage}, KART {currentIndex + 1})
              </span>
              <span>TOPLAM HAVUZ: {totalFilteredCount} KELİME</span>
            </div>

            {/* BRUTALIST 3D CARD */}
            <div 
              onClick={() => setIsFlipped(prev => !prev)}
              className="cursor-pointer group perspective-1000 min-h-[380px] w-full"
            >
              <div className={`relative w-full min-h-[380px] duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* CARD FRONT SIDE */}
                <div className="absolute inset-0 backface-hidden bg-[#FAF8F5] border-2 border-black p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#121212]">
                  <div className="flex justify-between items-center border-b-2 border-black pb-3">
                    <span className="text-xs font-black bg-[#EAB308] text-black px-3 py-1 border border-black uppercase">
                      {activeItem.level} SEVİYESİ
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {activeItem.repetition > 0 ? `DERECE: ${activeItem.repetition}` : 'YENİ KELİME'}
                    </span>
                  </div>

                  <div className="text-center space-y-4 my-auto">
                    <h2 className="font-editorial text-6xl font-black text-black tracking-tight italic">
                      {activeItem.word}
                    </h2>
                    {activeItem.phonetic && (
                      <p className="text-xs font-bold text-black bg-[#EAB308]/30 inline-block px-3 py-1 border border-black">
                        {activeItem.phonetic}
                      </p>
                    )}

                    <div className="pt-2 flex justify-center gap-3" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => speakWord(activeItem.word, activeItem.language)}
                        className="px-4 py-2 bg-[#65A30D] text-white border-2 border-black font-black text-xs shadow-[2px_2px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#121212] transition-all flex items-center gap-2"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>DİNLE</span>
                      </button>
                      <button
                        onClick={() => speakWord(activeItem.word, activeItem.language, true)}
                        className="px-3 py-2 bg-white text-black border-2 border-black font-black text-xs shadow-[2px_2px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#121212] transition-all"
                      >
                        🐢 YAVAŞ
                      </button>
                    </div>
                  </div>

                  <div className="text-center border-t-2 border-black pt-3">
                    <span className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1 uppercase">
                      <RotateCw className="w-3.5 h-3.5" /> TIKLAYIN VEYA SPACE TUŞUNA BASIN
                    </span>
                  </div>
                </div>

                {/* CARD BACK SIDE */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#FAF8F5] border-2 border-black p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#121212]">
                  <div className="flex justify-between items-center border-b-2 border-black pb-3">
                    <span className="text-xs font-black text-black bg-[#EAB308] px-3 py-1 border border-black uppercase">TÜRKÇE KARŞILIĞI</span>
                    <span className="text-xs font-bold text-[#65A30D]">TEKRAR SIKLIĞI: {activeItem.interval} GÜN</span>
                  </div>

                  <div className="space-y-6 my-auto text-left">
                    <div>
                      <span className="text-xs text-slate-600 font-bold block uppercase">Anlamı</span>
                      <h3 className="font-editorial text-4xl font-black text-black italic">{activeItem.translation}</h3>
                    </div>

                    <div className="bg-white p-4 border-2 border-black shadow-[3px_3px_0px_0px_#121212] space-y-1.5">
                      <span className="text-xs font-bold text-[#65A30D] block uppercase">Bağlamsal Örnek Cümle:</span>
                      <p className="text-base text-black font-bold italic">"{activeItem.example}"</p>
                      <p className="text-xs text-slate-700 font-bold">→ {activeItem.exampleTranslation}</p>
                    </div>
                  </div>

                  <div className="text-center text-xs font-bold text-slate-700 border-t-2 border-black pt-3">
                    DERECELENDİRMEK İÇİN 1, 2, 3, 4 TUŞLARINA BASIN
                  </div>
                </div>

              </div>
            </div>

            {/* SRS Review Action Bar */}
            {isFlipped && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <button
                  onClick={() => handleGrade(1)}
                  className="bg-[#F87171] border-2 border-black text-black p-4 shadow-[4px_4px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#121212] transition-all text-left space-y-1 font-mono"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-black text-sm uppercase">1. Tekrar Et</span>
                    <span className="text-xs font-bold bg-white px-1.5 border border-black">1</span>
                  </div>
                  <p className="text-[10px] font-bold">Hatırlayamadım</p>
                </button>

                <button
                  onClick={() => handleGrade(2)}
                  className="bg-[#FBBF24] border-2 border-black text-black p-4 shadow-[4px_4px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#121212] transition-all text-left space-y-1 font-mono"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-black text-sm uppercase">2. Zor</span>
                    <span className="text-xs font-bold bg-white px-1.5 border border-black">2</span>
                  </div>
                  <p className="text-[10px] font-bold">Zor hatırlandı (+1 gün)</p>
                </button>

                <button
                  onClick={() => handleGrade(3)}
                  className="bg-[#60A5FA] border-2 border-black text-black p-4 shadow-[4px_4px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#121212] transition-all text-left space-y-1 font-mono"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-black text-sm uppercase">3. İyi</span>
                    <span className="text-xs font-bold bg-white px-1.5 border border-black">3</span>
                  </div>
                  <p className="text-[10px] font-bold">Normal hatırlandı</p>
                </button>

                <button
                  onClick={() => handleGrade(4)}
                  className="bg-[#4ADE80] border-2 border-black text-black p-4 shadow-[4px_4px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#121212] transition-all text-left space-y-1 font-mono"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-black text-sm uppercase">4. Kolay</span>
                    <span className="text-xs font-bold bg-white px-1.5 border border-black">4</span>
                  </div>
                  <p className="text-[10px] font-bold">Çok kolay hatırlandı</p>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FAF8F5] border-2 border-black shadow-[4px_4px_0px_0px_#121212] space-y-4 font-mono">
            <CheckCircle2 className="w-16 h-16 text-[#65A30D] mx-auto" />
            <h3 className="font-editorial text-3xl font-black text-black italic">Tüm Kartlar Tamamlandı!</h3>
            <p className="text-xs font-bold text-slate-700 max-w-md mx-auto">
              Seçili kategorideki kartları bitirdiniz. Başka bir kategori seçerek devam edebilirsiniz.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-[#FAF8F5] border-t-2 border-black py-6 text-center text-xs font-mono font-bold text-slate-800">
        RECALLFLOW EDITORIAL BRUTALIST VOCABULARY & 600+ WORDS ENGINE
      </footer>
    </div>
  );
}
