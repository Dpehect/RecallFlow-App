import React from 'react';

const LEVELS = [
  { code: 'A1', label: 'Başlangıç', desc: 'Core 600+' },
  { code: 'A2', label: 'Temel', desc: 'Daily 600+' },
  { code: 'B1', label: 'Orta', desc: 'Fluency 600+' },
  { code: 'B2', label: 'İleri', desc: 'Mastery 600+' },
];

export default function LevelSelector({ selectedLevel, onSelectLevel }) {
  return (
    <div className="flex items-center justify-center gap-2.5 my-3">
      {LEVELS.map((level) => {
        const isSelected = selectedLevel === level.code;
        return (
          <button
            key={level.code}
            onClick={() => onSelectLevel(level.code)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex flex-col items-center ${
              isSelected
                ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.15)] scale-105'
                : 'bg-white/5 border border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
            }`}
          >
            <span className="text-sm font-extrabold">{level.code}</span>
            <span className="text-[9px] opacity-70 font-normal">{level.label}</span>
          </button>
        );
      })}
    </div>
  );
}
