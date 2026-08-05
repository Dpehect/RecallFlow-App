'use client';

import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tight text-slate-900 flex items-center space-x-2">
            <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
            <span>RECALLFLOW</span>
          </Link>
          <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
            ANALYTICS & PROFILE
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono text-blue-600 font-bold uppercase">LEARNER PERFORMANCE</span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Analytics Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase">STREAK</span>
            <div className="text-4xl font-black text-amber-500">🔥 7 Days</div>
            <p className="text-xs text-slate-500">Daily learning habit maintained</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase">EXPERIENCE</span>
            <div className="text-4xl font-black text-blue-600">⚡ 1,240 XP</div>
            <p className="text-xs text-slate-500">Earned from lessons & quizzes</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase">CARDS MASTERED</span>
            <div className="text-4xl font-black text-emerald-600">🎯 84 Cards</div>
            <p className="text-xs text-slate-500">SM-2 retention score &gt; 85%</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Multi-Language CEFR Progress</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>🇩🇪 German (A1-A2)</span>
                <span className="text-blue-600">68%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[68%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>🇪🇸 Spanish (A1)</span>
                <span className="text-emerald-600">42%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[42%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>🇵🇹 Portuguese (A1)</span>
                <span className="text-amber-600">25%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[25%]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW USER ANALYTICS & INSIGHTS
      </footer>
    </div>
  );
}
