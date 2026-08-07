import { NextResponse } from 'next/server';

// Kelime (flashcard) sekmesindeki bir kelimeyi hedef dile çevirir.
// generate-prompt/route.ts ile aynı desen: OPENAI_API_KEY yoksa 501 döner,
// istemci tarafı bunu offline (sadece Türkçe tanım/örnek) moda düşer.
export async function POST(req: Request) {
  try {
    const { word, definition, example, targetLanguage } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY ortam değişkeni bulunamadı.' },
        { status: 501 }
      );
    }

    const systemPrompt = `
      Sen profesyonel bir çevirmen ve dil öğretmenisin.
      Aşağıdaki Türkçe kelimeyi ve örnek cümleyi ${targetLanguage} diline çevir.

      Kelime: "${word}"
      Türkçe anlamı: "${definition}"
      Örnek cümle: "${example}"

      Yanıtını strictly JSON formatında ver:
      {
        "translatedWord": "${targetLanguage} karşılığı (tek kelime/kalıp)",
        "translatedExample": "örnek cümlenin ${targetLanguage} çevirisi"
      }
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: 'LLM API hatası: ' + errText }, { status: response.status });
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu hatası.' }, { status: 500 });
  }
}
