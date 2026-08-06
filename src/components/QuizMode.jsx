import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles, Headphones } from 'lucide-react';

export default function QuizMode({ words, language, onAddXp }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null

  if (!words || words.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto my-6 p-8 text-center glass-card rounded-3xl border border-white/10">
        <Headphones className="w-10 h-10 text-emerald-400 mx-auto mb-3 animate-bounce" />
        <h4 className="text-base font-bold text-white">Quiz İçin Kelime Yükleniyor</h4>
      </div>
    );
  }

  const currentWord = words[currentIndex % words.length];

  const playAudio = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWord.targetWord);
    const localeMap = { en: 'en-US', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', pt: 'pt-PT' };
    utterance.lang = localeMap[language] || 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleCheckAnswer = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentWord.targetWord.toLowerCase();
    if (isCorrect) {
      setFeedback('correct');
      onAddXp(15);
      setTimeout(() => {
        setFeedback(null);
        setUserAnswer('');
        setCurrentIndex((prev) => prev + 1);
      }, 1200);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-4 p-6 rounded-3xl glass-card border border-emerald-500/30 shadow-2xl bg-slate-900/80">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
          <Headphones className="w-3.5 h-3.5" />
          <span>Dinleme & Yazma Quizi</span>
        </span>
        <span className="text-xs font-bold text-slate-400">Soru {currentIndex + 1}</span>
      </div>

      <div className="text-center my-6">
        <button
          onClick={playAudio}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
        >
          <div className="w-full h-full bg-[#05070E] rounded-full flex items-center justify-center">
            <Volume2 className="w-8 h-8 text-emerald-400" />
          </div>
        </button>
        <p className="text-xs text-slate-400 mt-3 font-medium">
          Kelimeyi dinleyin ve aşağıya yazın
        </p>
        <p className="text-xs text-cyan-300 font-semibold mt-1">
          İpucu: "{currentWord.translation}"
        </p>
      </div>

      <form onSubmit={handleCheckAnswer} className="space-y-3">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Duyduğunuz kelimeyi yazın..."
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm text-center font-bold focus:outline-none focus:border-emerald-400"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black text-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-all cursor-pointer"
        >
          Kontrol Et (+15 XP)
        </button>
      </form>

      {feedback === 'correct' && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Tebrikler! Doğru Cevap (+15 XP) 🎉</span>
        </div>
      )}

      {feedback === 'wrong' && (
        <div className="mt-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-bold flex items-center justify-center gap-2">
          <XCircle className="w-4 h-4" />
          <span>Tekrar Deneyin! Doğru cevap: {currentWord.targetWord}</span>
        </div>
      )}
    </div>
  );
}
