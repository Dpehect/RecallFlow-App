import { NextResponse } from 'next/server';
import { getDifficultyGuide } from '@/lib/grammar_notes';

export async function POST(req: Request) {
  try {
    const { category, difficulty, targetLanguage, previousSentences } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY ortam değişkeni bulunamadı.' },
        { status: 500 }
      );
    }

    // Difficulty selected by the user (any tab) is forwarded straight into the
    // sentence-generation prompt so the LLM output matches the chosen level.
    const difficultyGuide = getDifficultyGuide(difficulty);

    const systemPrompt = `
      Sen profesyonel bir dil öğretmenisin. Kullanıcının ${targetLanguage} diline çevirmesi için mantıklı, doğal ve %100 benzersiz bir Türkçe cümle üreteceksin.

      Parametreler:
      - Kategori: ${category}
      - Zorluk Seviyesi: ${difficulty} (${difficultyGuide})
      - Hedef Dil: ${targetLanguage}

      Kurallar:
      1. Cümle saçma kelime birleşimlerinden OLUŞMAMALI, gerçek hayatta kullanılan anlamlı bir Türkçe cümle olmalıdır.
      2. Zorluk seviyesinin kelime dağarcığı ve gramer karmaşıklığı ${difficulty} seviyesiyle tam örtüşmelidir.
      3. Daha önce üretilmiş şu cümleleri, bunların yakın varyasyonlarını veya aynı özne+nesne+fiil kalıbını KESİNLİKLE TEKRAR ETME: ${JSON.stringify(previousSentences?.slice(-150) || [])}
      4. Yanıtını strictly JSON formatında ver:
      {
        "tr": "Üretilen Türkçe cümle",
        "targetHint": "Zor kelimeler veya ipucu",
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
