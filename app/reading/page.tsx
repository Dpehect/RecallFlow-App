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
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F1EA] text-[#141413]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Editorial Header */}
        <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono font-bold bg-[#EAB308] text-black px-3 py-1 border border-black inline-block uppercase">
              EDITORIAL READING
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black text-black mt-2 tracking-tight italic">
              Okuma & Gazete Metinleri
            </h1>
            <p className="text-xs font-mono text-slate-800 mt-1 font-bold">
              Konularına göre ayrılmış gazete tarzı okuma metinleri.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 bg-[#FAF8F5] p-2 border-2 border-black shadow-brutal-sm font-mono">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-3 py-1.5 font-black text-xs uppercase transition border-2 border-black ${
                  selectedLang === lang.id
                    ? 'bg-[#EAB308] text-black shadow-brutal-sm'
                    : 'bg-white text-black hover:bg-[#F2EFE9]'
                }`}
              >
                <span>{lang.flag}</span> <span className="ml-1">{lang.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* READING CATEGORIES */}
        <div className="space-y-3 font-mono">
          <div className="flex justify-between items-center text-xs font-bold uppercase">
            <span className="flex items-center gap-1.5 text-black">
              <Folder className="w-4 h-4 text-[#65A30D]" /> METİN KATEGORİSİ
            </span>
            <span className="text-slate-600">Okuma Paketleri</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`p-3.5 border-2 border-black text-left transition space-y-1 ${
                selectedCategory === 'ALL'
                  ? 'bg-[#EAB308] text-black shadow-brutal font-black'
                  : 'bg-[#FAF8F5] text-black hover:bg-white shadow-brutal-sm'
              }`}
            >
              <div className="text-lg">✨</div>
              <div className="text-xs font-black">Tüm Metinler</div>
            </button>

            {READING_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3.5 border-2 border-black text-left transition space-y-1 ${
                    isSelected
                      ? 'bg-[#EAB308] text-black shadow-brutal font-black'
                      : 'bg-[#FAF8F5] text-black hover:bg-white shadow-brutal-sm'
                  }`}
                >
                  <div className="text-lg">{cat.icon}</div>
                  <div className="text-xs font-black truncate">{cat.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* LEVEL FILTER */}
        <div className="flex items-center justify-between bg-[#FAF8F5] p-4 border-2 border-black shadow-brutal font-mono">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold uppercase flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#65A30D]" /> SEVİYE:
            </span>
            <div className="flex gap-1.5">
              {['ALL', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1 font-black text-xs border-2 border-black transition ${
                    selectedLevel === lvl
                      ? 'bg-[#65A30D] text-white shadow-brutal-sm'
                      : 'bg-white text-black hover:bg-[#F2EFE9]'
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
            <div className="text-center py-16 bg-[#FAF8F5] border-2 border-black shadow-brutal text-black font-mono font-bold text-sm">
              Seçilen kategori veya seviye için okuma metni hazırlanıyor.
            </div>
          ) : (
            stories.map((story: ReadingStory) => (
              <div key={story.id} className="bg-[#FAF8F5] border-2 border-black p-6 sm:p-8 shadow-brutal space-y-6">
                <div className="border-b-2 border-black pb-4">
                  <span className="text-xs font-black text-black bg-[#EAB308] px-3 py-1 border border-black font-mono uppercase">
                    {story.level} SEVİYESİ
                  </span>
                  <h2 className="font-editorial text-3xl font-black text-black mt-2 italic">{story.title}</h2>
                  <p className="text-xs font-mono font-bold text-slate-700 mt-1">{story.summary}</p>
                </div>

                <div className="space-y-4 font-mono">
                  {story.sentences.map((line: ReadingSentence, idx: number) => {
                    const lineKey = `${story.id}-${idx}`;
                    const isTranslationVisible = showTranslations[lineKey];

                    return (
                      <div key={idx} className="bg-white p-4 border-2 border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-brutal-sm">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-black text-[#65A30D]">{line.speaker}:</span>
                            <span className="font-bold text-black text-base">{line.targetText}</span>
                          </div>

                          {isTranslationVisible && (
                            <p className="text-xs font-bold text-slate-700 pl-3 border-l-2 border-black mt-1">
                              → {line.translation}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleTranslation(lineKey)}
                            className="bg-white border-2 border-black text-black text-xs font-black px-3 py-1.5 shadow-brutal-sm hover-brutal flex items-center gap-1"
                          >
                            {isTranslationVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isTranslationVisible ? 'GİZLE' : 'ÇEVİRİ'}</span>
                          </button>

                          <button
                            onClick={() => sounds.speak(line.audioText, story.langCode)}
                            className="bg-[#65A30D] text-white border-2 border-black text-xs font-black px-3.5 py-1.5 shadow-brutal-sm hover-brutal flex items-center gap-1"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> DİNLE
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

      <footer className="bg-[#FAF8F5] border-t-2 border-black py-6 text-center text-xs font-mono font-bold text-slate-800">
        RECALLFLOW EDITORIAL READING SYSTEM
      </footer>
    </div>
  );
}
