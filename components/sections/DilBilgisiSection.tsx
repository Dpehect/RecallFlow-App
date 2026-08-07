'use client';

import React, { useState } from 'react';
import { GRAMMAR_LEVELS } from '@/lib/grammar_notes';
import { usePracticeContext } from '@/lib/practice-context';

export default function DilBilgisiSection() {
  const { difficulty, setDifficulty } = usePracticeContext();
  const levels = Object.values(GRAMMAR_LEVELS);
  const [openPoint, setOpenPoint] = useState<string | null>(null);

  return (
    <div className="mb-8 border-[3px] border-ink bg-paper-raised p-5 shadow-ink-lg sm:p-7">
      <div className="mb-5 flex flex-wrap items-center gap-2.5 border-b-[2px] border-ink pb-4">
        <div className="press-sm border-[2px] border-ink bg-gold px-3 py-1.5 font-mono text-[12px] font-bold">
          📌 Dil Bilgisi
        </div>
        <span className="text-[12.5px] text-ink-soft">
          Seviyeni seç, o seviyeye ait gramer kurallarını açıklama + örneklerle incele.
        </span>
      </div>

      {/* Kısa yol / hızlı atlama şeridi - uzun kaydırma yerine */}
      <div className="mb-6 flex flex-wrap gap-2 border-[2px] border-ink bg-paper-sunken p-2.5">
        <span className="px-1.5 py-1 font-mono text-[10.5px] font-bold uppercase text-ink-faint">
          Hızlı git:
        </span>
        {levels.map((lvl) => (
          <a
            key={lvl.id}
            href={`#gramer-${lvl.id}`}
            onClick={() => setDifficulty(lvl.id)}
            className="press-sm border-[1.5px] border-ink bg-paper-raised px-2.5 py-1 font-mono text-[11px] font-bold hover:bg-gold-tint"
          >
            {lvl.title}
          </a>
        ))}
      </div>

      <div className="grid gap-5">
        {levels.map((lvl) => {
          const isActive = lvl.id === difficulty;
          return (
            <div
              key={lvl.id}
              id={`gramer-${lvl.id}`}
              className={[
                'scroll-mt-6 border-[2px] border-ink p-4 sm:p-5',
                isActive ? 'bg-gold-tint' : 'bg-paper-raised',
              ].join(' ')}
            >
              <button
                type="button"
                onClick={() => setDifficulty(lvl.id)}
                className="press-sm w-full text-left"
                style={{ boxShadow: 'none' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-[18px] font-semibold">
                    {isActive ? '👉 ' : ''}
                    {lvl.title}
                  </h3>
                  <span className="shrink-0 border-[1.5px] border-ink bg-moss px-2 py-1 font-mono text-[10px] font-bold text-paper-raised">
                    CEFR {lvl.cefr}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{lvl.description}</p>
              </button>

              {/* Odak noktaları: gerçek açıklama + örnek içeren accordion */}
              <div className="mt-4 grid gap-2.5">
                {lvl.focusPoints.map((point) => {
                  const key = `${lvl.id}-${point.title}`;
                  const isOpen = openPoint === key;
                  return (
                    <div key={key} className="border-[1.5px] border-plum/40 bg-plum-tint">
                      <button
                        type="button"
                        onClick={() => setOpenPoint(isOpen ? null : key)}
                        className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left"
                      >
                        <span className="font-mono text-[12px] font-bold text-plum">{point.title}</span>
                        <span className="font-mono text-[12px] font-bold text-plum">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="rise-in border-t-[1.5px] border-plum/30 bg-paper-raised px-3.5 py-3">
                          <p className="text-[13px] leading-relaxed text-ink">{point.explanation}</p>
                          <ul className="mt-2.5 space-y-1.5">
                            {point.examples.map((ex, i) => (
                              <li key={i} className="font-display text-[13.5px] italic text-ink-soft">
                                • {ex}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-[11.5px] text-ink-soft">
        💡 Seçtiğin seviye tüm sekmelerde (Kelime, Reading, Listening, AI Pratik Robotu) geçerli olur.
      </p>
    </div>
  );
}
