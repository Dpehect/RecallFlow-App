'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navLinks = [
    { href: '/vocab', label: '1. Kelime (Kategorili)' },
    { href: '/grammar', label: '2. Dil Bilgisi' },
    { href: '/reading', label: '3. Reading' },
    { href: '/listening', label: '4. Listening' },
  ];

  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="font-black text-xl tracking-tight text-white flex items-center space-x-2">
          <span className="w-3.5 h-3.5 bg-blue-500 rounded-full inline-block animate-pulse"></span>
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">RECALLFLOW</span>
          <span className="text-[10px] font-mono bg-blue-950 text-blue-400 px-2 py-0.5 rounded-md border border-blue-800 font-bold">PRO</span>
        </Link>

        {/* Core Category-Based Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-bold text-slate-300 uppercase tracking-wider">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition px-3 py-1.5 rounded-xl border ${
                  isActive
                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-white hover:border-slate-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm transition hover:scale-105"
            title="Aydınlık / Karanlık Tema"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>

          <Link href="/vocab" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black px-4 py-2.5 rounded-xl uppercase tracking-wider transition shadow-lg shadow-blue-500/20">
            ÖĞRENMEYE BAŞLA
          </Link>
        </div>
      </div>
    </header>
  );
}
