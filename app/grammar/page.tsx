'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { RECALLFLOW_ENTERPRISE_DATA, GRAMMAR_CATEGORIES, LANGUAGES, GrammarLesson } from '@/lib/data';
import { sounds } from '@/lib/sound';
import { BookOpen, Folder, Filter, Volume2, Sparkles } from 'lucide-react';

export default function GrammarPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  const rawGuides: GrammarLesson[] = RECALLFLOW_ENTERPRISE_DATA.grammarGuides || [];
  
  const guides: GrammarLesson[] = rawGuides.filter((g: GrammarLesson) => {
    const langMatch = g.language === selectedLang;
    const catMatch = selectedCategory === 'ALL' || g.category === selectedCategory;
    const levelMatch = selectedLevel === 'ALL' || g.level === selectedLevel;
    return langMatch && catMatch && levelMatch;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> BÖLÜM 2 — KATEGORİLİ DİL BİLGİSİ
            </span>
            <h1 className="text-3xl font-black text-white mt-1">Dil Bilgisi & Cümle Kuralları</h1>
            <p className="text-sm text-slate-400 mt-1">Gramer kurallarını kategorilere ayrılmış pratik rehberlerle hızlıca öğrenin.</p>
          </div>

          {/* Language Selector */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 border ${
                  selectedLang === lang.id
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* GRAMMAR CATEGORY SELECTOR BAR */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 uppercase font-bold">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <Folder className="w-4 h-4" /> GRAMER KATEGORİSİ
            </span>
            <span className="text-slate-500">Konulara Göre Ayrılmış Müfredat</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`p-3.5 rounded-2xl border text-left transition space-y-1 ${
                selectedCategory === 'ALL'
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-lg">✨</div>
              <div className="text-xs font-bold">Tüm Konular</div>
              <div className="text-[10px] opacity-75 font-mono">Tüm Rehberler</div>
            </button>

            {GRAMMAR_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border text-left transition space-y-1 ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
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
              <Filter className="w-3.5 h-3.5 text-indigo-400" /> SEVİYE:
            </span>
            <div className="flex gap-1.5">
              {['ALL', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
                    selectedLevel === lvl
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-mono text-indigo-400 font-bold bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-800/60 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> CEFR UYUMLU GRAMER REHBERİ
          </div>
        </div>

        {/* LESSONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 font-mono text-sm bg-slate-900 rounded-3xl border border-slate-800">
              Seçilen kategori veya seviye için gramer rehberi güncelleniyor.
            </div>
          ) : (
            guides.map((guide: GrammarLesson) => (
              <div key={guide.id} className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono bg-indigo-950 text-indigo-400 px-3 py-1 rounded-full border border-indigo-800">
                    {guide.level} SEVİYESİ
                  </span>
                  <span className="text-xs font-mono text-slate-400">{currentLangObj.flag} {currentLangObj.name}</span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{guide.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 mt-3">
                    {guide.rule}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold font-mono text-slate-400 uppercase block">Örnek Kullanımlar:</span>
                  {guide.examples.map((ex: { target: string; translation: string }, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 text-sm">
                      <div>
                        <div className="font-bold text-slate-100">{ex.target}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{ex.translation}</div>
                      </div>
                      <button 
                        onClick={() => sounds.speak(ex.target, currentLangObj.code)} 
                        className="bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 hover:bg-indigo-600 hover:text-white font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Dinle
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW CATEGORIZED GRAMMAR MODULE
      </footer>
    </div>
  );
}
