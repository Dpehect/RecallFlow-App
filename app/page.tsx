'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Layers, BookOpen, BookOpenText, Headphones, Sparkles, Folder, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F1EA] text-[#141413]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 flex-1 w-full">
        {/* Editorial Hero Section */}
        <section className="bg-[#FAF8F5] border-2 border-black p-8 sm:p-14 shadow-brutal-lg space-y-6 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10 font-mono">
            <span className="inline-flex items-center gap-1.5 text-xs font-black bg-[#EAB308] text-black px-3.5 py-1.5 border border-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-black" /> EDITORIAL KATEGORİ SİSTEMİ & SM-2 SRS
            </span>

            <h1 className="font-editorial text-5xl sm:text-7xl font-black text-black leading-none italic tracking-tight">
              Dil Öğrenmenin <br/>
              <span className="bg-[#EAB308] px-2 not-italic border-2 border-black inline-block mt-1">
                Karakterli & Sert Yolu
              </span>
            </h1>

            <p className="text-black font-bold text-base sm:text-lg leading-relaxed max-w-2xl">
              Gereksiz SaaS şablonları yok. Asimetrik gazete tarzı yerleşim, konularına göre ayrılmış kategoriler, seviye başına 600+ kelime kapasitesi ve SuperMemo SM-2 algoritması.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/vocab"
                className="inline-flex items-center gap-2 bg-[#65A30D] text-white border-2 border-black font-black px-8 py-4 text-sm tracking-wider uppercase shadow-brutal hover-brutal"
              >
                <span>1. KELİME MODÜLÜNE GİT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* EDITORIAL MODULES GRID */}
        <section className="space-y-6 font-mono">
          <div className="border-b-2 border-black pb-4 flex justify-between items-end">
            <div>
              <span className="text-xs font-black text-[#65A30D] uppercase tracking-widest flex items-center gap-1">
                <Folder className="w-4 h-4" /> 4 MÜFREDAT BÖLÜMÜ
              </span>
              <h2 className="font-editorial text-3xl font-black text-black mt-1 italic">Öğrenme Alanını Seç</h2>
            </div>
            <span className="text-xs font-bold text-black hidden sm:inline-block border border-black px-2 py-1 bg-[#EAB308]">
              600+ KELİME HAVUZU
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Kelime */}
            <Link
              href="/vocab"
              className="bg-[#FAF8F5] p-8 border-2 border-black shadow-brutal hover-brutal space-y-4 group inline-block"
            >
              <div className="w-12 h-12 bg-[#EAB308] border-2 border-black flex items-center justify-center text-black font-black">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-black text-black italic group-hover:underline">
                  1. Kelime
                </h3>
                <p className="text-xs font-bold text-slate-800 mt-2 leading-relaxed">
                  Kafe, İş, Günlük Yaşam vb. kategoriler. SM-2 akıllı kartlar ve 600+ kelime kapasitesi.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-black text-black uppercase underline">
                İNCELEN ➔
              </span>
            </Link>

            {/* 2. Dil Bilgisi */}
            <Link
              href="/grammar"
              className="bg-[#FAF8F5] p-8 border-2 border-black shadow-brutal hover-brutal space-y-4 group inline-block"
            >
              <div className="w-12 h-12 bg-[#65A30D] border-2 border-black flex items-center justify-center text-white font-black">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-black text-black italic group-hover:underline">
                  2. Dil Bilgisi
                </h3>
                <p className="text-xs font-bold text-slate-800 mt-2 leading-relaxed">
                  Cümle yapısı, zamanlar, edatlar ve bağlaçlar konularına ayrılmış gramer rehberi.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-black text-black uppercase underline">
                İNCELEN ➔
              </span>
            </Link>

            {/* 3. Reading */}
            <Link
              href="/reading"
              className="bg-[#FAF8F5] p-8 border-2 border-black shadow-brutal hover-brutal space-y-4 group inline-block"
            >
              <div className="w-12 h-12 bg-[#EAB308] border-2 border-black flex items-center justify-center text-black font-black">
                <BookOpenText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-black text-black italic group-hover:underline">
                  3. Reading
                </h3>
                <p className="text-xs font-bold text-slate-800 mt-2 leading-relaxed">
                  Günlük diyaloglar, seyahat ve öykü kategorilerinde gazete tarzı okuma metinleri.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-black text-black uppercase underline">
                İNCELEN ➔
              </span>
            </Link>

            {/* 4. Listening */}
            <Link
              href="/listening"
              className="bg-[#FAF8F5] p-8 border-2 border-black shadow-brutal hover-brutal space-y-4 group inline-block"
            >
              <div className="w-12 h-12 bg-[#65A30D] border-2 border-black flex items-center justify-center text-white font-black">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-black text-black italic group-hover:underline">
                  4. Listening
                </h3>
                <p className="text-xs font-bold text-slate-800 mt-2 leading-relaxed">
                  Sohbet, rezervasyon ve iş görüşmesi kategorilerinde işitsel sınavlar.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-black text-black uppercase underline">
                İNCELEN ➔
              </span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#FAF8F5] border-t-2 border-black py-6 text-center text-xs font-mono font-bold text-slate-800">
        RECALLFLOW EDITORIAL NEO-BRUTALIST SYSTEM
      </footer>
    </div>
  );
}
