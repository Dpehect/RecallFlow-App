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
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F1EA] text-[#141413]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Editorial Header */}
        <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono font-bold bg-[#EAB308] text-black px-3 py-1 border border-black inline-block uppercase">
              EDITORIAL DİL BİLGİSİ
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black text-black mt-2 tracking-tight italic">
              Dil Bilgisi & Kurallar
            </h1>
            <p className="text-xs font-mono text-slate-800 mt-1 font-bold">
              Konularına göre ayrılmış gramer kılavuzları.
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

        {/* GRAMMAR CATEGORY SELECTOR */}
        <div className="space-y-3 font-mono">
          <div className="flex justify-between items-center text-xs font-bold uppercase">
            <span className="flex items-center gap-1.5 text-black">
              <Folder className="w-4 h-4 text-[#65A30D]" /> GRAMER KATEGORİSİ
            </span>
            <span className="text-slate-600">Müfredat</span>
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
              <div className="text-xs font-black">Tüm Konular</div>
            </button>

            {GRAMMAR_CATEGORIES.map(cat => {
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

        {/* LESSONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.length === 0 ? (
            <div className="col-span-full py-16 text-center text-black font-mono font-bold text-sm bg-[#FAF8F5] border-2 border-black shadow-brutal">
              Seçilen kategori veya seviye için gramer rehberi güncelleniyor.
            </div>
          ) : (
            guides.map((guide: GrammarLesson) => (
              <div key={guide.id} className="bg-[#FAF8F5] p-6 border-2 border-black shadow-brutal space-y-5">
                <div className="flex justify-between items-center border-b-2 border-black pb-3">
                  <span className="text-xs font-black bg-[#EAB308] text-black px-3 py-1 border border-black uppercase font-mono">
                    {guide.level} SEVİYESİ
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-700">{currentLangObj.flag} {currentLangObj.name}</span>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl font-black text-black italic">{guide.title}</h3>
                  <p className="text-xs font-bold font-mono text-slate-800 leading-relaxed bg-white p-4 border-2 border-black mt-3">
                    {guide.rule}
                  </p>
                </div>

                <div className="space-y-3 font-mono">
                  <span className="text-xs font-bold text-slate-700 uppercase block">Örnek Kullanımlar:</span>
                  {guide.examples.map((ex: { target: string; translation: string }, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-white p-3.5 border-2 border-black text-sm shadow-brutal-sm">
                      <div>
                        <div className="font-black text-black">{ex.target}</div>
                        <div className="text-xs text-slate-600 font-bold">{ex.translation}</div>
                      </div>
                      <button 
                        onClick={() => sounds.speak(ex.target, currentLangObj.code)} 
                        className="bg-[#65A30D] text-white border-2 border-black font-black px-3 py-1.5 text-xs shadow-brutal-sm hover-brutal flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> DİNLE
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-[#FAF8F5] border-t-2 border-black py-6 text-center text-xs font-mono font-bold text-slate-800">
        RECALLFLOW EDITORIAL GRAMMAR SYSTEM
      </footer>
    </div>
  );
}
