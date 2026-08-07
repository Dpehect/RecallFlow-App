export interface TargetLanguage {
  id: string;       // value stored in practice-context / sent to the prompt engine
  code: string;      // ISO-ish short code shown in compact UI
  flag: string;       // emoji flag
  labelTr: string;    // Turkish label shown to the learner
}

// The five target languages RecallFlow teaches. `id` is intentionally kept
// as the human-readable string the API route already expects
// (see app/api/generate-prompt/route.ts), so this file only adds display
// metadata on top of the existing contract rather than changing it.
export const TARGET_LANGUAGES: TargetLanguage[] = [
  { id: 'German (Almanca)', code: 'DE', flag: '🇩🇪', labelTr: 'Almanca' },
  { id: 'English (İngilizce)', code: 'EN', flag: '🇬🇧', labelTr: 'İngilizce' },
  { id: 'Portuguese (Portekizce)', code: 'PT', flag: '🇵🇹', labelTr: 'Portekizce' },
  { id: 'Spanish (İspanyolca)', code: 'ES', flag: '🇪🇸', labelTr: 'İspanyolca' },
  { id: 'French (Fransızca)', code: 'FR', flag: '🇫🇷', labelTr: 'Fransızca' },
];

export function getLanguageById(id: string): TargetLanguage {
  return TARGET_LANGUAGES.find((l) => l.id === id) || TARGET_LANGUAGES[0];
}
