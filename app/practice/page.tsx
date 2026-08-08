"use client";
import Link from "next/link";
import { useState } from "react";
import { SiteNav } from "../../components/SiteNav";
import { DeckControls } from "../../components/DeckControls";
import { getCategories, type CategoryId, type LanguageId, type Level } from "../../lib/curriculum";
import { loadLearning } from "../../lib/learning";
import { PRACTICE_METHODS } from "../../lib/practice";

export default function PracticeIndex(){
 const initial=loadLearning().preferences,[language,setLanguage]=useState<LanguageId>(initial.language),[level,setLevel]=useState<Level>(initial.level),[category,setCategory]=useState<CategoryId>(initial.category);
 function changeLevel(value:Level){setLevel(value);setCategory(getCategories(value)[0].id)}
 const query=`lang=${language}&level=${level}&category=${category}`;
 return <main><SiteNav/><section className="practice-index"><header className="practice-index-head"><div><span className="eyebrow">RECALLFLOW / PRACTİK SİSTEMİ</span><h1>Bir yöntem seç.<br/><em>Tek işe odaklan.</em></h1></div><div><b>07</b><p>Birbirini tamamlayan aktif öğrenme protokolü. Seçimin ayrı, dikkat dağıtmayan bir çalışma odasında açılır.</p></div></header><div className="practice-index-controls"><DeckControls language={language} level={level} category={category} onLanguage={setLanguage} onLevel={changeLevel} onCategory={setCategory}/><span>Seçimin çalışma odasına taşınır</span></div><section className="practice-route-grid">{PRACTICE_METHODS.map(method=><Link className={method.accent} key={method.id} href={`/practice/${method.id}?${query}`}><header><span>{method.number}</span><i>{method.meta}</i></header><div className="method-glyph" aria-hidden="true"><b>{method.number}</b><span/></div><footer><div><h2>{method.title}</h2><p>{method.description}</p></div><aside><span>{method.duration}</span><b>ODAYI AÇ ↗</b></aside></footer></Link>)}</section></section></main>
}
