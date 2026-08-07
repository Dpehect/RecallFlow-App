import React from 'react';
import { useVocabularyStore } from '../../store/useVocabularyStore';
import { WordCard } from '../molecules/WordCard';

export const WordGrid: React.FC = () => {
  const getFilteredWords = useVocabularyStore((state) => state.getFilteredWords);
  const words = getFilteredWords();

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 p-12 text-center">
        <p className="text-base font-medium text-slate-400">Aranan kriterlere uygun kelime bulunamadı.</p>
        <span className="mt-1 text-xs text-slate-600">Filtrelerinizi değiştirmeyi deneyin.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {words.map((item) => (
        <WordCard key={item.id} item={item} />
      ))}
    </div>
  );
};
