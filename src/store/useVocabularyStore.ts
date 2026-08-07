import { create } from 'zustand';
import { WordItem, CategoryFilterType, CEFRLevel } from '../types/vocabulary';

interface VocabularyState {
  words: WordItem[];
  searchQuery: string;
  selectedCategory: CategoryFilterType;
  selectedLevel: CEFRLevel | 'ALL';
  learnedWordIds: Set<string>;
  
  setSearchQuery: (query: string) => void;
  setCategory: (category: CategoryFilterType) => void;
  setLevel: (level: CEFRLevel | 'ALL') => void;
  toggleLearned: (id: string) => void;
  getFilteredWords: () => WordItem[];
}

const MOCK_WORDS: WordItem[] = [
  {
    id: '1',
    word: 'resilience',
    translation: 'dayanıklılık, esneklik',
    category: 'Daily',
    level: 'B2',
    phonetic: '/rɪˈzɪliəns/',
    examples: [
      {
        id: 'e1',
        en: 'Building psychological resilience helps you recover faster from setbacks.',
        tr: 'Psikolojik dayanıklılık geliştirmek, aksiliklerden daha hızlı toparlanmanıza yardımcı olur.',
        contextNote: 'Zor durumlarla başa çıkma bağlamında kullanılır.'
      }
    ]
  },
  {
    id: '2',
    word: 'ubiquitous',
    translation: 'her yerde birden bulunan',
    category: 'Objects',
    level: 'C1',
    phonetic: '/juːˈbɪkwɪtəs/',
    examples: [
      {
        id: 'e2',
        en: 'Smartphones have become ubiquitous in modern society.',
        tr: 'Akıllı telefonlar modern toplumda her yerde bulunur hale geldi.',
        contextNote: 'Yaygınlık ve her an karşıda olma durumunu ifade eder.'
      }
    ]
  },
  {
    id: '3',
    word: 'eloquent',
    translation: 'hatip, güzel konuşan',
    category: 'People',
    level: 'C1',
    phonetic: '/ˈeləkwənt/',
    examples: [
      {
        id: 'e3',
        en: 'She made an eloquent speech that moved the entire audience.',
        tr: 'Tüm dinleyicileri duygulandıran etkileyici bir konuşma yaptı.',
        contextNote: 'İkna edici ve akıcı ifade gücü için kullanılır.'
      }
    ]
  }
];

export const useVocabularyStore = create<VocabularyState>((set, get) => ({
  words: MOCK_WORDS,
  searchQuery: '',
  selectedCategory: 'All',
  selectedLevel: 'ALL',
  learnedWordIds: new Set<string>(),

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCategory: (selectedCategory) => set({ selectedCategory }),
  setLevel: (selectedLevel) => set({ selectedLevel }),
  
  toggleLearned: (id) => set((state) => {
    const updated = new Set(state.learnedWordIds);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    return { learnedWordIds: updated };
  }),

  getFilteredWords: () => {
    const { words, searchQuery, selectedCategory, selectedLevel } = get();
    return words.filter((item) => {
      const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.translation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesLevel = selectedLevel === 'ALL' || item.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }
}));
