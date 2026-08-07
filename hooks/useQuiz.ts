"use client";
import { useCallback, useEffect, useReducer } from "react";
import { isAcceptedAnswer } from "@/lib/answer";
import type { Card, QuizStatus } from "@/types/domain";
interface State {
  index: number;
  answer: string;
  status: QuizStatus;
  feedback: string;
  score: number;
  locked: boolean;
}
type Action =
  | { type: "answer"; value: string }
  | { type: "check"; correct: boolean; expected: string }
  | { type: "next" }
  | { type: "reset" };
const initial: State = {
  index: 0,
  answer: "",
  status: "idle",
  feedback: "",
  score: 0,
  locked: false,
};
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "answer":
      return state.locked
        ? state
        : { ...state, answer: action.value, status: "idle", feedback: "" };
    case "check":
      if (state.locked) return state;
      return action.correct
        ? {
            ...state,
            status: "correct",
            feedback: "Doğru! Akış sende.",
            score: state.score + 10,
            locked: true,
          }
        : {
            ...state,
            status: "incorrect",
            feedback: `Henüz değil. Kabul edilen cevap: ${action.expected}`,
            locked: false,
          };
    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: "",
        status: "idle",
        feedback: "",
        locked: false,
      };
    case "reset":
      return initial;
  }
}
export function useQuiz(cards: readonly Card[], sessionKey: string) {
  const [state, dispatch] = useReducer(reducer, initial);
  useEffect(() => dispatch({ type: "reset" }), [sessionKey]);
  const card = cards[state.index % cards.length];
  const check = useCallback(() => {
    if (!card || state.locked) return;
    dispatch({
      type: "check",
      correct: isAcceptedAnswer(state.answer, card.acceptedAnswers),
      expected: card.acceptedAnswers[0],
    });
  }, [card, state.answer, state.locked]);
  return {
    ...state,
    card,
    setAnswer: (value: string) => dispatch({ type: "answer", value }),
    check,
    next: () => dispatch({ type: "next" }),
  };
}
