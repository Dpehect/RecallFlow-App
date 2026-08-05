'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
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
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      {/* Main Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 flex-1 w-full">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>SM-2 SRS Engine & 3D Card FX</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none uppercase">
              FLUENCY.<br/><span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">ACCELERATED.</span><br/>MINIMAL<br/>EFFORT.
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
              Next-gen language learning with SM-2 Spaced Repetition, 3D card flips, competitive leagues, AI Scenario Tutor, and 14,400+ CEFR A1-C2 vocabulary items.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a href="#modules" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-7 py-4 rounded-2xl text-sm tracking-wider uppercase space-x-3 transition shadow-lg shadow-blue-500/25 hover:scale-105">
                <span>EXPLORE COURSES ➔</span>
              </a>
              <Link href="/leaderboard" className="inline-flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold px-6 py-4 rounded-2xl text-sm tracking-wider uppercase transition hover:scale-105">
                <span>🏆 Leaderboard</span>
              </Link>
            </div>
          </div>

          {/* Feature Matrix Card */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 glow-border">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span className="font-bold text-slate-700 dark:text-slate-300">ENTERPRISE FEATURE MATRIX</span>
              <span className="bg-emerald-500 text-white text-[10px] px-2.5 py-1 rounded-full font-bold">ACTIVE</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/srs" className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition space-y-1 group">
                <div className="text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:translate-x-1 transition">🧠 SM-2 3D Flashcards</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Spaced repetition memory review</div>
              </Link>
              <Link href="/leaderboard" className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition space-y-1 group">
                <div className="text-amber-500 font-bold text-sm group-hover:translate-x-1 transition">🏆 Diamond League</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Global competitive rankings</div>
              </Link>
              <Link href="/tutor" className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition space-y-1 group">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm group-hover:translate-x-1 transition">🤖 AI Scenario Tutor</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Real-time conversational practice</div>
              </Link>
              <Link href="/badges" className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition space-y-1 group">
                <div className="text-purple-600 dark:text-purple-400 font-bold text-sm group-hover:translate-x-1 transition">🎖️ Badges & Rewards</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Unlockable learner achievements</div>
              </Link>
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section id="modules" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">01 / DYNAMIC CURRICULUM</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Select Language & CEFR Level</h2>
            </div>

            {/* Language Tabs */}
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

          {/* Level Filter Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase mr-2">Level Filter:</span>
            {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition ${selectedLevel === lvl ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400'}`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredModules.map(mod => (
              <div key={mod.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between space-y-6 hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">{mod.level}</span>
                    <span className="text-xs font-mono text-slate-400">{currentLangObj.flag} {currentLangObj.name.split(' ')[0]}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{mod.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{mod.tagline}</p>
                  <div className="pt-2 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    FOCUS: {mod.grammarFocus}
                  </div>
                </div>
                <Link href={`/lesson?module=${mod.id}`} className="w-full inline-flex justify-center items-center bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition shadow-md">
                  Launch Interactive Module ➔
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW CREATIVE ENTERPRISE PLATFORM · 2026 EDITION
      </footer>
    </div>
  );
}
