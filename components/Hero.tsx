'use client';

import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            LISTEN. READ.<br />
            MASTER.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-lg font-normal leading-relaxed">
            Boost your language fluency with interactive vocabulary cards, native audio labs, and immersive reading stories.
          </p>
          <div className="pt-2">
            <button className="bg-[#1a56db] hover:bg-[#1545b3] text-white px-8 py-3.5 rounded-full text-base font-semibold shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5">
              Explore Modules
            </button>
          </div>
        </div>

        {/* Right Hero Visual */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-blue-100/60 to-blue-200/40 border border-white/50 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
              alt="Language Learner"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Stats Bar tailored to Language Learning */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">12,000+</div>
          <div className="text-sm font-medium text-slate-500 mt-1">Vocab Cards</div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">500+</div>
          <div className="text-sm font-medium text-slate-500 mt-1">Audio Labs</div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
            24<span className="text-2xl font-semibold text-slate-400">/7</span>
          </div>
          <div className="text-sm font-medium text-slate-500 mt-1">Reading Practice</div>
        </div>

        {/* Stat 4 (Blue Card) */}
        <div className="bg-[#1a56db] rounded-2xl p-6 shadow-lg shadow-blue-600/20 text-white">
          <div className="text-4xl font-extrabold tracking-tight">98%</div>
          <div className="text-sm font-medium text-blue-100/90 mt-1">Fluency Rate</div>
        </div>
      </div>
    </section>
  );
};
