import React from 'react';
import { EXAM_CATEGORIES } from '../services/api';

export default function CategorySelector({ selectedCategory, onSelectCategory }) {
  return (
    <section className="w-full max-w-5xl mx-auto my-4 p-4 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between mb-3 px-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🎯 Sınav & Genel Kategori Seçimi</span>
        </h3>
        <span className="text-[11px] text-cyan-400 font-semibold">Seçili: {selectedCategory}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {EXAM_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-500/20 to-purple-500/20 border border-cyan-400 text-cyan-200 scale-105 shadow-[0_0_20px_rgba(0,242,254,0.3)] ring-1 ring-cyan-400/50'
                  : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">{cat.emoji}</span>
              <span className="text-[11px] font-bold truncate w-full">{cat.id}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
