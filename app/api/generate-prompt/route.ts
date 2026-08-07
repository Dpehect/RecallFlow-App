import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { category, level, targetLanguage, previousSentences } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY ortam değişkeni bulunamadı.' },
        { status: 500 }
      );
    }

    const systemPrompt = `
      Sen profesyonel bir dil öğretmenisin. Kullanıcının ${targetLanguage} diline çevirmesi için tam olarak istenen kategoride ve CEFR zorluk seviyesinde %100 doğal, anlamlı ve benzersiz bir Türkçe cümle üreteceksin.

      Parametreler:
      - Kategori: ${category}
      - CEFR Seviyesi: ${level} (A1: Çok basit SVO cümleler; A2: Basit zamanlar ve zaman zarfları; B1: Yan cümleler ve bağlaçlar; B2: Karmaşık yapılar ve iş/akademik terimler; C1: İleri düzey soyut ifadeler ve edebi/teknik anlatım)
      - Hedef Dil: ${targetLanguage}

      Kurallar:
      1. Cümle saçma kelime birleşimlerinden OLUŞMAMALI, tamamen mantıklı ve doğal olmalıdır.
      2. Daha önce üretilmiş şu cümleleri veya benzerlerini KESİNLİKLE TEKRAR ETME: ${JSON.stringify(previousSentences?.slice(-40) || [])}
      3. Yanıtını strictly JSON formatında ver:
      {
        "tr": "Üretilen Türkçe cümle",
        "targetHint": "Zor kelimeler için ipucu",
        "grammarNote": "Bu seviyeye ait gramer kuralı"
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
        temperature: 0.9
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
    return NextResponse.json({ error: error.message || 'Sunucu hatası.' }, { status: 500 });
  }
}
