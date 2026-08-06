'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import GamificationBanner from '@/components/GamificationBanner';
import { LANGUAGES, CATEGORIES, RECALLFLOW_ENTERPRISE_DATA, VocabItem } from '@/lib/data';
import { SRSItem, calculateSM2, ReviewGrade } from '@/lib/srs';
import { getStoredItems, saveStoredItems, getStoredStats, recordReview, UserStats } from '@/lib/storage';
import { Volume2, RotateCw, CheckCircle2, AlertCircle, Sparkles, Brain, Clock, Zap } from 'lucide-react';

export default function VocabPage() {
  const [selectedLang, setSelectedLang] = useState('english');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>({});
  const [stats, setStats] = useState<UserStats>({ streak: 1, lastActiveDate: '', totalReviewed: 0, totalMastered: 0, dailyGoal: 20, todayCount: 0 });
  const [speaking, setSpeaking] = useState(false);

  // Initialize storage
  useEffect(() => {
    const loadedStats = getStoredStats();
    setStats(loadedStats);
    const storedSrs = getStoredItems();
    setSrsItems(storedSrs);
  }, []);

  // Filter raw vocabulary
  const rawPacks = RECALLFLOW_ENTERPRISE_DATA.vocabPacks.filter(item => {
    const langMatch = item.language === selectedLang;
    const levelMatch = selectedLevel === 'ALL' || item.level === selectedLevel;
    return langMatch && levelMatch;
  });

  // Merge raw packs with stored SRS data
  const currentDeck: SRSItem[] = rawPacks.map(raw => {
    if (srsItems[raw.id]) {
      return srsItems[raw.id];
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

  // Speak word using Web Speech API
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

  // Handle Review Grade (SM-2 SRS)
  const handleGrade = useCallback((grade: ReviewGrade) => {
    if (!activeItem) return;

    const updatedItem = calculateSM2(activeItem, grade);
    const isMastered = updatedItem.state === 'mastered';

    const newSrsMap = { ...srsItems, [updatedItem.id]: updatedItem };
    setSrsItems(newSrsMap);
    saveStoredItems(newSrsMap);

    const updatedStats = recordReview(isMastered);
    setStats(updatedStats);

    // Flip back & move to next card
    setIsFlipped(false);
    if (currentIndex < currentDeck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  }, [activeItem, srsItems, currentIndex, currentDeck.length]);

  // Keyboard Navigation
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
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Gamification & Daily Streak Header */}
        <GamificationBanner stats={stats} />

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-md">
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">Dil:</span>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => { setSelectedLang(lang.id); setCurrentIndex(0); setIsFlipped(false); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                    selectedLang === lang.id
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Level Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">Seviye:</span>
            <div className="flex gap-1.5">
              {['ALL', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => { setSelectedLevel(lvl); setCurrentIndex(0); setIsFlipped(false); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition border ${
                    selectedLevel === lvl
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main 3D Interactive Flashcard Section */}
        {activeItem ? (
          <div className="space-y-6">
            {/* Progress counter */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-blue-400 font-bold">
                <Brain className="w-4 h-4" /> SM-2 SRS Algoritması Aktif
              </span>
              <span>Kart {currentIndex + 1} / {currentDeck.length}</span>
            </div>

            {/* 3D Glassmorphism Card */}
            <div 
              onClick={() => setIsFlipped(prev => !prev)}
              className="cursor-pointer group perspective-1000 min-h-[360px] w-full"
            >
              <div className={`relative w-full min-h-[360px] duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* CARD FRONT SIDE */}
                <div className="absolute inset-0 backface-hidden bg-slate-900/90 border-2 border-slate-800 group-hover:border-blue-500/50 rounded-3xl p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
                  {/* Top bar info */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold bg-blue-950 text-blue-400 px-3 py-1 rounded-full border border-blue-800">
                      {activeItem.level} SEVİYE
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {activeItem.repetition > 0 ? `Öğrenme Derecesi: ${activeItem.repetition}` : 'Yeni Kelime'}
                    </span>
                  </div>

                  {/* Main Word & Phonetic */}
                  <div className="text-center space-y-4 my-auto">
                    <h2 className="text-5xl font-black text-white tracking-tight">{activeItem.word}</h2>
                    {activeItem.phonetic && (
                      <p className="text-sm font-mono text-indigo-400 bg-indigo-950/40 inline-block px-3 py-1 rounded-lg border border-indigo-800/40">
                        {activeItem.phonetic}
                      </p>
                    )}

                    {/* Audio Buttons */}
                    <div className="pt-2 flex justify-center gap-3" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => speakWord(activeItem.word, activeItem.language)}
                        className={`p-3 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 hover:bg-blue-600 hover:text-white transition flex items-center space-x-2 ${speaking ? 'animate-pulse' : ''}`}
                        title="Normal Hızda Dinle"
                      >
                        <Volume2 className="w-5 h-5" />
                        <span className="text-xs font-bold font-mono">Dinle</span>
                      </button>
                      <button
                        onClick={() => speakWord(activeItem.word, activeItem.language, true)}
                        className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition flex items-center space-x-2 text-xs font-mono"
                        title="Yavaş Hızda Dinle"
                      >
                        <span>🐢 Yavaş</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom hint */}
                  <div className="text-center">
                    <span className="text-xs text-slate-500 font-mono flex items-center justify-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" /> Cevabı ve örnek cümleyi görmek için tıklayın veya SPACE tuşuna basın
                    </span>
                  </div>
                </div>

                {/* CARD BACK SIDE */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900/95 border-2 border-indigo-500/40 rounded-3xl p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
                  {/* Top info */}
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono font-bold text-indigo-400 uppercase">TÜRKÇE KARŞILIĞI & ÖRNEK</span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">SM-2 Tekrar Sıklığı: {activeItem.interval} Gün</span>
                  </div>

                  {/* Meaning & Example */}
                  <div className="space-y-6 my-auto text-left">
                    <div>
                      <span className="text-xs font-mono text-slate-400 block uppercase">Anlamı</span>
                      <h3 className="text-3xl font-black text-amber-400">{activeItem.translation}</h3>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                      <span className="text-xs font-mono text-indigo-400 font-bold block">Örnek Cümle:</span>
                      <p className="text-base text-slate-200 font-medium italic">"{activeItem.example}"</p>
                      <p className="text-xs text-slate-400 font-mono">→ {activeItem.exampleTranslation}</p>
                    </div>
                  </div>

                  {/* Keyboard shortcut hint */}
                  <div className="text-center text-xs text-slate-500 font-mono">
                    Derecelendirmek için aşağıdaki butonlara veya 1, 2, 3, 4 tuşlarına basın
                  </div>
                </div>

              </div>
            </div>

            {/* SRS Review Action Bar (SM-2 Grading) */}
            {isFlipped && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 animate-fade-in">
                {/* Grade 1: Again */}
                <button
                  onClick={() => handleGrade(1)}
                  className="bg-red-950/60 border border-red-800/60 hover:bg-red-900 text-red-300 p-4 rounded-2xl transition text-left space-y-1 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">1. Tekrar Et</span>
                    <span className="text-xs font-mono bg-red-900/60 px-2 py-0.5 rounded text-red-200">Tuş: 1</span>
                  </div>
                  <p className="text-xs text-red-400/80">Hatırlayamadım (Hemen tekrar et)</p>
                </button>

                {/* Grade 2: Hard */}
                <button
                  onClick={() => handleGrade(2)}
                  className="bg-amber-950/60 border border-amber-800/60 hover:bg-amber-900 text-amber-300 p-4 rounded-2xl transition text-left space-y-1 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">2. Zor</span>
                    <span className="text-xs font-mono bg-amber-900/60 px-2 py-0.5 rounded text-amber-200">Tuş: 2</span>
                  </div>
                  <p className="text-xs text-amber-400/80">Zor hatırlandı (+1 gün)</p>
                </button>

                {/* Grade 3: Good */}
                <button
                  onClick={() => handleGrade(3)}
                  className="bg-blue-950/60 border border-blue-800/60 hover:bg-blue-900 text-blue-300 p-4 rounded-2xl transition text-left space-y-1 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">3. İyi</span>
                    <span className="text-xs font-mono bg-blue-900/60 px-2 py-0.5 rounded text-blue-200">Tuş: 3</span>
                  </div>
                  <p className="text-xs text-blue-400/80">Normal hatırlandı (Standart aralık)</p>
                </button>

                {/* Grade 4: Easy */}
                <button
                  onClick={() => handleGrade(4)}
                  className="bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900 text-emerald-300 p-4 rounded-2xl transition text-left space-y-1 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">4. Kolay</span>
                    <span className="text-xs font-mono bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-200">Tuş: 4</span>
                  </div>
                  <p className="text-xs text-emerald-400/80">Çok kolay hatırlandı (+Geniş aralık)</p>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-black text-white">Harika İş! Bu Seviyedeki Tüm Kartları Tamamladınız</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Seçili dil ve seviyedeki kelimelerin tekrarlarını bitirdiniz. Başka bir dil veya seviye seçerek devam edebilirsiniz.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW (LEXIFLOW) ENTERPRISE — SUPERMEMO SM-2 SRS ENGINE & OFFLINE PERSISTENCE
      </footer>
    </div>
  );
}
