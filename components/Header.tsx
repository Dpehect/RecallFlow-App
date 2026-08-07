'use client';

import React from 'react';

export type TabId = 'home' | 'kelime' | 'dilbilgisi' | 'reading' | 'listening' | 'ai-robot';

interface TabDef {
  id: TabId;
  label: string;
}

const TABS: TabDef[] = [
  { id: 'kelime', label: '1. KELİME' },
  { id: 'dilbilgisi', label: '2. DİL BİLGİSİ' },
  { id: 'reading', label: '3. READING' },
  { id: 'listening', label: '4. LISTENING' },
  { id: 'ai-robot', label: '5. AI PRATİK ROBOTU' },
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
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <button
          type="button"
          onClick={() => onTabChange('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span
            style={{
              width: '18px',
              height: '18px',
              backgroundColor: '#EA580C',
              border: '2px solid #000',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: '22px',
              letterSpacing: '0.5px',
            }}
          >
            RecallFlow
          </span>
        </button>

        <nav style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
                  padding: '8px 14px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '2px 2px 0px #000' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => onTabChange('ai-robot')}
          style={{
            backgroundColor: '#EA580C',
            color: '#FFF',
            border: '2px solid #000',
            padding: '10px 18px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #000',
            whiteSpace: 'nowrap',
          }}
        >
          AI PRATİK ROBOTU →
        </button>
      </div>
    </header>
  );
}
