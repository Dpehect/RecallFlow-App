'use client';

import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            LEARN. GROW.<br />
            SUCCEED.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-lg font-normal leading-relaxed">
            Learn from industry experts and gain the skills to advance your career.
          </p>
          <div className="pt-2">
            <button className="bg-[#1a56db] hover:bg-[#1545b3] text-white px-8 py-3.5 rounded-full text-base font-semibold shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5">
              Explore courses
            </button>
          </div>
        </div>

        {/* Right Instructor Image */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-blue-100/60 to-blue-200/40 border border-white/50 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
              alt="Instructor"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">56</div>
          <div className="text-sm font-medium text-slate-500 mt-1">Online courses</div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">8,000+</div>
          <div className="text-sm font-medium text-slate-500 mt-1">Happy students</div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
            24<span className="text-2xl font-semibold text-slate-400">/7</span>
          </div>
          <div className="text-sm font-medium text-slate-500 mt-1">Learning access</div>
        </div>

        {/* Stat 4 (Blue Card) */}
        <div className="bg-[#1a56db] rounded-2xl p-6 shadow-lg shadow-blue-600/20 text-white">
          <div className="text-4xl font-extrabold tracking-tight">98%</div>
          <div className="text-sm font-medium text-blue-100/90 mt-1">Satisfaction rate</div>
        </div>
      </div>
    </section>
  );
};
