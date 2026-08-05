'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
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

  const quickPrompts: Record<string, string[]> = {
    german: [
      "Hallo! Ich möchte Deutsch üben.",
      "Wo ist das beste Restaurant in Berlin?",
      "Ich möchte einen Kaffee und Kuchen bestellen.",
      "Wie komme ich zum Hauptbahnhof?"
    ],
    spanish: [
      "¡Hola! Quiero practicar español.",
      "¿Dónde está el mejor restaurante?",
      "Quisiera pedir una paella y agua.",
      "¿Cómo llego al centro?"
    ],
    portuguese: [
      "Olá! Quero praticar português.",
      "Onde fica o centro histórico?",
      "Queria pedir um pastel de nata.",
      "Pode ajudar-me, por favor?"
    ],
    english: [
      "Hello! I would like to practice English.",
      "Where is the nearest coffee shop?",
      "Can I order breakfast, please?",
      "How do I get to the city center?"
    ]
  };

  const handleSend = async (textToSend?: string) => {
    const userMsg = (textToSend || input).trim();
    if (!userMsg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    const res = await fetch('/api/ai-tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg, language: selectedLang, scenario: 'General' })
    });
    const data = await res.json();

    setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    sounds.speak(data.reply, currentLangObj.code);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full flex flex-col justify-between space-y-6">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">ZERO-TYPING AI LANGUAGE TUTOR</span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">Conversational Partner</h1>
          </div>
          <div className="flex space-x-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => { setSelectedLang(lang.id); setMessages([{ sender: 'ai', text: `Welcome to ${lang.name} practice!` }]); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${selectedLang === lang.id ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex-1 min-h-[350px] max-h-[450px] overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-4 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700'}`}>
                {m.text}
                {m.sender === 'ai' && (
                  <button onClick={() => sounds.speak(m.text, currentLangObj.code)} className="block text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-2">
                    🔊 Listen Native Pronunciation
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && <div className="text-xs font-mono text-slate-400">AI Partner is typing response...</div>}
        </div>

        {/* Quick Suggestion Chips (Zero Typing for Lazy Learners) */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">⚡ 1-Click Quick Replies (Zero Typing):</span>
          <div className="flex flex-wrap gap-2">
            {(quickPrompts[selectedLang] || quickPrompts.german).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 text-slate-700 dark:text-slate-300 text-xs font-medium px-3.5 py-1.5 rounded-full transition shadow-sm hover:scale-105"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder={`Type or click quick reply in ${currentLangObj.name.split(' ')[0]}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-blue-600"
          />
          <button onClick={() => handleSend()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase shadow-md">
            Send ➔
          </button>
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW ZERO-TYPING AI TUTOR
      </footer>
    </div>
  );
}
