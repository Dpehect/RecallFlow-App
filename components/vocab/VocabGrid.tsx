'use client';

import React from 'react';
import { useVocabularyStore } from '@/store/useVocabularyStore';
import { VocabCard } from './VocabCard';

export const VocabGrid: React.FC = () => {
  const getFilteredWords = useVocabularyStore((state) => state.getFilteredWords);
  const words = getFilteredWords();

  if (words.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm my-8">
        <p className="text-lg font-bold text-slate-800">No vocabulary matches your filter criteria.</p>
        <p className="text-sm text-slate-500 mt-1">Try switching category or level filters.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {words.map((item) => (
          <VocabCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
