import { VocabItem } from "./data";
import rawVocab from "./vocab_data.json";

export const GENERATED_VOCAB_PACKS: VocabItem[] = rawVocab as unknown as VocabItem[];
