import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import LevelSelector from './components/LevelSelector';
import Flashcard from './components/Flashcard';
import ProgressBar from './components/ProgressBar';
import { getWords, updateWordStatus } from './services/api';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [level, setLevel] = useState('A1');
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedCount, setLearnedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load words when language or level changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getWords(language, level).then((data) => {
      if (isMounted) {
        setWords(data);
        setCurrentIndex(0);
        setLearnedCount(data.filter((w) => w.isLearned).length);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [language, level]);

  const currentWord = words[currentIndex];

  const handleNextWord = async (wordId) => {
    // Mark as learned in API & state
    await updateWordStatus(wordId, true);

    setWords((prev) =>
      prev.map((w) => (w.id === wordId ? { ...w, isLearned: true } : w))
    );
    setLearnedCount((prev) => prev + 1);

    // Advance index
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(words.length); // End of deck
    }
  };

  const handleReviewWord = async (wordId) => {
    // Mark as not learned / needs review
    await updateWordStatus(wordId, false);

    // Move current word to the end of deck queue
    setWords((prev) => {
      const remaining = [...prev];
      const [reviewItem] = remaining.splice(currentIndex, 1);
      return [...remaining, reviewItem];
    });
  };

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <Header streak={7} learnedToday={learnedCount} />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 flex flex-col justify-center">
        {/* Lazy Mode Selectors */}
        <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
        <LevelSelector selectedLevel={level} onSelectLevel={setLevel} />

        {/* Learning Progress */}
        <ProgressBar current={learnedCount} total={words.length} />

        {/* Flashcard Component */}
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
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center border-t border-white/5 text-[11px] text-slate-500">
        LexiFlow • Designed with Minimalist UX & Awwwards Excellence
      </footer>
    </div>
  );
}
