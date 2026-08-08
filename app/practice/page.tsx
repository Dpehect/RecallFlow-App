"use client";
import { FormEvent, useMemo, useState } from "react";
import { SiteNav } from "../../components/SiteNav";
import { DeckControls } from "../../components/DeckControls";
import { SpeakButton } from "../../components/SpeakButton";
import { buildDeck, buildStudyText, getCategories, normalizeAnswer, type CategoryId, type LanguageId, type Level } from "../../lib/curriculum";
import { loadLearning } from "../../lib/learning";

type Mode="flash"|"choice"|"free"|"listen"|"sentence"|"category"|"text";
type Feedback="idle"|"correct"|"wrong";
const methods:{id:Mode;title:string;description:string;meta:string;accent:string}[]=[
 {id:"flash",title:"Flashcard",description:"Gör, tahmin et, çevir.",meta:"TANIMA",accent:"acid"},
 {id:"choice",title:"Şıklı test",description:"Dört anlamdan doğru olanı ayır.",meta:"AYIRT ETME",accent:"violet"},
 {id:"free",title:"Şıksız test",description:"Türkçeden hedef dile üret.",meta:"AKTİF HATIRLAMA",accent:"coral"},
 {id:"listen",title:"Duyduğunu yaz",description:"Metni görmeden dinle ve yaz.",meta:"DİKTE",accent:"blue"},
 {id:"sentence",title:"Cümlede kullan",description:"Kelimeyi gerçek bağlama yerleştir.",meta:"ÜRETİM",accent:"orange"},
 {id:"category",title:"Bağlamı sınıfla",description:"Kelimeyi doğru konuya bağla.",meta:"SEMANTİK AĞ",accent:"mint"},
 {id:"text",title:"Yoğun okuma",description:"Tüm desteyi 1000+ karakterde gör.",meta:"OKUMA",accent:"ink"},
];

