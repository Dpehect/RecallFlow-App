'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RECALLFLOW_ENTERPRISE_DATA, LANGUAGES } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function SRSPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState({ reviewed: 0, easeAverage: 2.5 });

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

    setStats(prev => ({ ...prev, reviewed: prev.reviewed + 1 }));
    setFlipped(false);
    setCardIdx((cardIdx + 1) % (cardsPool.length || 1));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tight text-slate-900 flex items-center space-x-2">
            <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
            <span>RECALLFLOW</span>
          </Link>
          <div className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
            SM-2 SPACED REPETITION ENGINE
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono text-blue-600 font-bold uppercase">SUPERMEMO SM-2 ALGORITHM</span>
            <h1 className="text-2xl font-black text-slate-900 mt-0.5">Spaced Repetition Review</h1>
          </div>
          <div className="flex space-x-2 bg-white p-1 rounded-xl border border-slate-200">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => { setSelectedLang(lang.id); setCardIdx(0); setFlipped(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedLang === lang.id ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>

        {!currentCard ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-400 font-mono text-sm">
            No active cards queued for review in this language.
          </div>
        ) : (
          <div className="space-y-6">
            <div
              onClick={() => { setFlipped(!flipped); sounds.playClick(); }}
              className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl text-center space-y-6 cursor-pointer min-h-[260px] flex flex-col justify-center items-center relative transition-all hover:border-blue-300"
            >
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">TAP CARD TO FLIP</span>
              <h2 className="text-4xl font-black text-slate-900">{currentCard.targetText}</h2>

              {flipped && (
                <div className="pt-4 border-t border-slate-100 w-full space-y-2 animate-fadeIn">
                  <p className="text-xl font-bold text-blue-600">"{currentCard.nativeTranslation}"</p>
                  <button onClick={(e) => { e.stopPropagation(); sounds.speak(currentCard.audioText, currentLangObj.code); }} className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg">
                    🔊 Native Audio
                  </button>
                </div>
              )}
            </div>

            {flipped && (
              <div className="grid grid-cols-4 gap-3 pt-2">
                <button onClick={() => handleRating(1)} className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 p-3 rounded-2xl text-xs font-bold text-center">
                  <div>Again</div>
                  <div className="text-[10px] font-mono text-rose-400">1 day</div>
                </button>
                <button onClick={() => handleRating(3)} className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 p-3 rounded-2xl text-xs font-bold text-center">
                  <div>Hard</div>
                  <div className="text-[10px] font-mono text-amber-400">3 days</div>
                </button>
                <button onClick={() => handleRating(4)} className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 p-3 rounded-2xl text-xs font-bold text-center">
                  <div>Good</div>
                  <div className="text-[10px] font-mono text-blue-400">6 days</div>
                </button>
                <button onClick={() => handleRating(5)} className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 p-3 rounded-2xl text-xs font-bold text-center">
                  <div>Easy</div>
                  <div className="text-[10px] font-mono text-emerald-400">12 days</div>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW SM-2 SPACED REPETITION CORE
      </footer>
    </div>
  );
}
