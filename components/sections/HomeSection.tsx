'use client';

import React from 'react';
import { CATEGORIES, getTotalWordCount, getTotalCombinationCount } from '@/lib/sentence_matrix';
import { TARGET_LANGUAGES } from '@/lib/languages';
import { TabId } from '@/components/Header';

interface HomeSectionProps {
  onNavigate: (tab: TabId) => void;
}

const MODULES: { id: TabId; num: string; icon: string; title: string; blurb: string; tint: string }[] = [
  {
    id: 'kelime',
    num: '01',
    icon: '📚',
    title: 'Kelime',
    blurb: 'Kategoriye ve seviyeye göre çevrilebilir kartlarla kelime antrenmanı.',
    tint: 'bg-rust-tint',
  },
  {
    id: 'dilbilgisi',
    num: '02',
    icon: '📌',
    title: 'Dil Bilgisi',
    blurb: 'A1’den C1’e her seviyenin gramer odak noktalarını incele.',
    tint: 'bg-plum-tint',
  },
  {
    id: 'reading',
    num: '03',
    icon: '📖',
    title: 'Reading',
    blurb: 'Seviyene uygun, hiç tekrar etmeyen okuma metinleri üret.',
    tint: 'bg-sky-tint',
  },
  {
    id: 'listening',
    num: '04',
    icon: '🎧',
    title: 'Listening',
    blurb: 'Sesli okunan cümleleri dinle, sonra metni kontrol et.',
    tint: 'bg-moss-tint',
  },
];

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  const totalWords = getTotalWordCount();
  const totalCombos = getTotalCombinationCount();

  return (
    <div className="mb-8 overflow-hidden border-[3px] border-ink bg-paper-raised shadow-ink-lg">
      {/* Hero */}
      <div className="relative overflow-hidden px-6 py-10 sm:px-9 sm:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rotate-12 border-[3px] border-ink/10 sm:h-80 sm:w-80"
        />
        <div className="press-sm mb-6 inline-flex items-center gap-2 border-[2px] border-ink bg-gold px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-ink">
          ✶ 5 kategori · 3 zorluk seviyesi · gerçek zamanlı AI üretimi
        </div>

        <h1 className="max-w-2xl font-display text-[34px] italic leading-[1.1] sm:text-[46px]">
          Dil öğrenmenin{' '}
          <span className="inline-block -rotate-1 bg-gold px-2.5 not-italic font-semibold">
            karakterli ve sert
          </span>{' '}
          yolu.
        </h1>

        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Gereksiz şablon cümleler yok. Kategoriye göre ayrılmış içerikler, seviye başına
          binlerce benzersiz cümle kombinasyonu ve hiçbir cümlenin tekrar etmediği bir
          AI cümle üretim motoru — beş hedef dilde: {TARGET_LANGUAGES.map((l) => l.labelTr).join(', ')}.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('kelime')}
            className="press press-md border-[2px] border-ink bg-moss px-6 py-3 font-mono text-[13px] font-bold uppercase tracking-wide text-paper-raised"
          >
            01 · Kelime modülüne git →
          </button>
          <button
            type="button"
            onClick={() => onNavigate('ai-robot')}
            className="press press-md border-[2px] border-ink bg-paper-raised px-6 py-3 font-mono text-[13px] font-bold uppercase tracking-wide text-ink"
          >
            🤖 AI Pratik Robotu'nu dene
          </button>
        </div>
      </div>

      {/* Module grid */}
      <div className="border-t-[3px] border-ink bg-paper px-6 py-8 sm:px-9">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest2 text-ink-soft">
              📁 {MODULES.length} müfredat bölümü
            </span>
            <h2 className="mt-1 font-display text-[24px] italic">Öğrenme Alanını Seç</h2>
          </div>
          <span className="press-sm border-[2px] border-ink bg-gold-tint px-3 py-1.5 font-mono text-[11px] font-bold">
            {totalWords}+ kelime · {totalCombos.toLocaleString('tr-TR')}+ cümle kombinasyonu
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => onNavigate(mod.id)}
              className={`card-fold press press-sm flex flex-col items-start gap-2 border-[2px] border-ink ${mod.tint} p-4 text-left`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-[22px]">{mod.icon}</span>
                <span className="font-mono text-[11px] font-bold text-ink-faint">{mod.num}</span>
              </div>
              <h3 className="font-display text-[17px] font-semibold leading-tight">{mod.title}</h3>
              <p className="text-[12.5px] leading-relaxed text-ink-soft">{mod.blurb}</p>
            </button>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] text-ink-soft">
          Kategoriler: {CATEGORIES.map((c) => c.name).join(' · ')}
        </p>
      </div>
    </div>
  );
}
