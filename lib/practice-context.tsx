'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PracticeContextValue {
  category: string;
  setCategory: (c: string) => void;
  difficulty: string;
  setDifficulty: (d: string) => void;
  targetLang: string;
  setTargetLang: (l: string) => void;
}

const PracticeContext = createContext<PracticeContextValue | undefined>(undefined);

export function PracticeProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState('daily');
  const [difficulty, setDifficulty] = useState('Kolay');
  const [targetLang, setTargetLang] = useState('German (Almanca)');

  return (
    <PracticeContext.Provider
      value={{ category, setCategory, difficulty, setDifficulty, targetLang, setTargetLang }}
    >
      {children}
    </PracticeContext.Provider>
  );
}

// Shared across every tab so the difficulty/category picked anywhere in the
// app is the same value that gets sent to the sentence-generation prompt engine.
export function usePracticeContext(): PracticeContextValue {
  const ctx = useContext(PracticeContext);
  if (!ctx) {
    throw new Error('usePracticeContext must be used within a PracticeProvider');
  }
  return ctx;
}
