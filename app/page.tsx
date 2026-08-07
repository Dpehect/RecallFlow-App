'use client';

import React, { useState, useEffect } from 'react';
import Header, { TabId } from '@/components/Header';
import Footer from '@/components/Footer';
import AIPracticeRobot from '@/components/AIPracticeRobot';
import GamificationBanner from '@/components/GamificationBanner';
import HomeSection from '@/components/sections/HomeSection';
import KelimeSection from '@/components/sections/KelimeSection';
import DilBilgisiSection from '@/components/sections/DilBilgisiSection';
import ReadingSection from '@/components/sections/ReadingSection';
import ListeningSection from '@/components/sections/ListeningSection';
import { PracticeProvider } from '@/lib/practice-context';
import { getUserStats, UserStats } from '@/lib/storage';

function HomeContent() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('home');

  useEffect(() => {
    setStats(getUserStats());
  }, []);

  const handleStatsUpdate = (updatedStats: UserStats) => setStats(updatedStats);

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto w-full max-w-[1180px] flex-1 px-5 py-8">
        {/* Gamification Stats Banner - visible across every tab except the landing page */}
        {activeTab !== 'home' && stats && <GamificationBanner stats={stats} />}

        {/* Active tab content. Switching tabs only swaps local state -
            no route change, so there is no App Router conflict. */}
        <section className={activeTab === 'home' ? '' : 'rise-in'}>
          {activeTab === 'home' && <HomeSection onNavigate={setActiveTab} />}
          {activeTab === 'kelime' && <KelimeSection onStatsUpdate={handleStatsUpdate} />}
          {activeTab === 'dilbilgisi' && <DilBilgisiSection />}
          {activeTab === 'reading' && <ReadingSection />}
          {activeTab === 'listening' && <ListeningSection />}
          {activeTab === 'ai-robot' && <AIPracticeRobot onStatsUpdate={handleStatsUpdate} />}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <PracticeProvider>
      <HomeContent />
    </PracticeProvider>
  );
}
