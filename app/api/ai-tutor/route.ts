import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, language, scenario } = await request.json();

    // Contextual Mapped Responses for AI Partner Scenario
    const responses: Record<string, string> = {
      german: "Sehr gut! Ich habe Ihre Nachricht verstanden. Wie kann ich Ihnen heute in Berlin helfen?",
      spanish: "¡Excelente! He entendido tu mensaje. ¿Qué te gustaría pedir hoy en el restaurante?",
      portuguese: "Muito bem! Entendi sua mensagem. Como posso ajudar você em Lisboa hoje?",
      english: "Awesome! I understood your message. What scenario would you like to practice next?"
    };

    const reply = responses[language] || "That sounds great! Keep practicing your sentence construction.";

    return NextResponse.json({
      status: 'success',
      scenario,
      reply,
      grammarCheck: {
        isCorrect: true,
        suggestion: "Your sentence structure is natural and grammatically sound."
      }
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'AI Tutor service error' }, { status: 500 });
  }
}
