import type { Lang } from "@/types/domain";
import { languages } from "@/content/curriculum";
let active: SpeechSynthesisUtterance | null = null;
export function stopSpeech() {
  if (typeof window !== "undefined" && "speechSynthesis" in window)
    window.speechSynthesis.cancel();
  active = null;
}
export function speak(text: string, lang: Lang, onEnd?: () => void): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window))
    return false;
  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languages[lang].voice;
  utterance.rate = 0.88;
  utterance.onend = () => {
    active = null;
    onEnd?.();
  };
  utterance.onerror = () => {
    active = null;
    onEnd?.();
  };
  active = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
}
