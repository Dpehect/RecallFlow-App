"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { vocabularyCategories, vocabularyLessons, vocabularyWords } from "./a1-vocabulary";

type View = "today" | "learn" | "listen" | "grammar" | "dialogue" | "exam" | "progress";

const listening = [
  { audio: "Wo fährt der Bus zum Bahnhof ab?", prompt: "Otobüsle ilgili hangi bilgi soruluyor?", options: ["Kalkış yeri", "Bilet fiyatı", "Varış saati"], answer: 0, note: "wo = nerede; abfahren = hareket etmek. Konuşan kişi otobüsün nereden kalktığını soruyor." },
  { audio: "Ich hätte gern ein Kilo Äpfel und zwei Flaschen Wasser.", prompt: "Konuşan kişi ne satın almak istiyor?", options: ["Elma ve su", "Ekmek ve süt", "Peynir ve meyve suyu"], answer: 0, note: "hätte gern kibar bir isteme kalıbıdır. Miktar sözcüklerine dikkat et: ein Kilo, zwei Flaschen." },
  { audio: "Der Termin ist nicht am Dienstag, sondern am Donnerstag um halb zehn.", prompt: "Randevu ne zaman?", options: ["Salı 10.30", "Perşembe 09.30", "Perşembe 10.30"], answer: 1, note: "nicht … sondern karşıtlık kurar. halb zehn Almancada 09.30 demektir." },
  { audio: "Wegen des Regens bleibt das Schwimmbad heute geschlossen.", prompt: "Yüzme havuzu neden kapalı?", options: ["Tadilat nedeniyle", "Yağmur nedeniyle", "Tatil nedeniyle"], answer: 1, note: "wegen = nedeniyle. geschlosssen/geschlossen ifadesi kapalı olduğunu belirtir." },
  { audio: "Bitte steigen Sie an der nächsten Haltestelle aus und gehen Sie nach links.", prompt: "Dinleyen kişi önce ne yapmalı?", options: ["Sola dönmeli", "Sonraki durakta inmeli", "Otobüse binmeli"], answer: 1, note: "Önce aussteigen (inmek), sonra nach links gehen (sola gitmek) isteniyor. Sıralamayı dinlemek önemli." },
];

const grammarTopics = [
  ["Kişi zamirleri", "ich, du, er/sie/es, wir, ihr, sie/Sie", "Wir lernen heute Deutsch.", "Biz bugün Almanca öğreniyoruz."],
  ["Fiil çekimi", "Düzenli fiiller kişiye göre ek alır.", "Du machst deine Hausaufgaben.", "Sen ödevlerini yapıyorsun."],
  ["Cümle dizilimi", "Ana cümlede çekimli fiil ikinci konumdadır.", "Am Montag arbeite ich zu Hause.", "Pazartesi günü evde çalışıyorum."],
  ["Akkusativ", "Doğrudan nesnede der → den olur.", "Ich kaufe den roten Pullover.", "Kırmızı kazağı satın alıyorum."],
  ["Dativ", "Konum ve dolaylı nesnede dem/der kullanılır.", "Ich helfe meiner Mutter.", "Anneme yardım ediyorum."],
  ["Modal fiiller", "können, müssen, wollen ana fiili sona iter.", "Ich kann heute nicht kommen.", "Bugün gelemem."],
  ["Ayrılabilen fiiller", "Ön ek ana cümlenin sonuna gider.", "Der Zug kommt um acht Uhr an.", "Tren saat sekizde varıyor."],
  ["Perfekt", "haben/sein + Partizip II ile geçmiş anlatılır.", "Wir sind nach Köln gefahren.", "Köln'e gittik."],
  ["Soru cümleleri", "W-sorusu başta, fiil ikinci sıradadır.", "Wann beginnt der Kurs?", "Kurs ne zaman başlıyor?"],
  ["Olumsuzluk", "kein isimleri, nicht diğer ögeleri olumsuzlar.", "Ich habe kein Auto.", "Arabam yok."],
  ["Edatlar", "mit, nach, aus, zu daima Dativ ister.", "Sie fährt mit dem Bus.", "O otobüsle gidiyor."],
  ["Bağlaçlar", "weil yan cümlede fiili sona gönderir.", "Ich lerne, weil ich in Berlin arbeite.", "Berlin'de çalıştığım için öğreniyorum."],
] as const;

