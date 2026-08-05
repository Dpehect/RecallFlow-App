'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
            <span className="w-3.5 h-3.5 bg-blue-600 rounded-full inline-block animate-pulse"></span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">RECALLFLOW</span>
          </Link>
          <span className="text-[10px] font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 font-bold hidden sm:inline">
            PRO 2026
          </span>
        </div>

        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
          <Link href="/#modules" className="hover:text-blue-600 transition">Curriculum</Link>
          <Link href="/srs" className="hover:text-blue-600 transition">SM-2 Review</Link>
          <Link href="/tutor" className="hover:text-blue-600 transition">AI Tutor</Link>
          <Link href="/speech" className="hover:text-blue-600 transition">Speech</Link>
          <Link href="/leaderboard" className="hover:text-blue-600 transition flex items-center space-x-1">
            <span>🏆 Leagues</span>
          </Link>
          <Link href="/badges" className="hover:text-blue-600 transition">Badges</Link>
          <Link href="/vocab" className="hover:text-blue-600 transition">Vocab</Link>
          <Link href="/grammar" className="hover:text-blue-600 transition">Grammar</Link>
        </nav>

        <div className="flex items-center space-x-3">
          {/* Flame streak */}
          <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold font-mono">
            <span className="animate-flame">🔥</span>
            <span>7</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm transition hover:scale-105"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>

          <Link href="/lesson?module=de-a1-coffee" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl tracking-wider uppercase transition shadow-md shadow-blue-500/20">
            START LESSON
          </Link>
        </div>
      </div>
    </header>
  );
}
