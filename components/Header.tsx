'use client';

import React from 'react';

export type TabId = 'kelime' | 'dilbilgisi' | 'reading' | 'listening' | 'ai-robot';

interface TabDef {
  id: TabId;
  label: string;
}

const TABS: TabDef[] = [
  { id: 'kelime', label: '1. KELİME' },
  { id: 'dilbilgisi', label: '2. DİL BİLGİSİ' },
  { id: 'reading', label: '3. READING' },
  { id: 'listening', label: '4. LISTENING' },
  { id: 'ai-robot', label: '🤖 AI PRATİK ROBOTU' },
];

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header
      style={{
        backgroundColor: '#FAF8F5',
        borderBottom: '3px solid #000',
        boxShadow: '0 4px 0px #000',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '14px 20px 0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', Courier, monospace, sans-serif",
            fontWeight: 900,
            fontSize: '18px',
            letterSpacing: '0.5px',
          }}
        >
          🔁 RecallFlow
        </div>
      </div>

      <nav
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '10px 20px 0 20px',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              style={{
                fontFamily: "'Courier New', Courier, monospace, sans-serif",
                backgroundColor: isActive ? '#FACC15' : '#FFF',
                border: '2px solid #000',
                borderBottom: isActive ? '2px solid #FACC15' : '2px solid #000',
                padding: '8px 14px',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: isActive ? '2px 2px 0px #000' : 'none',
                position: 'relative',
                bottom: isActive ? '2px' : '0px',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
