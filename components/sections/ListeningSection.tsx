'use client';

import React, { useState } from 'react';
import { CATEGORIES, DIFFICULTY_LEVELS, generateOfflineSentence, getCombinationCount } from '@/lib/sentence_matrix';
import { usePracticeContext } from '@/lib/practice-context';
import { getUsedSentences, addUsedSentence, rotateUsedSentences } from '@/lib/storage';

// Same persistent per-category+difficulty pool as Reading / AI Pratik Robotu.
function nextUniqueSentence(category: string, difficulty: string): string {
  let used = getUsedSentences(category, difficulty);
  const poolSize = getCombinationCount(category, difficulty);
  if (used.size >= poolSize) {
    rotateUsedSentences(category, difficulty);
    used = getUsedSentences(category, difficulty);
  }
  const s = generateOfflineSentence(category, difficulty, used);
  addUsedSentence(category, difficulty, s);
  return s;
}

const BAR_HEIGHTS = [10, 22, 14, 28, 18, 24, 12, 20, 16, 26, 11, 19];

export default function ListeningSection() {
  const { category, setCategory, difficulty, setDifficulty } = usePracticeContext();
  const [sentence, setSentence] = useState<string>(() => nextUniqueSentence(category, difficulty));
  const [history, setHistory] = useState<string[]>(() => [sentence]);
  const [revealed, setRevealed] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [showList, setShowList] = useState(false);
  const [speechSupported] = useState(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window
  );

  const regenerate = (nextCategory = category, nextDifficulty = difficulty) => {
    const s = nextUniqueSentence(nextCategory, nextDifficulty);
    setSentence(s);
    setHistory((h) => [s, ...h].slice(0, 50));
    setRevealed(false);
  };

  const jumpTo = (s: string) => {
    setSentence(s);
    setRevealed(true);
    setShowList(false);
  };

  const speak = (text: string = sentence) => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mb-8 border-[3px] border-ink bg-paper-raised p-5 shadow-ink-lg sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-[2px] border-ink pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="press-sm border-[2px] border-ink bg-gold px-3 py-1.5 font-mono text-[12px] font-bold">
            🎧 Listening
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              regenerate(e.target.value, difficulty);
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
              regenerate(category, e.target.value);
            }}
            className="press-sm cursor-pointer border-[2px] border-ink bg-paper-raised px-2.5 py-1.5 font-mono text-[12px] font-bold"
          >
            {DIFFICULTY_LEVELS.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                Zorluk: {lvl.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setShowList((s) => !s)}
            className="press-sm cursor-pointer border-[2px] border-ink bg-paper-sunken px-2.5 py-1.5 font-mono text-[12px] font-bold"
          >
            {showList ? '🔽 Listeyi Kapat' : `📋 Geçmiş (${history.length})`}
          </button>
        </div>
      </div>

      {!speechSupported && (
        <p className="mb-4 border-[1.5px] border-danger bg-danger-tint px-3 py-2 font-mono text-[12px] font-bold text-danger">
          ⚠️ Tarayıcınız sesli okumayı (Web Speech API) desteklemiyor.
        </p>
      )}

      {showList ? (
        <div className="rise-in mb-5 grid max-h-[420px] gap-2 overflow-y-auto border-[2px] border-ink bg-paper-sunken p-3">
          {history.map((s, i) => (
            <div
              key={`${i}-${s}`}
              className={[
                'flex items-center justify-between gap-3 border-[2px] border-ink bg-paper-raised px-3 py-2',
                s === sentence ? 'bg-gold-tint' : '',
              ].join(' ')}
            >
              <button type="button" onClick={() => jumpTo(s)} className="flex-1 text-left text-[13px] leading-snug">
                {s}
              </button>
              <button
                type="button"
                onClick={() => speak(s)}
                className="press-sm shrink-0 border-[1.5px] border-ink bg-rust px-2 py-1 font-mono text-[10px] font-bold text-paper-raised"
              >
                🔊
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-5 flex flex-col items-center gap-6 border-[2px] border-ink bg-paper-sunken px-6 py-10">
            <button
              type="button"
              onClick={() => speak()}
              disabled={!speechSupported}
              className={[
                'press press-md flex items-center gap-2 border-[2px] border-ink px-7 py-3.5 font-mono text-[14px] font-bold text-paper-raised',
                speechSupported ? 'bg-rust' : 'cursor-not-allowed bg-ink-faint',
                speaking ? 'pulse-ring' : '',
              ].join(' ')}
            >
              🔊 Dinle
            </button>

            {/* Waveform indicator */}
            <div className="flex h-8 items-end gap-1" aria-hidden>
              {BAR_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-ink/70"
                  style={{
                    height: speaking ? `${h}px` : '4px',
                    transition: 'height 220ms ease',
                    animation: speaking ? `pop ${600 + (i % 4) * 120}ms ease-in-out ${i * 40}ms infinite alternate` : 'none',
                  }}
                />
              ))}
            </div>

            <p className="min-h-[24px] text-center font-display text-[16px] leading-relaxed">
              {revealed ? `"${sentence}"` : '••• Cümleyi dinledikten sonra metni göster •••'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              className="press press-sm border-[2px] border-ink bg-paper-raised px-4 py-2.5 font-mono text-[12px] font-bold"
            >
              {revealed ? '🙈 Metni Gizle' : '👁️ Metni Göster'}
            </button>
            <button
              type="button"
              onClick={() => regenerate()}
              className="press press-sm border-[2px] border-ink bg-moss px-4 py-2.5 font-mono text-[12px] font-bold text-paper-raised"
            >
              🔄 Yeni Cümle
            </button>
          </div>
        </>
      )}
    </div>
  );
}
