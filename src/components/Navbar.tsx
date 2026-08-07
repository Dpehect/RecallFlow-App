'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
      {/* Brand Logo */}
      <div className="flex items-center gap-1">
        <span className="text-2xl font-black tracking-tight text-slate-900">Recall<span className="text-[#1a56db]">Flow</span></span>
      </div>

      {/* Nav Menu focused on Vocab, Listening, Reading */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
        <a href="#vocab" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
          <span>Vocab</span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </a>
        <a href="#listening" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
          <span>Listening</span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </a>
        <a href="#reading" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
          <span>Reading</span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </a>
        <a href="#methodology" className="hover:text-slate-900 transition-colors">Methodology</a>
        <a href="#reviews" className="hover:text-slate-900 transition-colors">Reviews</a>
        <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
      </nav>

      {/* Primary Action Button */}
      <button className="flex items-center gap-2 bg-[#1a56db] hover:bg-[#1545b3] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-500/20">
        <span>Start Learning</span>
      </button>
    </header>
  );
};
