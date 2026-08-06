import React from 'react';

const LANGUAGES = [
  { code: 'en', name: 'İngilizce', flag: '🇬🇧', accent: 'from-blue-500/20 to-cyan-500/20 text-cyan-300' },
  { code: 'de', name: 'Almanca', flag: '🇩🇪', accent: 'from-amber-500/20 to-red-500/20 text-amber-300' },
  { code: 'fr', name: 'Fransızca', flag: '🇫🇷', accent: 'from-blue-600/20 to-indigo-500/20 text-blue-300' },
  { code: 'es', name: 'İspanyolca', flag: '🇪🇸', accent: 'from-red-500/20 to-yellow-500/20 text-yellow-300' },
  { code: 'pt', name: 'Portekizce', flag: '🇵🇹', accent: 'from-emerald-500/20 to-green-500/20 text-emerald-300' },
];

export default function LanguageSelector({ selectedLanguage, onSelectLanguage }) {
  return (
    <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl glass-pill max-w-fit mx-auto border border-white/10 shadow-2xl">
      {LANGUAGES.map((lang) => {
        const isSelected = selectedLanguage === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
              isSelected
                ? 'bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white shadow-lg shadow-cyan-500/10 scale-105'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.name}</span>
            <span className="sm:hidden uppercase">{lang.code}</span>
            {isSelected && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#00F2FE]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
