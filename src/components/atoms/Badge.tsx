import React from 'react';
import { CEFRLevel } from '../../types/vocabulary';

interface BadgeProps {
  level: CEFRLevel;
}

const levelColors: Record<CEFRLevel, string> = {
  A1: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  A2: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  B1: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  B2: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  C1: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  C2: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const Badge: React.FC<BadgeProps> = ({ level }) => {
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border backdrop-blur-md ${levelColors[level]}`}>
      {level}
    </span>
  );
};
