# RecallFlow-App - Infinite Dynamic Practice Engine Refactoring

Bu güncelleme paketinde, RecallFlow uygulamasındaki pratik robotunun aynı cümleleri tekrarlama sorunu çözülmüş ve kategori + zorluk seviyesi desteği eklenmiştir.

## Yenilikler
1. **Dinamik Kategori & CEFR Zorluk Seviyeleri:**
   - Kategoriler: Günlük Yaşam, Teknoloji, İş & Ekonomi, Seyahat, Akademik.
   - CEFR Zorluk Seviyeleri: A1, A2, B1, B2, C1.
2. **LLM Destekli Sınırsız Cümle Motoru (`app/api/generate-prompt/route.ts`):**
   - GPT-4o-mini / Gemini API desteği ile her defasında %100 doğal, kategorisine ve zorluk seviyesine tam uyan benzersiz cümleler üretir.
3. **Çevrimdışı Matris Fallback (`lib/sentence_matrix.ts`):**
   - API anahtarı olmasa dahi anlamsız kelime birleşimlerini önleyen gramer kurallı şablon matrisi.
4. **Tekrar Önleme (History Tracking):**
   - Kullanıcının çözdüğü son 50 cümle hafızada tutulur ve LLM/Matris engine aynı cümleyi tekrar üretmez.

## Kurulum
1. `.env.local` dosyanıza OpenAI API Key ekleyin:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
2. Dosyaları RecallFlow-App projenize kopyalayın:
   - `app/api/generate-prompt/route.ts`
   - `app/practice/page.tsx`
   - `lib/sentence_matrix.ts`
   - `lib/practice_engine.ts`
3. Projenizi çalıştırın:
   ```bash
   npm run dev
   ```
