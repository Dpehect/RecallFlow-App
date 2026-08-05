'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { RECALLFLOW_ENTERPRISE_DATA, LANGUAGES, ListeningItem } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function ListeningPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [selectedOption, setSelectedOption] = useState<Record<string, string>>({});

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  const items: ListeningItem[] = (RECALLFLOW_ENTERPRISE_DATA.listeningItems || []).filter((l: ListeningItem) => l.language === selectedLang);

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8 flex-1 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">BÖLÜM 4</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Listening (Dinleme)</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Ses kayıtlarını dinleyin ve duyduğunuz doğru cümleyi seçin.</p>
          </div>

          <div className="flex flex-wrap gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
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

        <div className="space-y-8">
          {items.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-sm">
              Bu dil için dinleme alıştırması ekleniyor.
            </div>
          ) : (
            items.map((item: ListeningItem) => (
              <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800 font-mono">
                    {item.level} SEVİYESİ
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{currentLangObj.flag} {currentLangObj.name}</span>
                </div>

                <div className="text-center space-y-4 py-4">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
                  
                  <button
                    onClick={() => sounds.speak(item.targetText, item.langCode)}
                    className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase shadow-lg shadow-blue-500/20 transition hover:scale-105"
                  >
                    <span className="text-lg">🔊</span>
                    <span>Sesi Dinle</span>
                  </button>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 font-mono uppercase">Duyduğunuz Cümleyi Seçin:</span>
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
                        className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition ${isSelected ? (isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-rose-50 border-rose-500 text-rose-900') : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:border-blue-500'}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW LISTENING (DİNLEME) MODÜLÜ
      </footer>
    </div>
  );
}
