'use client';

import React from 'react';
import { UserStats } from '@/lib/storage';

interface GamificationBannerProps {
  stats: UserStats;
}

function Stat({
  label,
  value,
  accent,
  divider,
}: {
  label: string;
  value: React.ReactNode;
  accent?: string;
  divider?: boolean;
}) {
  return (
    <div className={divider ? 'border-l-[2px] border-ink/70 pl-4' : ''}>
      <span className="block font-mono text-[10px] font-bold uppercase tracking-widest2 text-ink-soft">
        {label}
      </span>
      <span className={`mt-1 block font-display text-[22px] font-semibold leading-none ${accent || 'text-ink'}`}>
        {value}
      </span>
    </div>
  );
}

export default function GamificationBanner({ stats }: GamificationBannerProps) {
  const goalPercent = Math.min(
    100,
    Math.round(((stats.todayCount || 0) / (stats.dailyGoal || 10)) * 100)
  );

  return (
    <div className="press-md mb-6 flex flex-wrap items-center gap-5 border-[3px] border-ink bg-paper-raised px-5 py-4 shadow-ink">
      <div>
        <span className="block font-mono text-[10px] font-bold uppercase tracking-widest2 text-ink-soft">
          Günlük Hedef
        </span>
        <div className="mt-1.5 flex items-center gap-2.5">
          <div className="h-2.5 w-32 overflow-hidden border-[1.5px] border-ink bg-paper-sunken">
            <div
              className="h-full bg-moss transition-[width] duration-500 ease-out"
              style={{ width: `${goalPercent}%` }}
            />
          </div>
          <span className="font-mono text-[13px] font-bold text-ink">%{goalPercent}</span>
        </div>
      </div>

      <Stat
        label="Tam Öğrenilen"
        value={`${stats.totalMastered || 0} kelime`}
        accent="text-moss"
      />
      <Stat label="Toplam Tekrar" value={stats.totalReviewed || 0} divider />
      <Stat
        label="Toplam XP / Seri"
        value={
          <span className="flex items-center gap-1.5">
            <span className="text-rust">⚡ {stats.xp || 0} XP</span>
            <span className="text-ink-faint">·</span>
            <span className="text-rust">🔥 {stats.streak || 1} gün</span>
          </span>
        }
        divider
      />
    </div>
  );
}
