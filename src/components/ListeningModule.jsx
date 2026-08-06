import React, { useState } from 'react';
import { Headphones, Play, Square, Gauge, Volume2, Sparkles } from 'lucide-react';

export default function ListeningModule({ listenings, category, language }) {
  const [playingId, setPlayingId] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.85);

  if (!listenings || listenings.length === 0) return null;

  const playSpeech = (id, text) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const localeMap = { en: 'en-US', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', pt: 'pt-PT' };
    utterance.lang = localeMap[language] || 'en-US';
    utterance.rate = speechRate;

    setPlayingId(id);
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto my-4 space-y-4 px-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-2">
        <span className="flex items-center gap-1.5 text-purple-300 font-bold">
          <Headphones className="w-4 h-4 text-purple-400" />
          <span>Dinleme & Aksan Modülü ({category})</span>
        </span>

        {/* Global Speech Speed Controller */}
        <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/10 text-[11px]">
          <Gauge className="w-3.5 h-3.5 text-purple-400" />
          <button onClick={() => setSpeechRate(0.7)} className={`px-2 py-0.5 rounded-full font-bold ${speechRate === 0.7 ? 'bg-purple-500 text-white' : 'text-slate-400'}`}>0.7x Yavaş</button>
          <button onClick={() => setSpeechRate(0.85)} className={`px-2 py-0.5 rounded-full font-bold ${speechRate === 0.85 ? 'bg-purple-500 text-white' : 'text-slate-400'}`}>1.0x Normal</button>
          <button onClick={() => setSpeechRate(1.1)} className={`px-2 py-0.5 rounded-full font-bold ${speechRate === 1.1 ? 'bg-purple-500 text-white' : 'text-slate-400'}`}>1.2x Hızlı</button>
        </div>
      </div>

      {listenings.map((item, index) => {
        const isPlaying = playingId === item.id;
        return (
          <article
            key={item.id || index}
            className="p-6 rounded-3xl glass-card border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-2xl space-y-4 bg-slate-900/80"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-extrabold">
                  #{index + 1} • {item.category}
                </span>
                <h3 className="text-base font-bold text-white mt-2">{item.title}</h3>
              </div>

              <button
                onClick={() => isPlaying ? stopSpeech() : playSpeech(item.id, item.script)}
                className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30'
                }`}
              >
                {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Durdur' : 'Dinle (Audio Play)'}</span>
              </button>
            </div>

            {/* Audio Transcript */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
              <p className="text-xs leading-relaxed text-slate-200 whitespace-pre-line font-mono">
                {item.script}
              </p>
              <hr className="border-white/10 my-2" />
              <p className="text-[11px] text-slate-400 whitespace-pre-line">
                🇹🇷 Çeviri: {item.translation}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
