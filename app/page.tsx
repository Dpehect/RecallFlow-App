'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RECALLFLOW_ENTERPRISE_DATA, LANGUAGES } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function Home() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  const filteredModules = RECALLFLOW_ENTERPRISE_DATA.modules.filter(m => {
    const matchLang = m.language === selectedLang;
    const matchLevel = selectedLevel === 'ALL' || m.level === selectedLevel;
    return matchLang && matchLevel;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="font-black text-xl tracking-tight text-slate-900 flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
              <span>RECALLFLOW</span>
            </Link>
            <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-semibold">[ ENTERPRISE 2026 ]</span>
          </div>

          <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <a href="#modules" className="hover:text-blue-600 transition">Curriculum</a>
            <Link href="/srs" className="hover:text-blue-600 transition">SM-2 Review</Link>
            <Link href="/tutor" className="hover:text-blue-600 transition">AI Tutor</Link>
            <Link href="/speech" className="hover:text-blue-600 transition">Pronunciation</Link>
            <Link href="/vocab" className="hover:text-blue-600 transition">Vocab</Link>
            <Link href="/grammar" className="hover:text-blue-600 transition">Grammar</Link>
            <Link href="/profile" className="hover:text-blue-600 transition">Analytics</Link>
          </nav>

          <Link href="/lesson?module=de-a1-coffee" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg tracking-wider uppercase transition shadow-sm">
            LAUNCH LESSON
          </Link>
        </div>
      </header>

      {/* Main Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 flex-1 w-full">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Full-Stack Next.js 14 & SM-2 Spaced Repetition Engine</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none text-slate-900 uppercase">
              FLUENCY.<br/><span className="text-blue-600">ACCELERATED.</span><br/>MINIMAL<br/>EFFORT.
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
              Full-stack language learning platform featuring SM-2 Spaced Repetition, Speech Pronunciation Evaluation, AI Scenario Tutor, and A1-C2 multi-language curriculum.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a href="#modules" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-4 rounded-xl text-sm tracking-wider uppercase space-x-3 transition shadow-lg shadow-blue-500/20">
                <span>EXPLORE ALL COURSES ➔</span>
              </a>
              <Link href="/srs" className="inline-flex items-center bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold px-6 py-4 rounded-xl text-sm tracking-wider uppercase transition">
                <span>SM-2 SRS Review</span>
              </Link>
            </div>
          </div>

          {/* Interactive Feature Matrix Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span className="font-bold text-slate-700">FULL-STACK ENTERPRISE FEATURES</span>
              <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold">ACTIVE</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/srs" className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-300 transition space-y-1">
                <div className="text-blue-600 font-bold text-sm">🧠 SM-2 SRS Engine</div>
                <div className="text-xs text-slate-500">Spaced repetition memory retention</div>
              </Link>
              <Link href="/tutor" className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-300 transition space-y-1">
                <div className="text-emerald-600 font-bold text-sm">🤖 AI Scenario Tutor</div>
                <div className="text-xs text-slate-500">Conversational AI language partner</div>
              </Link>
              <Link href="/speech" className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-300 transition space-y-1">
                <div className="text-purple-600 font-bold text-sm">🎙️ Speech Evaluation</div>
                <div className="text-xs text-slate-500">Microphone pronunciation scoring</div>
              </Link>
              <Link href="/profile" className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-300 transition space-y-1">
                <div className="text-amber-600 font-bold text-sm">📊 Performance Analytics</div>
                <div className="text-xs text-slate-500">Streaks, XP points & mastery level</div>
              </Link>
            </div>
          </div>
        </section>

        {/* Modules & Curriculum Selector */}
        <section id="modules" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest">01 / DYNAMIC CURRICULUM</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Select Language & CEFR Level</h2>
            </div>

            {/* Language Tabs */}
            <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-slate-200">
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

          {/* Level Filter Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase mr-2">Level Filter:</span>
            {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition ${selectedLevel === lvl ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredModules.length === 0 ? (
              <div className="col-span-full py-16 text-center text-slate-400 font-mono text-sm bg-white rounded-3xl border border-slate-200">
                Modules for this level in {currentLangObj.name} are being added to the database. Try A1 or A2!
              </div>
            ) : (
              filteredModules.map(mod => (
                <div key={mod.id} className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">{mod.level}</span>
                      <span className="text-xs font-mono text-slate-400">{currentLangObj.flag} {currentLangObj.name.split(' ')[0]}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{mod.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{mod.tagline}</p>
                    <div className="pt-2 text-[10px] font-mono font-bold text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      FOCUS: {mod.grammarFocus}
                    </div>
                  </div>
                  <Link href={`/lesson?module=${mod.id}`} className="w-full inline-flex justify-center items-center bg-slate-900 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition">
                    Launch Interactive Module ➔
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW FULL-STACK ENTERPRISE ENGINE · A1-C2 MULTI-LANGUAGE PLATFORM
      </footer>
    </div>
  );
}
