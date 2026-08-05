import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { transcript, targetText } = await request.json();

    const targetWords = targetText.toLowerCase().replace(/[.,!?]/g, '').split(' ');
    const userWords = transcript.toLowerCase().replace(/[.,!?]/g, '').split(' ');

    let matches = 0;
    targetWords.forEach((word: string) => {
      if (userWords.includes(word)) matches++;
    });

    const accuracyScore = Math.round((matches / targetWords.length) * 100);

    return NextResponse.json({
      status: 'success',
      transcript,
      targetText,
      score: accuracyScore,
      feedback: accuracyScore > 80 ? 'Excellent pronunciation!' : 'Good attempt, practice the highlighted words.'
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Failed to process speech' }, { status: 400 });
  }
}
