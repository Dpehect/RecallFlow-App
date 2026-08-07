'use client';

import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-1">
        <span className="text-2xl font-black tracking-tight text-slate-900">Recall<span className="text-[#1a56db]">Flow</span></span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
        <Link href="/vocab" className="text-[#1a56db] font-semibold transition-colors">
          Vocab
        </Link>
        <Link href="/listening" className="hover:text-slate-900 transition-colors">
          Listening
        </Link>
        <Link href="/reading" className="hover:text-slate-900 transition-colors">
          Reading
        </Link>
        <a href="#methodology" className="hover:text-slate-900 transition-colors">Methodology</a>
        <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
      </nav>

      <button className="flex items-center gap-2 bg-[#1a56db] hover:bg-[#1545b3] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-500/20">
        <span>Start Practice</span>
      </button>
    </header>
  );
};
