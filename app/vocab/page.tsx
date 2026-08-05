'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { RECALLFLOW_ENTERPRISE_DATA, LANGUAGES, CATEGORIES, VocabItem } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function VocabPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [query, setQuery] = useState('');

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  const filtered: VocabItem[] = (RECALLFLOW_ENTERPRISE_DATA.vocabPacks || []).filter((v: VocabItem) => {
    const matchLang = v.language === selectedLang;
    const matchCat = selectedCategory === 'ALL' || v.category === selectedCategory;
    const matchQuery = v.word.toLowerCase().includes(query.toLowerCase()) || v.translation.toLowerCase().includes(query.toLowerCase());
    return matchLang && matchCat && matchQuery;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">KATEGORİLERE AYRILMIŞ SÖZLÜK</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Kelime ve Örnek Cümle Haznesi</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Her kelimeyi anlamı ve cümle içi kullanımıyla öğrenin.</p>
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

        {/* Category & Search Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${selectedCategory === 'ALL' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}
            >
              Tüm Kategoriler
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

          <input
            type="text"
            placeholder={`${currentLangObj.name.split(' ')[0]} kelime veya anlam ara...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Vocab Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 font-mono text-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Arama kriterlerine uygun kelime bulunamadı.
            </div>
          ) : (
            filtered.map((item: VocabItem) => (
              <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded font-bold border border-blue-100 dark:border-blue-800">{item.level}</span>
                  <span className="text-slate-400 font-bold">{item.type}</span>
                </div>

                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{item.word}</div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">{item.translation}</div>
                </div>

                {/* Example sentence with translation */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-slate-100">"{item.exampleTarget}"</div>
                  <div className="text-slate-500 dark:text-slate-400 italic">{item.exampleTranslation}</div>
                </div>

                <button
                  onClick={() => sounds.speak(item.word, currentLangObj.code)}
                  className="w-full inline-flex justify-center items-center space-x-2 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-800 dark:text-slate-200 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  <span>🔊 Telaffuzu Dinle</span>
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW ÖRNEK CÜMLELİ KELİME SÖZLÜĞÜ
      </footer>
    </div>
  );
}
