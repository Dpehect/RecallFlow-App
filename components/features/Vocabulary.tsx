"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import { SpeakerHigh } from "@phosphor-icons/react";
import type { Card, Category, Lang } from "@/types/domain";
import { CATEGORIES } from "@/types/domain";
import { categoryLabels } from "@/content/curriculum";
import { speak } from "@/lib/tts";
const CardItem = memo(function CardItem({
  card,
  lang,
  known,
  onToggle,
}: {
  card: Card;
  lang: Lang;
  known: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <motion.article
      className="vcard"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="vtop">
        <span>{categoryLabels[card.category]}</span>
        <button
          aria-label={`${card.word} ifadesini dinle`}
          onClick={() => speak(card.word, lang)}
        >
          <SpeakerHigh aria-hidden />
        </button>
      </div>
      <h3>{card.word}</h3>
      <h4>{card.translation}</h4>
      <div className="example">
        <p>{card.example.target}</p>
        <small>{card.example.translation}</small>
      </div>
      <button
        aria-pressed={known}
        className={known ? "known active" : "known"}
        onClick={() => onToggle(card.id)}
      >
        {known ? "Öğrenildi ✓" : "Öğrendim"}
      </button>
    </motion.article>
  );
});
export function Vocabulary({
  cards,
  category,
  setCategory,
  page,
  setPage,
  total,
  lang,
  mastered,
  toggle,
}: {
  cards: Card[];
  category: Category | null;
  setCategory: (c: Category | null) => void;
  page: number;
  setPage: (n: number) => void;
  total: number;
  lang: Lang;
  mastered: Set<string>;
  toggle: (id: string) => void;
}) {
  return (
    <>
      <div className="chips" role="group" aria-label="Kelime kategorisi">
        <button
          className={category === null ? "active" : ""}
          onClick={() => setCategory(null)}
        >
          Tümü
        </button>
        {CATEGORIES.map((c) => (
          <button
            className={category === c ? "active" : ""}
            onClick={() => setCategory(c)}
            key={c}
          >
            {categoryLabels[c]}
          </button>
        ))}
      </div>
      <div className="deck-meta">
        <span>{total} alıştırma kartı</span>
        <span>
          {page + 1} / {Math.ceil(total / 12)} sayfa
        </span>
      </div>
      <div className="cards">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            lang={lang}
            known={mastered.has(card.id)}
            onToggle={toggle}
          />
        ))}
      </div>
      <div className="pager">
        <button disabled={!page} onClick={() => setPage(page - 1)}>
          ← Önceki
        </button>
        <button
          disabled={(page + 1) * 12 >= total}
          onClick={() => setPage(page + 1)}
        >
          Sonraki →
        </button>
      </div>
    </>
  );
}
