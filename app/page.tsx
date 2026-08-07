'use client';

import React, { useState, useEffect } from 'react';
import AIPracticeRobot from '@/components/AIPracticeRobot';
import GamificationBanner from '@/components/GamificationBanner';
import { getUserStats, UserStats } from '@/lib/storage';

export default function Home() {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    setStats(getUserStats());
  }, []);

  return (
    <main style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '30px 20px',
      fontFamily: "'Courier New', Courier, monospace, sans-serif"
    }}>
      {/* Gamification Stats Banner */}
      {stats && <GamificationBanner stats={stats} />}

      {/* Main Integrated AI Practice Component */}
      <section style={{ marginTop: '20px' }}>
        <AIPracticeRobot onStatsUpdate={(updatedStats) => setStats(updatedStats)} />
      </section>
    </main>
  );
}
