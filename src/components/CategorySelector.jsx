import React from 'react';

const CATEGORIES = [
  { id: 'Tümü', label: 'Tümü', emoji: '🌟', color: 'from-blue-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { id: 'Seyahat & Otel', label: 'Seyahat & Otel', emoji: '✈️', color: 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30' },
  { id: 'Günlük Yaşam', label: 'Günlük Yaşam', emoji: '☕', color: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30' },
  { id: 'İş & Kariyer', label: 'İş & Kariyer', emoji: '💼', color: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30' },
  { id: 'Yiyecek & İçecek', label: 'Yiyecek & İçecek', emoji: '🍕', color: 'from-red-500/20 to-rose-500/20 text-rose-300 border-rose-500/30' },
  { id: 'Teknoloji', label: 'Teknoloji', emoji: '💻', color: 'from-indigo-500/20 to-violet-500/20 text-indigo-300 border-indigo-500/30' },
  { id: 'Sağlık & Sosyal', label: 'Sağlık & Sosyal', emoji: '🩺', color: 'from-teal-500/20 to-cyan-500/20 text-teal-300 border-teal-500/30' },
];

export default function CategorySelector({ selectedCategory, onSelectCategory }) {
  return (
    <section className="w-full max-w-4xl mx-auto my-6 p-4 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between mb-3 px-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🎯 Kategori Seçimi</span>
        </h3>
        <span className="text-[11px] text-cyan-400 font-semibold">Aktif: {selectedCategory}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer ${
                isSelected
                  ? `bg-gradient-to-b ${cat.color} border scale-105 shadow-[0_0_20px_rgba(0,242,254,0.25)] ring-1 ring-cyan-400/50`
                  : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">{cat.emoji}</span>
              <span className="text-xs font-bold truncate w-full">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
