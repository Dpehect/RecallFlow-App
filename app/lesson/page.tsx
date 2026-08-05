'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { RECALLFLOW_ENTERPRISE_DATA, Card, LANGUAGES } from '@/lib/data';
import { sounds } from '@/lib/sound';

function LessonContent() {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get('module') || 'de-a1-coffee';
  const currentMod = RECALLFLOW_ENTERPRISE_DATA.modules.find(m => m.id === moduleId) || RECALLFLOW_ENTERPRISE_DATA.modules[0];
  const langObj = LANGUAGES.find(l => l.id === currentMod.language) || LANGUAGES[0];

  const [cardIdx, setCardIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentCard: Card = currentMod.cards[cardIdx];

  if (!currentCard) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-6">
        <span className="text-5xl">🏆</span>
        <h2 className="text-3xl font-black text-slate-900">Module Completed!</h2>
        <p className="text-slate-600 text-sm">You mastered all cards in the {currentMod.title} module ({langObj.name}).</p>
        <Link href="/" className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase shadow-md">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleWordClick = (word: string) => {
    if (!selectedWords.includes(word)) {
      sounds.playClick();
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleRemoveWord = (index: number) => {
    sounds.playClick();
    const updated = [...selectedWords];
    updated.splice(index, 1);
    setSelectedWords(updated);
  };

  const handleCheck = () => {
    const correct = selectedWords.join(' ') === currentCard.solution.join(' ');
    setIsCorrect(correct);
    setChecked(true);

    if (correct) {
      sounds.playCorrect();
      sounds.speak(currentCard.audioText, currentMod.langCode);
    } else {
      sounds.playWrong();
    }
  };

  const handleNext = () => {
    setChecked(false);
    setSelectedWords([]);
    setCardIdx(cardIdx + 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 w-full font-sans">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <Link href="/" className="text-slate-400 hover:text-slate-900">← Exit Lesson</Link>
        <span className="font-mono font-bold text-xs text-blue-600">{langObj.flag} {currentMod.title.toUpperCase()} ({currentMod.level})</span>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">TAP WORDS TO BUILD SENTENCE</span>
          <h2 className="text-3xl font-black text-slate-900">"{currentCard.nativeTranslation}"</h2>
        </div>

        <div className="flex justify-center">
          <button onClick={() => sounds.speak(currentCard.audioText, currentMod.langCode)} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-xl text-xs font-bold transition">
            🔊 Listen Native Audio ({langObj.name.split(' ')[0]})
          </button>
        </div>

        <div className="min-h-[72px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-4 flex flex-wrap justify-center gap-2">
          {selectedWords.length === 0 ? (
            <span className="text-xs text-slate-400 font-mono">Tap option chips below to construct sentence</span>
          ) : (
            selectedWords.map((word, i) => (
              <span key={i} onClick={() => handleRemoveWord(i)} className="bg-blue-50 border border-blue-200 text-blue-700 font-bold px-3.5 py-1.5 rounded-xl text-sm cursor-pointer">
                {word} ×
              </span>
            ))
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {currentCard.options.map((word, i) => (
            <button key={i} onClick={() => handleWordClick(word)} disabled={selectedWords.includes(word)} className={`bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold ${selectedWords.includes(word) ? 'opacity-30' : 'hover:border-blue-500'}`}>
              {word}
            </button>
          ))}
        </div>
      </div>

      {!checked ? (
        <button onClick={handleCheck} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl uppercase tracking-wider text-sm shadow-lg shadow-blue-500/20">
          Check Solution
        </button>
      ) : (
        <div className={`p-6 rounded-2xl flex justify-between items-center ${isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
          <div>
            <h4 className="font-extrabold text-lg">{isCorrect ? '🎉 Perfect!' : '💡 Correct Answer:'}</h4>
            {!isCorrect && <p className="text-xs">{currentCard.solution.join(' ')}</p>}
          </div>
          <button onClick={handleNext} className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase">
            Next Card ➔
          </button>
        </div>
      )}
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div>Loading lesson engine...</div>}>
      <LessonContent />
    </Suspense>
  );
}
