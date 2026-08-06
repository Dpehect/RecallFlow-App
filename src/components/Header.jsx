import React from 'react';
import { Sparkles, Flame, Zap } from 'lucide-react';

export default function Header({ streak = 7, learnedToday = 14 }) {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-6 flex items-center justify-between border-b border-white/5">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-[1px] transition-transform duration-500 group-hover:scale-105">
          <div className="w-full h-full bg-[#05070E] rounded-[11px] flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Lexi<span className="text-cyan-400">Flow</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            Lazy Mode • Flashcards
          </p>
        </div>
      </div>

      {/* Gamification Badges */}
      <div className="flex items-center gap-3">
        <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span>{streak} Gün Seri</span>
        </div>

        <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{learnedToday} Kelime</span>
        </div>
      </div>
    </header>
  );
}
