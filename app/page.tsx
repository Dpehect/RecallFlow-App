"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  CATEGORIES,
  LANGUAGES,
  LEVELS,
  buildDeck,
  normalizeAnswer,
  type CategoryId,
  type LanguageId,
  type Level,
  type WordCard,
} from "../lib/curriculum";

const PAGE_SIZE = 20;

function speak(card: WordCard) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(card.term);
  utterance.lang = LANGUAGES.find((language) => language.id === card.language)?.locale ?? "en-US";
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
}

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="mark">{children}</span>;
}

function WordArtwork({ category, index }: { category: CategoryId; index: number }) {
  return (
    <div className={`word-art art-${category}`} aria-hidden="true">
      <i className="shape shape-a" />
      <i className="shape shape-b" />
      <i className="shape shape-c" />
      <b>{String(index + 1).padStart(2, "0")}</b>
    </div>
  );
}

function WordSheet({ card, learned, onLearn }: { card: WordCard; learned: boolean; onLearn: () => void }) {
  return (
    <article className="word-sheet">
      <header>
        <span>{card.level} / {card.categoryLabel}</span>
        <button className="sound" onClick={() => speak(card)} aria-label={`${card.term} kelimesini dinle`}>↗ SES</button>
      </header>
      <div className="word-main">
        <p className="index">#{String(card.index + 1).padStart(3, "0")}</p>
        <h3>{card.term}</h3>
        <p className="translation">{card.turkish}</p>
        <p className="example">“{card.example}”</p>
        <p className="example-tr">{card.exampleTr}</p>
      </div>
      <button className={`learn-button ${learned ? "is-learned" : ""}`} onClick={onLearn}>
        {learned ? "ÖĞRENİLDİ ✓" : "HAFIZAYA EKLE +"}
      </button>
    </article>
  );
}

function Robot({ deck, language }: { deck: WordCard[]; language: LanguageId }) {
  const [round, setRound] = useState(0);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const card = deck[(round * 17 + 7) % deck.length];
  const languageName = LANGUAGES.find((item) => item.id === language)?.label;

  function check(event: FormEvent) {
    event.preventDefault();
    setStatus(normalizeAnswer(answer) === normalizeAnswer(card.term) ? "correct" : "wrong");
  }

  function next() {
    setRound((value) => value + 1);
    setAnswer("");
    setStatus("idle");
  }

  return (
    <section className="robot" id="robot">
      <div className="robot-copy">
        <Mark>RECALL ROBOT / AKTİF HAFIZA</Mark>
        <h2>Görme.<br /><em>Hatırla.</em></h2>
        <p>Robot sana Türkçe bir öğrenme birimi verir. Karşılığını {languageName} yaz; sistem aksan ve büyük-küçük harf farklarını normalize ederek kontrol eder.</p>
      </div>
      <form className={`robot-console ${status}`} onSubmit={check}>
        <div className="console-top"><span>R-{String(round + 1).padStart(2, "0")}</span><span>{card.level} · {card.categoryLabel}</span></div>
        <label htmlFor="robot-answer">“{card.turkish}”</label>
        <input id="robot-answer" value={answer} onChange={(event) => { setAnswer(event.target.value); setStatus("idle"); }} placeholder={`${languageName} karşılığını yaz`} autoComplete="off" />
        {status === "wrong" && <p className="feedback">Henüz değil. İlk harf: <b>{card.term.at(0)}</b></p>}
        {status === "correct" && <p className="feedback">Doğru. “{card.example}”</p>}
        <div className="console-actions">
          <button type="submit">KONTROL ET ↗</button>
          <button type="button" onClick={next}>SONRAKİ →</button>
        </div>
      </form>
    </section>
  );
}

