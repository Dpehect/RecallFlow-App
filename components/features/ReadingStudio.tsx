"use client";
import { useState } from "react";
import { SpeakerHigh } from "@phosphor-icons/react";
import type { Lang, Level } from "@/types/domain";
import { readings } from "@/content/curriculum";
import { speak } from "@/lib/tts";
export function ReadingStudio({ lang, level }: { lang: Lang; level: Level }) {
  const [playing, setPlaying] = useState(false);
  const reading = readings[lang][level];
  return (
    <div className="reading">
      <div className="reading-side">
        <span>{reading.duration} DAKİKA</span>
        <div className="big-letter" aria-hidden>
          {reading.title[0]}
        </div>
        <button
          aria-pressed={playing}
          onClick={() => {
            setPlaying(true);
            speak(reading.text, lang, () => setPlaying(false));
          }}
        >
          <SpeakerHigh aria-hidden /> {playing ? "Dinleniyor…" : "Metni dinle"}
        </button>
      </div>
      <article>
        <p className="eyebrow">
          <span aria-hidden />
          GÜNÜN METNİ
        </p>
        <h2>{reading.title}</h2>
        <p className="story">{reading.text}</p>
        <div className="gloss">
          <b>Okuma ipucu</b>
          <p>
            Önce metnin genel fikrini yakala. Bilmediğin her kelimede durma;
            bağlamın sana yardım etmesine izin ver.
          </p>
        </div>
      </article>
    </div>
  );
}
