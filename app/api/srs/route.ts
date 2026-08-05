import { NextResponse } from 'next/server';

interface SRSInput {
  cardId: string;
  quality: number; // 0 to 5 (0: total blackout, 3: pass, 5: perfect)
  repetitions: number;
  easeFactor: number;
  interval: number;
}

export async function POST(request: Request) {
  try {
    const body: SRSInput = await request.json();
    let { quality, repetitions, easeFactor, interval } = body;

    // SM-2 Algorithm Calculation
    if (quality >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + interval);

    return NextResponse.json({
      status: 'success',
      cardId: body.cardId,
      srsState: {
        repetitions,
        easeFactor: parseFloat(easeFactor.toFixed(2)),
        interval,
        nextDueDate: nextDueDate.toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 });
  }
}
