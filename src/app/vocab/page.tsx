'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { VocabHero } from '@/components/vocab/VocabHero';
import { VocabFilterBar } from '@/components/vocab/VocabFilterBar';
import { VocabGrid } from '@/components/vocab/VocabGrid';

export default function VocabPage() {
  return (
    <main className="min-h-screen bg-[#eef4fb]">
      <Navbar />
      <VocabHero />
      <VocabFilterBar />
      <VocabGrid />
    </main>
  );
}
