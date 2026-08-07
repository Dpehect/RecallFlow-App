"use client";
import { useState } from "react";
import { ThresholdHero } from "@/features/threshold/ThresholdHero";
import { LexiconAtlas } from "@/features/lexicon/LexiconAtlas";
import { FocusRoom } from "@/features/focus/FocusRoom";
import { Rhythm } from "@/features/rhythm/Rhythm";
import { RecallOverlay } from "@/features/recall/RecallOverlay";
export default function Home(){const[recall,setRecall]=useState({open:false,word:"iz"});const begin=(word:string)=>setRecall({open:true,word});return <main><header className="site-head"><a href="#top" className="brand">R<span>/</span>F</a><nav><a href="#atlas">Atlas</a><a href="#focus">Focus</a><a href="#rhythm">Ritim</a></nav><button onClick={()=>begin("iz")}>PRACTICE ↗</button></header><ThresholdHero onBegin={()=>begin("iz")}/><LexiconAtlas onRecall={begin}/><FocusRoom/><Rhythm onBegin={begin}/><section className="final"><p>Bir sonraki kelimeyi<br/>ezberleme.</p><button onClick={()=>begin("eşik")}>ONUNLA<br/><i>KARŞILAŞ.</i><b>↗</b></button><small>RECALLFLOW / LANGUAGE AS PRACTICE</small></section><footer><span>R/F — 2026</span><span>ISTANBUL ↔ WORLD</span><span>MADE FOR ATTENTION</span></footer><RecallOverlay {...recall} onClose={()=>setRecall(x=>({...x,open:false}))}/></main>}
