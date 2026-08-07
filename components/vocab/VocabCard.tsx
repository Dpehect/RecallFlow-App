'use client';

import React from 'react';
import { WordItem } from '@/types/vocabulary';
import { useVocabularyStore } from '@/store/useVocabularyStore';
import { Volume2, CheckCircle2 } from 'lucide-react';

interface VocabCardProps {
  item: WordItem;
}

export const VocabCard: React.FC<VocabCardProps> = ({ item }) => {
  const { toggleLearned, learnedWordIds } = useVocabularyStore();
  const isLearned = learnedWordIds.has(item.id);

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(item.word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border shadow-sm ${
      isLearned
        ? 'bg-emerald-900 text-white border-emerald-700/50 shadow-emerald-900/20'
        : 'bg-white text-slate-900 border-slate-200/80 hover:shadow-xl hover:border-blue-200'
    }`}>
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black tracking-tight">{item.word}</h3>
              <button
                onClick={playAudio}
                className={`p-1.5 rounded-full transition-colors ${
                  isLearned ? 'bg-emerald-800 text-emerald-200 hover:bg-emerald-700' : 'bg-blue-50 text-[#1a56db] hover:bg-blue-100'
                }`}
                title="Pronounce"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            {item.phonetic && (
              <span className={`text-xs font-mono block mt-0.5 ${isLearned ? 'text-emerald-200' : 'text-slate-400'}`}>
                {item.phonetic}
              </span>
            )}
            <p className={`text-base font-semibold mt-1.5 ${isLearned ? 'text-emerald-100' : 'text-[#1a56db]'}`}>
              {item.translation}
            </p>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isLearned ? 'bg-emerald-800 text-emerald-100 border-emerald-700' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            {item.level}
          </span>
        </div>

        {/* Context Examples */}
        <div className="mt-5 space-y-2 border-t pt-4 border-slate-100/20">
          {item.examples.map((ex) => (
            <div key={ex.id} className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
              isLearned ? 'bg-emerald-950/40 text-emerald-100' : 'bg-[#eef4fb] text-slate-800'
            }`}>
              <p className="font-semibold text-slate-900 leading-snug">{ex.en}</p>
              <p className={`mt-1 font-medium ${isLearned ? 'text-emerald-200' : 'text-slate-500'}`}>{ex.tr}</p>
              {ex.contextNote && (
                <span className={`block mt-2 font-semibold text-[11px] ${isLearned ? 'text-emerald-300' : 'text-[#1a56db]'}`}>
                  💡 {ex.contextNote}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Action */}
      <div className="mt-6 flex items-center justify-between border-t pt-4 border-slate-100/20">
        <span className={`text-[11px] font-bold uppercase tracking-wider ${isLearned ? 'text-emerald-300' : 'text-slate-400'}`}>
          {item.category}
        </span>

        <button
          onClick={() => toggleLearned(item.id)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            isLearned
              ? 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'
              : 'bg-[#1a56db] text-white hover:bg-[#1545b3] shadow-md shadow-blue-500/20'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{isLearned ? 'Learned' : 'Mark Learned'}</span>
        </button>
      </div>
    </div>
  );
};
