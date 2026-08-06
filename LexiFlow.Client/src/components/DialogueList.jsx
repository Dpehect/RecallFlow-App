import React, { useState } from 'react';
import { Volume2, BookOpen, MessageSquare, Play, Square, Sparkles } from 'lucide-react';

export default function DialogueList({ dialogues, language, category }) {
  const [playingId, setPlayingId] = useState(null);

  if (!dialogues || dialogues.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto my-8 p-8 text-center glass-card rounded-3xl border border-white/10">
        <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-3 animate-pulse" />
        <h4 className="text-base font-bold text-white">Bu Kategori İçin Metin Hazırlanıyor</h4>
        <p className="text-xs text-slate-400 mt-1">Lütfen yukarıdan farklı bir kategori seçin.</p>
      </div>
    );
  }

  const handlePlaySpeech = (id, text) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const localeMap = { en: 'en-US', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', pt: 'pt-PT' };
    utterance.lang = localeMap[language] || 'en-US';
    utterance.rate = 0.85;

    setPlayingId(id);
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4 space-y-4 px-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-2">
        <span>Kategori: <strong className="text-purple-300">{category}</strong></span>
        <span>Toplam <strong className="text-purple-300">{dialogues.length}</strong> Pekiştirme Metni / Diyalog</span>
      </div>

      {dialogues.map((item, index) => {
        const isPlaying = playingId === item.id;
        return (
          <div
            key={item.id || index}
            className="p-5 rounded-2xl glass-card border border-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-xl"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                {item.type === 'Dialogue' ? <MessageSquare className="w-4 h-4 text-pink-400" /> : <BookOpen className="w-4 h-4 text-cyan-400" />}
                <span>#{index + 1} • {item.type}</span>
              </div>

              <button
                onClick={() => isPlaying ? handleStopSpeech() : handlePlaySpeech(item.id, item.content)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all ${
                  isPlaying
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30'
                }`}
              >
                {isPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Durdur' : 'Dinle (Listening)'}</span>
              </button>
            </div>

            <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <p className="text-xs leading-relaxed text-slate-200 whitespace-pre-line font-mono">
                {item.content}
              </p>
              <hr className="border-white/10 my-1.5" />
              <p className="text-[11px] text-slate-400 whitespace-pre-line">
                {item.translation}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
