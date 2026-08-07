'use client';

import React from 'react';
import { ChevronDown, ShoppingBag } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
      {/* Brand Logo */}
      <div className="flex items-center gap-1">
        <span className="text-2xl font-black tracking-tight text-slate-900">E·Lab</span>
      </div>

      {/* Nav Menu */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors">
          <span>Pages</span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors">
          <span>Courses</span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </div>
        <a href="#about" className="hover:text-slate-900 transition-colors">About us</a>
        <a href="#reviews" className="hover:text-slate-900 transition-colors">Reviews</a>
        <a href="#blog" className="hover:text-slate-900 transition-colors">Blog</a>
        <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
      </nav>

      {/* Cart Action */}
      <button className="flex items-center gap-2 bg-[#1a56db] hover:bg-[#1545b3] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-500/20">
        <span>Cart</span>
      </button>
    </header>
  );
};
