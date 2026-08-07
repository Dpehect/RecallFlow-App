"use client";
import { rituals } from "@/lib/content";
export function Rhythm({onBegin}:{onBegin:(word:string)=>void}){return <section className="rhythm" id="rhythm"><div className="rhythm-title"><p className="label">04 — RİTİM</p><h2>Program değil.<br/><i>Yakınlık.</i></h2></div><div className="rituals">{rituals.map((ritual,index)=><button key={ritual.id} onClick={()=>onBegin(ritual.title)}><span>{ritual.time}</span><h3>{ritual.title}</h3><p>{ritual.note}</p><b>{ritual.language.toUpperCase()}</b><i>0{index+1} ↗</i></button>)}</div></section>}
