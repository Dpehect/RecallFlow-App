import React from 'react';

export default function ProgressBar({ current, total }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto my-3 px-2">
      <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mb-1.5">
        <span>İlerleme Oranı</span>
        <span className="text-cyan-400 font-bold">{current} / {total} ({percentage}%)</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_#00F2FE]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
