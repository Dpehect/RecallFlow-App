'use client';

import React from 'react';
import { CATEGORIES, getTotalWordCount, getTotalCombinationCount } from '@/lib/sentence_matrix';
import { TabId } from '@/components/Header';

interface HomeSectionProps {
  onNavigate: (tab: TabId) => void;
}

const MODULES: { id: TabId; icon: string; title: string; blurb: string }[] = [
  { id: 'kelime', icon: '📚', title: '1. Kelime', blurb: 'Kategoriye ve seviyeye göre kelime kartlarıyla antrenman yap.' },
  { id: 'dilbilgisi', icon: '📌', title: '2. Dil Bilgisi', blurb: 'A1’den C1’e her seviyenin gramer odak noktalarını incele.' },
  { id: 'reading', icon: '📖', title: '3. Reading', blurb: 'Seviyene uygun, hiç tekrar etmeyen okuma metinleri üret.' },
  { id: 'listening', icon: '🎧', title: '4. Listening', blurb: 'Sesli okunan cümleleri dinle, sonra metni kontrol et.' },
];

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  const totalWords = getTotalWordCount();
  const totalCombos = getTotalCombinationCount();

  return (
    <div
      style={{
        backgroundColor: '#FAF8F5',
        border: '3px solid #000',
        boxShadow: '6px 6px 0px #000',
        marginBottom: '25px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '32px 28px' }}>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#FACC15',
            border: '2px solid #000',
            padding: '6px 14px',
            fontWeight: 'bold',
            fontSize: '11px',
            marginBottom: '20px',
            boxShadow: '2px 2px 0px #000',
          }}
        >
          ✶ 5 KATEGORİ · 3 ZORLUK SEVİYESİ · GERÇEK ZAMANLI AI ÜRETİMİ
        </div>

        <h1
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontStyle: 'italic',
            fontSize: '38px',
            lineHeight: '1.15',
            margin: '0 0 10px 0',
          }}
        >
          Dil Öğrenmenin
        </h1>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#FACC15',
            border: '2px solid #000',
            padding: '4px 14px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontWeight: 900,
              fontSize: '38px',
              lineHeight: '1.15',
            }}
          >
            Karakterli &amp; Sert Yolu
          </span>
        </div>

        <p style={{ fontSize: '14px', lineHeight: '1.7', maxWidth: '620px', marginBottom: '24px' }}>
          Gereksiz şablon cümleler yok. Kategoriye göre ayrılmış içerikler, seviye başına
          binlerce benzersiz cümle kombinasyonu ve hiçbir cümlenin tekrar etmediği bir
          AI cümle üretim motoru.
        </p>

        <button
          type="button"
          onClick={() => onNavigate('kelime')}
          style={{
            backgroundColor: '#65A30D',
            color: '#FFF',
            border: '2px solid #000',
            padding: '12px 22px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '3px 3px 0px #000',
          }}
        >
          1. KELİME MODÜLÜNE GİT →
        </button>
      </div>

      <div
        style={{
          borderTop: '3px solid #000',
          padding: '24px 28px 28px 28px',
          backgroundColor: '#FFF',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '16px',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#666' }}>
              📁 {MODULES.length} MÜFREDAT BÖLÜMÜ
            </span>
            <h2
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontStyle: 'italic',
                fontSize: '24px',
                margin: '4px 0 0 0',
              }}
            >
              Öğrenme Alanını Seç
            </h2>
          </div>
          <span
            style={{
              backgroundColor: '#FACC15',
              border: '2px solid #000',
              padding: '5px 10px',
              fontWeight: 'bold',
              fontSize: '11px',
              boxShadow: '2px 2px 0px #000',
            }}
          >
            {totalWords}+ KELİME · {totalCombos.toLocaleString('tr-TR')}+ CÜMLE KOMBİNASYONU
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
          }}
        >
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => onNavigate(mod.id)}
              style={{
                textAlign: 'left',
                backgroundColor: '#FAF8F5',
                border: '2px solid #000',
                padding: '16px',
                cursor: 'pointer',
                boxShadow: '3px 3px 0px #000',
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>{mod.icon}</div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 800 }}>{mod.title}</h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#444', lineHeight: '1.5' }}>{mod.blurb}</p>
            </button>
          ))}
        </div>

        <p style={{ marginTop: '18px', fontSize: '11px', color: '#666' }}>
          Kategoriler: {CATEGORIES.map((c) => c.name).join(' · ')}
        </p>
      </div>
    </div>
  );
}
