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

export default function ReadingSection() {
  const { category, setCategory, difficulty, setDifficulty } = usePracticeContext();
  const [passage, setPassage] = useState<string[]>(() => buildPassage(category, difficulty));
  const [showQuestions, setShowQuestions] = useState(false);

  const regenerate = (nextCategory = category, nextDifficulty = difficulty) => {
    setPassage(buildPassage(nextCategory, nextDifficulty));
    setShowQuestions(false);
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
            📖 READING
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

        <button
          type="button"
          onClick={() => regenerate()}
          style={{
            backgroundColor: '#EA580C',
            color: '#FFF',
            border: '2px solid #000',
            padding: '8px 16px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #000',
          }}
        >
          🔄 YENİ METİN
        </button>
      </div>

      <div
        style={{
          backgroundColor: '#FFF',
          border: '2px solid #000',
          padding: '18px',
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: '16px',
          lineHeight: '1.8',
        }}
      >
        {passage.join(' ')}
      </div>

      <button
        type="button"
        onClick={() => setShowQuestions((s) => !s)}
        style={{
          marginTop: '16px',
          backgroundColor: '#FFF',
          border: '2px solid #000',
          padding: '8px 16px',
          fontWeight: 'bold',
          fontSize: '12px',
          cursor: 'pointer',
          boxShadow: '2px 2px 0px #000',
        }}
      >
        {showQuestions ? '🙈 Anlama Sorularını Gizle' : '🧠 Anlama Sorularını Göster'}
      </button>

      {showQuestions && (
        <ul style={{ marginTop: '14px', paddingLeft: '20px' }}>
          <li style={{ fontSize: '13px', marginBottom: '6px' }}>
            Metindeki ana özneler kimlerdi? Türkçe olarak listele.
          </li>
          <li style={{ fontSize: '13px', marginBottom: '6px' }}>
            Her cümleyi hedef dile (AI Pratik Robotu sekmesindeki dile) çevirmeyi dene.
          </li>
          <li style={{ fontSize: '13px' }}>
            Metindeki fiilleri bul ve hangi zamanda çekimlendiklerini belirle.
          </li>
        </ul>
      )}
    </div>
  );
}
