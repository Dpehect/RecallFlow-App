'use client';

import React from 'react';
import { GRAMMAR_LEVELS } from '@/lib/grammar_notes';
import { usePracticeContext } from '@/lib/practice-context';

export default function DilBilgisiSection() {
  const { difficulty, setDifficulty } = usePracticeContext();
  const levels = Object.values(GRAMMAR_LEVELS);

  return (
    <div className="mb-8 border-[3px] border-ink bg-paper-raised p-5 shadow-ink-lg sm:p-7">
      <div className="mb-6 flex flex-wrap items-center gap-2.5 border-b-[2px] border-ink pb-4">
        <div className="press-sm border-[2px] border-ink bg-gold px-3 py-1.5 font-mono text-[12px] font-bold">
          📌 Dil Bilgisi
        </div>
        <span className="text-[12.5px] text-ink-soft">
          Seviyeni seç, o seviyeye ait gramer odak noktalarını incele.
        </span>
      </div>

      <div className="grid gap-4">
        {levels.map((lvl) => {
          const isActive = lvl.id === difficulty;
          return (
            <button
              key={lvl.id}
              type="button"
              onClick={() => setDifficulty(lvl.id)}
              className={[
                'press press-sm w-full border-[2px] border-ink p-4 text-left transition-colors sm:p-5',
                isActive ? 'bg-gold-tint' : 'bg-paper-raised hover:bg-paper-sunken',
              ].join(' ')}
              style={!isActive ? { boxShadow: 'none' } : undefined}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[17px] font-semibold">
                  {isActive ? '👉 ' : ''}
                  {lvl.title}
                </h3>
                <span className="shrink-0 border-[1.5px] border-ink bg-moss px-2 py-1 font-mono text-[10px] font-bold text-paper-raised">
                  CEFR {lvl.cefr}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{lvl.description}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {lvl.focusPoints.map((point) => (
                  <li
                    key={point}
                    className="border-[1.5px] border-plum/40 bg-plum-tint px-2.5 py-1 font-mono text-[11px] font-semibold text-plum"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-[11.5px] text-ink-soft">
        💡 Seçtiğin seviye tüm sekmelerde (Kelime, Reading, Listening, AI Pratik Robotu) geçerli olur.
      </p>
    </div>
  );
}
