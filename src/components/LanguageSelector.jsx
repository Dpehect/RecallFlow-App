import React from 'react';

const LANGUAGES = [
  { code: 'en', name: 'İngilizce', flag: '🇬🇧' },
  { code: 'de', name: 'Almanca', flag: '🇩🇪' },
  { code: 'fr', name: 'Fransızca', flag: '🇫🇷' },
  { code: 'es', name: 'İspanyolca', flag: '🇪🇸' },
  { code: 'pt', name: 'Portekizce', flag: '🇵🇹' },
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
