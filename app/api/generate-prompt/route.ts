import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { category, level, targetLanguage, previousSentences } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY bulunamadı. Lütfen .env.local dosyanıza ekleyin.' },
        { status: 500 }
      );
    }

    const systemPrompt = `
      Sen profesyonel bir dil öğretmenisin. Kullanıcının ${targetLanguage} diline çevirmesi için anlamlı, doğal ve dil bilgisi açısından kusursuz bir Türkçe cümle üreteceksin.

      Kurallar:
      1. Kategori: ${category} (Örn: günlük, iş, teknoloji, seyahat, akademik)
      2. CEFR Zorluk Seviyesi: ${level} (A1, A2, B1, B2, C1)
      3. Cümle anlamsız veya saçma kelime birleşimlerinden oluşmamalı; gerçek hayatta kullanılan doğal bir cümle olmalıdır.
      4. Daha önce üretilmiş şu cümleleri veya benzerlerini KESİNLİKLE tekrar etme: ${JSON.stringify(previousSentences?.slice(-30) || [])}

      Yanıtını строго JSON formatında ver:
      {
        "tr": "Üretilen Türkçe cümle",
        "targetHint": "Cümledeki zor kelimeler veya ipuçları",
        "grammarNote": "Bu seviyeye ait gramer odağı"
      }
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }],
        response_format: { type: 'json_object' },
        temperature: 0.85
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: 'LLM API hatası: ' + errText }, { status: response.status });
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}
