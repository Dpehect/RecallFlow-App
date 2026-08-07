"use client";
import type { Lang } from "@/types/domain";
import { LANGUAGES } from "@/types/domain";
import { languages } from "@/content/curriculum";
export type View = "home" | "vocab" | "reading" | "listening" | "robot";
const nav: [View, string][] = [
  ["home", "Keşfet"],
  ["vocab", "Kelimeler"],
  ["reading", "Okuma"],
  ["listening", "Dinleme"],
  ["robot", "Robot"],
];
export function Header({
  view,
  lang,
  onView,
  onLang,
}: {
  view: View;
  lang: Lang;
  onView: (v: View) => void;
  onLang: (l: Lang) => void;
}) {
  return (
    <header>
      <button
        className="brand"
        onClick={() => onView("home")}
        aria-label="RecallFlow ana sayfa"
      >
        <i aria-hidden>R</i>
        <span>
          RecallFlow<small>Dili ezberleme. Yaşa.</small>
        </span>
      </button>
      <nav aria-label="Ana navigasyon">
        {nav.map(([key, label]) => (
          <button
            key={key}
            aria-current={view === key ? "page" : undefined}
            className={view === key ? "active" : ""}
            onClick={() => onView(key)}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="langs" role="group" aria-label="Öğrenilecek dil">
        {LANGUAGES.map((key) => (
          <button
            key={key}
            aria-pressed={lang === key}
            aria-label={languages[key].name}
            className={lang === key ? "active" : ""}
            style={{ "--accent": languages[key].color } as React.CSSProperties}
            onClick={() => onLang(key)}
          >
            {languages[key].flag}
          </button>
        ))}
      </div>
    </header>
  );
}