export default function PracticePage(){
 const initial=loadLearning().preferences;
 const[language,setLanguage]=useState<LanguageId>(initial.language),[level,setLevel]=useState<Level>(initial.level),[category,setCategory]=useState<CategoryId>(initial.category),[mode,setMode]=useState<Mode|null>(null),[index,setIndex]=useState(0),[revealed,setRevealed]=useState(false),[answer,setAnswer]=useState(""),[feedback,setFeedback]=useState<Feedback>("idle");
 const categories=getCategories(level),deck=useMemo(()=>buildDeck(language,level,category),[language,level,category]),card=deck[index%deck.length];
 const pool=useMemo(()=>categories.flatMap(item=>buildDeck(language,level,item.id)),[language,level,categories]);
 const alternatives=useMemo(()=>pool.filter(item=>item.id!==card.id&&normalizeAnswer(item.turkish)!==normalizeAnswer(card.turkish)),[pool,card]);
 const choices=useMemo(()=>{const offset=(index*7)%alternatives.length;return [card,...[0,1,2].map(step=>alternatives[(offset+step*5)%alternatives.length])].sort((a,b)=>a.turkish.localeCompare(b.turkish,"tr"))},[card,alternatives,index]);
 const categoryChoices=useMemo(()=>{const correct=categories.find(item=>item.id===card.category)!,others=categories.filter(item=>item.id!==card.category),offset=index%others.length;return [correct,...[0,1,2].map(step=>others[(offset+step)%others.length])].sort((a,b)=>a.label.localeCompare(b.label,"tr"))},[categories,card.category,index]);
 const studyText=useMemo(()=>buildStudyText(language,level,category),[language,level,category]);
 const sentenceValid=answer.trim().split(/\s+/).length>=5&&normalizeAnswer(answer).includes(normalizeAnswer(card.term));
 function reset(){setRevealed(false);setAnswer("");setFeedback("idle")}
 function selectMode(nextMode:Mode){const opening=mode!==nextMode;setMode(opening?nextMode:null);reset();if(opening)requestAnimationFrame(()=>document.getElementById("practice-panel")?.focus())}
 function next(){setIndex(value=>(value+1)%deck.length);reset()}
 function changeLanguage(value:LanguageId){setLanguage(value);setIndex(0);reset()}
 function changeLevel(value:Level){setLevel(value);setCategory(getCategories(value)[0].id);setIndex(0);reset()}
 function changeCategory(value:CategoryId){setCategory(value);setIndex(0);reset()}
 function check(event:FormEvent){event.preventDefault();setFeedback(normalizeAnswer(answer)===normalizeAnswer(card.term)?"correct":"wrong");setRevealed(true)}
 const active=methods.find(method=>method.id===mode);
 return <main><SiteNav/><section className="practice-hub"><header className="practice-intro"><div><span className="eyebrow">PRATİK LABORATUVARI / 07 YÖNTEM</span><h1>Nasıl çalışacağını <em>sen seç.</em></h1></div><p>Kısa bir yöntem seç, tek göreve odaklan ve bitir. Dev ekranlar, gereksiz kaydırma ve karar kalabalığı yok.</p></header><DeckControls language={language} level={level} category={category} onLanguage={changeLanguage} onLevel={changeLevel} onCategory={changeCategory}/>
 <section className="method-card-grid" aria-label="Öğrenme yöntemleri">{methods.map((method,order)=><button key={method.id} className={`${method.accent} ${mode===method.id?"active":""}`} aria-expanded={mode===method.id} aria-controls="practice-panel" onClick={()=>selectMode(method.id)}><span>0{order+1}</span><i>{method.meta}</i><b>{method.title}</b><small>{method.description}</small><em>{mode===method.id?"AÇIK":"BAŞLAT ↗"}</em></button>)}</section>
 {mode&&active&&<section id="practice-panel" tabIndex={-1} aria-live="polite" className={`compact-practice-panel ${feedback}`}><header><div><span className="eyebrow">{active.meta} · {level} · {card.categoryLabel}</span><h2>{active.title}</h2></div><div className="panel-progress"><b>{String(index+1).padStart(2,"0")}</b><span>/ {deck.length}</span><i><small style={{width:`${(index+1)/deck.length*100}%`}}/></i></div></header><div className="panel-body">
 {mode==="flash"&&<div className="compact-flash"><button onClick={()=>setRevealed(value=>!value)}><span>{revealed?"TÜRKÇE":"HEDEF DİL"}</span><strong>{revealed?card.turkish:card.term}</strong><small>{revealed?card.partOfSpeech:"KARTI ÇEVİR ↗"}</small></button>{revealed&&<button className="panel-next" onClick={next}>SONRAKİ →</button>}</div>}
 {mode==="choice"&&<div className="compact-test"><div className="prompt"><SpeakButton card={card} label="DİNLE"/><h3>{card.term}</h3><p>Doğru Türkçe karşılığı seç.</p></div><div className="answer-grid">{choices.map(choice=><button disabled={revealed} className={revealed&&choice.id===card.id?"right":""} key={choice.id} onClick={()=>{setFeedback(choice.id===card.id?"correct":"wrong");setRevealed(true)}}>{choice.turkish}</button>)}</div>{revealed&&<button className="panel-next" onClick={next}>{feedback==="correct"?"DOĞRU":"CEVABI İNCELE"} · SONRAKİ →</button>}</div>}
 {mode==="free"&&<RecallForm label="TÜRKÇEDEN HEDEF DİLE" prompt={card.turkish} answer={answer} revealed={revealed} feedback={feedback} expected={card.term} onAnswer={value=>{setAnswer(value);setRevealed(false);setFeedback("idle")}} onSubmit={check} onNext={next}/>}
 {mode==="listen"&&<form className="compact-form listen-form" onSubmit={check}><span>ÖNCE DİNLE, SONRA YAZ</span><SpeakButton card={card} label="▶ SESİ OYNAT"/><input aria-label="Duyduğun kelime" value={answer} onChange={event=>{setAnswer(event.target.value);setRevealed(false);setFeedback("idle")}} placeholder="Duyduğunu yaz…"/><p>{revealed?(feedback==="correct"?"Doğru duydun.":`Doğru yazım: ${card.term}`):"Kelime ekranda gösterilmez; aksan farkları normalize edilir."}</p><div><button>KONTROL ET</button>{revealed&&<button type="button" onClick={next}>SONRAKİ →</button>}</div></form>}
 {mode==="sentence"&&<form className="compact-form sentence-form" onSubmit={event=>{event.preventDefault();if(sentenceValid)setRevealed(true)}}><span>CÜMLEDE AKTİF ÜRETİM</span><h3>{card.term} <small>· {card.turkish}</small></h3><textarea value={answer} onChange={event=>{setAnswer(event.target.value);setRevealed(false)}} placeholder={`“${card.term}” ile en az 5 kelimelik bir cümle…`}/><div><button disabled={!sentenceValid}>CÜMLEYİ DENETLE</button>{revealed&&<button type="button" onClick={next}>SONRAKİ →</button>}</div><p>{sentenceValid?"Hazır: şimdi dilbilgisi, anlam ve register kontrolü yap.":`“${card.term}” ifadesi ve en az 5 kelime gerekli.`}</p></form>}
 {mode==="category"&&<div className="compact-test"><div className="prompt"><span>SEMANTİK AĞ</span><h3>{card.term}</h3><p>{card.turkish} hangi konu alanına ait?</p></div><div className="answer-grid">{categoryChoices.map(option=><button disabled={revealed} className={revealed&&option.id===card.category?"right":""} key={option.id} onClick={()=>{setFeedback(option.id===card.category?"correct":"wrong");setRevealed(true)}}>{option.icon} {option.label}</button>)}</div>{revealed&&<button className="panel-next" onClick={next}>SONRAKİ →</button>}</div>}
 {mode==="text"&&<div className="compact-reading"><header><div><span>TÜM {deck.length} KELİME · {studyText.length} KARAKTER</span><h3>{card.categoryLabel}</h3></div><SpeakButton card={{...card,term:studyText}} label="METNİ DİNLE"/></header><p>{studyText}</p></div>}
 </div></section>}</section></main>
}

function RecallForm({label,prompt,answer,revealed,feedback,expected,onAnswer,onSubmit,onNext}:{label:string;prompt:string;answer:string;revealed:boolean;feedback:Feedback;expected:string;onAnswer:(value:string)=>void;onSubmit:(event:FormEvent)=>void;onNext:()=>void}){
 return <form className="compact-form" onSubmit={onSubmit}><span>{label}</span><h3>{prompt}</h3><input aria-label="Cevap" value={answer} onChange={event=>onAnswer(event.target.value)} placeholder="Cevabını yaz…" autoComplete="off"/><p>{revealed?(feedback==="correct"?"Doğru. Aktif hatırlama tamamlandı.":`Beklenen cevap: ${expected}`):"Enter ile kontrol et; büyük/küçük harf ve aksan farkları normalize edilir."}</p><div><button>KONTROL ET</button>{revealed&&<button type="button" onClick={onNext}>SONRAKİ →</button>}</div></form>
}
