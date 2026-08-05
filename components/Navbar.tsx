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
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
          <span className="w-3.5 h-3.5 bg-blue-600 rounded-full inline-block animate-pulse"></span>
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">RECALLFLOW</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
          <Link href="/#courses" className="hover:text-blue-600 transition">Dersler</Link>
          <Link href="/srs" className="hover:text-blue-600 transition">Aralıklı Tekrar</Link>
          <Link href="/vocab" className="hover:text-blue-600 transition">Kelime Sözlüğü</Link>
          <Link href="/grammar" className="hover:text-blue-600 transition">Gramer Rehberi</Link>
          <Link href="/leaderboard" className="hover:text-blue-600 transition">Liderlik</Link>
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center space-x-3">
          {/* Streak Flame */}
          <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-full text-xs font-bold font-mono">
            <span className="animate-flame">🔥</span>
            <span>7 Gün Seri</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm transition hover:scale-105"
            title="Aydınlık / Karanlık Tema"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>

          {/* Primary CTA Button */}
          <Link href="/lesson?module=de-a1" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl tracking-wider uppercase transition shadow-md shadow-blue-500/20">
            Dersine Başla
          </Link>
        </div>
      </div>
    </header>
  );
}
