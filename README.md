# RecallFlow — Radical Practice Engine

Çok dilli (Almanca · İngilizce · Portekizce · İspanyolca · Fransızca), tekrar
etmeyen, AI destekli cümle üretimiyle çalışan bir dil pratiği motoru.

## Bu sürümde yapılan tasarım geçişi

Arayüz sıfırdan bir tasarım sistemi üzerine kuruldu:

- **Tipografi:** `Fraunces` (başlıklar), `JetBrains Mono` (etiket/UI), `Inter` (gövde metni)
- **Renk paleti:** ink / paper / rust / moss / gold / plum / sky — `app/globals.css` ve `tailwind.config.js` içinde token olarak tanımlı
- **İmza etkileşim:** "pressable card" — her buton/kart hover'da hafif kalkar, tıklanınca kağıda basılır gibi çöker (`.press`, `.press-sm`, `.press-md`, `.press-lg`)
- **Flashcard'lar** gerçek 3D flip animasyonuyla çalışıyor (Kelime sekmesi)
- **Hedef dil seçici** artık header'da global olarak mevcut (🇩🇪 🇬🇧 🇵🇹 🇪🇸 🇫🇷)
- Tüm inline `style={{...}}` kullanımı kaldırıldı, Tailwind utility sınıflarına taşındı
- Erişilebilirlik: görünür focus ring, `prefers-reduced-motion` desteği, `aria-*` etiketleri

## Kurulum

```bash
npm install
npm run dev
```

## Yapı

- `app/` — Next.js App Router giriş noktaları, global stiller (`globals.css`)
- `components/` — Header, Footer, GamificationBanner, AIPracticeRobot, `sections/*`
- `lib/` — pratik motoru, cümle matrisi, gramer notları, localStorage katmanı, dil tanımları
- `scripts/generate_10k_sentences.py` — offline cümle havuzunu üretmek için yardımcı script
