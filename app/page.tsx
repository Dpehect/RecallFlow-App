'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Layers, BookOpen, BookOpenText, Headphones, Sparkles, Folder, ArrowRight, Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 flex-1 w-full">
        {/* Hero Section */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="max-w-3xl space-y-5 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-blue-950/80 text-blue-400 px-3.5 py-1.5 rounded-full border border-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> KATEGORİLİ MÜFREDAT & SUPERMEMO SM-2 SISTEMİ
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
              Yenilenmiş Sistem ile <br/>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Kategorili & Odaklı Dil Öğrenimi
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Tüm bölümlerde konularına göre ayrılmış kategoriler, seviye başına minimum 600+ kelime kapasitesi ve hafıza eğrisini hesaplayan SuperMemo SM-2 algoritması.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/vocab" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black px-8 py-4 rounded-2xl text-sm tracking-wider uppercase transition shadow-lg shadow-blue-500/20 hover:scale-105">
                <span>1. KELİME MODÜLÜNE GİT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4 CORE CATEGORIZED MODULES */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4 flex justify-between items-end">
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Folder className="w-4 h-4" /> 4 TEMEL KATEGORİZASYON BÖLÜMÜ
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Öğrenme Alanını Seç</h2>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">600+ Kelime / Seviye Kapasitesi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Kelime Öğrenme */}
            <Link href="/vocab" className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl hover:border-blue-500 transition space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-950 flex items-center justify-center text-blue-400 border border-blue-800">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-blue-400 transition">1. Kelime Öğrenme</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Kafe, İş, Günlük Yaşam, Şehir vb. kategoriler. Her seviyede 600+ kelime kapasitesi ve SM-2 akıllı kartlar.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition">
                İncele & Başla ➔
              </span>
            </Link>

            {/* 2. Dil Bilgisi */}
            <Link href="/grammar" className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl hover:border-indigo-500 transition space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950 flex items-center justify-center text-indigo-400 border border-indigo-800">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-indigo-400 transition">2. Dil Bilgisi (Gramer)</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Cümle yapısı, zamanlar, edatlar ve bağlaçlar konularına ayrılmış gramer kategorileri.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition">
                İncele & Başla ➔
              </span>
            </Link>

            {/* 3. Reading (Okuma) */}
            <Link href="/reading" className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl hover:border-emerald-500 transition space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800">
                <BookOpenText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition">3. Reading (Okuma)</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Günlük diyaloglar, seyahat, iş ve öykü kategorilerinde metin okuma ve satır içi çeviri.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition">
                İncele & Başla ➔
              </span>
            </Link>

            {/* 4. Listening (Dinleme) */}
            <Link href="/listening" className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl hover:border-purple-500 transition space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-800">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-purple-400 transition">4. Listening (Dinleme)</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Sohbet, rezervasyon, iş ve haber kategorilerinde işitsel testler ve ses kayıtları.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition">
                İncele & Başla ➔
              </span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW SYSTEM REDESIGN — CATEGORIZED SYSTEM & 600+ WORDS CAPACITY PER LEVEL
      </footer>
    </div>
  );
}
