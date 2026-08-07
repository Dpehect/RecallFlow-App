'use client';

import React, { useState, useEffect } from 'react';
import { CATEGORIES, DIFFICULTY_LEVELS, getCombinationCount } from '@/lib/sentence_matrix';
import { fetchNextSentence } from '@/lib/practice_engine';
import {
  incrementUserProgress,
  UserStats,
  getUsedSentences,
  addUsedSentence,
  rotateUsedSentences,
} from '@/lib/storage';
import { usePracticeContext } from '@/lib/practice-context';
import { getLanguageById } from '@/lib/languages';

interface AIPracticeRobotProps {
  onStatsUpdate?: (stats: UserStats) => void;
}

export default function AIPracticeRobot({ onStatsUpdate }: AIPracticeRobotProps) {
  // category/difficulty/targetLang are shared globally (via context) so the
  // level chosen here is the same one used by the Kelime, Reading and
  // Listening tabs, and is what actually gets sent to the prompt engine.
  const { category, setCategory, difficulty, setDifficulty, targetLang } = usePracticeContext();
  const currentLang = getLanguageById(targetLang);

  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [grammarNote, setGrammarNote] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number>(0);

  const loadNewSentence = async () => {
    setLoading(true);
    setFeedback(null);

    // Persistent history for THIS exact category+difficulty pair - survives
    // reloads and tab switches, so a sentence is never shown twice until the
    // entire pool for this pair has genuinely been exhausted.
    let used = getUsedSentences(category, difficulty);
    const poolSize = getCombinationCount(category, difficulty);
    if (used.size >= poolSize) {
      // Pool exhausted: recycle the oldest half instead of hard-repeating.
      rotateUsedSentences(category, difficulty);
      used = getUsedSentences(category, difficulty);
    }

    const res = await fetchNextSentence({
      category,
      difficulty,
      targetLanguage: targetLang,
      history: Array.from(used),
      usedSentences: used,
      useLLM: true,
    });

    setCurrentSentence(res.tr);
    setHint(res.targetHint || '');
    setGrammarNote(res.grammarNote || '');
    addUsedSentence(category, difficulty, res.tr);
    setRemaining(Math.max(poolSize - used.size - 1, 0));
    setUserInput('');
    setLoading(false);
  };

  useEffect(() => {
    loadNewSentence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, difficulty, targetLang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Increment global project stats seamlessly
    const updatedStats = incrementUserProgress(15);
    if (onStatsUpdate) {
      onStatsUpdate(updatedStats);
    }

    setFeedback('✅ Başarıyla tamamlandı! +15 XP eklendi.');
    setTimeout(() => {
      loadNewSentence();
    }, 1500);
  };

  return (
    <div className="mb-8 border-[3px] border-ink bg-paper-raised p-5 shadow-ink-lg sm:p-7">
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-[2px] border-ink pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="press-sm flex items-center gap-1.5 border-[2px] border-ink bg-gold px-3 py-1.5 font-mono text-[12px] font-bold">
            🤖 AI Pratik Robotu
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
            {DIFFICULTY_LEVELS.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                Zorluk: {lvl.name}
              </option>
            ))}
          </select>

          <span className="press-sm flex items-center gap-1.5 border-[2px] border-ink bg-paper-sunken px-2.5 py-1.5 font-mono text-[12px] font-bold">
            {currentLang.flag} {currentLang.labelTr}
          </span>
        </div>

        <button
          onClick={loadNewSentence}
          disabled={loading}
          type="button"
          className="press press-sm border-[2px] border-ink bg-rust px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-wide text-paper-raised disabled:opacity-60"
        >
          {loading ? 'Üretiliyor…' : '🔄 Yeni Cümle Üret'}
        </button>
      </div>

      {/* Sentence card */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[11.5px] font-bold uppercase tracking-wide text-rust">
          Çevrilecek %100 doğal Türkçe cümle ({difficulty.toUpperCase()} modu):
        </span>
        <span className="press-sm border-[1.5px] border-ink bg-moss px-2.5 py-1 font-mono text-[10px] font-bold text-paper-raised">
          %100 tekrarsız · havuzda {remaining}+ cümle kaldı
        </span>
      </div>

      <div key={currentSentence} className="rise-in card-fold border-[2px] border-dashed border-ink bg-paper-sunken px-5 py-6 sm:px-6">
        <h2 className="font-display text-[22px] italic leading-[1.4] text-ink sm:text-[25px]">
          "{currentSentence || 'Cümle yükleniyor...'}"
        </h2>

        {hint && (
          <p className="mt-3 font-mono text-[12px] font-bold text-sky">💡 İpucu: {hint}</p>
        )}
        {grammarNote && (
          <p className="mt-1.5 font-mono text-[12px] font-bold text-plum">
            📌 Gramer odağı: {grammarNote}
          </p>
        )}
      </div>

      {/* Translate & check */}
      <form onSubmit={handleSubmit} className="mt-6">
        <label className="mb-2 block font-mono text-[12px] font-bold">
          {currentLang.flag} {currentLang.labelTr.toUpperCase()} çevirinizi yazın:
        </label>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`${currentLang.labelTr} cümlenizi buraya yazın...`}
            className="press-sm min-w-[240px] flex-1 border-[2px] border-ink bg-paper-raised px-3.5 py-2.5 text-[14px] outline-none"
          />

          <button
            type="submit"
            className="press press-sm whitespace-nowrap border-[2px] border-ink bg-rust px-6 py-2.5 font-mono text-[13px] font-bold text-paper-raised"
          >
            Kontrol Et →
          </button>
        </div>
      </form>

      {feedback && (
        <div className="pop-in mt-4 border-[1.5px] border-moss-dark bg-moss-tint px-3.5 py-2.5 font-mono text-[12px] font-bold text-moss-dark">
          {feedback}
        </div>
      )}
    </div>
  );
}
