'use client';

import React, { useMemo, useState } from 'react';
import { CATEGORIES, CATEGORY_MATRIX } from '@/lib/sentence_matrix';
import { usePracticeContext } from '@/lib/practice-context';
import { incrementUserProgress, UserStats } from '@/lib/storage';

interface KelimeSectionProps {
  onStatsUpdate?: (stats: UserStats) => void;
}

function getWordList(category: string, difficulty: string): string[] {
  const categoryData = CATEGORY_MATRIX[category] || CATEGORY_MATRIX.daily;
  const levelData = categoryData[difficulty] || categoryData.Kolay || CATEGORY_MATRIX.daily.Kolay;

  const words = [
    ...(levelData.subjects || []),
    ...(levelData.objects || []),
    ...(levelData.verbs || []),
    ...(levelData.timeClauses || []),
  ];

  return Array.from(new Set(words));
}

export default function KelimeSection({ onStatsUpdate }: KelimeSectionProps) {
  const { category, setCategory, difficulty, setDifficulty } = usePracticeContext();
  const words = useMemo(() => getWordList(category, difficulty), [category, difficulty]);

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState(0);

  const currentWord = words[index % words.length] || '';

  const goNext = () => {
    setIndex((i) => (i + 1) % Math.max(words.length, 1));
    setRevealed(false);
  };

  const markKnown = () => {
    setKnown((k) => k + 1);
    const updated = incrementUserProgress(5);
    if (onStatsUpdate) onStatsUpdate(updated);
    goNext();
  };

  return (
    <div className="mb-8 border-[3px] border-ink bg-paper-raised p-5 shadow-ink-lg sm:p-7">
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-[2px] border-ink pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="press-sm border-[2px] border-ink bg-gold px-3 py-1.5 font-mono text-[12px] font-bold">
            📚 Kelime Antrenmanı
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setIndex(0);
              setRevealed(false);
            }}
            className="press-sm cursor-pointer border-[2px] border-ink bg-paper-raised px-2.5 py-1.5 font-mono text-[12px] font-bold"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              setIndex(0);
              setRevealed(false);
            }}
            className="press-sm cursor-pointer border-[2px] border-ink bg-paper-raised px-2.5 py-1.5 font-mono text-[12px] font-bold"
          >
            <option value="Kolay">Zorluk: Kolay (A1-A2)</option>
            <option value="Orta">Zorluk: Orta (B1-B2)</option>
            <option value="Zor">Zorluk: Zor (C1-C2)</option>
          </select>
        </div>

        <span className="font-mono text-[12px] font-bold text-moss">✅ Biliyorum: {known}</span>
      </div>

      {/* Flip flashcard */}
      <div className="flip-scene mb-6">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setRevealed((r) => !r)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setRevealed((r) => !r);
          }}
          className={`flip-card relative h-[190px] cursor-pointer sm:h-[210px] ${revealed ? 'is-flipped' : ''}`}
        >
          {/* Front */}
          <div className="flip-face card-fold absolute inset-0 flex flex-col items-center justify-center gap-3 border-[2px] border-dashed border-ink bg-paper-sunken px-6 text-center">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-widest2 text-ink-soft">
              Karta tıklayın
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-tight sm:text-[32px]">
              {currentWord}
            </h2>
            <span className="font-mono text-[10px] text-ink-faint">{index % words.length + 1} / {words.length}</span>
          </div>

          {/* Back */}
          <div className="flip-face flip-face-back card-fold flex flex-col items-center justify-center gap-3 border-[2px] border-ink bg-gold-tint px-6 text-center">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-widest2 text-ink-soft">
              Anlamı / Kullanımı
            </p>
            <h2 className="font-display text-[24px] font-semibold leading-tight sm:text-[28px]">
              {currentWord}
            </h2>
            <p className="max-w-sm text-[12.5px] font-semibold leading-relaxed text-sky">
              Bu kelimeyi hedef dile nasıl çevirirdin? AI Pratik Robotu sekmesinde cümle içinde dene!
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={markKnown}
          className="press press-sm border-[2px] border-ink bg-moss px-5 py-2.5 font-mono text-[12px] font-bold text-paper-raised"
        >
          ✅ Biliyorum
        </button>
        <button
          type="button"
          onClick={goNext}
          className="press press-sm border-[2px] border-ink bg-rust px-5 py-2.5 font-mono text-[12px] font-bold text-paper-raised"
        >
          ➡️ Sonraki Kelime
        </button>
      </div>
    </div>
  );
}
