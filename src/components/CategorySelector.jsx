import React from 'react';
import { Tag } from 'lucide-react';

const CATEGORIES = [
  'Tümü',
  'Günlük Yaşam',
  'Seyahat & Otel',
  'İş & Kariyer',
  'Yiyecek & İçecek',
  'Teknoloji',
  'Sağlık & Sosyal'
];

export default function CategorySelector({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full max-w-2xl mx-auto my-3 px-2">
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-purple-500/20 border border-purple-400/50 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)] scale-105'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10'
              }`}
            >
              <Tag className="w-3 h-3 text-purple-400" />
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
