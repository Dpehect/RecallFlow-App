import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, RefreshCw, Sparkles, PartyPopper } from 'lucide-react';

export default function Flashcard({ word, language, onNext, onReview }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
    setShowCelebration(false);
  }, [word]);

  if (!word) {
    return (
      <div className="w-full max-w-md h-[400px] mx-auto rounded-3xl glass-card flex flex-col items-center justify-center p-8 text-center border border-emerald-500/30 bg-emerald-500/5">
        <PartyPopper className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
        <h3 className="text-2xl font-black text-white">Harika İş! Deste Tamamlandı 🎉</h3>
        <p className="text-xs text-slate-300 mt-2 max-w-xs">
          Bu kategorideki tüm kelimeleri başarıyla öğrendiniz. Başka bir kategori veya seviye seçebilirsiniz!
        </p>
      </div>
    );
  }

  const playAudio = (e, text = word.targetWord) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const localeMap = { en: 'en-US', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', pt: 'pt-PT' };
    utterance.lang = localeMap[language] || 'en-US';
    utterance.rate = 0.85;

    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleLearnedClick = () => {
    setShowCelebration(true);
    setTimeout(() => {
      onNext(word.id);
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto my-4 px-2 relative">
      {/* XP Pop-up Animation */}
      {showCelebration && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black px-4 py-1.5 rounded-full text-xs shadow-2xl animate-bounce z-50 flex items-center gap-1">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>+10 XP Kazandın! 🎉</span>
        </div>
      )}

      {/* 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-[380px] perspective-1000 cursor-pointer group select-none"
      >
        <div
          className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full rounded-3xl glass-card p-8 flex flex-col justify-between backface-hidden border border-white/10 group-hover:border-cyan-400/40 transition-all duration-300 shadow-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90">
            <div className="flex justify-between items-center text-xs">
              <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-extrabold flex items-center gap-1">
                <span>✨ {word.category}</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 font-bold">
                Kartı Çevir ↺
              </span>
            </div>

            <div className="text-center my-auto">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                {word.targetWord}
              </h2>
              {word.phonetic && (
                <p className="text-sm font-mono text-cyan-400 font-semibold">
                  {word.phonetic}
                </p>
              )}

              <button
                onClick={(e) => playAudio(e)}
                className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill border border-cyan-400/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 hover:scale-105 active:scale-95 transition-all shadow-lg ${
                  isPlayingAudio ? 'ring-2 ring-cyan-400 animate-pulse' : ''
                }`}
              >
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Telaffuz Dinle</span>
              </button>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-slate-400 font-medium">
                💡 Türkçe anlamını görmek için tıkla
              </span>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full rounded-3xl glass-card p-8 flex flex-col justify-between backface-hidden rotate-y-180 border border-purple-500/40 shadow-2xl bg-gradient-to-br from-[#0B0D1B] via-[#0E122B] to-[#160E30]">
            <div className="flex justify-between items-center text-xs">
              <span className="px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-extrabold">
                🇹🇷 Türkçe Anlamı
              </span>
              <button
                onClick={(e) => playAudio(e)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-purple-300 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="my-auto space-y-4">
              <h3 className="text-3xl font-black text-white tracking-wide">
                {word.translation}
              </h3>

              {word.exampleSentence && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-left">
                  <p className="text-xs font-bold text-slate-200 italic">
                    “{word.exampleSentence}”
                  </p>
                  {word.exampleTranslation && (
                    <p className="text-[11px] text-slate-400">
                      {word.exampleTranslation}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="text-center">
              <span className="text-[11px] text-slate-400 font-medium">
                Sonucu aşağıdan seçin 👇
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => onReview(word.id)}
          className="flex-1 py-3.5 px-6 rounded-2xl glass-pill border border-rose-500/40 text-rose-300 font-bold text-sm flex items-center justify-center gap-2 hover:bg-rose-500/15 active:scale-95 transition-all shadow-lg"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Tekrar Et</span>
        </button>

        <button
          onClick={handleLearnedClick}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 transition-all shadow-xl"
        >
          <CheckCircle2 className="w-5 h-5 fill-slate-950 text-emerald-400" />
          <span>Öğrendim (+10 XP)</span>
        </button>
      </div>
    </div>
  );
}
