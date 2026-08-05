'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { RECALLFLOW_ENTERPRISE_DATA, LANGUAGES } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function SRSPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];
  const activeModules = RECALLFLOW_ENTERPRISE_DATA.modules.filter(m => m.language === selectedLang);
  const cardsPool = activeModules.flatMap(m => m.cards);
  const currentCard = cardsPool[cardIdx];

  const handleRating = async (quality: number) => {
    sounds.playClick();
    if (currentCard) {
      await fetch('/api/srs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: currentCard.id,
          quality,
          repetitions: 1,
          easeFactor: 2.5,
          interval: 1
        })
      });
    }

    setFlipped(false);
    setCardIdx((cardIdx + 1) % (cardsPool.length || 1));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">SUPERMEMO SM-2 ALGORITHM</span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">3D Spaced Repetition Review</h1>
          </div>
          <div className="flex space-x-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => { setSelectedLang(lang.id); setCardIdx(0); setFlipped(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${selectedLang === lang.id ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>

        {!currentCard ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-sm">
            No active cards queued for review in this language.
          </div>
        ) : (
          <div className="space-y-8">
            {/* 3D Flip Card Container */}
            <div
              onClick={() => { setFlipped(!flipped); sounds.playClick(); }}
              className="perspective-1000 h-72 cursor-pointer w-full"
            >
              <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
                {/* Front */}
                <div className="card-front bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl p-8 flex flex-col justify-between items-center text-center glow-border">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">TAP CARD TO REVEAL TRANSLATION</span>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white">{currentCard.targetText}</h2>
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">3D Flip Interactive Card</div>
                </div>

                {/* Back */}
                <div className="card-back bg-slate-900 dark:bg-slate-900 border-2 border-blue-600 shadow-2xl rounded-3xl p-8 flex flex-col justify-between items-center text-center text-white">
                  <span className="text-xs font-mono text-blue-400 uppercase">TRANSLATION & AUDIO</span>
                  <div className="space-y-3">
                    <p className="text-3xl font-extrabold text-white">"{currentCard.nativeTranslation}"</p>
                    <button onClick={(e) => { e.stopPropagation(); sounds.speak(currentCard.audioText, currentLangObj.code); }} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md">
                      🔊 Listen Native Audio
                    </button>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Rate difficulty below to schedule next review</span>
                </div>
              </div>
            </div>

            {/* SM-2 Rating Controls */}
            <div className="grid grid-cols-4 gap-3 pt-2">
              <button onClick={() => handleRating(1)} className="bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 p-4 rounded-2xl text-xs font-bold text-center transition hover:scale-105">
                <div>Again</div>
                <div className="text-[10px] font-mono text-rose-400">1 day</div>
              </button>
              <button onClick={() => handleRating(3)} className="bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 p-4 rounded-2xl text-xs font-bold text-center transition hover:scale-105">
                <div>Hard</div>
                <div className="text-[10px] font-mono text-amber-400">3 days</div>
              </button>
              <button onClick={() => handleRating(4)} className="bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 p-4 rounded-2xl text-xs font-bold text-center transition hover:scale-105">
                <div>Good</div>
                <div className="text-[10px] font-mono text-blue-400">6 days</div>
              </button>
              <button onClick={() => handleRating(5)} className="bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 p-4 rounded-2xl text-xs font-bold text-center transition hover:scale-105">
                <div>Easy</div>
                <div className="text-[10px] font-mono text-emerald-400">12 days</div>
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW SM-2 SPACED REPETITION ENGINE
      </footer>
    </div>
  );
}
