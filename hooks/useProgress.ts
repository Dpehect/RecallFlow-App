"use client";
import { useCallback, useEffect, useState } from "react";
const KEY = "recallflow-progress-v2";
function read(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    return new Set(
      Array.isArray(parsed) && parsed.every((x) => typeof x === "string")
        ? parsed
        : [],
    );
  } catch {
    return new Set();
  }
}
export function useProgress() {
  const [mastered, setMastered] = useState<Set<string>>(() => new Set());
  useEffect(() => setMastered(read()), []);
  const toggle = useCallback(
    (id: string) =>
      setMastered((current) => {
        const next = new Set(current);
        next.has(id) ? next.delete(id) : next.add(id);
        try {
          localStorage.setItem(KEY, JSON.stringify([...next]));
        } catch {}
        return next;
      }),
    [],
  );
  return { mastered, toggle };
}
