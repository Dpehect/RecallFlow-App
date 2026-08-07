'use client';

import React, { useState, useEffect } from 'react';
import { CATEGORIES, LEVELS } from '@/lib/sentence_matrix';
import { fetchNextSentence } from '@/lib/practice_engine';

export default function PracticePage() {
  const [category, setCategory] = useState('daily');
  const [level, setLevel] = useState('A1');
  const [targetLang, setTargetLang] = useState('German (Almanca)');
  const [useLLM, setUseLLM] = useState(true);

  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [grammarNote, setGrammarNote] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [engineSource, setEngineSource] = useState<'llm' | 'matrix'>('matrix');

  const loadNewSentence = async () => {
    setLoading(true);
    const res = await fetchNextSentence({
      category,
      level,
      targetLanguage: targetLang,
      history,
      useLLM
    });

    setCurrentSentence(res.tr);
    setHint(res.targetHint || '');
    setGrammarNote(res.grammarNote || '');
    setEngineSource(res.source);
    setHistory((prev) => [...prev.slice(-50), res.tr]);
    setUserInput('');
    setLoading(false);
  };

  useEffect(() => {
    loadNewSentence();
  }, [category, level, targetLang]);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>RECALLFLOW - SINIRSIZ DİNAMİK PRATİK MOTORU</h2>

      {/* Kontrol Paneli: Kategori, Seviye, Dil */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap', background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block' }}>Kategori:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px' }}>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block' }}>Zorluk Seviyesi:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ padding: '8px' }}>
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block' }}>Hedef Dil:</label>
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} style={{ padding: '8px' }}>
            <option value="German (Almanca)">German (Almanca)</option>
            <option value="English (İngilizce)">English (İngilizce)</option>
            <option value="Spanish (İspanyolca)">Spanish (İspanyolca)</option>
            <option value="French (Fransızca)">French (Fransızca)</option>
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block' }}>Motor Modu:</label>
          <label style={{ cursor: 'pointer', fontSize: '14px' }}>
            <input type="checkbox" checked={useLLM} onChange={(e) => setUseLLM(e.target.checked)} />
            LLM API (Sınırsız AI)
          </label>
        </div>
      </div>

      {/* Cümle Kartı */}
      <div style={{ border: '2px solid #222', borderRadius: '8px', padding: '20px', marginBottom: '20px', background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#ff5722' }}>
            {targetLang.toUpperCase()} ({level}) — {CATEGORIES.find(c => c.id === category)?.name}
          </span>
          <button onClick={loadNewSentence} disabled={loading} style={{ background: '#222', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Üretiliyor...' : '🔄 YENİ BENZERSIZ CÜMLE ÜRET'}
          </button>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderLeft: '4px solid #4caf50' }}>
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>ÇEVRİLECEK %100 DOĞAL TÜRKÇE CÜMLE ({engineSource === 'llm' ? 'AI Üretimi' : 'Matris Engine'}):</p>
          <h3 style={{ fontSize: '20px', margin: '10px 0' }}>"{currentSentence}"</h3>
          {hint && <p style={{ fontSize: '13px', color: '#1976d2', margin: 0 }}>💡 İpucu: {hint}</p>}
          {grammarNote && <p style={{ fontSize: '13px', color: '#7b1fa2', margin: '5px 0 0 0' }}>📌 Gramer Odağı: {grammarNote}</p>}
        </div>

        <div style={{ marginTop: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>{targetLang.toUpperCase()} ÇEVİRİNİZİ YAZIN:</label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`${targetLang} cümlenizi buraya yazın...`}
            rows={3}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button style={{ marginTop: '10px', background: '#e65100', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            KONTROL ET →
          </button>
        </div>
      </div>
    </div>
  );
}
