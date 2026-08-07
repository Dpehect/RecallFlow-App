import { describe, expect, it } from "vitest";
import { isAcceptedAnswer, normalizeAnswer } from "@/lib/answer";
describe("answer normalization", () => {
  it("normalizes accents, apostrophes, punctuation and whitespace", () => {
    expect(normalizeAnswer("  L’ÉCOLE! ")).toBe("lecole");
  });
  it("accepts equivalent accentless input", () => {
    expect(isAcceptedAnswer("cafe", ["café"])).toBe(true);
  });
  it("rejects a different answer", () => {
    expect(isAcceptedAnswer("train", ["avion"])).toBe(false);
  });
});
