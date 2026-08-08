"use client";
import { LANGUAGES, type WordCard } from "../lib/curriculum";
export function speak(card: WordCard) { if (!("speechSynthesis" in window)) return; speechSynthesis.cancel(); const speech = new SpeechSynthesisUtterance(card.term); speech.lang = LANGUAGES.find(x => x.id === card.language)?.locale ?? "en-US"; speech.rate = .82; speechSynthesis.speak(speech); }
export function SpeakButton({ card, label = "SES ↗" }: { card: WordCard; label?: string }) { return <button className="speak" aria-label={`${card.term} telaffuzunu dinle`} title="Telaffuzu dinle" onClick={() => speak(card)}>{label}</button>; }
