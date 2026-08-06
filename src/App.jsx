import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import LevelSelector from './components/LevelSelector';
import CategorySelector from './components/CategorySelector';
import ModeSwitcher from './components/ModeSwitcher';
import Flashcard from './components/Flashcard';
import DialogueList from './components/DialogueList';
import ProgressBar from './components/ProgressBar';
import { getWords, getDialogues, updateWordStatus } from './services/api';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [level, setLevel] = useState('A1');
  const [category, setCategory] = useState('Seyahat & Otel');
  const [mode, setMode] = useState('flashcards');

  const [words, setWords] = useState([]);
  const [dialogues, setDialogues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedCount, setLearnedCount] = useState(0);
  const [xpPoints, setXpPoints] = useState(140);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (mode === 'flashcards') {
      getWords(language, level, category).then((data) => {
        if (isMounted) {
          setWords(data);
          setCurrentIndex(0);
          setLearnedCount(data.filter((w) => w.isLearned).length);
          setLoading(false);
        }
      });
    } else {
      getDialogues(language, level, category).then((data) => {
        if (isMounted) {
          setDialogues(data);
          setLoading(false);
        }
      });
    }

    return () => { isMounted = false; };
  }, [language, level, category, mode]);

  const currentWord = words[currentIndex];

  const handleNextWord = async (wordId) => {
    await updateWordStatus(wordId, true);
    setWords((prev) => prev.map((w) => (w.id === wordId ? { ...w, isLearned: true } : w)));
    setLearnedCount((prev) => prev + 1);
    setXpPoints((prev) => prev + 10);

    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(words.length);
    }
  };

  const handleReviewWord = async (wordId) => {
    await updateWordStatus(wordId, false);
    setWords((prev) => {
      const remaining = [...prev];
      const [reviewItem] = remaining.splice(currentIndex, 1);
      return [...remaining, reviewItem];
    });
  };

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header with Gamification Stats */}
      <Header streak={7} learnedCount={learnedCount} xpPoints={xpPoints} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 flex flex-col justify-center space-y-4">
        
        {/* Dock 1: Language & Level Dock */}
        <section className="p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
          <div className="text-center mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            1. Dil ve Seviye Seçin
          </div>
          <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
          <LevelSelector selectedLevel={level} onSelectLevel={setLevel} />
        </section>

        {/* Dock 2: Mode Switcher */}
        <section className="p-3 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
          <div className="text-center mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            2. Çalışma Modu Seçin
          </div>
          <ModeSwitcher activeMode={mode} onSwitchMode={setMode} />
        </section>

        {/* Dock 3: Category Grid */}
        <CategorySelector selectedCategory={category} onSelectCategory={setCategory} />

        {/* Content Arena */}
        {mode === 'flashcards' ? (
          <>
            <ProgressBar current={learnedCount} total={words.length} />
            {loading ? (
              <div className="w-full max-w-md h-[380px] mx-auto rounded-3xl glass-card flex items-center justify-center my-6">
                <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <Flashcard
                word={currentWord}
                language={language}
                onNext={handleNextWord}
                onReview={handleReviewWord}
              />
            )}
          </>
        ) : (
          <DialogueList dialogues={dialogues} language={language} category={category} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center border-t border-white/5 text-[11px] text-slate-500">
        LexiFlow • Designed with Minimalist UX & Awwwards Excellence
      </footer>
    </div>
  );
}
