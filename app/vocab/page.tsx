'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RECALLFLOW_DATA } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function VocabPage() {
  const [query, setQuery] = useState('');

  const filtered = RECALLFLOW_DATA.vocabPacks.filter(v =>
    v.word.toLowerCase().includes(query.toLowerCase()) ||
    v.translation.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 w-full">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <Link href="/" className="text-slate-400 hover:text-slate-900">← Return to Dashboard</Link>
        <h1 className="text-2xl font-black text-slate-900">Vocab Vault</h1>
      </div>

      <input
        type="text"
        placeholder="Search German words or English meanings..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 shadow-sm">
            <div className="flex justify-between text-xs font-mono">
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">{item.level}</span>
              <span className="text-slate-400">{item.type}</span>
            </div>
            <div className="text-2xl font-black text-slate-900">{item.word}</div>
            <div className="text-sm text-slate-600 font-medium">{item.translation}</div>
            <button onClick={() => sounds.speakGerman(item.word)} className="w-full bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:text-blue-700 text-xs font-bold py-2 rounded-xl transition">
              🔊 Play Pronunciation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
