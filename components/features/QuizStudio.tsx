"use client";
import { useState } from "react";
import { SpeakerHigh, Target } from "@phosphor-icons/react";
import type { Card, Lang, Level } from "@/types/domain";
import { languages } from "@/content/curriculum";
import { speak } from "@/lib/tts";
import { useQuiz } from "@/hooks/useQuiz";
export function ListeningStudio({
  cards,
  lang,
  level,
}: {
  cards: Card[];
  lang: Lang;
  level: Level;
}) {
  const [playing, setPlaying] = useState(false);
  const quiz = useQuiz(cards, `${lang}-${level}`);
  return (
    <div className="lab">
      <div className="pulse">
        <button
          aria-label="İfadeyi dinle"
          aria-pressed={playing}
          onClick={() => {
            setPlaying(true);
            speak(quiz.card.word, lang, () => setPlaying(false));
          }}
        >
          <SpeakerHigh aria-hidden />
        </button>
        <i />
        <i />
        <i />
      </div>
      <div className="challenge">
        <span>DİKTE · {(quiz.index % cards.length) + 1}/10</span>
        <h2>Duyduğunu yaz.</h2>
        <p>İfadeyi istediğin kadar tekrar dinleyebilirsin.</p>
        <label className="sr-only" htmlFor="dictation-answer">
          Duyduğun ifade
        </label>
        <input
          id="dictation-answer"
          value={quiz.answer}
          disabled={quiz.locked}
          onChange={(e) => quiz.setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && quiz.check()}
          placeholder={`${languages[lang].native} cevabın...`}
        />
        <div>
          <button
            className="primary"
            disabled={quiz.locked || !quiz.answer.trim()}
            onClick={quiz.check}
          >
            Kontrol et
          </button>
          <button onClick={quiz.next}>
            {quiz.locked ? "Sonraki" : "Atla"} →
          </button>
        </div>
        <strong role="status" aria-live="polite">
          {quiz.feedback}
        </strong>
      </div>
    </div>
  );
}
export function TranslationBot({
  cards,
  lang,
  level,
}: {
  cards: Card[];
  lang: Lang;
  level: Level;
}) {
  const quiz = useQuiz(cards, `${lang}-${level}`);
  return (
    <div className="bot">
      <div className="bot-face" aria-hidden>
        <div className="antenna" />
        <div className="eyes">
          <i />
          <i />
        </div>
        <div className="mouth" />
      </div>
      <div className="bot-card">
        <div>
          <span>ÇEVİRİ TURU · {level}</span>
          <b>{quiz.score} PUAN</b>
        </div>
        <p>Bu ifadeyi {languages[lang].name} diline çevir:</p>
        <h2>{quiz.card.translation}</h2>
        <label className="sr-only" htmlFor="translation-answer">
          Çevirin
        </label>
        <input
          id="translation-answer"
          value={quiz.answer}
          disabled={quiz.locked}
          onChange={(e) => quiz.setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && quiz.check()}
          autoFocus
          placeholder="Çevirini yaz..."
        />
        <button
          className="primary"
          disabled={quiz.locked || !quiz.answer.trim()}
          onClick={quiz.check}
        >
          Cevabı kontrol et <Target aria-hidden />
        </button>
        <strong role="status" aria-live="polite">
          {quiz.feedback}
        </strong>
        <button className="skip" onClick={quiz.next}>
          {quiz.locked ? "Sonraki kart" : "Bu kartı geç"} →
        </button>
      </div>
    </div>
  );
}
