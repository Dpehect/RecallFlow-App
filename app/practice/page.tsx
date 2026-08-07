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
    setHistory((prev) => [...prev.slice(-50), res.tr]);
    setUserInput('');
    setLoading(false);
  };

  useEffect(() => {
    loadNewSentence();
  }, [category, level, targetLang]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F2EB',
      fontFamily: "'Courier New', Courier, monospace, sans-serif",
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* ÜST BAR / KONTROLLER (Retro Brutalist Stil) */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{
              backgroundColor: '#FACC15',
              border: '2px solid #000',
              padding: '6px 14px',
              fontWeight: 'bold',
              fontSize: '13px',
              boxShadow: '2px 2px 0px #000',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              🤖 <span>{targetLang.toUpperCase()} ({level}) – RADİKAL CÜMLE</span>
            </div>

            {/* Kategori Seçimi */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                backgroundColor: '#FFF',
                border: '2px solid #000',
                padding: '6px 10px',
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

            {/* Zorluk Seviyesi Seçimi */}
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              style={{
                backgroundColor: '#FFF',
                border: '2px solid #000',
                padding: '6px 10px',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #000'
              }}
            >
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl} Seviyesi</option>
              ))}
            </select>
          </div>

          <button
            onClick={loadNewSentence}
            disabled={loading}
            style={{
              backgroundColor: '#EA580C',
              color: '#FFF',
              border: '2px solid #000',
              padding: '8px 18px',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '3px 3px 0px #000',
              letterSpacing: '0.5px'
            }}
          >
            {loading ? 'ÜRETİLİYOR...' : '🔄 YENİ BENZERSİZ CÜMLE ÜRET'}
          </button>
        </div>

        {/* BÜYÜK PRATİK KART KUTUSU (Ekran Görüntüsüyle Birebir Brutalist Tasarım) */}
        <div style={{
          backgroundColor: '#FAF8F5',
          border: '3px solid #000',
          padding: '28px',
          boxShadow: '6px 6px 0px #000',
          marginBottom: '30px'
        }}>
          {/* Üst Etiketler */}
          <div style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            marginBottom: '18px',
            borderBottom: '2px dashed #000',
            paddingBottom: '12px'
          }}>
            <span style={{
              color: '#EA580C',
              fontWeight: '900',
              fontSize: '13px',
              letterSpacing: '0.5px'
            }}>
              ÇEVRİLECEK %100 DOĞAL TÜRKÇE CÜMLE:
            </span>

            <span style={{
              backgroundColor: '#65A30D',
              color: '#FFF',
              border: '1.5px solid #000',
              padding: '4px 10px',
              fontWeight: 'bold',
              fontSize: '11px',
              boxShadow: '1.5px 1.5px 0px #000'
            }}>
              BENZERSİZLİK: %100 TEKRARSIZ
            </span>
          </div>

          {/* Cümle Metni (Görseldeki Serif İtalik Stil) */}
          <div style={{ padding: '10px 0 20px 0' }}>
            <h2 style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontStyle: 'italic',
              fontSize: '26px',
              fontWeight: '700',
              color: '#111',
              lineHeight: '1.4',
              margin: '0 0 10px 0'
            }}>
              "{currentSentence || 'Yükleniyor...'}"
            </h2>

            {hint && (
              <p style={{ fontSize: '13px', color: '#0369A1', marginTop: '8px', fontWeight: 'bold' }}>
                💡 İPUCU: {hint}
              </p>
            )}
            {grammarNote && (
              <p style={{ fontSize: '13px', color: '#7E22CE', marginTop: '4px', fontWeight: 'bold' }}>
                📌 GRAMER ODAĞI: {grammarNote}
              </p>
            )}
          </div>

          {/* Çeviri Giriş Alanı */}
          <div style={{ marginTop: '15px' }}>
            <label style={{
              display: 'block',
              fontWeight: 'bold',
              fontSize: '13px',
              marginBottom: '8px',
              letterSpacing: '0.5px'
            }}>
              {targetLang.toUpperCase()} ÇEVİRİNİZİ YAZIN:
            </label>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={`${targetLang} cümlenizi buraya yazın...`}
                style={{
                  flex: '1',
                  minWidth: '280px',
                  backgroundColor: '#FFF',
                  border: '2.5px solid #000',
                  padding: '12px 16px',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxShadow: '2px 2px 0px #000'
                }}
              />

              <button style={{
                backgroundColor: '#EA580C',
                color: '#FFF',
                border: '2.5px solid #000',
                padding: '12px 24px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '3px 3px 0px #000',
                whiteSpace: 'nowrap'
              }}>
                KONTROL ET →
              </button>
            </div>
          </div>
        </div>

        {/* ALT BANNER (Görseldeki Orijinal Footer) */}
        <div style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          color: '#444',
          textTransform: 'uppercase'
        }}>
          RECALLFLOW RADICAL MULTILINGUAL AI PRACTICE ENGINE – INFINITE UNIQUE COMBINATIONS
        </div>

      </div>
    </div>
  );
}
