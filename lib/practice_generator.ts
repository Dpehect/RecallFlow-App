import { generateOfflineSentence } from './sentence_matrix';

export interface PromptOptions {
  category?: string;
  level?: string;
  targetLanguage?: string;
  history?: string[];
  useLLM?: boolean;
}

export async function generateRadicalPromptAsync(options: PromptOptions = {}): Promise<{
  tr: string;
  targetHint?: string;
  grammarNote?: string;
}> {
  const { category = 'daily', level = 'A1', targetLanguage = 'German', history = [], useLLM = true } = options;

  if (useLLM && typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          level,
          targetLanguage,
          previousSentences: history
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.tr) {
          return {
            tr: data.tr,
            targetHint: data.targetHint,
            grammarNote: data.grammarNote
          };
        }
      }
    } catch (e) {
      console.warn('AI Prompt API çağrısı başarısız, offline matrise geçiliyor.');
    }
  }

  const sentence = generateOfflineSentence(category, level, history);
  return { tr: sentence };
}

// Retain backwards compatibility with original generateRadicalPrompt function signature
export function generateRadicalPrompt(category: string = 'daily', level: string = 'A1', history: string[] = []): string {
  return generateOfflineSentence(category, level, history);
}
