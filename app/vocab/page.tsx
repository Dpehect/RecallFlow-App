'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RECALLFLOW_ENTERPRISE_DATA, LANGUAGES } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function VocabPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [query, setQuery] = useState('');

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  const filtered = RECALLFLOW_ENTERPRISE_DATA.vocabPacks.filter(v =>
    v.language === selectedLang &&
    (v.word.toLowerCase().includes(query.toLowerCase()) ||
     v.translation.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tight text-slate-900 flex items-center space-x-2">
            <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
            <span>RECALLFLOW</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600">Dashboard</Link>
            <Link href="/grammar" className="hover:text-blue-600">Grammar Hub</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 flex-1 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">ENTERPRISE VOCAB VAULT</span>
            <h1 className="text-3xl font-black text-slate-900 mt-1">Multi-Language Word Database</h1>
          </div>

          <div className="flex flex-wrap gap-2 bg-white p-1 rounded-2xl border border-slate-200">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${selectedLang === lang.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder={`Search ${currentLangObj.name} vocabulary or translations...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 font-mono text-sm">
              No vocabulary items matching search query in {currentLangObj.name}.
            </div>
          ) : (
            filtered.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-100">{item.level}</span>
                  <span className="text-slate-400">{item.type}</span>
                </div>
                <div className="text-2xl font-black text-slate-900">{item.word}</div>
                <div className="text-sm text-slate-600 font-medium">{item.translation}</div>
                <div className="text-xs text-slate-400 bg-slate-50 p-2 rounded-lg italic border border-slate-100">"{item.example}"</div>
                <button
                  onClick={() => sounds.speak(item.word, currentLangObj.code)}
                  className="w-full mt-2 inline-flex justify-center items-center space-x-1.5 bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  <span>🔊 Native Pronunciation</span>
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW VOCABULARY ENGINE · MULTI-LANGUAGE DATABASE
      </footer>
    </div>
  );
}
