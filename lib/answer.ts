export function normalizeAnswer(value: string, locale = "tr-TR"): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .toLocaleLowerCase(locale)
    .replace(/\s+/g, " ")
    .trim();
}
export function isAcceptedAnswer(
  value: string,
  accepted: readonly string[],
  locale?: string,
): boolean {
  const normalized = normalizeAnswer(value, locale);
  return accepted.some((item) => normalizeAnswer(item, locale) === normalized);
}
