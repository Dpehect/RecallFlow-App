'use client';

import React from 'react';
import { UserStats } from '@/lib/storage';

interface GamificationBannerProps {
  stats: UserStats;
}

export default function GamificationBanner({ stats }: GamificationBannerProps) {
  const goalPercent = Math.min(100, Math.round(((stats.todayCount || 0) / (stats.dailyGoal || 10)) * 100));

  return (
    <div style={{
      backgroundColor: '#FAF8F5',
      border: '3px solid #000',
      padding: '16px 20px',
      boxShadow: '4px 4px 0px #000',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px'
    }}>
      <div>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', display: 'block' }}>GÜNLÜK HEDEF</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <div style={{ width: '120px', height: '10px', backgroundColor: '#E2E8F0', border: '1.5px solid #000', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${goalPercent}%`, height: '100%', backgroundColor: '#65A30D' }} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 'bold' }}>%{goalPercent}</span>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', display: 'block' }}>TAM ÖĞRENİLEN</span>
        <span style={{ fontSize: '20px', fontWeight: '900', color: '#65A30D' }}>{stats.totalMastered || 0} KELİME</span>
      </div>

      <div style={{ textAlign: 'right', borderLeft: '2px solid #000', paddingLeft: '15px' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', display: 'block' }}>TOPLAM TEKRAR</span>
        <span style={{ fontSize: '20px', fontWeight: '900', color: '#000' }}>{stats.totalReviewed || 0}</span>
      </div>

      <div style={{ textAlign: 'right', borderLeft: '2px solid #000', paddingLeft: '15px' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', display: 'block' }}>TOPLAM XP / SERİ</span>
        <span style={{ fontSize: '20px', fontWeight: '900', color: '#EA580C' }}>⚡ {stats.xp || 0} XP | 🔥 {stats.streak || 1} GÜN</span>
      </div>
    </div>
  );
}
