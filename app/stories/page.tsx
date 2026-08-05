'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { RECALLFLOW_ENTERPRISE_DATA, LANGUAGES, CATEGORIES, Story } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function StoriesPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  const stories: Story[] = (RECALLFLOW_ENTERPRISE_DATA.stories || []).filter(s => {
    const matchLang = s.language === selectedLang;
    const matchCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    return matchLang && matchCat;
  });

  const toggleTranslation = (lineId: string) => {
    setShowTranslations(prev => ({ ...prev, [lineId]: !prev[lineId] }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 flex-1 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">OKUMA VE DİNLEME ODASI</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Diyaloglar ve Hikayeler</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Kelimeleri gerçek konuşma bağlamı ve hikayeler içinde öğrenin.</p>
          </div>

          {/* Language Selector */}
          <div className="flex flex-wrap gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${selectedLang === lang.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase mr-2">Kategori:</span>
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${selectedCategory === 'ALL' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}
          >
            Tüm Konular
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Stories List */}
        <div className="space-y-8">
          {stories.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-sm">
              Bu kategoride {currentLangObj.name} için henüz hikaye eklenmedi. "Kafe & Seyahat" kategorisini inceleyebilirsiniz!
            </div>
          ) : (
            stories.map(story => (
              <div key={story.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800 font-mono">
                      {story.type === 'dialogue' ? '💬 Karşılıklı Diyalog' : '📖 Kısa Hikaye'} · {story.level}
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{story.title}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{story.summary}</p>
                  </div>
                </div>

                {/* Story / Dialogue Sentences */}
                <div className="space-y-4">
                  {story.lines.map((line, idx) => {
                    const lineKey = `${story.id}-${idx}`;
                    const isTranslationVisible = showTranslations[lineKey];

                    return (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition hover:border-blue-300">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{line.speaker}:</span>
                            <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">{line.targetText}</span>
                          </div>

                          {isTranslationVisible && (
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 pl-4 border-l-2 border-blue-500 animate-fadeIn">
                              {line.translation}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleTranslation(lineKey)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-slate-100 transition"
                          >
                            {isTranslationVisible ? 'Türkçe Gizle' : 'Türkçe Göster'}
                          </button>

                          <button
                            onClick={() => sounds.speak(line.audioText, story.langCode)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition shadow-sm"
                          >
                            🔊 Dinle
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW İNTERAKTİF HİKAYE VE DİYALOG MODÜLÜ
      </footer>
    </div>
  );
}
