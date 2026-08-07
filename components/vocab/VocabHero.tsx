'use client';

import React from 'react';
import { useVocabularyStore } from '@/store/useVocabularyStore';

export const VocabHero: React.FC = () => {
  const { words, learnedWordIds, searchQuery, setSearchQuery } = useVocabularyStore();
  const learnedCount = learnedWordIds.size;
  const totalCount = words.length;

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-6 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-[#1a56db] text-xs font-bold tracking-wide uppercase">
            <span>✨ Vocab Atlas</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            EXPAND. RECALL.<br />
            DOMINATE.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed">
            Master high-frequency vocabulary with contextual sentences, CEFR level tags, and spaced repetition tracking.
          </p>

          {/* Search Bar Input in Hero Style */}
          <div className="pt-2 max-w-md">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search word or Turkish meaning..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-900 placeholder-slate-400 px-5 py-3.5 rounded-full text-sm font-medium shadow-md shadow-slate-200/60 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              />
              <button className="absolute right-2 bg-[#1a56db] text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-[#1545b3] transition-all">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm aspect-[4/4.5] rounded-3xl overflow-hidden bg-gradient-to-b from-blue-100/60 to-blue-200/40 border border-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
              alt="Vocabulary Study"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Matching Stats Bar */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalCount}</div>
          <div className="text-xs font-medium text-slate-500 mt-1">Total Words</div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{learnedCount}</div>
          <div className="text-xs font-medium text-slate-500 mt-1">Words Learned</div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">100%</div>
          <div className="text-xs font-medium text-slate-500 mt-1">Contextual Examples</div>
        </div>

        <div className="bg-[#1a56db] rounded-2xl p-5 shadow-lg shadow-blue-600/20 text-white">
          <div className="text-3xl font-extrabold tracking-tight">
            {Math.round((learnedCount / totalCount) * 100)}%
          </div>
          <div className="text-xs font-medium text-blue-100/90 mt-1">Mastery Progress</div>
        </div>
      </div>
    </section>
  );
};
