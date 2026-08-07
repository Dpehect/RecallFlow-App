'use client';

import React, { useState } from 'react';
import { usePracticeContext } from '@/lib/practice-context';
import { TARGET_LANGUAGES, getLanguageById } from '@/lib/languages';

export type TabId = 'home' | 'kelime' | 'dilbilgisi' | 'reading' | 'listening' | 'ai-robot';

interface TabDef {
  id: TabId;
  num: string;
  label: string;
}

const TABS: TabDef[] = [
  { id: 'kelime', num: '01', label: 'Kelime' },
  { id: 'dilbilgisi', num: '02', label: 'Dil Bilgisi' },
  { id: 'reading', num: '03', label: 'Reading' },
  { id: 'listening', num: '04', label: 'Listening' },
  { id: 'ai-robot', num: '05', label: 'AI Pratik' },
];

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { targetLang, setTargetLang } = usePracticeContext();
  const [langOpen, setLangOpen] = useState(false);
  const current = getLanguageById(targetLang);

  return (
    <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-3 px-5 py-3.5">
        {/* Mark */}
        <button
          type="button"
          onClick={() => onTabChange('home')}
          className="press press-sm mr-1 flex items-center gap-2.5 bg-transparent"
        >
          <span className="grid h-8 w-8 place-items-center border-[2px] border-ink bg-rust text-paper-raised shadow-ink-sm">
            <span className="font-mono text-[13px] font-bold leading-none">RF</span>
          </span>
          <span className="font-display text-[22px] italic leading-none tracking-tight">
            RecallFlow
          </span>
        </button>

        {/* Tabs — horizontally scrollable on small screens, never wraps awkwardly */}
        <nav
          aria-label="Bölümler"
          className="order-3 flex w-full gap-1.5 overflow-x-auto pb-1 md:order-none md:w-auto md:flex-1 md:overflow-visible md:pb-0"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'press press-sm flex shrink-0 items-center gap-1.5 whitespace-nowrap border-[2px] border-ink px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wide transition-colors',
                  isActive ? 'bg-gold text-ink' : 'bg-paper-raised text-ink hover:bg-gold-tint',
                ].join(' ')}
                style={!isActive ? { boxShadow: 'none' } : undefined}
              >
                <span className={isActive ? 'text-rust-dark' : 'text-ink-faint'}>{tab.num}</span>
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Target language switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="press press-sm flex items-center gap-2 border-[2px] border-ink bg-paper-raised px-3 py-2 font-mono text-[11px] font-bold"
            >
              <span aria-hidden>{current.flag}</span>
              {current.code}
              <span aria-hidden className="text-ink-faint">▾</span>
            </button>
            {langOpen && (
              <ul
                role="listbox"
                className="absolute right-0 z-40 mt-2 w-52 border-[2px] border-ink bg-paper-raised shadow-ink"
              >
                {TARGET_LANGUAGES.map((lang) => (
                  <li key={lang.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang.id === targetLang}
                      onClick={() => {
                        setTargetLang(lang.id);
                        setLangOpen(false);
                      }}
                      className={[
                        'flex w-full items-center gap-2.5 px-3 py-2.5 text-left font-mono text-[12px] font-semibold',
                        lang.id === targetLang ? 'bg-gold-tint' : 'hover:bg-paper-sunken',
                      ].join(' ')}
                    >
                      <span aria-hidden>{lang.flag}</span>
                      {lang.labelTr}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={() => onTabChange('ai-robot')}
            className="press press-sm hidden items-center gap-1.5 whitespace-nowrap border-[2px] border-ink bg-rust px-4 py-2 font-mono text-[11px] font-bold text-paper-raised sm:inline-flex"
          >
            AI Pratik Robotu →
          </button>
        </div>
      </div>
    </header>
  );
}
