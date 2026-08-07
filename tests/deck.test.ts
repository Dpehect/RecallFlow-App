import { describe, expect, it } from "vitest";
import { createDeck } from "@/lib/deck";
import { LANGUAGES, LEVELS } from "@/types/domain";
describe("curriculum decks", () => {
  it.each(
    LANGUAGES.flatMap((lang) => LEVELS.map((level) => [lang, level] as const)),
  )("creates exactly 600 typed cards for %s %s", (lang, level) => {
    const deck = createDeck(lang, level);
    expect(deck).toHaveLength(600);
    expect(new Set(deck.map((card) => card.id)).size).toBe(600);
    expect(
      deck.every(
        (card) =>
          card.acceptedAnswers.length > 0 && card.example.target.length > 0,
      ),
    ).toBe(true);
  });
});
