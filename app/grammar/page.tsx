'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RECALLFLOW_ENTERPRISE_DATA, LANGUAGES } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function GrammarPage() {
  const [selectedLang, setSelectedLang] = useState('german');

  const guides = RECALLFLOW_ENTERPRISE_DATA.grammarGuides.filter(g => g.language === selectedLang);
  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

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
            <Link href="/vocab" className="hover:text-blue-600">Vocab Vault</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 flex-1 w-full">
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">STRUCTURE & PATTERNS</span>
            <h1 className="text-3xl font-black text-slate-900 mt-1">Grammar & Syntax Guide</h1>
          </div>

          <div className="flex space-x-2 bg-white p-1 rounded-2xl border border-slate-200">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${selectedLang === lang.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <span>{lang.flag}</span>
                <span className="hidden sm:inline">{lang.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 font-mono text-sm bg-white rounded-3xl border border-slate-200">
              Grammar guide modules for {currentLangObj.name} loading soon...
            </div>
          ) : (
            guides.map(guide => (
              <div key={guide.id} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">{guide.level}</span>
                  <span className="text-xs font-mono text-slate-400">{currentLangObj.flag} {currentLangObj.name}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{guide.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{guide.rule}</p>

                <div className="space-y-3">
                  <span className="text-xs font-bold font-mono text-slate-400 uppercase">Interactive Pattern Examples:</span>
                  {guide.examples.map((ex, i) => (
                    <div key={i} className="flex justify-between items-center bg-blue-50/50 p-3.5 rounded-xl border border-blue-100 text-sm">
                      <div>
                        <div className="font-bold text-slate-900">{ex.target}</div>
                        <div className="text-xs text-slate-500">{ex.translation}</div>
                      </div>
                      <button onClick={() => sounds.speak(ex.target, currentLangObj.code)} className="bg-white border border-blue-200 text-blue-700 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-blue-600 hover:text-white transition">
                        🔊 Listen
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW GRAMMAR ENGINE · ENTERPRISE EDITION
      </footer>
    </div>
  );
}
