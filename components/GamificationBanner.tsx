'use client';

import React from 'react';
import { UserStats } from '@/lib/storage';

interface Props {
  stats: UserStats;
}

export default function GamificationBanner({ stats }: Props) {
  const goalPercent = Math.min(100, Math.round((stats.todayCount / stats.dailyGoal) * 100));

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-white space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        {/* Streak Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl animate-pulse">
            🔥
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-amber-400">{stats.streak} Gün</span>
              <span className="text-xs bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded-md font-mono border border-amber-400/20">Aktif Seri</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Her gün en az 1 kelime tekrar et seriyi koru!</p>
          </div>
        </div>

        {/* Total Mastered / Stats */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <span className="text-xs text-slate-400 font-mono uppercase block">Tam Öğrenilen</span>
            <span className="text-xl font-black text-emerald-400">{stats.totalMastered} Kelime</span>
          </div>
          <div className="text-right border-l border-slate-800 pl-6">
            <span className="text-xs text-slate-400 font-mono uppercase block">Toplam Tekrar</span>
            <span className="text-xl font-black text-blue-400">{stats.totalReviewed}</span>
          </div>
        </div>
      </div>

      {/* Daily Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-300 font-bold flex items-center gap-1.5">
            🎯 GÜNLÜK HEDEF: <span className="text-blue-400">{stats.todayCount} / {stats.dailyGoal} Kelime</span>
          </span>
          <span className="text-blue-400 font-bold">{goalPercent}% Tamamlandı</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${goalPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