const grammarExercises = [
  { prompt: "Biz bugün Almanca öğreniyoruz.", answers: ["wir lernen heute deutsch"], tip: "wir öznesiyle fiil -en eki alır." },
  { prompt: "Sen Berlin'de yaşıyorsun.", answers: ["du wohnst in berlin"], tip: "du öznesiyle wohnen → wohnst olur." },
  { prompt: "Pazartesi günü evde çalışıyorum.", answers: ["am montag arbeite ich zu hause"], tip: "Zaman ifadesi baştaysa çekimli fiil yine ikinci konumdadır." },
  { prompt: "Kırmızı kazağı satın alıyorum.", answers: ["ich kaufe den roten pullover"], tip: "Akkusativ'de der → den olur; sıfat -en eki alır." },
  { prompt: "Anneme yardım ediyorum.", answers: ["ich helfe meiner mutter"], tip: "helfen fiili Dativ ister: meine Mutter → meiner Mutter." },
  { prompt: "Bugün gelemem.", answers: ["ich kann heute nicht kommen"], tip: "Modal fiil ikinci konumda, asıl fiil mastar hâliyle sondadır." },
  { prompt: "Tren saat sekizde varıyor.", answers: ["der zug kommt um acht uhr an"], tip: "ankommen ayrılır; an ön eki ana cümlenin sonuna gider." },
  { prompt: "Köln'e gittik.", answers: ["wir sind nach köln gefahren"], tip: "fahren hareket bildirdiğinde Perfekt yardımcı fiili sein'dır." },
  { prompt: "Kurs ne zaman başlıyor?", answers: ["wann beginnt der kurs"], tip: "W-sorusu + çekimli fiil + özne sırasını kullan." },
  { prompt: "Arabam yok.", answers: ["ich habe kein auto"], tip: "Belirsiz bir ismi olumsuzlamak için kein kullanılır." },
  { prompt: "O otobüsle gidiyor.", answers: ["sie fährt mit dem bus", "er fährt mit dem bus"], tip: "mit daima Dativ ister: der Bus → dem Bus." },
  { prompt: "Berlin'de çalıştığım için Almanca öğreniyorum.", answers: ["ich lerne deutsch weil ich in berlin arbeite"], tip: "weil yan cümlesinde çekimli fiil sona gider." },
];

const dialogues = [
  { place: "Fırında", role: "Satıcı", goal: "İki ekmek iste, fiyatı sor ve teşekkür et.", opener: "Guten Morgen! Was darf es sein?", hints: ["Ich hätte gern …", "Wie viel kostet …?", "Vielen Dank!"] },
  { place: "Tren istasyonunda", role: "Görevli", goal: "Berlin'e bir bilet iste ve kalkış saatini sor.", opener: "Guten Tag. Wohin möchten Sie fahren?", hints: ["Eine Fahrkarte nach …", "Wann fährt der Zug ab?", "Hin und zurück"] },
  { place: "Doktorda", role: "Doktor", goal: "Başının ağrıdığını ve iki gündür hasta olduğunu söyle.", opener: "Guten Tag. Was fehlt Ihnen?", hints: ["Mein Kopf tut weh.", "Seit zwei Tagen …", "Ich habe Fieber."] },
];

const nav: { id: View; label: string; icon: string }[] = [
  { id: "today", label: "Öğren", icon: "●" }, { id: "learn", label: "Kelimeler", icon: "A" },
  { id: "listen", label: "Dinle", icon: "◖" }, { id: "grammar", label: "Gramer", icon: "§" },
  { id: "dialogue", label: "Konuş", icon: "↔" }, { id: "exam", label: "Sınav", icon: "★" },
  { id: "progress", label: "Gelişim", icon: "↗" },
];
const navDescriptions = ["Günlük rota", "720 kelime", "Ses laboratuvarı", "12 temel yapı", "Gerçek senaryolar", "Goethe · ÖSD", "Hafıza raporu"];

function speak(text: string, rate = .86) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = "de-DE"; u.rate = rate; speechSynthesis.speak(u);
}

