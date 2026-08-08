import type { CategoryId, LanguageId, Level } from "./curriculum";
export type Rating = "again" | "hard" | "good";
export type Review = { rating: Rating; reviewedAt: number; dueAt: number; interval: number; repetitions: number };
export type LearningData = { reviews: Record<string, Review>; history: { cardId: string; rating: Rating; at: number }[]; preferences: { language: LanguageId; level: Level; category: CategoryId } };
export const EMPTY_DATA: LearningData = { reviews: {}, history: [], preferences: { language: "en", level: "A1", category: "daily" } };
const KEY="recallflow:learning:v3";
export function loadLearning(): LearningData { if(typeof window==="undefined")return EMPTY_DATA;try{return {...EMPTY_DATA,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return EMPTY_DATA} }
export function saveLearning(data: LearningData){localStorage.setItem(KEY,JSON.stringify(data));window.dispatchEvent(new Event("recallflow:update"))}
export function schedule(previous: Review|undefined,rating: Rating,now=Date.now()):Review{const repetitions=rating==="again"?0:(previous?.repetitions??0)+1;const interval=rating==="again"?1:rating==="hard"?10:repetitions===1?1440:Math.round((previous?.interval??1440)*2.35);return{rating,reviewedAt:now,dueAt:now+interval*60_000,interval,repetitions}}
export function recordReview(cardId:string,rating:Rating,data:LearningData=loadLearning()){const now=Date.now();const next={...data,reviews:{...data.reviews,[cardId]:schedule(data.reviews[cardId],rating,now)},history:[...data.history.slice(-499),{cardId,rating,at:now}]};saveLearning(next);return next}
export function savePreferences(preferences:LearningData["preferences"]){const data=loadLearning();saveLearning({...data,preferences})}
export function dayKey(time:number){return new Date(time).toISOString().slice(0,10)}
export function streak(history:LearningData["history"]){const days=new Set(history.map(x=>dayKey(x.at)));let count=0;const date=new Date();while(days.has(dayKey(date.getTime()))){count++;date.setDate(date.getDate()-1)}return count}
