'use client';

import React from 'react';
import { GRAMMAR_LEVELS } from '@/lib/grammar_notes';
import { usePracticeContext } from '@/lib/practice-context';

export default function DilBilgisiSection() {
  const { difficulty, setDifficulty } = usePracticeContext();
  const levels = Object.values(GRAMMAR_LEVELS);

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
          alignItems: 'center',
          gap: '8px',
          marginBottom: '18px',
          borderBottom: '2px solid #000',
          paddingBottom: '14px',
        }}
      >
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
          📌 DİL BİLGİSİ
        </div>
        <span style={{ fontSize: '12px', color: '#666' }}>
          Seviyeni seç, o seviyeye ait gramer odak noktalarını incele.
        </span>
      </div>

      <div style={{ display: 'grid', gap: '14px' }}>
        {levels.map((lvl) => {
          const isActive = lvl.id === difficulty;
          return (
            <div
              key={lvl.id}
              onClick={() => setDifficulty(lvl.id)}
              style={{
                cursor: 'pointer',
                backgroundColor: isActive ? '#FEF3C7' : '#FFF',
                border: '2px solid #000',
                padding: '16px',
                boxShadow: isActive ? '3px 3px 0px #000' : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>
                  {isActive ? '👉 ' : ''}
                  {lvl.title}
                </h3>
                <span
                  style={{
                    backgroundColor: '#65A30D',
                    color: '#FFF',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '3px 8px',
                    border: '1.5px solid #000',
                  }}
                >
                  CEFR {lvl.cefr}
                </span>
              </div>
              <p style={{ fontSize: '12px', margin: '8px 0', color: '#333' }}>{lvl.description}</p>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px' }}>
                {lvl.focusPoints.map((point) => (
                  <li key={point} style={{ fontSize: '12px', color: '#7E22CE', fontWeight: 'bold' }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: '16px', fontSize: '11px', color: '#666' }}>
        💡 Seçtiğin seviye tüm sekmelerde (Kelime, Reading, Listening, AI Pratik Robotu) geçerli olur.
      </p>
    </div>
  );
}
