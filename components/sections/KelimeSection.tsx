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
    <div
      style={{
        backgroundColor: '#FAF8F5',
        border: '3px solid #000',
        padding: '24px',
        boxShadow: '6px 6px 0px #000',
        marginBottom: '25px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '18px',
          borderBottom: '2px solid #000',
          paddingBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div
            style={{
              backgroundColor: '#FACC15',
              border: '2px solid #000',
              padding: '5px 12px',
              fontWeight: 'bold',
              fontSize: '12px',
              boxShadow: '2px 2px 0px #000',
            }}
          >
            📚 KELİME ANTRENMANI
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setIndex(0);
              setRevealed(false);
            }}
            style={{
              backgroundColor: '#FFF',
              border: '2px solid #000',
              padding: '5px 10px',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #000',
            }}
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
            style={{
              backgroundColor: '#FFF',
              border: '2px solid #000',
              padding: '5px 10px',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #000',
            }}
          >
            <option value="Kolay">Zorluk: Kolay (A1-A2)</option>
            <option value="Orta">Zorluk: Orta (B1-B2)</option>
            <option value="Zor">Zorluk: Zor (C1-C2)</option>
          </select>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#65A30D' }}>
          ✅ Bilinen: {known}
        </span>
      </div>

      <div
        onClick={() => setRevealed((r) => !r)}
        style={{
          cursor: 'pointer',
          textAlign: 'center',
          padding: '40px 20px',
          border: '2px dashed #000',
          marginBottom: '18px',
          backgroundColor: '#FFF',
        }}
      >
        <p style={{ fontSize: '11px', color: '#666', fontWeight: 'bold', marginBottom: '10px' }}>
          {revealed ? 'ANLAMI / KULLANIMI' : 'KARTA TIKLAYIN'}
        </p>
        <h2
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: '26px',
            fontWeight: 700,
            margin: 0,
          }}
        >
          {currentWord}
        </h2>
        {revealed && (
          <p style={{ marginTop: '10px', fontSize: '13px', color: '#0369A1', fontWeight: 'bold' }}>
            Bu kelimeyi hedef dile nasıl çevirirdin? AI Pratik Robotu sekmesinde cümle içinde dene!
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={markKnown}
          style={{
            backgroundColor: '#65A30D',
            color: '#FFF',
            border: '2px solid #000',
            padding: '10px 20px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #000',
          }}
        >
          ✅ BİLİYORUM
        </button>
        <button
          type="button"
          onClick={goNext}
          style={{
            backgroundColor: '#EA580C',
            color: '#FFF',
            border: '2px solid #000',
            padding: '10px 20px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #000',
          }}
        >
          ➡️ SONRAKİ KELİME
        </button>
      </div>
    </div>
  );
}
