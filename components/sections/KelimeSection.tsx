'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { CATEGORIES } from '@/lib/sentence_matrix';
import { getVocabList, VocabEntry } from '@/lib/vocabulary';
import { usePracticeContext } from '@/lib/practice-context';
import { incrementUserProgress, UserStats } from '@/lib/storage';
import { getLanguageById } from '@/lib/languages';

interface KelimeSectionProps {
  onStatsUpdate?: (stats: UserStats) => void;
}

export default function KelimeSection({ onStatsUpdate }: KelimeSectionProps) {
  const { category, setCategory, difficulty, setDifficulty, targetLang } = usePracticeContext();
  const currentLang = getLanguageById(targetLang);
  const words = useMemo(() => getVocabList(category, difficulty), [category, difficulty]);

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState(0);
  const [showList, setShowList] = useState(false);

  // Hedef dile çeviri: LLM varsa gerçek çeviri, yoksa (offline) sade Türkçe
  // tanım/örnek gösterilir. Artık HİÇBİR koşulda "AI Pratik Robotu'nda dene"
  // gibi genel placeholder metin gösterilmez.
  const [translation, setTranslation] = useState<{ word: string; example: string } | null>(null);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
  }, [category, difficulty]);

  useEffect(() => {
    setTranslation(null);
  }, [index, category, difficulty, targetLang]);

  const currentWord: VocabEntry | undefined = words[index % words.length];

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

  const jumpTo = (i: number) => {
    setIndex(i);
    setRevealed(true);
    setShowList(false);
  };

  const fetchTranslation = async () => {
    if (!currentWord || translating || translation) return;
    setTranslating(true);
    try {
      const res = await fetch('/api/generate-word-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: currentWord.word,
          definition: currentWord.definition,
          example: currentWord.example,
          targetLanguage: targetLang,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.translatedWord) {
          setTranslation({ word: data.translatedWord, example: data.translatedExample || '' });
        }
      }
    } catch {
      // Sessizce offline moda düş - Türkçe tanım/örnek zaten gösteriliyor.
    } finally {
      setTranslating(false);
    }
  };

  const flip = () => {
    const next = !revealed;
    setRevealed(next);
    if (next) fetchTranslation();
  };

  if (!currentWord) return null;

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
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setDifficulty(e.target.value)}
            className="press-sm cursor-pointer border-[2px] border-ink bg-paper-raised px-2.5 py-1.5 font-mono text-[12px] font-bold"
          >
            <option value="Kolay">Zorluk: Kolay (A1-A2)</option>
            <option value="Orta">Zorluk: Orta (B1-B2)</option>
            <option value="Zor">Zorluk: Zor (C1-C2)</option>
          </select>

          <button
            type="button"
            onClick={() => setShowList((s) => !s)}
            className="press-sm cursor-pointer border-[2px] border-ink bg-paper-sunken px-2.5 py-1.5 font-mono text-[12px] font-bold"
          >
            {showList ? '🔽 Listeyi Kapat' : `📋 Tüm Liste (${words.length})`}
          </button>
        </div>

        <span className="font-mono text-[12px] font-bold text-moss">✅ Biliyorum: {known}</span>
      </div>

      {showList ? (
        <div className="rise-in mb-6 grid max-h-[420px] grid-cols-1 gap-2 overflow-y-auto border-[2px] border-ink bg-paper-sunken p-3 sm:grid-cols-2">
          {words.map((w, i) => (
            <button
              key={w.id}
              type="button"
              onClick={() => jumpTo(i)}
              className={[
                'press-sm flex items-start justify-between gap-2 border-[2px] border-ink bg-paper-raised px-3 py-2 text-left transition-colors hover:bg-gold-tint',
                i === index ? 'bg-gold-tint' : '',
              ].join(' ')}
            >
              <span>
                <span className="font-display text-[14px] font-semibold">{w.word}</span>
                <span className="ml-2 font-mono text-[10px] uppercase text-ink-faint">{w.pos}</span>
                <br />
                <span className="text-[11.5px] leading-snug text-ink-soft">{w.definition}</span>
              </span>
              <span className="shrink-0 font-mono text-[10px] text-ink-faint">#{i + 1}</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          {/* Flip flashcard */}
          <div className="flip-scene mb-6">
            <div
              role="button"
              tabIndex={0}
              onClick={flip}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') flip();
              }}
              className={`flip-card relative h-[220px] cursor-pointer sm:h-[230px] ${revealed ? 'is-flipped' : ''}`}
            >
              {/* Front */}
              <div className="flip-face card-fold absolute inset-0 flex flex-col items-center justify-center gap-3 border-[2px] border-dashed border-ink bg-paper-sunken px-6 text-center">
                <p className="font-mono text-[10.5px] font-bold uppercase tracking-widest2 text-ink-soft">
                  Karta tıklayın
                </p>
                <span className="font-mono text-[10px] uppercase text-ink-faint">{currentWord.pos}</span>
                <h2 className="font-display text-[28px] font-semibold leading-tight sm:text-[32px]">
                  {currentWord.word}
                </h2>
                <span className="font-mono text-[10px] text-ink-faint">
                  {(index % words.length) + 1} / {words.length}
                </span>
              </div>

              {/* Back */}
              <div className="flip-face flip-face-back card-fold flex flex-col items-center justify-center gap-2.5 border-[2px] border-ink bg-gold-tint px-6 text-center">
                <p className="font-mono text-[10.5px] font-bold uppercase tracking-widest2 text-ink-soft">
                  Anlamı / Kullanımı
                </p>
                <p className="max-w-sm text-[14px] font-semibold leading-snug text-ink">
                  {currentWord.definition}
                </p>
                <p className="max-w-sm text-[12.5px] italic leading-relaxed text-ink-soft">
                  "{currentWord.example}"
                </p>

                <div className="mt-1 w-full max-w-sm border-t-[1.5px] border-dashed border-ink/40 pt-2.5">
                  {translating && (
                    <p className="font-mono text-[11px] font-bold text-ink-faint">
                      {currentLang.flag} çevriliyor…
                    </p>
                  )}
                  {!translating && translation && (
                    <p className="font-mono text-[12px] font-bold text-sky">
                      {currentLang.flag} {translation.word}
                      {translation.example && (
                        <span className="mt-1 block font-sans text-[11.5px] font-normal italic text-sky/90">
                          "{translation.example}"
                        </span>
                      )}
                    </p>
                  )}
                  {!translating && !translation && (
                    <p className="font-mono text-[11px] font-bold text-ink-faint">
                      {currentLang.flag} çeviri şu an kullanılamıyor — AI Pratik Robotu'nda bu kelimeyi
                      içeren cümlelerle pratik yapabilirsin.
                    </p>
                  )}
                </div>
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
        </>
      )}
    </div>
  );
}
