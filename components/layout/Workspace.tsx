import type { Lang, Level } from "@/types/domain";
import { LEVELS } from "@/types/domain";
import { languages } from "@/content/curriculum";
export function Workspace({
  title,
  kicker,
  children,
  level,
  setLevel,
  lang,
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
  level: Level;
  setLevel: (l: Level) => void;
  lang: Lang;
}) {
  return (
    <div
      className="workspace"
      style={{ "--accent": languages[lang].color } as React.CSSProperties}
    >
      <div className="workspace-head">
        <div>
          <p className="eyebrow">
            <span aria-hidden />
            {kicker}
          </p>
          <h1>{title}</h1>
        </div>
        <div className="levels" role="group" aria-label="Dil seviyesi">
          {LEVELS.map((item) => (
            <button
              aria-pressed={level === item}
              className={level === item ? "active" : ""}
              onClick={() => setLevel(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
