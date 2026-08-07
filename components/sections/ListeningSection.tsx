'use client';

import React, { useState } from 'react';
import { CATEGORIES, DIFFICULTY_LEVELS, generateOfflineSentence } from '@/lib/sentence_matrix';
import { usePracticeContext } from '@/lib/practice-context';

export default function ListeningSection() {
  const { category, setCategory, difficulty, setDifficulty } = usePracticeContext();
  const [sentence, setSentence] = useState<string>(() => generateOfflineSentence(category, difficulty));
  const [revealed, setRevealed] = useState(false);
  const [speechSupported] = useState(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window
  );

  const regenerate = (nextCategory = category, nextDifficulty = difficulty) => {
    setSentence(generateOfflineSentence(nextCategory, nextDifficulty));
    setRevealed(false);
  };

  const speak = () => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
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
            🎧 LISTENING
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              regenerate(e.target.value, difficulty);
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
              regenerate(category, e.target.value);
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
            {DIFFICULTY_LEVELS.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                Zorluk: {lvl.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!speechSupported && (
        <p style={{ fontSize: '12px', color: '#B91C1C', fontWeight: 'bold', marginBottom: '12px' }}>
          ⚠️ Tarayıcınız sesli okumayı (Web Speech API) desteklemiyor.
        </p>
      )}

      <div
        style={{
          backgroundColor: '#FFF',
          border: '2px solid #000',
          padding: '30px 18px',
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        <button
          type="button"
          onClick={speak}
          disabled={!speechSupported}
          style={{
            backgroundColor: '#EA580C',
            color: '#FFF',
            border: '2px solid #000',
            padding: '14px 26px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: speechSupported ? 'pointer' : 'not-allowed',
            boxShadow: '2px 2px 0px #000',
            opacity: speechSupported ? 1 : 0.5,
          }}
        >
          🔊 DİNLE
        </button>

        <p style={{ marginTop: '18px', fontSize: '15px', minHeight: '24px' }}>
          {revealed ? `"${sentence}"` : '••• Cümleyi dinledikten sonra metni göster •••'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          style={{
            backgroundColor: '#FFF',
            border: '2px solid #000',
            padding: '10px 18px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #000',
          }}
        >
          {revealed ? '🙈 Metni Gizle' : '👁️ Metni Göster'}
        </button>
        <button
          type="button"
          onClick={() => regenerate()}
          style={{
            backgroundColor: '#65A30D',
            color: '#FFF',
            border: '2px solid #000',
            padding: '10px 18px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #000',
          }}
        >
          🔄 YENİ CÜMLE
        </button>
      </div>
    </div>
  );
}