function savedState() {
  if (typeof window === "undefined") return { xp: 120, streak: 4, mastered: [] as string[], hard: [] as string[], completedLessons: [] as string[] };
  try { return { xp: 120, streak: 4, mastered: [], hard: [], completedLessons: [], ...JSON.parse(localStorage.getItem("recallflow-v3") || "{}") }; }
  catch { return { xp: 120, streak: 4, mastered: [] as string[], hard: [] as string[], completedLessons: [] as string[] }; }
}

export default function Home() {
  const [view, setView] = useState<View>("today");
  const [menuOpen, setMenuOpen] = useState(false);
  const [xp, setXp] = useState(() => savedState().xp); const [streak] = useState(() => savedState().streak);
  const [mastered, setMastered] = useState<string[]>(() => savedState().mastered); const [hard, setHard] = useState<string[]>(() => savedState().hard);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => savedState().completedLessons);
  const [selectedCategory, setSelectedCategory] = useState(vocabularyCategories[0].title);
  const [selectedLessonId, setSelectedLessonId] = useState(vocabularyLessons[0].id); const [wordIndex, setWordIndex] = useState(0);
  const [revealed, setRevealed] = useState(false); const [listenIndex, setListenIndex] = useState(0);
  const [listenChoice, setListenChoice] = useState<number | null>(null); const [listenPlays, setListenPlays] = useState(0); const [grammarIndex, setGrammarIndex] = useState(0);
  const [translation, setTranslation] = useState(""); const [grammarFeedback, setGrammarFeedback] = useState("");
  const [dialogueIndex, setDialogueIndex] = useState(0); const [dialogueText, setDialogueText] = useState("");
  const [dialogueFeedback, setDialogueFeedback] = useState("");

  useEffect(() => { localStorage.setItem("recallflow-v3", JSON.stringify({ xp, streak, mastered, hard, completedLessons, date: new Date().toDateString() })); }, [xp, streak, mastered, hard, completedLessons]);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);

  const selectedLesson = vocabularyLessons.find(lesson => lesson.id === selectedLessonId) || vocabularyLessons[0];
  const lessonHardWords = selectedLesson.words.filter(word => hard.includes(word.id));
  const inRemediation = wordIndex >= selectedLesson.words.length;
  const activeWord = inRemediation && lessonHardWords.length
    ? lessonHardWords[(wordIndex - selectedLesson.words.length) % lessonHardWords.length]
    : selectedLesson.words[wordIndex % selectedLesson.words.length];
  const lessonMastered = selectedLesson.words.filter(word => mastered.includes(word.id)).length;
  const lessonProgress = Math.round((lessonMastered / selectedLesson.words.length) * 100);
  const categoryLessons = vocabularyLessons.filter(lesson => lesson.category === selectedCategory);
  const todayDone = Math.min(100, Math.round((mastered.length / 20) * 100));
  const totalProgress = Math.round((mastered.length / vocabularyWords.length) * 100);
  const retention = mastered.length ? Math.max(0, Math.round(((mastered.length - hard.length) / mastered.length) * 100)) : 0;
  const skillScores = useMemo(() => [
    ["Kelime", Math.min(94, 72 + mastered.length * 2)], ["Listening", Math.min(91, 64 + listenIndex * 4)],
    ["Dil bilgisi", Math.min(88, 61 + grammarIndex * 3)], ["Üretim", Math.min(86, 55 + (dialogueFeedback ? 18 : 0))]
  ], [mastered.length, listenIndex, grammarIndex, dialogueFeedback]);

  const rateWord = (remembered: boolean) => {
    const nextHard = remembered ? hard.filter(id => id !== activeWord.id) : [...new Set([...hard, activeWord.id])];
    if (remembered) { setMastered(v => [...new Set([...v, activeWord.id])]); setXp(x => x + 8); }
    else setMastered(v => v.filter(id => id !== activeWord.id));
    setHard(nextHard); setRevealed(false);
    const nextIndex = wordIndex + 1;
    const baseFinished = nextIndex >= selectedLesson.words.length;
    if (baseFinished && nextHard.filter(id => selectedLesson.words.some(word => word.id === id)).length === 0) {
      setCompletedLessons(v => [...new Set([...v, selectedLesson.id])]);
      const current = vocabularyLessons.findIndex(lesson => lesson.id === selectedLesson.id);
      const next = vocabularyLessons[(current + 1) % vocabularyLessons.length];
      setSelectedLessonId(next.id); setSelectedCategory(next.category); setWordIndex(0);
    } else setWordIndex(nextIndex);
  };

  const checkGrammar = () => {
    const normalized = translation.toLocaleLowerCase("de-DE").replace(/[.,!?]/g, "").trim();
    const exercise = grammarExercises[grammarIndex];
    if (exercise.answers.includes(normalized)) { setGrammarFeedback(`Doğru. ${exercise.tip}`); setXp(x => x + 15); }
    else setGrammarFeedback(`Henüz değil. ${exercise.tip} Örnek cevap: ${exercise.answers[0]}.`);
  };

  const checkDialogue = () => {
    const t = dialogueText.toLocaleLowerCase("de-DE"); const d = dialogues[dialogueIndex];
    const useful = d.hints.filter(h => t.includes(h.split(" ")[0].toLocaleLowerCase("de-DE"))).length;
    if (t.length < 12) setDialogueFeedback("Biraz daha üret: selamlama + isteğin + bir soru şeklinde en az iki cümle yaz.");
    else if (useful === 0) setDialogueFeedback(`Mesajın anlaşılabilir, fakat görevi daha doğal tamamlamak için şu kalıplardan birini kullan: ${d.hints.join(" · ")}`);
    else { setDialogueFeedback("Görev tamamlandı. İletişim amacı net, uygun bir A1 kalıbı kullandın. Şimdi aynı fikri ipucuna bakmadan yeniden söyle."); setXp(x => x + 20); }
  };

  return (
    <motion.main className="app-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45, ease: "easeOut" }}>
      <div className="floating-chrome"><button className="floating-logo" onClick={() => setView("today")} aria-label="Ana sayfa">RF</button><div className="section-indicator"><small>DEUTSCH · A1</small><strong>{nav.find(item=>item.id===view)?.label}</strong></div><button className={menuOpen?"menu-toggle open":"menu-toggle"} onClick={()=>setMenuOpen(value=>!value)} aria-expanded={menuOpen}><span>{menuOpen?"Kapat":"Keşfet"}</span><i/><i/></button></div>
      <AnimatePresence>{menuOpen&&<motion.div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Bölüm seç" initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 72px) 48px)" }} animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 72px) 48px)" }} exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 72px) 48px)" }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}><div className="overlay-intro"><span>RECALLFLOW / A1</span><h2>Bugün neyi<br/>geliştireceksin?</h2><p>Bir bölüm seç. Kaldığın yer ve bütün ilerlemen korunur.</p></div><div className="overlay-links">{nav.map((item,index)=><motion.button whileHover={{ x: 8 }} whileTap={{ scale: .98 }} key={item.id} className={view===item.id?"active":""} onClick={()=>{setView(item.id);setMenuOpen(false)}}><span>0{index+1}</span><div><strong>{item.label}</strong><small>{navDescriptions[index]}</small></div><i>↗</i></motion.button>)}</div><div className="overlay-status"><span><b>{totalProgress}%</b> A1 tamamlandı</span><span><b>{streak}</b> günlük seri</span><span><b>{xp}</b> XP</span></div></motion.div>}</AnimatePresence>

      <section className="content">
        {view === "today" && <div className="page today-page">
          <section className="hero-grid">
            <div className="hero-copy"><span className="eyebrow">A1 / GÜNLÜK ÇALIŞMA 08</span><h1>Bugün 20 kelime.<br/><i>Yarın daha az unutma.</i></h1><p>Tek bir odak: kısa ders, riskli kelimeler ve bir dinleme görevi. Gereksiz puanlar ve dikkat dağıtan ödüller yok.</p><button className="primary" onClick={() => setView("learn")}>Derse gir <span>↗</span></button></div>
            <div className="orbit-card"><div className="orbit"><span className="orbit-score">{todayDone}<small>%</small></span><i className="dot d1"/><i className="dot d2"/><i className="dot d3"/></div><strong>Bugünün akışı</strong><p>{Math.min(mastered.length,20)}/20 kelime tamamlandı</p></div>
          </section>

          <section className="plan-row">
            <article className="plan-card coral"><span className="number">01</span><div><small>MİKRO DERS</small><h3>{selectedLesson.category}</h3><p>{selectedLesson.words.length} kelime · 8 dakika</p></div><button onClick={() => setView("learn")}>→</button></article>
            <article className="plan-card blue"><span className="number">02</span><div><small>LISTENING</small><h3>Şehirde yön bulma</h3><p>5 soru · 4 dakika</p></div><button onClick={() => setView("listen")}>→</button></article>
            <article className="plan-card yellow"><span className="number">03</span><div><small>PEKİŞTİRME</small><h3>{hard.length || 8} riskli kelime</h3><p>Ustalık döngüsü · 3 dakika</p></div><button onClick={() => setView("learn")}>→</button></article>
          </section>

          <section className="skill-mixer"><div className="mixer-copy"><span className="eyebrow">ADAPTİF ÇALIŞMA</span><h2>Bir beceri seç.<br/><i>Akışı biz kuralım.</i></h2><p>RecallFlow son çalışmalarına göre kısa ve odaklı bir oturum hazırlar.</p><div className="mixer-signal"><span/><b>Bugün önerilen:</b> kelime + dinleme</div></div><div className="mixer-actions"><button className="mix-action vocab" onClick={()=>setView("learn")}><span>Aa</span><div><small>08 DAKİKA</small><strong>Kelime sprinti</strong></div><i>↗</i></button><button className="mix-action audio" onClick={()=>setView("listen")}><span>◖</span><div><small>05 DAKİKA</small><strong>Kulak antrenmanı</strong></div><i>↗</i></button><button className="mix-action grammar" onClick={()=>setView("grammar")}><span>§</span><div><small>06 DAKİKA</small><strong>Gramer odağı</strong></div><i>↗</i></button><button className="mix-action speak" onClick={()=>setView("dialogue")}><span>↔</span><div><small>07 DAKİKA</small><strong>Senaryo provası</strong></div><i>↗</i></button></div></section>

          <section className="learning-journey"><div className="journey-head"><div><span className="eyebrow">A1 ÖĞRENME YOLU</span><h2>Sıradaki durak neresi?</h2></div><button onClick={() => setView("progress")}>Tüm gelişim ↗</button></div><div className="journey-path">
            {["Temel iletişim", "Günlük yaşam", "Şehirde yaşam", "A1 sınav hazırlığı"].map((x, i) => {const ranges=[[0,9],[10,19],[20,27],[28,35]][i];const group=vocabularyLessons.slice(ranges[0],ranges[1]+1);const done=group.filter(l=>completedLessons.includes(l.id)).length;const pct=Math.round(done/group.length*100);return <button className={`journey-stop s${i} ${pct===100?"done":pct>0||i===0?"current":"locked"}`} key={x} onClick={()=>{const next=group.find(l=>!completedLessons.includes(l.id))||group[0];setSelectedCategory(next.category);setSelectedLessonId(next.id);setWordIndex(0);setView("learn")}}><span>{pct===100?"✓":i===0?"A":i===1?"B":i===2?"C":"★"}</span><div><strong>{x}</strong><small>{done}/{group.length} ders · %{pct}</small></div></button>})}
          </div><div className="journey-note"><span>🔥</span><div><strong>{streak} günlük seri</strong><p>Bugünün dersini tamamla, ritmi koru.</p></div><i><b style={{width:`${retention}%`}}/></i></div></section>
        </div>}

        {view === "learn" && <div className="page learn-page">
          <div className="page-title"><div><span className="eyebrow">AKTİF HATIRLAMA</span><h1>Kelime stüdyosu</h1><p>Her kategori iki bitirilebilir mikro derse ayrıldı. Zorlandığın kelimeler ders tamamlanmadan yeniden gelir.</p></div><div className="session-count"><b>{vocabularyWords.length}</b><span>gerçek kayıt</span></div></div>
          <div className="study-layout"><aside className="category-list"><small>18 KATEGORİ · {vocabularyWords.length} KELİME</small>{vocabularyCategories.map((category,i)=>{const categoryMastered=category.words.filter(word=>mastered.includes(word.id)).length;return <button key={category.title} onClick={()=>{const first=vocabularyLessons.find(lesson=>lesson.category===category.title)!;setSelectedCategory(category.title);setSelectedLessonId(first.id);setWordIndex(0);setRevealed(false)}} className={selectedCategory===category.title?"selected":""}><span>{String(i+1).padStart(2,"0")}</span><div><strong>{category.title}</strong><small>{categoryMastered}/{category.words.length} kelime · {category.lessonCount} ders</small></div><i>{categoryMastered===category.words.length?"✓":"→"}</i></button>})}</aside>
            <section className="flash-area"><div className="lesson-tabs">{categoryLessons.map(lesson=><button key={lesson.id} className={lesson.id===selectedLesson.id?"active":""} onClick={()=>{setSelectedLessonId(lesson.id);setWordIndex(0);setRevealed(false)}}><span>{completedLessons.includes(lesson.id)?"✓":lesson.number}</span><div><strong>{lesson.title}</strong><small>{lesson.words.length} kelime</small></div></button>)}</div><div className="session-top"><span>{selectedCategory} · Ders {selectedLesson.number}</span><div><b>{inRemediation?"Pekiştirme":`${Math.min(wordIndex+1,selectedLesson.words.length)}/${selectedLesson.words.length}`}</b> · %{lessonProgress} tamamlandı</div></div><div className={revealed?"flashcard revealed":"flashcard"} onClick={()=>setRevealed(true)}>
              <button className="sound" onClick={e=>{e.stopPropagation();speak(`${activeWord.article||""} ${activeWord.de}`)}} aria-label="Telaffuzu dinle">◖</button><span className="word-tag">{activeWord.article ? "İSİM" : "A1 KELİME"}</span><h2>{activeWord.article && <small>{activeWord.article}</small>} {activeWord.de}</h2>{!revealed?<><p>Anlamı hatırlamaya çalış</p><span className="reveal-hint">Cevabı görmek için karta dokun</span></>:<div className="answer"><strong>{activeWord.tr}</strong><p>{activeWord.example}</p><small>{activeWord.translation}</small></div>}</div>
              <div className="study-actions"><button className="ghost-danger" onClick={()=>rateWord(false)}>Tekrar çalış</button><button className="primary" disabled={!revealed} onClick={()=>rateWord(true)}>Hatırladım →</button></div><p className="study-note">Bir kelime yalnızca farklı günlerde ve farklı soru türlerinde başarı gösterdiğinde “kalıcı” olur.</p></section>
          </div>
        </div>}

        {view === "listen" && <div className="page listen-page">
          <div className="page-title"><div><span className="eyebrow">GERÇEK DİNLEME</span><h1>Listening laboratuvarı</h1><p>Ana fikri, ayrıntıyı, sayıları ve konuşmacının amacını ayrı ayrı ölçen A1 görevleri.</p></div><div className="session-count aqua"><b>{listenIndex+1}</b><span>/ {listening.length} soru</span></div></div>
          <div className="listen-grid"><section className="audio-stage"><div className="audio-meta"><span>GÖREV {listenIndex+1} · GÜNLÜK YAŞAM</span><em>{listenPlays}/3 dinleme</em></div><div className="wave">{Array.from({length:32}).map((_,i)=><i key={i} style={{height:`${18+((i*17)%52)}px`}}/>)}</div><button className="play" disabled={listenPlays>=3} onClick={()=>{speak(listening[listenIndex].audio,.78);setListenPlays(p=>Math.min(3,p+1))}}><span>▶</span> {listenPlays?"Tekrar dinle":"Kaydı oynat"}</button><div className="speed-row"><button onClick={()=>{speak(listening[listenIndex].audio,.65);setListenPlays(p=>Math.min(3,p+1))}}>0.75×</button><button className="active" onClick={()=>{speak(listening[listenIndex].audio,.86);setListenPlays(p=>Math.min(3,p+1))}}>1×</button><button onClick={()=>{speak(listening[listenIndex].audio,1);setListenPlays(p=>Math.min(3,p+1))}}>1.15×</button></div><p>Metin gösterilmez. Dinleme hakkını stratejik kullan.</p></section>
            <section className="question-card"><div className="question-progress"><i><b style={{width:`${((listenIndex+1)/listening.length)*100}%`}}/></i><span>{listenIndex+1}/{listening.length}</span></div><small>DİNLEDİĞİNİ ANLAMA</small><h2>{listening[listenIndex].prompt}</h2>{listenPlays===0&&<div className="listen-lock">Yanıtları açmak için önce kaydı dinle.</div>}<div className="options">{listening[listenIndex].options.map((o,i)=><button disabled={listenPlays===0} key={o} onClick={()=>setListenChoice(i)} className={listenChoice===i?"chosen":""}><span>{String.fromCharCode(65+i)}</span>{o}</button>)}</div>{listenChoice!==null&&<div className={listenChoice===listening[listenIndex].answer?"feedback good":"feedback warn"}><strong>{listenChoice===listening[listenIndex].answer?"Doğru yakaladın":"Bir kez daha dinle"}</strong><p>{listening[listenIndex].note}</p></div>}<button className="primary full" disabled={listenChoice===null} onClick={()=>{if(listenChoice===listening[listenIndex].answer)setXp(x=>x+12);setListenIndex(i=>(i+1)%listening.length);setListenChoice(null);setListenPlays(0)}}>Sonraki soru →</button></section></div>
          <div className="listen-skills">{[["Ana fikir","Konuyu hızlı yakala","84%"],["Ayrıntı","Saat, sayı ve yer bilgisi","68%"],["Niyet","Rica, teklif ve duyuru","76%"]].map(x=><article key={x[0]}><strong>{x[0]}</strong><p>{x[1]}</p><b>{x[2]}</b></article>)}</div>
        </div>}

        {view === "grammar" && <div className="page grammar-page"><div className="page-title"><div><span className="eyebrow">12 TEMEL KONU</span><h1>Dil bilgisi atölyesi</h1><p>Kuralı kısa öğren, Türkçe bağını gör ve her konuya özel görevle hemen üret.</p></div></div><div className="grammar-layout"><aside className="topic-grid">{grammarTopics.map((t,i)=><button key={t[0]} onClick={()=>{setGrammarIndex(i);setTranslation("");setGrammarFeedback("")}} className={grammarIndex===i?"active":""}><span>{String(i+1).padStart(2,"0")}</span><strong>{t[0]}</strong><small>{i<3?"Gelişiyor":"Başlangıç"}</small></button>)}</aside><section className="lesson-card"><div className="lesson-status"><small>KONU {grammarIndex+1} / 12</small><span>≈ 6 dakika</span></div><h2>{grammarTopics[grammarIndex][0]}</h2><p className="rule">{grammarTopics[grammarIndex][1]}</p><div className="example-box"><span>ÖRNEK YAPI</span><strong>{grammarTopics[grammarIndex][2]}</strong><p>{grammarTopics[grammarIndex][3]}</p></div><div className="translate-task"><span>AKTİF ÇEVİRİ</span><h3>“{grammarExercises[grammarIndex].prompt}”</h3><textarea value={translation} onChange={e=>setTranslation(e.target.value)} placeholder="Almanca cümleni yaz…"/><button className="primary" onClick={checkGrammar}>Cevabı analiz et</button>{grammarFeedback&&<div className={grammarFeedback.startsWith("Doğru")?"feedback good":"feedback warn"}><strong>{grammarFeedback.startsWith("Doğru")?"Doğru yapı":"Geliştirme noktası"}</strong><p>{grammarFeedback}</p></div>}<button className="text-button" onClick={()=>{setTranslation("");setGrammarFeedback("");setGrammarIndex(i=>(i+1)%grammarTopics.length)}}>Sonraki konu →</button></div></section></div></div>}

        {view === "dialogue" && <div className="page dialogue-page"><div className="page-title"><div><span className="eyebrow">ÜRETKEN ALMANCA</span><h1>Diyalog robotu</h1><p>Ezberlenmiş tek cevap değil; gerçek bir iletişim amacını tamamlamaya çalış.</p></div><button className="shuffle" onClick={()=>{setDialogueIndex(i=>(i+1)%dialogues.length);setDialogueText("");setDialogueFeedback("")}}>Yeni senaryo ↻</button></div><div className="dialogue-layout"><section className="mission"><small>SENARYO</small><h2>{dialogues[dialogueIndex].place}</h2><p>Karşındaki: <b>{dialogues[dialogueIndex].role}</b></p><div><span>GÖREVİN</span><strong>{dialogues[dialogueIndex].goal}</strong></div><ul>{dialogues[dialogueIndex].hints.map(h=><li key={h}>{h}</li>)}</ul></section><section className="chat-card"><div className="bot-line"><span>R</span><p>{dialogues[dialogueIndex].opener}</p><button onClick={()=>speak(dialogues[dialogueIndex].opener)}>◖</button></div><label>CEVABIN</label><textarea value={dialogueText} onChange={e=>setDialogueText(e.target.value)} placeholder="Almanca cevap yaz…"/><div className="chat-actions"><small>{dialogueText.length} karakter</small><button className="primary" onClick={checkDialogue}>Cevabı değerlendir</button></div>{dialogueFeedback&&<div className="feedback good"><strong>İletişim geri bildirimi</strong><p>{dialogueFeedback}</p></div>}</section></div></div>}

        {view === "exam" && <div className="page exam-page"><div className="page-title"><div><span className="eyebrow">GOETHE · ÖSD A1</span><h1>Sınav laboratuvarı</h1><p>Sınav biçimini temsil eden kısa görevler ve beceri bazlı sonuçlar.</p></div></div><div className="exam-hero"><div><span>HAZIRLIK DÜZEYİN</span><strong>72<small>/100</small></strong><p>Başlangıç için iyi. Listening ayrıntıları ve yazma görevlerinde daha fazla tekrar öneriyoruz.</p></div><button className="primary" onClick={()=>setView("listen")}>Mini sınavı başlat →</button></div><div className="exam-grid">{[["Hören","Duyuru, diyalog, telefon mesajı",43,"8 görev"],["Lesen","İlan, e-posta, tabela",68,"12 görev"],["Schreiben","Form ve kısa mesaj",57,"9 görev"],["Sprechen","Tanışma, soru ve rica",51,"10 görev"]].map((x,i)=><article key={x[0] as string}><span className={`exam-icon e${i}`}>{String(x[0]).slice(0,1)}</span><small>{x[3]}</small><h2>{x[0]}</h2><p>{x[1]}</p><div><i><b style={{width:`${x[2]}%`}}/></i><strong>{x[2]}%</strong></div><button onClick={()=>setView(i===0?"listen":i===3?"dialogue":"grammar")}>Pratik yap →</button></article>)}</div></div>}

        {view === "progress" && <div className="page progress-page"><div className="page-title"><div><span className="eyebrow">GERÇEK USTALIK</span><h1>İlerleme panosu</h1><p>Tek bir puan yerine her becerinin güçlü ve riskli yönlerini gör.</p></div></div><div className="metric-row"><article><small>ÇALIŞILAN</small><strong>{mastered.length}</strong><span>gerçek kelime</span></article><article><small>TAMAMLANAN</small><strong>{completedLessons.length}</strong><span>/ {vocabularyLessons.length} mikro ders</span></article><article><small>RİSKLİ</small><strong>{hard.length}</strong><span>tekrar bekliyor</span></article><article><small>KORUMA</small><strong>{retention}%</strong><span>aktif hafıza</span></article></div><div className="progress-grid"><section className="section-card"><small>BECERİ PROFİLİ</small><h2>Nerede güçleniyorsun?</h2>{skillScores.map(([name,score])=><div className="skill-line" key={name}><span>{name}</span><i><b style={{width:`${score}%`}}/></i><strong>{score}</strong></div>)}</section><section className="section-card"><small>USTALIK BASAMAKLARI</small><h2>Bir kelime nasıl kalıcı olur?</h2>{[["Tanıdık","Anlamı görünce tanıdı"],["Hatırlanıyor","Yardımsız üretti"],["Kullanılabiliyor","Cümlede doğru kullandı"],["Kalıcı","Farklı günlerde 4 başarı"]].map((x,i)=><div className="master-step" key={x[0]}><span>{i+1}</span><div><strong>{x[0]}</strong><p>{x[1]}</p></div><b>{i===0?mastered.length:i===1?Math.round(mastered.length*.65):i===2?Math.round(mastered.length*.35):completedLessons.length}</b></div>)}</section></div></div>}
      </section>
    </motion.main>
  );
}
