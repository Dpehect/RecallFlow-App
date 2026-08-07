'use client';

import React from 'react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Expert-led learning (Dark) */}
        <div className="bg-[#18181b] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl min-h-[420px]">
          {/* Top Illustration Graphic */}
          <div className="relative h-48 w-full flex items-center justify-center">
            <div className="relative w-36 h-36">
              {/* Back card */}
              <div className="absolute -top-3 -left-3 w-36 h-36 rounded-2xl bg-slate-800/80 transform -rotate-6"></div>
              {/* Middle card */}
              <div className="absolute top-0 left-0 w-36 h-36 rounded-2xl bg-blue-600 transform -rotate-3"></div>
              {/* Front orange/yellow gear emblem card */}
              <div className="absolute top-3 left-3 w-36 h-36 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-20 h-20 text-amber-900/30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 1 0 10 10 A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                  <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="space-y-3 mt-6">
            <h3 className="text-2xl font-bold tracking-tight">Expert-led learning</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Learn from experienced industry professionals who share practical, real-world insights.
            </p>
          </div>
        </div>

        {/* Card 2: Flexible study options (Light) */}
        <div className="bg-[#f1f5f9] text-slate-900 rounded-3xl p-8 flex flex-col justify-between border border-slate-200/60 shadow-sm min-h-[420px]">
          {/* Top Illustration Graphic */}
          <div className="relative h-48 w-full flex items-center justify-center">
            <div className="relative flex items-center gap-3">
              {/* Left Student Floating Avatar */}
              <div className="absolute -left-12 top-0 w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                  alt="Student 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Fast-forward double arrow icon badge */}
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 rounded-3xl shadow-md text-white flex items-center justify-center">
                <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
                  <path d="M4 18l8.5-6L4 6v12zm9 0l8.5-6L13 6v12z" />
                </svg>
              </div>

              {/* Right Student Floating Avatar */}
              <div className="absolute -right-12 bottom-0 w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
                  alt="Student 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="space-y-3 mt-6">
            <h3 className="text-2xl font-bold tracking-tight">Flexible study options</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Access courses anytime and anywhere, giving you the freedom to learn at your own pace.
            </p>
          </div>
        </div>

        {/* Card 3: Global networking (Purple/Indigo) */}
        <div className="bg-[#524eee] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl min-h-[420px]">
          {/* Top Illustration Graphic - Avatar Grid */}
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
                  <img src={src} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Text */}
          <div className="space-y-3 mt-6">
            <h3 className="text-2xl font-bold tracking-tight">Global networking</h3>
            <p className="text-sm text-purple-100/90 leading-relaxed">
              Connect with global professionals, expanding your network and gaining diverse perspectives.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
