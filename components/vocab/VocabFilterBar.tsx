'use client';

import React from 'react';
import { useVocabularyStore } from '@/store/useVocabularyStore';
import { CategoryFilterType, CEFRLevel } from '@/types/vocabulary';

const CATEGORIES: CategoryFilterType[] = ['All', 'Daily', 'People', 'Objects', 'Travel', 'Business'];
const LEVELS: (CEFRLevel | 'ALL')[] = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const VocabFilterBar: React.FC = () => {
  const { selectedCategory, setCategory, selectedLevel, setLevel } = useVocabularyStore();

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-slate-200/60 bg-white/50 backdrop-blur-sm rounded-2xl my-6">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Category:</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#18181b] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Level Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">CEFR:</span>
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedLevel === lvl
                ? 'bg-[#1a56db] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>
    </div>
  );
};
