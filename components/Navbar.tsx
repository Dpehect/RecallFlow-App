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
        {/* Brand Logo */}
        <Link href="/" className="font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
          <span className="w-3.5 h-3.5 bg-blue-600 rounded-full inline-block animate-pulse"></span>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">RECALLFLOW</span>
        </Link>

        {/* 4 Core Module Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          <Link href="/vocab" className="hover:text-blue-600 transition">1. Kelime Öğrenme</Link>
          <Link href="/grammar" className="hover:text-blue-600 transition">2. Dil Bilgisi</Link>
          <Link href="/reading" className="hover:text-blue-600 transition">3. Reading (Okuma)</Link>
          <Link href="/listening" className="hover:text-blue-600 transition">4. Listening (Dinleme)</Link>
        </nav>

        {/* Theme Toggle & Mobile Action */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm transition hover:scale-105"
            title="Aydınlık / Karanlık Tema"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>

          <Link href="/vocab" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition shadow-sm">
            Öğrenmeye Başla
          </Link>
        </div>
      </div>
    </header>
  );
}
