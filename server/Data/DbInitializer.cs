using LexiFlow.Api.Models;

namespace LexiFlow.Api.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Words.Any()) return;

            var categories = new[] { "Günlük Yaşam", "Seyahat & Otel", "İş & Kariyer", "Yiyecek & İçecek", "Teknoloji", "Sağlık & Sosyal" };
            var languages = new[] { "en", "de", "fr", "es", "pt" };
            var levels = new[] { "A1", "A2", "B1", "B2" };

            var wordList = new List<Word>();
            var dialogueList = new List<DialogueText>();

            // 10X EXPANDED DATASET GENERATOR: 300+ entries per category/level
            foreach (var lang in languages)
            {
                foreach (var lvl in levels)
                {
                    foreach (var cat in categories)
                    {
                        for (int i = 1; i <= 300; i++)
                        {
                            wordList.Add(new Word
                            {
                                LanguageCode = lang,
                                Level = lvl,
                                Category = cat,
                                TargetWord = $"{cat.Split(' ')[0]}_Word_{i}_{lang.ToUpper()}",
                                Translation = $"{cat} Kelimesi {i} (Türkçe Karşılığı)",
                                Phonetic = $"/word_{i}/",
                                ExampleSentence = $"Example sentence {i} for {cat} in {lang.ToUpper()}.",
                                ExampleTranslation = $"{lang.ToUpper()} dilinde {cat} kelimesi {i} için örnek cümle."
                            });

                            dialogueList.Add(new DialogueText
                            {
                                LanguageCode = lang,
                                Level = lvl,
                                Category = cat,
                                Title = $"{cat} — Pekiştirme Metni / Diyalog #{i}",
                                Content = $"A: Welcome to {cat} practice #{i} in {lang.ToUpper()}.\nB: Let us review dialogue passage #{i} for reading and listening.",
                                Translation = $"A: {lang.ToUpper()} dilinde {cat} pratik metni #{i}'ye hoş geldiniz.\nB: Okuma ve dinleme için {i}. diyalog pasajını inceleyelim.",
                                Type = i % 2 == 0 ? "Dialogue" : "Reading"
                            });
                        }
                    }
                }
            }

            context.Words.AddRange(wordList);
            context.DialogueTexts.AddRange(dialogueList);
            context.SaveChanges();
        }
    }
}
