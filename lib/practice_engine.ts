import { generateOfflineSentence } from './sentence_matrix';

export interface SentenceRequest {
  category: string;
  difficulty: string; // Kolay, Orta, Zor
  targetLanguage: string;
  history: string[];
  // Full persistent set of every sentence already shown for this
  // category+difficulty (see lib/storage.ts). Used to guarantee the LLM
  // path never repeats a sentence either, not just the offline matrix path.
  usedSentences?: Set<string>;
  useLLM?: boolean;
}

export interface SentenceResponse {
  tr: string;
  targetHint?: string;
  grammarNote?: string;
  source: 'llm' | 'matrix';
}

export async function fetchNextSentence(req: SentenceRequest): Promise<SentenceResponse> {
  const usedSentences = req.usedSentences || new Set<string>();

  if (req.useLLM) {
    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: req.category,
          difficulty: req.difficulty,
          targetLanguage: req.targetLanguage,
          // Send the full persisted history (not just the last 50 kept in
          // memory) so the model has maximum context to avoid repeats.
          previousSentences: Array.from(usedSentences).slice(-200)
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Defensive check: even if the LLM ignores the "don't repeat"
        // instruction, never hand back a sentence the user has already seen.
        if (data.tr && !usedSentences.has(data.tr)) {
          return {
            tr: data.tr,
            targetHint: data.targetHint,
            grammarNote: data.grammarNote,
            source: 'llm'
          };
        }
      }
    } catch (e) {
      console.warn('AI Prompt API çağrısı başarısız, offline matrise geçiliyor.');
    }
  }

  const trSentence = generateOfflineSentence(req.category, req.difficulty, usedSentences);
  return {
    tr: trSentence,
    source: 'matrix'
  };
}
