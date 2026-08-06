'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 flex-1 w-full">
        {/* Simple & Clear Hero Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              Sade & Odaklanmış Dil Öğrenimi
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
              Dil Öğrenmenin <br/>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">En Sade ve Etkili Yolu</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              Karmaşık paneller ve kafa karıştıran bölümler yok. İhtiyacın olan sadece 4 temel adım: Kelime, Dil Bilgisi, Okuma ve Dinleme.
            </p>

            <div className="pt-2">
              <Link href="/vocab" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4.5 rounded-2xl text-sm tracking-wider uppercase transition shadow-lg shadow-blue-500/20 hover:scale-105">
                <span>ÖĞRENMEYE BAŞLA ▶</span>
              </Link>
            </div>
          </div>
        </section>

        {/* The 4 Core Learning Modules */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">4 TEMEL MÜFREDAT ADIMI</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Öğrenme Alanını Seç</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Kelime Öğrenme */}
            <Link href="/vocab" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-500 transition space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-2xl text-blue-600">
                📚
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition">1. Kelime Öğrenme</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Kategorilere ayrılmış kelimeler, sesli telaffuz ve örnek cümleler.</p>
              </div>
              <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition">İncele ➔</span>
            </Link>

            {/* 2. Dil Bilgisi */}
            <Link href="/grammar" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-500 transition space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-2xl text-indigo-600">
                🧩
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition">2. Dil Bilgisi</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Cümle yapısı, kurallar ve anlaşılır kalıp örnekleri.</p>
              </div>
              <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition">İncele ➔</span>
            </Link>

            {/* 3. Reading (Okuma) */}
            <Link href="/reading" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-500 transition space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-2xl text-emerald-600">
                📖
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition">3. Reading (Okuma)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Diyaloglar, kısa metinler ve satır satır Türkçe çeviri seçeneği.</p>
              </div>
              <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition">İncele ➔</span>
            </Link>

            {/* 4. Listening (Dinleme) */}
            <Link href="/listening" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-500 transition space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-2xl text-purple-600">
                🎧
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition">4. Listening (Dinleme)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Doğal konuşma seslerini dinleme ve anlama alıştırmaları.</p>
              </div>
              <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition">İncele ➔</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW SADE VE ODAKLANMIŞ ÖĞRENME PLATFORMU
      </footer>
    </div>
  );
}
