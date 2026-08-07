'use client';

import React from 'react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Vocab Atlas (Dark Theme) */}
        <div id="vocab" className="bg-[#18181b] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl min-h-[420px]">
          <div className="relative h-48 w-full flex items-center justify-center">
            <div className="relative w-36 h-36">
              <div className="absolute -top-3 -left-3 w-36 h-36 rounded-2xl bg-slate-800/80 transform -rotate-6"></div>
              <div className="absolute top-0 left-0 w-36 h-36 rounded-2xl bg-blue-600 transform -rotate-3"></div>
              <div className="absolute top-3 left-3 w-36 h-36 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-slate-900/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="text-2xl font-bold tracking-tight">Vocab Atlas</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Master words with spaced repetition, contextual example sentences, and automated CEFR level tracking.
            </p>
          </div>
        </div>

        {/* Card 2: Listening Studio (Light Theme) */}
        <div id="listening" className="bg-[#f1f5f9] text-slate-900 rounded-3xl p-8 flex flex-col justify-between border border-slate-200/60 shadow-sm min-h-[420px]">
          <div className="relative h-48 w-full flex items-center justify-center">
            <div className="relative flex items-center gap-3">
              <div className="absolute -left-12 top-0 w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Audio Speaker"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 rounded-3xl shadow-md text-white flex items-center justify-center">
                <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
                  <path d="M4 18l8.5-6L4 6v12zm9 0l8.5-6L13 6v12z" />
                </svg>
              </div>

              <div className="absolute -right-12 bottom-0 w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                  alt="Student Listener"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="text-2xl font-bold tracking-tight">Listening Studio</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Train your ear with native audio clips, dictation exercises, and real-time pronunciation feedback.
            </p>
          </div>
        </div>

        {/* Card 3: Reading Library (Purple/Indigo Theme) */}
        <div id="reading" className="bg-[#524eee] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl min-h-[420px]">
          <div className="relative h-48 w-full flex items-center justify-center">
            <div className="grid grid-cols-4 gap-2.5 max-w-[240px]">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
                'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150',
              ].map((src, idx) => (
                <div key={idx} className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/80 shadow-sm">
                  <img src={src} alt="Reader" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="text-2xl font-bold tracking-tight">Reading Library</h3>
            <p className="text-sm text-purple-100/90 leading-relaxed">
              Read engaging stories tailored to your level with instant dictionary lookups and interactive comprehension.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
