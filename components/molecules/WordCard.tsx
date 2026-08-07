import React from 'react';
import { WordItem } from '@/types/vocabulary';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { useVocabularyStore } from '@/store/useVocabularyStore';

interface WordCardProps {
  item: WordItem;
}

export const WordCard: React.FC<WordCardProps> = ({ item }) => {
  const { toggleLearned, learnedWordIds } = useVocabularyStore();
  const isLearned = learnedWordIds.has(item.id);

  return (
    <div className={`group relative rounded-xl border p-5 transition-all duration-300 backdrop-blur-xl ${
      isLearned 
        ? 'border-emerald-500/30 bg-emerald-950/10 shadow-lg shadow-emerald-950/20' 
        : 'border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-indigo-950/30'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-indigo-300 transition-colors">
              {item.word}
            </h3>
            {item.phonetic && (
              <span className="text-xs font-mono text-slate-400">{item.phonetic}</span>
            )}
          </div>
          <p className="mt-1 text-sm font-medium text-slate-300">{item.translation}</p>
        </div>
        <Badge level={item.level} />
      </div>

      <div className="mt-4 border-t border-slate-800/60 pt-3">
        {item.examples.length > 0 && (
          <div className="space-y-2">
            {item.examples.map((ex) => (
              <div key={ex.id} className="rounded-lg bg-slate-950/40 p-3 text-xs leading-relaxed border border-slate-800/40">
                <p className="font-medium text-indigo-200">{ex.en}</p>
                <p className="mt-1 text-slate-400">{ex.tr}</p>
                {ex.contextNote && (
                  <span className="mt-2 block text-[10px] font-semibold tracking-wide text-cyan-400/80">
                    💡 {ex.contextNote}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3">
        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
          {item.category}
        </span>
        <Button
          variant={isLearned ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => toggleLearned(item.id)}
        >
          {isLearned ? '✓ Öğrenildi' : 'Öğrenildi İşaretle'}
        </Button>
      </div>
    </div>
  );
};
