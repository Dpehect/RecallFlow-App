'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { RECALLFLOW_ENTERPRISE_DATA, READING_CATEGORIES, LANGUAGES, ReadingStory, ReadingSentence } from '@/lib/data';
import { sounds } from '@/lib/sound';
import { BookOpenText, Folder, Filter, Volume2, Eye, EyeOff } from 'lucide-react';

export default function ReadingPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  const rawStories: ReadingStory[] = RECALLFLOW_ENTERPRISE_DATA.readingStories || [];

  const stories: ReadingStory[] = rawStories.filter((s: ReadingStory) => {
    const langMatch = s.language === selectedLang;
    const catMatch = selectedCategory === 'ALL' || s.category === selectedCategory;
    const levelMatch = selectedLevel === 'ALL' || s.level === selectedLevel;
    return langMatch && catMatch && levelMatch;
  });

  const toggleTranslation = (lineId: string) => {
    setShowTranslations(prev => ({ ...prev, [lineId]: !prev[lineId] }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <BookOpenText className="w-4 h-4" /> BÖLÜM 3 — KATEGORİLİ READING (OKUMA)
            </span>
            <h1 className="text-3xl font-black text-white mt-1">Reading & Diyalog Metinleri</h1>
            <p className="text-sm text-slate-400 mt-1">Konulara ayrılmış metinleri ve günlük konuşmaları okuyup dinamik çeviri kontrolü sağlayın.</p>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 border ${
                  selectedLang === lang.id
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* READING CATEGORIES */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 uppercase font-bold">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Folder className="w-4 h-4" /> METİN KATEGORİSİ
            </span>
            <span className="text-slate-500">Konusal Okuma Paketleri</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`p-3.5 rounded-2xl border text-left transition space-y-1 ${
                selectedCategory === 'ALL'
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-lg">✨</div>
              <div className="text-xs font-bold">Tüm Metinler</div>
              <div className="text-[10px] opacity-75 font-mono">Tüm Kurgular</div>
            </button>

            {READING_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border text-left transition space-y-1 ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-lg">{cat.icon}</div>
                  <div className="text-xs font-bold truncate">{cat.name}</div>
                  <div className="text-[10px] font-mono text-slate-500 truncate">{cat.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* LEVEL FILTER */}
        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-emerald-400" /> SEVİYE:
            </span>
            <div className="flex gap-1.5">
              {['ALL', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
                    selectedLevel === lvl
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STORIES LIST */}
        <div className="space-y-8">
          {stories.length === 0 ? (
            <div className="text-center py-16 bg-slate-900 rounded-3xl border border-slate-800 text-slate-400 font-mono text-sm">
              Seçilen kategori veya seviye için okuma metni hazırlanıyor.
            </div>
          ) : (
            stories.map((story: ReadingStory) => (
              <div key={story.id} className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60 font-mono">
                      {story.level} SEVİYESİ
                    </span>
                    <h2 className="text-2xl font-black text-white mt-2">{story.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">{story.summary}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {story.sentences.map((line: ReadingSentence, idx: number) => {
                    const lineKey = `${story.id}-${idx}`;
                    const isTranslationVisible = showTranslations[lineKey];

                    return (
                      <div key={idx} className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition hover:border-emerald-500/40">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold text-emerald-400">{line.speaker}:</span>
                            <span className="font-bold text-slate-100 text-base">{line.targetText}</span>
                          </div>

                          {isTranslationVisible && (
                            <p className="text-xs font-semibold text-slate-400 pl-4 border-l-2 border-emerald-500 font-mono mt-1">
                              → {line.translation}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleTranslation(lineKey)}
                            className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-slate-700 transition flex items-center gap-1"
                          >
                            {isTranslationVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isTranslationVisible ? 'Gizle' : 'Çeviri'}</span>
                          </button>

                          <button
                            onClick={() => sounds.speak(line.audioText, story.langCode)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition shadow-sm flex items-center gap-1"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Dinle
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

      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW CATEGORIZED READING MODULE
      </footer>
    </div>
  );
}
