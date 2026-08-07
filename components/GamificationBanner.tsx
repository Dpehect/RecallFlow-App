'use client';

import React from 'react';
import { UserStats } from '@/lib/storage';

export default function GamificationBanner({ stats }: { stats: UserStats }) {
  const goalPercent = Math.min(100, Math.round((stats.todayCount / stats.dailyGoal) * 100));

  return (
    <div className="bg-[#FAF8F5] border-2 border-black p-6 shadow-[4px_4px_0px_0px_#121212] text-black space-y-4 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4">
        {/* Streak Badge */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-[#EA580C] text-white border-2 border-black flex items-center justify-center text-2xl font-black shadow-[2px_2px_0px_0px_#121212]">
            🔥
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-editorial text-3xl font-black text-black">{stats.streak} GÜN</span>
              <span className="bg-[#121212] text-white text-[10px] font-bold px-2 py-0.5 border border-black uppercase tracking-wider">
                AKTİF SERİ
              </span>
            </div>
            <p className="text-xs text-slate-700 font-bold mt-0.5">
              Her gün en az 1 kelime tekrar et seriyi koru!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-600 block uppercase">Tam Öğrenilen</span>
            <span className="font-editorial text-2xl font-black text-[#65A30D]">{stats.totalMastered} KELİME</span>
          </div>
          <div className="text-right border-l-2 border-black pl-6">
            <span className="text-[10px] font-bold text-slate-600 block uppercase">Toplam Tekrar</span>
            <span className="font-editorial text-2xl font-black text-black">{stats.totalReviewed}</span>
          </div>
        </div>
      </div>

      {/* Goal Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-bold uppercase">
          <span>🎯 GÜNLÜK HEDEF: <span className="text-[#EA580C] font-black">{stats.todayCount} / {stats.dailyGoal} KELİME</span></span>
          <span className="font-black">{goalPercent}%</span>
        </div>
        <div className="w-full h-4 bg-white border-2 border-black p-0.5">
          <div
            className="h-full bg-[#EA580C] border border-black transition-all duration-300"
            style={{ width: `${goalPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
