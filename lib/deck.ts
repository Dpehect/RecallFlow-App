import { concepts, levelExampleIndex } from "@/content/curriculum";
import type { Card, Lang, Level } from "@/types/domain";
const mods = {
  tr: [
    "yeni",
    "eski",
    "küçük",
    "büyük",
    "güzel",
    "önemli",
    "faydalı",
    "yakındaki",
    "tanıdık",
    "ilginç",
    "sakin",
    "aydınlık",
    "günlük",
    "favori",
    "farklı",
  ],
  en: [
    "new",
    "old",
    "small",
    "large",
    "beautiful",
    "important",
    "useful",
    "nearby",
    "familiar",
    "interesting",
    "quiet",
    "bright",
    "daily",
    "favorite",
    "different",
  ],
  de: {
    base: [
      "neu",
      "alt",
      "klein",
      "groß",
      "schön",
      "wichtig",
      "nützlich",
      "nah",
      "bekannt",
      "interessant",
      "ruhig",
      "hell",
      "täglich",
      "lieb",
      "anders",
    ],
  },
  fr: {
    m: [
      "nouveau",
      "ancien",
      "petit",
      "grand",
      "beau",
      "important",
      "utile",
      "proche",
      "familier",
      "intéressant",
      "calme",
      "lumineux",
      "quotidien",
      "préféré",
      "différent",
    ],
    f: [
      "nouvelle",
      "ancienne",
      "petite",
      "grande",
      "belle",
      "importante",
      "utile",
      "proche",
      "familière",
      "intéressante",
      "calme",
      "lumineuse",
      "quotidienne",
      "préférée",
      "différente",
    ],
  },
};
function germanAdjective(base: string, gender: "m" | "f" | "n") {
  return base + (gender === "m" ? "er" : gender === "f" ? "e" : "es");
}
const exampleTemplates = {
  en: [
    (w: string) => `This ${w} is here.`,
    (w: string) => `I often notice the ${w}.`,
    (w: string) => `We talked about the ${w} yesterday.`,
    (w: string) => `The ${w} has become relevant to our plan.`,
    (w: string) => `Understanding the ${w} requires a broader perspective.`,
  ],
  de: [
    (w: string) => `${w[0].toUpperCase() + w.slice(1)} ist hier.`,
    (w: string) => `Ich bemerke oft ${w}.`,
    (w: string) => `Wir haben gestern über ${w} gesprochen.`,
    (w: string) =>
      `${w[0].toUpperCase() + w.slice(1)} ist für unseren Plan wichtig geworden.`,
    (w: string) =>
      `Das Verständnis von ${w} erfordert eine breitere Perspektive.`,
  ],
  fr: [
    (w: string) => `${w[0].toUpperCase() + w.slice(1)} est ici.`,
    (w: string) => `Je remarque souvent ${w}.`,
    (w: string) => `Nous avons parlé de ${w} hier.`,
    (w: string) =>
      `${w[0].toUpperCase() + w.slice(1)} est devenu pertinent pour notre projet.`,
    (w: string) => `Comprendre ${w} exige une perspective plus large.`,
  ],
};
export function createDeck(lang: Lang, level: Level): Card[] {
  return Array.from({ length: 600 }, (_, i) => {
    const concept = concepts[i % concepts.length],
      mi = Math.floor(i / concepts.length) % 15;
    const target =
      lang === "en"
        ? `${mods.en[mi]} ${concept.en}`
        : lang === "de"
          ? `${germanAdjective(mods.de.base[mi], concept.deGender)} ${concept.de}`
          : `${concept.fr} ${mods.fr[concept.frGender][mi]}`;
    const translation = `${mods.tr[mi]} ${concept.tr}`;
    const targetExample =
      exampleTemplates[lang][levelExampleIndex[level]](target);
    return {
      id: `${lang}-${level}-${i}`,
      word: target,
      translation,
      category: concept.category,
      acceptedAnswers: [target],
      example: {
        target: targetExample,
        translation: `“${translation}” ifadesi için ${level} düzeyi örnek kullanım.`,
      },
    };
  });
}
