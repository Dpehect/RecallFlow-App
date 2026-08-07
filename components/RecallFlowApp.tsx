"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header, type View } from "@/components/layout/Header";
import { Workspace } from "@/components/layout/Workspace";
import { Home } from "@/components/features/Home";
import { Vocabulary } from "@/components/features/Vocabulary";
import { ReadingStudio } from "@/components/features/ReadingStudio";
import {
  ListeningStudio,
  TranslationBot,
} from "@/components/features/QuizStudio";
import { createDeck } from "@/lib/deck";
import { stopSpeech } from "@/lib/tts";
import { useProgress } from "@/hooks/useProgress";
import { languages } from "@/content/curriculum";
import type { Category, Lang, Level } from "@/types/domain";
const titles: Record<Exclude<View, "home">, string> = {
  vocab: "Kelime Atlası",
  reading: "Okuma Stüdyosu",
  listening: "Dinleme Laboratuvarı",
  robot: "Çeviri Robotu",
};
export function RecallFlowApp() {
  const [view, setView] = useState<View>("home"),
    [lang, setLang] = useState<Lang>("en"),
    [level, setLevel] = useState<Level>("A1"),
    [category, setCategory] = useState<Category | null>(null),
    [page, setPage] = useState(0);
  const { mastered, toggle } = useProgress();
  const deck = useMemo(() => createDeck(lang, level), [lang, level]);
  const filtered = useMemo(
    () => (category ? deck.filter((card) => card.category === category) : deck),
    [category, deck],
  );
  useEffect(() => setPage(0), [category, lang, level]);
  useEffect(() => stopSpeech, []);
  const changeView = (next: View) => {
    stopSpeech();
    setView(next);
  };
  const changeLang = (next: Lang) => {
    stopSpeech();
    setLang(next);
  };
  return (
    <main>
      <Header view={view} lang={lang} onView={changeView} onLang={changeLang} />
      <AnimatePresence mode="wait">
        <motion.section
          key={`${view}-${lang}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
        >
          {view === "home" ? (
            <Home go={changeView} lang={lang} mastered={mastered.size} />
          ) : (
            <Workspace
              title={titles[view]}
              kicker={`${languages[lang].native} · ${level}`}
              lang={lang}
              level={level}
              setLevel={setLevel}
            >
              {view === "vocab" && (
                <Vocabulary
                  cards={filtered.slice(page * 12, page * 12 + 12)}
                  category={category}
                  setCategory={setCategory}
                  page={page}
                  setPage={setPage}
                  total={filtered.length}
                  lang={lang}
                  mastered={mastered}
                  toggle={toggle}
                />
              )}{" "}
              {view === "reading" && (
                <ReadingStudio lang={lang} level={level} />
              )}{" "}
              {view === "listening" && (
                <ListeningStudio cards={deck} lang={lang} level={level} />
              )}{" "}
              {view === "robot" && (
                <TranslationBot cards={deck} lang={lang} level={level} />
              )}
            </Workspace>
          )}
        </motion.section>
      </AnimatePresence>
      <footer>
        <b>RecallFlow</b>
        <span>Her gün biraz. Her gün gerçekten.</span>
        <span>600 alıştırma kartı × 5 seviye × 3 dil</span>
      </footer>
    </main>
  );
}
