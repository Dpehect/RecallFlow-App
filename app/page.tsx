'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { RECALLFLOW_ENTERPRISE_DATA, LANGUAGES } from '@/lib/data';

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 flex-1 w-full">
        {/* Simple & Focused Hero Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3.5 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Günde Sadece 3 Dakika · Akıllı Öğrenme Yöntemi</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
              Sıfırdan Dil Öğrenmenin <br/>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">En Kolay ve Hızlı Yolu</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              Ezber yapmak yok. Karmaşık gramer kurallarında kaybolmak yok. Tıklayarak cümle kur, dinle ve hafızada tut.
            </p>

            {/* Giant 1-Click CTA Button */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link href="/lesson?module=de-a1" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black px-8 py-5 rounded-2xl text-base tracking-wider uppercase transition shadow-xl shadow-blue-500/25 hover:scale-105">
                <span>BUGÜNKÜ DERSİNE BAŞLA ▶</span>
              </Link>
              
              <Link href="/srs" className="inline-flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold px-6 py-5 rounded-2xl text-sm transition">
                <span>Kelime Tekrarı Yap</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Access Learning Features */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/srs" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-500 transition space-y-2 group">
            <div className="text-3xl">🧠</div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition">Aralıklı Tekrar Kartları</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Unutmaya yaklaştığın kelimeleri tam zamanında tekrar et.</p>
          </Link>

          <Link href="/vocab" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-500 transition space-y-2 group">
            <div className="text-3xl">📚</div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition">Geniş Kelime Sözlüğü</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">A1-C2 seviyelerinde 14.000+ sesli kelimeyi incele ve dinle.</p>
          </Link>

          <Link href="/grammar" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-500 transition space-y-2 group">
            <div className="text-3xl">🧩</div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition">Cümle Yapısı ve Gramer</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pratik örneklerle dil yapısını ve kuralları kolayca kavra.</p>
          </Link>
        </section>

        {/* Simple Course & Level Selector */}
        <section id="courses" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">ÖĞRENME MÜFREDATI</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Öğrenmek İstediğin Dili Seç</h2>
            </div>

            {/* Language Selector */}
            <div className="flex flex-wrap gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${selectedLang === lang.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase mr-2">Seviye Filtresi:</span>
            {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition ${selectedLevel === lvl ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400'}`}
              >
                {lvl === 'ALL' ? 'Tüm Seviyeler' : lvl}
              </button>
            ))}
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredModules.map(mod => (
              <div key={mod.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-blue-500 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">{mod.level} SEVİYESİ</span>
                    <span className="text-xs font-mono text-slate-400">{currentLangObj.flag} {currentLangObj.name.split(' ')[0]}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{mod.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{mod.tagline}</p>
                  <div className="pt-2 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    ODAK: {mod.grammarFocus}
                  </div>
                </div>

                <Link href={`/lesson?module=${mod.id}`} className="w-full inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition shadow-md">
                  Derse Başla ➔
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW AKILLI DİL ÖĞRENME PLATFORMU
      </footer>
    </div>
  );
}
