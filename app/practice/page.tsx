"use client";
import { FormEvent, useMemo, useState } from "react";
import { SiteNav } from "../../components/SiteNav";
import { DeckControls } from "../../components/DeckControls";
import { SpeakButton } from "../../components/SpeakButton";
import { buildDeck, buildStudyText, getCategories, normalizeAnswer, type CategoryId, type LanguageId, type Level } from "../../lib/curriculum";
import { loadLearning } from "../../lib/learning";

type Mode="flash"|"choice"|"free"|"sentence"|"text";
const modes:[Mode,string][]=[["flash","FLASHCARD"],["choice","ŞIKLI TEST"],["free","ŞIKSIZ TEST"],["sentence","CÜMLE KUR"],["text","1000 KARAKTER METİN"]];

export default function PracticePage(){
 const initial=loadLearning().preferences;
 const[language,setLanguage]=useState<LanguageId>(initial.language),[level,setLevel]=useState<Level>(initial.level),[category,setCategory]=useState<CategoryId>(initial.category),[mode,setMode]=useState<Mode>("flash"),[index,setIndex]=useState(0),[revealed,setRevealed]=useState(false),[answer,setAnswer]=useState(""),[feedback,setFeedback]=useState<"idle"|"correct"|"wrong">("idle");
 const deck=useMemo(()=>buildDeck(language,level,category),[language,level,category]),card=deck[index%deck.length];
 const pool=useMemo(()=>getCategories(level).flatMap(item=>buildDeck(language,level,item.id)),[language,level]);
 const choices=useMemo(()=>{const alternatives=pool.filter(item=>item.id!==card.id&&normalizeAnswer(item.turkish)!==normalizeAnswer(card.turkish));const offset=(index*7)%Math.max(1,alternatives.length);return [card,...[0,1,2].map(step=>alternatives[(offset+step*5)%alternatives.length])].sort((a,b)=>a.turkish.localeCompare(b.turkish,"tr"))},[card,pool,index]);
 const studyText=useMemo(()=>buildStudyText(language,level,category),[language,level,category]);
 function reset(){setRevealed(false);setAnswer("");setFeedback("idle")}
 function next(){setIndex(value=>(value+1)%deck.length);reset()}
 function changeLanguage(value:LanguageId){setLanguage(value);setIndex(0);reset()}
 function changeLevel(value:Level){setLevel(value);setCategory(getCategories(value)[0].id);setIndex(0);reset()}
 function changeCategory(value:CategoryId){setCategory(value);setIndex(0);reset()}
 function check(event:FormEvent){event.preventDefault();setFeedback(normalizeAnswer(answer)===normalizeAnswer(card.term)?"correct":"wrong");setRevealed(true)}
 const sentenceValid=answer.trim().split(/\s+/).length>=5&&normalizeAnswer(answer).includes(normalizeAnswer(card.term));
 return <main><SiteNav/><header className="practice-head"><div><span className="eyebrow">02 / PRATİK LABORATUVARI</span><h1>Aynı kelime.<br/><em>Beş farklı geri çağırma.</em></h1></div><p>Pasif bakış yok. Kartı çevir, dinleyip seç, cevabı yaz, cümle üret veya bütün kategoriyi tek metinde oku.</p></header><section className="practice-shell"><DeckControls language={language} level={level} category={category} onLanguage={changeLanguage} onLevel={changeLevel} onCategory={changeCategory}/><div className="practice-modes" role="tablist">{modes.map(([id,label],order)=><button key={id} role="tab" aria-selected={mode===id} className={mode===id?"active":""} onClick={()=>{setMode(id);reset()}}><b>0{order+1}</b>{label}</button>)}</div><div className={`practice-stage ${feedback}`}><aside><span className="eyebrow">{level} · {card.categoryLabel}</span><b>{String(index+1).padStart(2,"0")}<i>/{deck.length}</i></b><div><i style={{width:`${(index+1)/deck.length*100}%`}}/></div><small>{card.exam}<br/>{card.skill.toLocaleUpperCase("tr-TR")} ODAĞI</small></aside><article>
 {mode==="flash"&&<div className="lab-flash-wrap"><button className="lab-flash" onClick={()=>setRevealed(value=>!value)}><span>{revealed?"TÜRKÇE":"HEDEF DİL"}</span><strong>{revealed?card.turkish:card.term}</strong><small>{revealed?card.partOfSpeech:"CEVABI AÇ ↗"}</small></button>{revealed&&<button className="lab-next" onClick={next}>SONRAKİ KART →</button>}</div>}
 {mode==="choice"&&<div className="lab-test"><SpeakButton card={card} label="DİNLE ↗"/><h2>{card.term}</h2><p>Doğru Türkçe karşılığı seç.</p><div>{choices.map(choice=><button disabled={revealed} className={revealed&&choice.id===card.id?"right":""} key={choice.id} onClick={()=>{setFeedback(choice.id===card.id?"correct":"wrong");setRevealed(true)}}>{choice.turkish}</button>)}</div>{revealed&&<button className="lab-next" onClick={next}>{feedback==="correct"?"DOĞRU":"TEKRAR ET"} · SONRAKİ →</button>}</div>}
 {mode==="free"&&<form className="lab-form" onSubmit={check}><span>TÜRKÇEDEN HEDEF DİLE</span><h2>{card.turkish}</h2><input value={answer} onChange={event=>{setAnswer(event.target.value);setFeedback("idle");setRevealed(false)}} placeholder="Karşılığını yaz"/><p>{revealed?(feedback==="correct"?"Doğru.":`Beklenen cevap: ${card.term}`):"Büyük/küçük harf ve aksan farkları normalize edilir."}</p><button>{revealed?"YENİDEN KONTROL":"KONTROL ET ↗"}</button>{revealed&&<button type="button" onClick={next}>SONRAKİ →</button>}</form>}
 {mode==="sentence"&&<form className="lab-form sentence" onSubmit={event=>{event.preventDefault();if(sentenceValid)setRevealed(true)}}><span>CÜMLEDE AKTİF ÜRETİM</span><h2>{card.term}</h2><p>{card.turkish} anlamındaki sözcüğü kullanarak en az 5 kelimelik bir cümle yaz.</p><textarea value={answer} onChange={event=>{setAnswer(event.target.value);setRevealed(false)}} placeholder={`“${card.term}” sözcüğünü içeren cümlen…`}/><button disabled={!sentenceValid}>CÜMLEYİ DENETLE ↗</button>{!sentenceValid&&answer&&<small className="sentence-hint">Cümle en az 5 kelime olmalı ve “{card.term}” ifadesini içermeli.</small>}{revealed&&<div className="sentence-check"><b>ÖZ DENETİM</b><span>□ Sözcük doğru bağlamda mı?</span><span>□ Fiil ve özne uyumlu mu?</span><span>□ Cümle sınavda savunulabilir mi?</span><button type="button" onClick={next}>SONRAKİ KELİME →</button></div>}</form>}
 {mode==="text"&&<div className="lab-reading"><header><div><span>TÜM {deck.length} KELİME · {studyText.length} KARAKTER</span><h2>{card.categoryLabel}</h2></div><SpeakButton card={{...card,term:studyText}} label="METNİ DİNLE ↗"/></header><p>{studyText}</p></div>}
 </article></div></section></main>
}
