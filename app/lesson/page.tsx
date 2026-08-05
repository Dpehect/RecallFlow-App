'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { RECALLFLOW_ENTERPRISE_DATA, Card, LANGUAGES } from '@/lib/data';
import { sounds } from '@/lib/sound';

function LessonContent() {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get('module') || 'de-a1';
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
        <span className="text-6xl">🏆</span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Tebrikler! Dersi Tamamladın</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">{currentMod.title} modülündeki tüm kartları başarıyla öğrendin.</p>
        <div className="pt-4 flex justify-center space-x-4">
          <Link href="/" className="bg-blue-600 text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase shadow-md">
            Ana Sayfaya Dön
          </Link>
          <Link href="/srs" className="bg-slate-900 dark:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase">
            Aralıklı Tekrar Yap
          </Link>
        </div>
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
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8 w-full font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link href="/" className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-xs">
          ← Çıkış
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-base">{langObj.flag}</span>
          <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400 uppercase">{currentMod.title} ({currentMod.level})</span>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">CÜMLEYİ OLUŞTURMAK İÇİN KELİMELERE DOKUN</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">"{currentCard.nativeTranslation}"</h2>
        </div>

        {/* Audio Pronunciation Reference */}
        <div className="flex justify-center">
          <button onClick={() => sounds.speak(currentCard.audioText, currentMod.langCode)} className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-4 py-2.5 rounded-2xl text-xs font-bold transition hover:scale-105">
            🔊 Doğal Telaffuzu Dinle ({langObj.name.split(' ')[0]})
          </button>
        </div>

        {/* Answer Slot */}
        <div className="min-h-[76px] bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-4 flex flex-wrap justify-center items-center gap-2">
          {selectedWords.length === 0 ? (
            <span className="text-xs text-slate-400 font-mono">Kelime çiplerine dokunarak buraya dizin</span>
          ) : (
            selectedWords.map((word, i) => (
              <span key={i} onClick={() => handleRemoveWord(i)} className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold px-4 py-2 rounded-xl text-sm cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition">
                {word} ×
              </span>
            ))
          )}
        </div>

        {/* Option Chips Pool */}
        <div className="flex flex-wrap justify-center gap-3">
          {currentCard.options.map((word, i) => (
            <button key={i} onClick={() => handleWordClick(word)} disabled={selectedWords.includes(word)} className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-2xl text-sm font-semibold transition ${selectedWords.includes(word) ? 'opacity-30 cursor-not-allowed' : 'hover:border-blue-500 hover:scale-105'}`}>
              {word}
            </button>
          ))}
        </div>

        {/* Deep Grammar & Breakdown Note */}
        {currentCard.breakdown && currentCard.breakdown.length > 0 && (
          <div className="bg-blue-50/60 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-100 dark:border-blue-900 text-xs space-y-2">
            <span className="font-bold text-blue-700 dark:text-blue-300 font-mono uppercase">Kelime Yapısı ve Anlam Notu:</span>
            <div className="flex flex-wrap gap-2">
              {currentCard.breakdown.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-blue-100 dark:border-blue-900 text-slate-900 dark:text-slate-100">
                  <span className="font-bold">{item.word}</span> = <span className="text-slate-600 dark:text-slate-400">{item.mean}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      {!checked ? (
        <button onClick={handleCheck} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4.5 rounded-2xl uppercase tracking-wider text-sm shadow-lg shadow-blue-500/20">
          Cevabı Kontrol Et ➔
        </button>
      ) : (
        <div className={`p-6 rounded-2xl flex justify-between items-center ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800'}`}>
          <div>
            <h4 className="font-black text-lg">{isCorrect ? '🎉 Harika! Doğru Cümle' : '💡 Doğru Çözüm:'}</h4>
            {!isCorrect && <p className="text-sm mt-0.5 font-bold">{currentCard.solution.join(' ')}</p>}
          </div>
          <button onClick={handleNext} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-6 py-3.5 rounded-xl text-xs uppercase shadow-md">
            Sonraki Kart ➔
          </button>
        </div>
      )}
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div>Ders yükleniyor...</div>}>
      <LessonContent />
    </Suspense>
  );
}
