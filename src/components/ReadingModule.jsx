import React, { useState } from 'react';
import { BookOpen, Translation, Eye, Sparkles } from 'lucide-react';

export default function ReadingModule({ readings, category, language }) {
  const [showTranslationMap, setShowTranslationMap] = useState({});

  if (!readings || readings.length === 0) return null;

  const toggleTranslation = (id) => {
    setShowTranslationMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full max-w-3xl mx-auto my-4 space-y-4 px-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-2">
        <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Sınav & Akademik Okuma Modülü ({category})</span>
        </span>
        <span>Toplam <strong>{readings.length}</strong> Okuma Parçası</span>
      </div>

      {readings.map((item, index) => {
        const isTranslationVisible = showTranslationMap[item.id];
        return (
          <article
            key={item.id || index}
            className="p-6 rounded-3xl glass-card border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl space-y-4 bg-slate-900/80"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-extrabold">
                  #{index + 1} • {item.category}
                </span>
                <h3 className="text-base font-bold text-white mt-2">{item.title}</h3>
              </div>

              <button
                onClick={() => toggleTranslation(item.id)}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isTranslationVisible ? 'Gizle' : 'Türkçe Çeviriyi Gör'}</span>
              </button>
            </div>

            {/* Target Reading Passage */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 font-serif text-sm leading-relaxed text-slate-200">
              {item.passage}
            </div>

            {/* Turkish Translation Dropdown */}
            {isTranslationVisible && (
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs leading-relaxed text-cyan-200 animate-in fade-in duration-300">
                <strong className="block font-sans text-cyan-400 mb-1">🇹🇷 Türkçe Anlamı:</strong>
                {item.translation}
              </div>
            )}

            {/* Key Keywords */}
            {item.keywords && item.keywords.length > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[11px]">
                <span className="text-slate-400 font-bold">Önemli Terimler:</span>
                {item.keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-white/5 text-cyan-300 border border-white/10 font-mono">
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
