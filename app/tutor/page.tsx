'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LANGUAGES } from '@/lib/data';
import { sounds } from '@/lib/sound';

export default function TutorPage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hallo! Ich bin dein AI Tutor. Worüber möchtest du heute sprechen?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    const res = await fetch('/api/ai-tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg, language: selectedLang, scenario: 'Cafe' })
    });
    const data = await res.json();

    setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    sounds.speak(data.reply, currentLangObj.code);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tight text-slate-900 flex items-center space-x-2">
            <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
            <span>RECALLFLOW</span>
          </Link>
          <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
            AI SCENARIO TUTOR
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full flex flex-col justify-between space-y-6">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono text-blue-600 font-bold uppercase">REAL-TIME CONVERSATIONAL PARTNER</span>
            <h1 className="text-2xl font-black text-slate-900 mt-0.5">AI Language Tutor</h1>
          </div>
          <div className="flex space-x-2 bg-white p-1 rounded-xl border border-slate-200">
            {LANGUAGES.map(lang => (
              <button key={lang.id} onClick={() => { setSelectedLang(lang.id); setMessages([{ sender: 'ai', text: `Welcome to ${lang.name} practice!` }]); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedLang === lang.id ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>
                {lang.flag}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Box */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex-1 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-4 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-100 text-slate-900 border border-slate-200'}`}>
                {m.text}
                {m.sender === 'ai' && (
                  <button onClick={() => sounds.speak(m.text, currentLangObj.code)} className="block text-[10px] text-blue-600 font-bold mt-2">
                    🔊 Listen Audio
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && <div className="text-xs font-mono text-slate-400">AI Tutor is typing response...</div>}
        </div>

        {/* Input Bar */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder={`Type your reply in ${currentLangObj.name.split(' ')[0]}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-blue-600"
          />
          <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase shadow-md">
            Send ➔
          </button>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW CONVERSATIONAL AI ENGINE
      </footer>
    </div>
  );
}
