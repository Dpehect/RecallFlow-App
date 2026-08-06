import React, { useState, useEffect } from 'react';
import { Volume2, RotateCw, CheckCircle2, RefreshCw, Bookmark, Sparkles } from 'lucide-react';

export default function Flashcard({ word, language, onNext, onReview }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Reset flip state when word changes
  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  if (!word) {
    return (
      <div className="w-full max-w-md h-[420px] mx-auto rounded-3xl glass-card flex flex-col items-center justify-center p-8 text-center border border-white/10">
        <Sparkles className="w-12 h-12 text-cyan-400 mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-slate-100">Tebrikler! Deste Tamamlandı 🎉</h3>
        <p className="text-xs text-slate-400 mt-2 max-w-xs">
          Bu seviyedeki tüm kelimeleri öğrendiniz. Yeni bir seviye veya dil seçebilirsiniz.
        </p>
      </div>
    );
  }

  // Text-To-Speech Pronunciation trigger
  const playAudio = (e, text = word.targetWord) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert('Tarayıcınız sesli okumayı desteklemiyor.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language code to TTS locale
    const localeMap = {
      en: 'en-US',
      de: 'de-DE',
      fr: 'fr-FR',
      es: 'es-ES',
      pt: 'pt-PT',
    };
    utterance.lang = localeMap[language] || 'en-US';
    utterance.rate = 0.9;

    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 px-4">
      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-[380px] perspective-1000 cursor-pointer group select-none"
      >
        <div
          className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl glass-card p-8 flex flex-col justify-between backface-hidden border border-white/10 group-hover:border-cyan-500/30 transition-colors shadow-2xl">
            {/* Card Header */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold tracking-wide">
                {word.category || 'Vocabulary'}
              </span>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                Kartı Çevir ↺
              </span>
            </div>

            {/* Word Center */}
            <div className="text-center my-auto">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                {word.targetWord}
              </h2>
              {word.phonetic && (
                <p className="text-sm font-mono text-cyan-400/80 mt-1">
                  {word.phonetic}
                </p>
              )}

              {/* Audio Pronunciation Button */}
              <button
                onClick={(e) => playAudio(e)}
                className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 hover:scale-105 transition-all duration-300 ${
                  isPlayingAudio ? 'ring-2 ring-cyan-400 animate-pulse' : ''
                }`}
              >
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Telaffuz Dinle</span>
              </button>
            </div>

            {/* Footer Prompt */}
            <div className="text-center">
              <span className="text-[11px] text-slate-500 font-medium">
                Anlamı ve örnek cümleyi görmek için tıklayın
              </span>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl glass-card p-8 flex flex-col justify-between backface-hidden rotate-y-180 border border-purple-500/30 shadow-2xl bg-gradient-to-br from-[#0A0D18] via-[#0D1021] to-[#120B24]">
            {/* Header */}
            <div className="flex justify-between items-center text-xs">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold">
                Türkçe Anlamı
              </span>
              <button
                onClick={(e) => playAudio(e)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                title="Yeniden Dinle"
              >
                <Volume2 className="w-4 h-4 text-purple-400" />
              </button>
            </div>

            {/* Translation Content */}
            <div className="my-auto space-y-4">
              <div>
                <h3 className="text-3xl font-extrabold text-white tracking-wide">
                  {word.translation}
                </h3>
              </div>

              {word.exampleSentence && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1.5 text-left">
                  <p className="text-xs font-semibold text-slate-300 italic flex items-start gap-1.5">
                    <span>“{word.exampleSentence}”</span>
                  </p>
                  {word.exampleTranslation && (
                    <p className="text-[11px] text-slate-400">
                      {word.exampleTranslation}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Hint */}
            <div className="text-center">
              <span className="text-[11px] text-slate-500 font-medium">
                Sonucu aşağıdan seçin
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Tekrar Et vs Öğrendim */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => onReview(word.id)}
          className="flex-1 py-3.5 px-6 rounded-2xl glass-pill border border-red-500/30 text-red-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-500/10 hover:border-red-500/50 active:scale-95 transition-all shadow-lg duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Tekrar Et</span>
        </button>

        <button
          onClick={() => onNext(word.id)}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 hover:from-emerald-400 hover:to-teal-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-all duration-300"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Öğrendim</span>
        </button>
      </div>
    </div>
  );
}
