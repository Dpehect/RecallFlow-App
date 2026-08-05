'use client';

import Link from 'next/link';
import { RECALLFLOW_DATA } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function Home() {
  return (
    <div class="min-h-screen flex flex-col justify-between">
      <!-- Navbar -->
      <header class="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <Link href="/" class="font-black text-xl tracking-tight text-slate-900 flex items-center space-x-2">
              <span class="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
              <span>RECALLFLOW</span>
            </Link>
            <span class="text-[11px] font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-semibold">[ NEXT.JS APP ]</span>
          </div>

          <nav class="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#modules" class="hover:text-blue-600 transition">01. Modules</a>
            <Link href="/vocab" class="hover:text-blue-600 transition">02. Vocab Vault</Link>
          </nav>

          <Link href="/lesson?module=a1-coffee" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg tracking-wider uppercase transition shadow-sm">
            START LESSON
          </Link>
        </div>
      </header>

      <!-- Main Hero -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 flex-1 w-full">
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-6 space-y-6">
            <div class="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Next.js App Router & TypeScript</span>
            </div>
            <h1 class="text-5xl sm:text-6xl font-black tracking-tight leading-none text-slate-900 uppercase">
              GERMAN<br><span class="text-blue-600">FLUENCY.</span><br>MINIMAL<br>EFFORT.
            </h1>
            <p class="text-slate-600 text-lg leading-relaxed max-w-lg">
              3-minute interactive audio-visual micro-cards designed for effortless memory retention.
            </p>
            <div class="pt-2 flex flex-wrap gap-4 items-center">
              <Link href="/lesson?module=a1-coffee" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-4 rounded-xl text-sm tracking-wider uppercase space-x-3 transition shadow-lg shadow-blue-500/20">
                <span>TRY A 30-SEC LESSON ➔</span>
              </Link>
              <Link href="/vocab" class="inline-flex items-center bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold px-6 py-4 rounded-xl text-sm tracking-wider uppercase transition">
                <span>Explore Vocab Vault</span>
              </Link>
            </div>
          </div>

          <!-- Interactive Card Preview -->
          <div class="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
            <div class="text-center py-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="text-3xl font-extrabold tracking-wide flex justify-center items-center space-x-3">
                <span>Ich</span>
                <button onClick={() => sounds.speakGerman('trinke')} class="text-blue-600 border-2 border-blue-400 bg-blue-50 px-3.5 py-1.5 rounded-xl transition hover:bg-blue-100">
                  trinke 🔊
                </button>
                <span>Kaffee.</span>
              </div>
              <p class="text-xs text-slate-400 mt-4 font-mono">Tap highlighted word to hear audio</p>
            </div>
          </div>
        </section>

        <!-- Modules Grid -->
        <section id="modules" class="space-y-8">
          <div class="border-b border-slate-200 pb-4">
            <span class="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest">01 / INTERACTIVE MODULES</span>
            <h2 class="text-3xl font-extrabold text-slate-900 mt-1">Select Your Next.js Course Loop</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RECALLFLOW_DATA.modules.map(mod => (
              <div key={mod.id} class="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between space-y-6 hover:shadow-xl transition">
                <div>
                  <span class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">{mod.level}</span>
                  <h3 class="text-2xl font-extrabold text-slate-900 mt-3">{mod.title}</h3>
                  <p class="text-sm text-slate-600 mt-2">{mod.tagline}</p>
                </div>
                <Link href={`/lesson?module=${mod.id}`} class="w-full inline-flex justify-center items-center bg-slate-900 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition">
                  Launch Module ➔
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer class="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        RECALLFLOW NEXT.JS EDITION · 2026
      </footer>
    </div>
  );
}
