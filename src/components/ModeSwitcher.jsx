import React from 'react';
import { Layers, BookOpenCheck, Headphones } from 'lucide-react';

export default function ModeSwitcher({ activeMode, onSwitchMode }) {
  return (
    <div className="flex items-center justify-center my-3">
      <div className="p-1 rounded-2xl glass-pill border border-white/10 flex items-center gap-1 bg-black/40">
        <button
          onClick={() => onSwitchMode('flashcards')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
            activeMode === 'flashcards'
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 shadow-lg'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>🎴 Kelime Kartları</span>
        </button>

        <button
          onClick={() => onSwitchMode('reading_listening')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
            activeMode === 'reading_listening'
              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 text-purple-300 shadow-lg'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpenCheck className="w-4 h-4 text-purple-400" />
          <span>📖 Reading & Listening</span>
        </button>

        <button
          onClick={() => onSwitchMode('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
            activeMode === 'quiz'
              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 text-emerald-300 shadow-lg'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Headphones className="w-4 h-4 text-emerald-400" />
          <span>🎧 Telaffuz Quiz</span>
        </button>
      </div>
    </div>
  );
}
