'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturesSection } from '@/components/FeaturesSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#eef4fb]">
      <Navbar />
      <Hero />
      <FeaturesSection />
    </main>
  );
}
