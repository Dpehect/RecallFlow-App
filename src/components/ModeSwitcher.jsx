import React from 'react';
import { Layers, BookOpen, Headphones, GraduationCap } from 'lucide-react';

export default function ModeSwitcher({ activeMode, onSwitchMode }) {
  return (
    <div className="flex items-center justify-center my-3">
      <div className="p-1.5 rounded-2xl glass-pill border border-white/10 flex items-center gap-1.5 bg-black/50">
        <button
          onClick={() => onSwitchMode('flashcards')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeMode === 'flashcards'
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-300 shadow-lg scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>🎴 Kelime Kartları</span>
        </button>

        <button
          onClick={() => onSwitchMode('reading')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeMode === 'reading'
              ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/50 text-blue-300 shadow-lg scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>📖 Reading (Okuma Modülü)</span>
        </button>

        <button
          onClick={() => onSwitchMode('listening')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeMode === 'listening'
              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 text-purple-300 shadow-lg scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Headphones className="w-4 h-4 text-purple-400" />
          <span>🎧 Listening (Dinleme Modülü)</span>
        </button>

        <button
          onClick={() => onSwitchMode('quiz')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeMode === 'quiz'
              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/50 text-emerald-300 shadow-lg scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>🎯 Sınav & Quiz</span>
        </button>
      </div>
    </div>
  );
}
