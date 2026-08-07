'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { RECALLFLOW_ENTERPRISE_DATA, LISTENING_CATEGORIES, LANGUAGES, ListeningItem } from '@/lib/data';
import { sounds } from '@/lib/sound';
import { Headphones, Folder, Filter, Volume2, CheckCircle, XCircle } from 'lucide-react';

export default function ListeningPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [selectedOption, setSelectedOption] = useState<Record<string, string>>({});

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  const rawItems: ListeningItem[] = RECALLFLOW_ENTERPRISE_DATA.listeningItems || [];

  const items: ListeningItem[] = rawItems.filter((l: ListeningItem) => {
    const langMatch = l.language === selectedLang;
    const catMatch = selectedCategory === 'ALL' || l.category === selectedCategory;
    const levelMatch = selectedLevel === 'ALL' || l.level === selectedLevel;
    return langMatch && catMatch && levelMatch;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F1EA] text-[#141413]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Editorial Header */}
        <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono font-bold bg-[#EAB308] text-black px-3 py-1 border border-black inline-block uppercase">
              EDITORIAL LISTENING
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black text-black mt-2 tracking-tight italic">
              Dinleme & İşitsel Testler
            </h1>
            <p className="text-xs font-mono text-slate-800 mt-1 font-bold">
              Kategorilere ayrılmış dinleme sınavları ve ses kayıtları.
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

        {/* LISTENING CATEGORIES */}
        <div className="space-y-3 font-mono">
          <div className="flex justify-between items-center text-xs font-bold uppercase">
            <span className="flex items-center gap-1.5 text-black">
              <Folder className="w-4 h-4 text-[#65A30D]" /> DİNLEME KATEGORİSİ
            </span>
            <span className="text-slate-600">İşitsel Test Paketleri</span>
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
              <div className="text-xs font-black">Tüm Testler</div>
            </button>

            {LISTENING_CATEGORIES.map(cat => {
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

        {/* LISTENING ITEMS */}
        <div className="space-y-8 font-mono">
          {items.length === 0 ? (
            <div className="text-center py-16 bg-[#FAF8F5] border-2 border-black shadow-brutal text-black font-bold text-sm">
              Seçilen kategori veya seviye için dinleme testi hazırlanıyor.
            </div>
          ) : (
            items.map((item: ListeningItem) => (
              <div key={item.id} className="bg-[#FAF8F5] border-2 border-black p-8 shadow-brutal space-y-6">
                <div className="flex justify-between items-center border-b-2 border-black pb-4">
                  <span className="text-xs font-black bg-[#EAB308] text-black px-3 py-1 border border-black uppercase">
                    {item.level} SEVİYESİ
                  </span>
                  <span className="text-xs font-bold text-slate-700">{currentLangObj.flag} {currentLangObj.name}</span>
                </div>

                <div className="text-center space-y-4 py-4">
                  <h3 className="font-editorial text-3xl font-black text-black italic">{item.title}</h3>
                  
                  <button
                    onClick={() => sounds.speak(item.targetText, item.langCode)}
                    className="inline-flex items-center space-x-3 bg-[#65A30D] text-white border-2 border-black font-black px-6 py-3.5 text-xs uppercase shadow-brutal hover-brutal"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>SESİ DİNLENİN</span>
                  </button>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 uppercase block">Duyduğunuz Doğru Cümleyi Seçin:</span>
                  {item.options.map((opt: string, idx: number) => {
                    const isSelected = selectedOption[item.id] === opt;
                    const isCorrect = opt === item.targetText;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedOption(prev => ({ ...prev, [item.id]: opt }));
                          if (isCorrect) sounds.playCorrect(); else sounds.playWrong();
                        }}
                        className={`w-full text-left p-4 border-2 border-black text-sm font-black transition flex items-center justify-between ${
                          isSelected 
                            ? (isCorrect ? 'bg-[#4ADE80] text-black shadow-brutal-sm' : 'bg-[#F87171] text-black shadow-brutal-sm') 
                            : 'bg-white text-black hover:bg-[#F2EFE9] shadow-brutal-sm'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <span>{isCorrect ? <CheckCircle className="w-5 h-5 text-black" /> : <XCircle className="w-5 h-5 text-black" />}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-[#FAF8F5] border-t-2 border-black py-6 text-center text-xs font-mono font-bold text-slate-800">
        RECALLFLOW EDITORIAL LISTENING SYSTEM
      </footer>
    </div>
  );
}
