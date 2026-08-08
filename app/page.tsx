"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CATEGORIES, LANGUAGES, LEVELS, buildDeck, normalizeAnswer, type CategoryId, type LanguageId, type Level, type WordCard } from "../lib/curriculum";

type Mode = "cards" | "listen" | "write";
type Rating = "again" | "hard" | "good";
const PAGE_SIZE = 12;

function speak(card: WordCard) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(card.term);
  speech.lang = LANGUAGES.find((item) => item.id === card.language)?.locale ?? "en-US";
  speech.rate = .82;
  speechSynthesis.speak(speech);
}

function ProgressRing({ value }: { value: number }) {
  return <div className="progress-ring" style={{ "--progress": `${value * 3.6}deg` } as React.CSSProperties}><span>{value}%</span></div>;
}

function Controls({ language, level, category, setLanguage, setLevel, setCategory }: {
  language: LanguageId; level: Level; category: CategoryId;
  setLanguage: (value: LanguageId) => void; setLevel: (value: Level) => void; setCategory: (value: CategoryId) => void;
}) {
  return <section className="controls" aria-label="Çalışma ayarları">
    <label><span>DİL</span><select value={language} onChange={(e) => setLanguage(e.target.value as LanguageId)}>{LANGUAGES.map(x => <option key={x.id} value={x.id}>{x.label}</option>)}</select></label>
    <label><span>SEVİYE</span><select value={level} onChange={(e) => setLevel(e.target.value as Level)}>{LEVELS.map(x => <option key={x} value={x}>{x}</option>)}</select></label>
    <label><span>KATEGORİ</span><select value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}>{CATEGORIES.map(x => <option key={x.id} value={x.id}>{x.label}</option>)}</select></label>
    <div className="deck-count"><b>100</b><span>bu destede</span></div>
  </section>;
}

function StudyCard({ card, mode, revealed, setRevealed, answer, setAnswer, feedback, setFeedback, onRate }: {
  card: WordCard; mode: Mode; revealed: boolean; setRevealed: (v: boolean) => void;
  answer: string; setAnswer: (v: string) => void; feedback: "idle" | "correct" | "wrong"; setFeedback: (v: "idle" | "correct" | "wrong") => void;
  onRate: (rating: Rating) => void;
}) {
  function check(event: FormEvent) {
    event.preventDefault();
    setFeedback(normalizeAnswer(answer) === normalizeAnswer(card.term) ? "correct" : "wrong");
  }
  return <div className={`study-card ${feedback}`}>
    <div className="card-meta"><span>{card.level} · {card.categoryLabel}</span><span>#{String(card.index + 1).padStart(3, "0")}</span></div>
    {mode === "cards" && <>
      <button className="card-face" onClick={() => setRevealed(!revealed)} aria-label="Kartı çevir">
        <small>{revealed ? "ANLAMI" : "HEDEF DİL"}</small>
        <strong>{revealed ? card.turkish : card.term}</strong>
        <span>{revealed ? card.example : "Cevabı görmek için dokun"}</span>
      </button>
      <div className="rating-row" aria-label="Hatırlama puanı">
        <button onClick={() => onRate("again")}>TEKRAR <small>1 dk</small></button>
        <button onClick={() => onRate("hard")}>ZOR <small>10 dk</small></button>
        <button onClick={() => onRate("good")}>BİLDİM <small>1 gün</small></button>
      </div>
    </>}
    {mode === "listen" && <div className="listen-task">
      <button className="sound-orb" onClick={() => speak(card)}>▶</button><h3>Kelimeyi dinle.</h3><p>Ses ile anlam arasında doğrudan bağ kur. Hazır olduğunda cevabı aç.</p>
      <button className="reveal" onClick={() => setRevealed(!revealed)}>{revealed ? `${card.term} — ${card.turkish}` : "CEVABI AÇ"}</button>
      {revealed && <div className="rating-row"><button onClick={() => onRate("again")}>TEKRAR</button><button onClick={() => onRate("good")}>BİLDİM</button></div>}
    </div>}
    {mode === "write" && <form className="write-task" onSubmit={check}>
      <small>TÜRKÇEDEN HEDEF DİLE</small><h3>{card.turkish}</h3>
      <input value={answer} onChange={(e) => { setAnswer(e.target.value); setFeedback("idle"); }} placeholder="Karşılığını yaz…" autoComplete="off" />
      <p>{feedback === "correct" ? `Doğru · ${card.example}` : feedback === "wrong" ? `Olmadı · İlk harf: ${card.term[0]}` : "Aksan işaretleri kontrol sırasında normalize edilir."}</p>
      <button type="submit">KONTROL ET ↗</button>
      {feedback === "correct" && <button type="button" onClick={() => onRate("good")}>SONRAKİ KELİME →</button>}
    </form>}
  </div>;
}

