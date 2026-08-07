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

interface AIPracticeRobotProps {
  onStatsUpdate?: (stats: UserStats) => void;
}

export default function AIPracticeRobot({ onStatsUpdate }: AIPracticeRobotProps) {
  // category/difficulty/targetLang are shared globally (via context) so the
  // level chosen here is the same one used by the Kelime, Reading and
  // Listening tabs, and is what actually gets sent to the prompt engine.
  const { category, setCategory, difficulty, setDifficulty, targetLang, setTargetLang } =
    usePracticeContext();

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
      useLLM: true
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
    <div style={{
      backgroundColor: '#FAF8F5',
      border: '3px solid #000',
      padding: '24px',
      boxShadow: '6px 6px 0px #000',
      marginBottom: '25px',
      boxSizing: 'border-box'
    }}>
      {/* KONTROL VE SEÇİCİ HEADER */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '18px',
        borderBottom: '2px solid #000',
        paddingBottom: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{
            backgroundColor: '#FACC15',
            border: '2px solid #000',
            padding: '5px 12px',
            fontWeight: 'bold',
            fontSize: '12px',
            boxShadow: '2px 2px 0px #000',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            🤖 <span>AI PRATİK ROBOTU</span>
          </div>

          {/* Kategori Seçimi */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              backgroundColor: '#FFF',
              border: '2px solid #000',
              padding: '5px 10px',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #000'
            }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* Zorluk Seviyesi Seçimi (Kolay / Orta / Zor) */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{
              backgroundColor: '#FFF',
              border: '2px solid #000',
              padding: '5px 10px',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #000'
            }}
          >
            {DIFFICULTY_LEVELS.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>Zorluk: {lvl.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={loadNewSentence}
          disabled={loading}
          type="button"
          style={{
            backgroundColor: '#EA580C',
            color: '#FFF',
            border: '2px solid #000',
            padding: '8px 16px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #000',
            letterSpacing: '0.5px'
          }}
        >
          {loading ? 'ÜRETİLİYOR...' : '🔄 YENİ CÜMLE ÜRET'}
        </button>
      </div>

      {/* CÜMLE KARTI */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <span style={{ color: '#EA580C', fontWeight: 'bold', fontSize: '12px' }}>
          ÇEVRİLECEK %100 DOĞAL TÜRKÇE CÜMLE ({difficulty.toUpperCase()} MODU):
        </span>
        <span style={{
          backgroundColor: '#65A30D',
          color: '#FFF',
          border: '1.5px solid #000',
          padding: '3px 8px',
          fontWeight: 'bold',
          fontSize: '10px',
          boxShadow: '1.5px 1.5px 0px #000'
        }}>
          %100 TEKRARSIZ · HAVUZDA {remaining}+ CÜMLE KALDI
        </span>
      </div>

      <div style={{ padding: '8px 0 16px 0' }}>
        <h2 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontStyle: 'italic',
          fontSize: '22px',
          fontWeight: '700',
          color: '#111',
          lineHeight: '1.4',
          margin: '0 0 8px 0'
        }}>
          "{currentSentence || 'Cümle yükleniyor...'}"
        </h2>

        {hint && (
          <p style={{ fontSize: '12px', color: '#0369A1', marginTop: '6px', fontWeight: 'bold' }}>
            💡 İPUCU: {hint}
          </p>
        )}
        {grammarNote && (
          <p style={{ fontSize: '12px', color: '#7E22CE', marginTop: '4px', fontWeight: 'bold' }}>
            📌 GRAMER ODAĞI: {grammarNote}
          </p>
        )}
      </div>

      {/* ÇEVİRİ VE KONTROL FORMU */}
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', fontSize: '12px', marginBottom: '6px' }}>
          {targetLang.toUpperCase()} ÇEVİRİNİZİ YAZIN:
        </label>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`${targetLang} cümlenizi buraya yazın...`}
            style={{
              flex: '1',
              minWidth: '240px',
              backgroundColor: '#FFF',
              border: '2px solid #000',
              padding: '10px 14px',
              fontSize: '14px',
              outline: 'none',
              boxShadow: '2px 2px 0px #000'
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: '#EA580C',
              color: '#FFF',
              border: '2px solid #000',
              padding: '10px 20px',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #000',
              whiteSpace: 'nowrap'
            }}
          >
            KONTROL ET →
          </button>
        </div>
      </form>

      {feedback && (
        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          backgroundColor: '#DCFCE7',
          border: '1.5px solid #15803D',
          color: '#166534',
          fontWeight: 'bold',
          fontSize: '12px',
          borderRadius: '4px'
        }}>
          {feedback}
        </div>
      )}
    </div>
  );
}
