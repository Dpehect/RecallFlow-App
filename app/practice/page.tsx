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
    <div style={{ maxWidth: '850px', margin: '30px auto', padding: '20px' }}>
      <header style={{ borderBottom: '2px solid #333', paddingBottom: '15px', marginBottom: '25px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '-0.5px' }}>RECALLFLOW — SINIRSIZ DİNAMİK PRATİK MOTORU</h1>
        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
          Zorluk seviyesine (A1-C1) ve kategoriye göre asla tekrarlamayan benzersiz cümleler üretir.
        </p>
      </header>

      {/* Kontrol Paneli */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', background: '#eee', padding: '15px', borderRadius: '8px', marginBottom: '25px' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', fontSize: '13px', marginBottom: '5px' }}>Kategori:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', fontSize: '13px', marginBottom: '5px' }}>CEFR Zorluk Seviyesi:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', fontSize: '13px', marginBottom: '5px' }}>Hedef Dil:</label>
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="German (Almanca)">German (Almanca)</option>
            <option value="English (İngilizce)">English (İngilizce)</option>
            <option value="Spanish (İspanyolca)">Spanish (İspanyolca)</option>
            <option value="French (Fransızca)">French (Fransızca)</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <label style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>Motor Modu:</label>
          <label style={{ cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" checked={useLLM} onChange={(e) => setUseLLM(e.target.checked)} />
            AI LLM Mode (Sınırsız)
          </label>
        </div>
      </div>

      {/* Pratik Kartı */}
      <div style={{ border: '2px solid #111', background: '#fff', borderRadius: '8px', padding: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', color: '#d84315', fontSize: '14px' }}>
            {targetLang.toUpperCase()} ({level}) — {CATEGORIES.find(c => c.id === category)?.name}
          </span>
          <button
            onClick={loadNewSentence}
            disabled={loading}
            style={{ background: '#111', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
          >
            {loading ? 'Üretiliyor...' : '🔄 YENİ BENZERSIZ CÜMLE ÜRET'}
          </button>
        </div>

        <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '6px', borderLeft: '5px solid #2e7d32', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#555', textTransform: 'uppercase' }}>Çevrilecek %100 Doğal Türkçe Cümle</span>
            <span style={{ fontSize: '11px', background: '#e8f5e9', color: '#2e7d32', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
              {engineSource === 'llm' ? '🤖 AI Üretimi (Sınırsız)' : '⚡ Matris Engine'}
            </span>
          </div>
          <h2 style={{ fontSize: '22px', margin: '10px 0', color: '#111', lineHeight: '1.4' }}>"{currentSentence}"</h2>
          {hint && <p style={{ fontSize: '13px', color: '#0288d1', margin: '10px 0 0 0' }}>💡 <b>İpucu:</b> {hint}</p>}
          {grammarNote && <p style={{ fontSize: '13px', color: '#6a1b9a', margin: '5px 0 0 0' }}>📌 <b>Gramer Odağı:</b> {grammarNote}</p>}
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            {targetLang.toUpperCase()} ÇEVİRİNİZİ YAZIN:
          </label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`${targetLang} cümlenizi buraya yazın...`}
            rows={3}
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' }}
          />
          <button style={{ marginTop: '12px', background: '#e65100', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
            KONTROL ET →
          </button>
        </div>
      </div>
    </div>
  );
}