export default function Page() {
  const [language, setLanguage] = useState<LanguageId>("en");
  const [level, setLevel] = useState<Level>("A1");
  const [category, setCategory] = useState<CategoryId>("daily");
  const [mode, setMode] = useState<Mode>("cards");
  const [cursor, setCursor] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [learned, setLearned] = useState<Record<string, Rating>>({});
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const deck = useMemo(() => buildDeck(language, level, category), [language, level, category]);
  const card = deck[cursor % deck.length];
  const results = useMemo(() => query ? deck.filter(x => normalizeAnswer(`${x.term} ${x.turkish}`).includes(normalizeAnswer(query))) : deck, [deck, query]);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { const data = localStorage.getItem("recallflow:v2"); if (data) setLearned(JSON.parse(data)); }, []);
  useEffect(() => { setCursor(0); setRevealed(false); setAnswer(""); setFeedback("idle"); }, [language, level, category, mode]);
  const completed = Object.values(learned).filter(x => x === "good").length;
  const daily = Math.min(10, completed);

  function rate(rating: Rating) {
    const next = { ...learned, [card.id]: rating };
    setLearned(next); localStorage.setItem("recallflow:v2", JSON.stringify(next));
    setCursor(value => value + 1); setRevealed(false); setAnswer(""); setFeedback("idle");
  }

  return <main>
    <nav className="topbar"><a className="brand" href="#top">RECALL<i>FLOW</i></a><div><a href="#study">ÇALIŞ</a><a href="#library">KÜTÜPHANE</a><a href="#method">METOT</a></div><button className="profile">TR <span>○</span></button></nav>

    <header className="dashboard" id="top">
      <div className="welcome"><span>BUGÜN / 08 AĞUSTOS</span><h1>Devam et.<br /><em>Ritmi bozma.</em></h1><p>Karar vermekle vakit kaybetme. Son desten hazır; on kelime yaklaşık dört dakika.</p><a href="#study">GÜNLÜK OTURUMU BAŞLAT ↓</a></div>
      <div className="today-card"><div><span>GÜNLÜK HEDEF</span><b>{daily}<i>/10</i></b><p>{daily === 10 ? "Bugünün hedefi tamamlandı." : `${10 - daily} kart kaldı. Başlamak için hazırsın.`}</p></div><ProgressRing value={daily * 10} /></div>
      <div className="stat-strip"><article><b>{completed}</b><span>ÖĞRENİLEN</span></article><article><b>3</b><span>GÜNLÜK SERİ</span></article><article><b>{Math.round(completed / Math.max(1, Object.keys(learned).length) * 100)}%</b><span>HATIRLAMA</span></article></div>
    </header>

    <section className="study" id="study">
      <div className="section-head"><div><span>01 / GÜNLÜK STÜDYO</span><h2>Tek görev.<br /><em>Sıfır sürtünme.</em></h2></div><p>Bir mod seç, kartı işle, sonraki kelimeye geç. İlerleme otomatik kaydedilir.</p></div>
      <Controls language={language} level={level} category={category} setLanguage={setLanguage} setLevel={setLevel} setCategory={setCategory} />
      <div className="mode-tabs" role="tablist">
        <button className={mode === "cards" ? "active" : ""} onClick={() => setMode("cards")}><b>01</b><span>KELİME KARTI<small>Aktif hatırlama</small></span></button>
        <button className={mode === "listen" ? "active" : ""} onClick={() => setMode("listen")}><b>02</b><span>DİNLE & BUL<small>Ses bağlantısı</small></span></button>
        <button className={mode === "write" ? "active" : ""} onClick={() => setMode("write")}><b>03</b><span>YAZARAK HATIRLA<small>Üretim pratiği</small></span></button>
      </div>
      <div className="study-stage"><div className="session-aside"><span>OTURUM</span><b>{String(cursor + 1).padStart(2, "0")}<i>/10</i></b><div className="session-line"><i style={{ width: `${((cursor % 10) + 1) * 10}%` }} /></div><p>Yanlış kartlar daha erken, bildiklerin daha geç tekrar kuyruğuna alınır.</p></div><StudyCard card={card} mode={mode} revealed={revealed} setRevealed={setRevealed} answer={answer} setAnswer={setAnswer} feedback={feedback} setFeedback={setFeedback} onRate={rate} /></div>
    </section>

    <section className="library" id="library">
      <div className="library-head"><div><span>02 / KELİME KÜTÜPHANESİ</span><h2>Aradığını bul.<br /><em>Dağılma.</em></h2></div><label><span>⌕</span><input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Kelime veya Türkçe anlam ara" /></label></div>
      <div className="word-grid">{visible.map(item => <article key={item.id} className={learned[item.id] === "good" ? "known" : ""}><div><span>{item.level}</span><button onClick={() => speak(item)}>SES ↗</button></div><h3>{item.term}</h3><b>{item.turkish}</b><p>{item.example}</p><button className="mini-action" onClick={() => { const index = deck.findIndex(x => x.id === item.id); setCursor(index); setMode("cards"); document.querySelector("#study")?.scrollIntoView(); }}>KARTI ÇALIŞ →</button></article>)}</div>
      <div className="pages"><button disabled={page === 1} onClick={() => setPage(x => x - 1)}>← ÖNCEKİ</button><span>{page} / {Math.max(1, Math.ceil(results.length / PAGE_SIZE))}</span><button disabled={page >= Math.ceil(results.length / PAGE_SIZE)} onClick={() => setPage(x => x + 1)}>SONRAKİ →</button></div>
    </section>

    <section className="method" id="method"><div><span>03 / NEDEN ÇALIŞIR?</span><h2>Az karar.<br /><em>Çok tekrar.</em></h2></div><ol><li><b>01</b><h3>Önce hatırla</h3><p>Cevabı hemen göstermek tanıma yanılsaması yaratır. Kart önce senden üretim ister.</p></li><li><b>02</b><h3>Zorluğu bildir</h3><p>Tekrar, zor ve bildim puanları kartın tekrar sırasını belirler.</p></li><li><b>03</b><h3>Bağlamda kapat</h3><p>Her cevap örnek cümleyle kapanır; kelime tek başına bırakılmaz.</p></li></ol></section>
    <footer><div><b>Bugün tek yapman gereken:</b><h2>10 kart.</h2><a href="#study">ŞİMDİ BAŞLA ↗</a></div><p>RECALLFLOW® · 5 DİL · A1—C2 · 2026</p></footer>
  </main>;
}
