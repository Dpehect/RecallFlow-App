'use client';

import React, { useState } from 'react';
import { CATEGORIES, DIFFICULTY_LEVELS, generateOfflineSentence, getCombinationCount } from '@/lib/sentence_matrix';
import { usePracticeContext } from '@/lib/practice-context';
import { getUsedSentences, addUsedSentence, rotateUsedSentences } from '@/lib/storage';

// Draws from the same persistent, per-category+difficulty used-sentence pool
// as the AI Pratik Robotu and Listening tabs, so a reading passage never
// repeats a sentence the user has already seen elsewhere in the app.
function buildPassage(category: string, difficulty: string, sentenceCount = 4): string[] {
  let used = getUsedSentences(category, difficulty);
  const poolSize = getCombinationCount(category, difficulty);
  const sentences: string[] = [];

  for (let i = 0; i < sentenceCount; i++) {
    if (used.size >= poolSize) {
      rotateUsedSentences(category, difficulty);
      used = getUsedSentences(category, difficulty);
    }
    const s = generateOfflineSentence(category, difficulty, used);
    sentences.push(s);
    used.add(s);
    addUsedSentence(category, difficulty, s);
  }
  return sentences;
}

interface PassageRecord {
  id: number;
  sentences: string[];
}

export default function ReadingSection() {
  const { category, setCategory, difficulty, setDifficulty } = usePracticeContext();
  const [passage, setPassage] = useState<string[]>(() => buildPassage(category, difficulty));
  const [history, setHistory] = useState<PassageRecord[]>(() => [{ id: 1, sentences: passage }]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showList, setShowList] = useState(false);

  const regenerate = (nextCategory = category, nextDifficulty = difficulty) => {
    const next = buildPassage(nextCategory, nextDifficulty);
    setPassage(next);
    setHistory((h) => [{ id: h.length + 1, sentences: next }, ...h].slice(0, 30));
    setShowQuestions(false);
  };

  const jumpTo = (record: PassageRecord) => {
    setPassage(record.sentences);
    setShowList(false);
  };

  return (
    <div className="mb-8 border-[3px] border-ink bg-paper-raised p-5 shadow-ink-lg sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-[2px] border-ink pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="press-sm border-[2px] border-ink bg-gold px-3 py-1.5 font-mono text-[12px] font-bold">
            📖 Reading
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
            {showList ? '🔽 Listeyi Kapat' : `📋 Geçmiş Metinler (${history.length})`}
          </button>
        </div>

        <button
          type="button"
          onClick={() => regenerate()}
          className="press press-sm border-[2px] border-ink bg-rust px-4 py-2 font-mono text-[12px] font-bold text-paper-raised"
        >
          🔄 Yeni Metin
        </button>
      </div>

      {showList ? (
        <div className="rise-in grid max-h-[420px] gap-2 overflow-y-auto border-[2px] border-ink bg-paper-sunken p-3">
          {history.map((record) => (
            <button
              key={record.id}
              type="button"
              onClick={() => jumpTo(record)}
              className={[
                'border-[2px] border-ink bg-paper-raised px-3 py-2.5 text-left text-[12.5px] leading-relaxed hover:bg-gold-tint',
                record.sentences === passage ? 'bg-gold-tint' : '',
              ].join(' ')}
            >
              <span className="mb-1 block font-mono text-[10px] font-bold text-ink-faint">
                Metin #{record.id}
              </span>
              {record.sentences.join(' ')}
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="rise-in border-[2px] border-ink bg-paper-sunken p-5 font-display text-[17px] leading-[1.85] sm:p-7 sm:text-[18px]">
            {passage.join(' ')}
          </div>

          <button
            type="button"
            onClick={() => setShowQuestions((s) => !s)}
            className="press press-sm mt-5 border-[2px] border-ink bg-paper-raised px-4 py-2 font-mono text-[12px] font-bold"
          >
            {showQuestions ? '🙈 Anlama Sorularını Gizle' : '🧠 Anlama Sorularını Göster'}
          </button>

          {showQuestions && (
            <ul className="rise-in mt-4 list-disc space-y-2 pl-5">
              <li className="text-[13px] leading-relaxed">
                Metindeki ana özneler kimlerdi? Türkçe olarak listele.
              </li>
              <li className="text-[13px] leading-relaxed">
                Her cümleyi hedef dile (AI Pratik Robotu sekmesindeki dile) çevirmeyi dene.
              </li>
              <li className="text-[13px] leading-relaxed">
                Metindeki fiilleri bul ve hangi zamanda çekimlendiklerini belirle.
              </li>
            </ul>
          )}
        </>
      )}
    </div>
  );
}