export default function Page() {
  const [language, setLanguage] = useState<LanguageId>("en");
  const [level, setLevel] = useState<Level>("A1");
  const [category, setCategory] = useState<CategoryId>("daily");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [learned, setLearned] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("recallflow:learned");
    if (stored) setLearned(new Set(JSON.parse(stored) as string[]));
  }, []);

  const deck = useMemo(() => buildDeck(language, level, category), [language, level, category]);
  const results = useMemo(() => {
    const needle = normalizeAnswer(query);
    return needle ? deck.filter((card) => normalizeAnswer(`${card.term} ${card.turkish}`).includes(needle)) : deck;
  }, [deck, query]);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const activeLanguage = LANGUAGES.find((item) => item.id === language)!;

  function choose<T>(setter: (value: T) => void, value: T) {
    setter(value);
    setPage(1);
    setQuery("");
  }

  function toggleLearned(id: string) {
    setLearned((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem("recallflow:learned", JSON.stringify([...next]));
      return next;
    });
  }

  return (
    <main>
      <nav className="nav-shell" aria-label="Ana navigasyon">
        <a className="brand" href="#top">RECALL<span>FLOW</span></a>
        <div className="nav-pills"><a href="#atlas">ATLAS</a><a href="#robot">ROBOT</a><a href="#method">METOT</a></div>
        <a className="start" href="#atlas">ÇALIŞMAYA BAŞLA ↗</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <Mark>KELİME EZBERİ DEĞİL / HATIRLAMA STÜDYOSU</Mark>
          <h1>Dil,<br />zihninde<br /><em>iz bırakır.</em></h1>
          <p>Beş dil. Altı seviye. Her kategoride yüz gerçek öğrenme birimi. Gör, duy, cümlede yakala ve cevabı görmeden geri çağır.</p>
          <a href="#atlas">ATLASI AÇ <span>↓</span></a>
        </div>
        <div className="hero-stage" aria-hidden="true">
          <div className="orbit orbit-one">REMEMBER · RECALL · REPEAT ·</div>
          <div className="orbit orbit-two">WORT · WORD · MOT · PALABRA ·</div>
          <div className="core">R</div>
          <span className="floating-word w1">bonjour</span><span className="floating-word w2">saudade</span><span className="floating-word w3">erinnern</span><span className="floating-word w4">wander</span>
        </div>
        <div className="hero-stats"><div><b>18.000</b><span>ÖĞRENME KAYDI</span></div><div><b>05</b><span>DİL</span></div><div><b>A1—C2</b><span>TAM CEFR AKIŞI</span></div></div>
      </section>

      <section className="atlas" id="atlas">
        <div className="atlas-heading"><Mark>01 / KELİME ATLASI</Mark><h2>Bir liste değil,<br /><em>yaşayan arşiv.</em></h2><p>Her seçim tam 100 kayıt getirir. Sayfalama, binlerce kartın tarayıcıyı boğmasını engeller.</p></div>
        <div className="control-room">
          <div className="control-row"><span>DİL</span><div>{LANGUAGES.map((item) => <button key={item.id} className={language === item.id ? "active" : ""} onClick={() => choose(setLanguage, item.id)}>{item.code} {item.label}</button>)}</div></div>
          <div className="control-row"><span>SEVİYE</span><div>{LEVELS.map((item) => <button key={item} className={level === item ? "active" : ""} onClick={() => choose(setLevel, item)}>{item}</button>)}</div></div>
          <div className="control-row categories"><span>KATEGORİ</span><div>{CATEGORIES.map((item) => <button key={item.id} className={category === item.id ? "active" : ""} onClick={() => choose(setCategory, item.id)}>{item.icon} {item.label}</button>)}</div></div>
          <label className="search"><span>ARA /</span><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={`${activeLanguage.label} veya Türkçe ara`} /></label>
        </div>
        <div className="archive-caption"><span>{activeLanguage.label.toUpperCase()} · {level} · {CATEGORIES.find((item) => item.id === category)?.label.toUpperCase()}</span><b>{String(results.length).padStart(3, "0")} KAYIT</b></div>
        <div className="word-rail">
          {visible.map((card, index) => <div className="word-unit" key={card.id}><WordArtwork category={category} index={(page - 1) * PAGE_SIZE + index} /><WordSheet card={card} learned={learned.has(card.id)} onLearn={() => toggleLearned(card.id)} /></div>)}
        </div>
        <div className="pagination"><button disabled={page === 1} onClick={() => setPage((value) => value - 1)}>← ÖNCEKİ</button><span>{String(page).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span><button disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>SONRAKİ →</button></div>
      </section>

      <Robot deck={deck} language={language} />

      <section className="method" id="method">
        <Mark>02 / METOT</Mark>
        <div className="method-grid"><h2>Kelimeyi<br />tüketme.<br /><em>İşle.</em></h2><ol><li><b>01</b><span>BAĞLAMI GÖR</span><p>Her kayıt gerçek kullanım fikri veren bir cümleyle açılır.</p></li><li><b>02</b><span>SESİ DUY</span><p>Tarayıcının doğal ses motoru hedef dilin ritmini kurar.</p></li><li><b>03</b><span>GERİ ÇAĞIR</span><p>Robot, Türkçeden hedef dile aktif hatırlamayı zorlar.</p></li></ol></div>
      </section>

      <footer><div className="footer-call"><span>BUGÜNÜN KELİMESİ</span><h2>{deck[7].term}</h2><button onClick={() => speak(deck[7])}>SESLİ DİNLE ↗</button></div><div className="footer-bottom"><b>RECALLFLOW®</b><span>5 DİL · 6 SEVİYE · 18.000 KAYIT</span><span>İSTANBUL / 2026</span></div></footer>
    </main>
  );
}
