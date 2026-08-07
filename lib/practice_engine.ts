import { generateOfflineSentence } from './sentence_matrix';

export interface SentenceRequest {
  category: string;
  level: string;
  targetLanguage: string;
  history: string[];
  useLLM?: boolean;
}

export interface SentenceResponse {
  tr: string;
  targetHint?: string;
  grammarNote?: string;
  source: 'llm' | 'matrix';
}

export async function fetchNextSentence(req: SentenceRequest): Promise<SentenceResponse> {
  if (req.useLLM) {
    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: req.category,
          level: req.level,
          targetLanguage: req.targetLanguage,
          previousSentences: req.history
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.tr) {
          return {
            tr: data.tr,
            targetHint: data.targetHint,
            grammarNote: data.grammarNote,
            source: 'llm'
          };
        }
      }
    } catch (e) {
      console.warn('LLM API çağrısı başarısız oldu, çevrimdışı matrise geçiliyor...', e);
    }
  }

  // Fallback to offline combinatorial matrix
  const trSentence = generateOfflineSentence(req.category, req.level, req.history);
  return {
    tr: trSentence,
    source: 'matrix'
  };
}
