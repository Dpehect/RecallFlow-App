import React, { useState } from 'react';
import { Volume2, BookOpen, MessageSquare, Play, Square } from 'lucide-react';

export default function DialoguePlayer({ dialogue, language }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!dialogue) return null;

  const playSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(dialogue.content);

    const localeMap = { en: 'en-US', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', pt: 'pt-PT' };
    utterance.lang = localeMap[language] || 'en-US';
    utterance.rate = 0.85;

    setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-6 rounded-3xl glass-card border border-white/10 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
          {dialogue.type === 'Dialogue' ? <MessageSquare className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
          <span>{dialogue.type} • {dialogue.category}</span>
        </div>

        <button
          onClick={isPlaying ? stopSpeech : playSpeech}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${
            isPlaying
              ? 'bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse'
              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30'
          }`}
        >
          {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? 'Durdur' : 'Dinle (Listening)'}</span>
        </button>
      </div>

      <h3 className="text-lg font-bold text-white mb-3">{dialogue.title}</h3>

      {/* Reading Passage */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
        <div className="text-sm leading-relaxed text-slate-200 whitespace-pre-line font-serif">
          {dialogue.content}
        </div>
        <hr className="border-white/10 my-2" />
        <div className="text-xs text-slate-400 whitespace-pre-line">
          {dialogue.translation}
        </div>
      </div>
    </div>
  );
}
