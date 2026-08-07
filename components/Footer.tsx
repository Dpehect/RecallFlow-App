'use client';

import React from 'react';
import { TARGET_LANGUAGES } from '@/lib/languages';

export default function Footer() {
  return (
    <footer className="mt-6 border-t-[3px] border-ink bg-paper-sunken">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center border-[2px] border-ink bg-rust text-paper-raised">
            <span className="font-mono text-[11px] font-bold leading-none">RF</span>
          </span>
          <span className="font-display text-[16px] italic">RecallFlow</span>
          <span className="hidden text-[12px] text-ink-soft sm:inline">— Radical Practice Engine</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-semibold text-ink-soft">
          {TARGET_LANGUAGES.map((lang) => (
            <span key={lang.id} className="flex items-center gap-1 border-[1.5px] border-ink/30 px-2 py-1">
              {lang.flag} {lang.code}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
