'use client';

import React, { useState, useEffect } from 'react';
import Header, { TabId } from '@/components/Header';
import AIPracticeRobot from '@/components/AIPracticeRobot';
import GamificationBanner from '@/components/GamificationBanner';
import KelimeSection from '@/components/sections/KelimeSection';
import DilBilgisiSection from '@/components/sections/DilBilgisiSection';
import ReadingSection from '@/components/sections/ReadingSection';
import ListeningSection from '@/components/sections/ListeningSection';
import { PracticeProvider } from '@/lib/practice-context';
import { getUserStats, UserStats } from '@/lib/storage';

function HomeContent() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('kelime');

  useEffect(() => {
    setStats(getUserStats());
  }, []);

  const handleStatsUpdate = (updatedStats: UserStats) => setStats(updatedStats);

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '30px 20px',
          fontFamily: "'Courier New', Courier, monospace, sans-serif",
        }}
      >
        {/* Gamification Stats Banner - visible across every tab */}
        {stats && <GamificationBanner stats={stats} />}

        {/* Active tab content. Switching tabs only swaps local state -
            no route change, so there is no App Router conflict. */}
        <section style={{ marginTop: '20px' }}>
          {activeTab === 'kelime' && <KelimeSection onStatsUpdate={handleStatsUpdate} />}
          {activeTab === 'dilbilgisi' && <DilBilgisiSection />}
          {activeTab === 'reading' && <ReadingSection />}
          {activeTab === 'listening' && <ListeningSection />}
          {activeTab === 'ai-robot' && <AIPracticeRobot onStatsUpdate={handleStatsUpdate} />}
        </section>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <PracticeProvider>
      <HomeContent />
    </PracticeProvider>
  );
}
