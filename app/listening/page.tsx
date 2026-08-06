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
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Headphones className="w-4 h-4" /> BÖLÜM 4 — KATEGORİLİ LISTENING (DİNLEME)
            </span>
            <h1 className="text-3xl font-black text-white mt-1">Listening & İşitsel Alıştırma</h1>
            <p className="text-sm text-slate-400 mt-1">Ses kayıtlarını dinleyin ve kategorize edilmiş testlerde doğru seçeneği bulun.</p>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 border ${
                  selectedLang === lang.id
                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* LISTENING CATEGORIES */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 uppercase font-bold">
            <span className="flex items-center gap-1.5 text-purple-400">
              <Folder className="w-4 h-4" /> DİNLEME KATEGORİSİ
            </span>
            <span className="text-slate-500">İşitsel Test Paketleri</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`p-3.5 rounded-2xl border text-left transition space-y-1 ${
                selectedCategory === 'ALL'
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-lg">✨</div>
              <div className="text-xs font-bold">Tüm Testler</div>
              <div className="text-[10px] opacity-75 font-mono">Tüm Modüller</div>
            </button>

            {LISTENING_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border text-left transition space-y-1 ${
                    isSelected
                      ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20'
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
              <Filter className="w-3.5 h-3.5 text-purple-400" /> SEVİYE:
            </span>
            <div className="flex gap-1.5">
              {['ALL', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
                    selectedLevel === lvl
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LISTENING ITEMS */}
        <div className="space-y-8">
          {items.length === 0 ? (
            <div className="text-center py-16 bg-slate-900 rounded-3xl border border-slate-800 text-slate-400 font-mono text-sm">
              Seçilen kategori veya seviye için dinleme testi hazırlanıyor.
            </div>
          ) : (
            items.map((item: ListeningItem) => (
              <div key={item.id} className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/60 font-mono">
                    {item.level} SEVİYESİ
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{currentLangObj.flag} {currentLangObj.name}</span>
                </div>

                <div className="text-center space-y-4 py-4">
                  <h3 className="text-xl font-extrabold text-white">{item.title}</h3>
                  
                  <button
                    onClick={() => sounds.speak(item.targetText, item.langCode)}
                    className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase shadow-lg shadow-purple-500/20 transition hover:scale-105"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>SESİ DİNLENİN</span>
                  </button>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 font-mono uppercase block">Duyduğunuz Doğru Cümleyi Seçin:</span>
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
                        className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition flex items-center justify-between ${
                          isSelected 
                            ? (isCorrect ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' : 'bg-rose-950/80 border-rose-500 text-rose-300') 
                            : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-purple-500/50'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <span>{isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}</span>
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

      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW CATEGORIZED LISTENING MODULE
      </footer>
    </div>
  );
}
