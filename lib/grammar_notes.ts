export interface GrammarLevelInfo {
  id: string;
  cefr: string;
  title: string;
  description: string;
  focusPoints: string[];
}

// Single source of truth for the difficulty -> grammar guidance mapping.
// Used by app/api/generate-prompt/route.ts (sent to the LLM prompt engine)
// and by components/sections/DilBilgisiSection.tsx (shown to the user).
export const GRAMMAR_LEVELS: Record<string, GrammarLevelInfo> = {
  Kolay: {
    id: 'Kolay',
    cefr: 'A1-A2',
    title: 'Kolay (A1-A2)',
    description: 'Kısa, doğrudan, temel kelimeler ve basit zamanlar (Özne + Nesne + Fiil).',
    focusPoints: [
      'Şimdiki zaman (-yor)',
      'Basit özne-nesne-yüklem sırası',
      'Temel günlük kelime hazinesi',
    ],
  },
  Orta: {
    id: 'Orta',
    cefr: 'B1-B2',
    title: 'Orta (B1-B2)',
    description: 'Orta uzunlukta, zaman zarfları, edatlar ve bağlaçlar içeren cümleler.',
    focusPoints: [
      'Zaman zarfları (her hafta, akşamları...)',
      'Bağlaçlarla cümle bağlama',
      'Geniş ve geçmiş zaman çekimleri',
    ],
  },
  Zor: {
    id: 'Zor',
    cefr: 'C1-C2',
    title: 'Zor (C1-C2)',
    description: 'Karmaşık yan cümleler, ileri düzey akademik/mesleki kelimeler ve soyut anlatım.',
    focusPoints: [
      'Yan cümlecikler ve bağımlı yapılar',
      'Akademik / mesleki terminoloji',
      'Soyut ve resmi anlatım',
    ],
  },
};

export function getDifficultyGuide(difficulty: string): string {
  return (
    GRAMMAR_LEVELS[difficulty]?.description ||
    GRAMMAR_LEVELS.Kolay.description
  );
}
