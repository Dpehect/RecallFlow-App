'use client';

import React from 'react';
import { WordGrid } from '@/components/organisms/WordGrid';
import { useVocabularyStore } from '@/store/useVocabularyStore';
import { CEFRLevel } from '@/types/vocabulary';

const LEVELS: (CEFRLevel | 'ALL')[] = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function HomePage() {
  const { searchQuery, setSearchQuery, selectedLevel, setLevel } = useVocabularyStore();

  return (
    <main className="min-h-screen bg-[#090D16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[128px]" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-[128px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Recall<span className="text-indigo-500">Flow</span>
            </h1>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Bağlamsal hafıza ve modern kart sistemi ile dil hakimiyeti.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Kelime veya anlam ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 backdrop-blur-md transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </header>

        <section className="my-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2">Seviye:</span>
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedLevel === lvl
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              {lvl}
            </button>
          ))}
        </section>

        <section className="mt-4">
          <WordGrid />
        </section>
      </div>
    </main>
  );
}
