import React from 'react';
import { Flame, Zap, Award, Sparkles } from 'lucide-react';

export default function Header({ streak = 7, learnedCount = 0, xpPoints = 140 }) {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-5 flex items-center justify-between border-b border-white/10 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-[1.5px] transition-transform duration-500 group-hover:scale-110 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
          <div className="w-full h-full bg-[#05070E] rounded-[14px] flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
            Lexi<span className="text-cyan-400">Flow</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
            <span>🚀 Interactive Master</span>
          </p>
        </div>
      </div>

      {/* Playful Gamification Badges */}
      <div className="flex items-center gap-2.5">
        <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold shadow-lg">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-bounce" />
          <span>{streak} Gün Seri</span>
        </div>

        <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold shadow-lg">
          <Zap className="w-4 h-4 text-purple-400 fill-purple-400/30" />
          <span>{xpPoints} XP</span>
        </div>

        <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold shadow-lg">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>{learnedCount} Kelime</span>
        </div>
      </div>
    </header>
  );
}
