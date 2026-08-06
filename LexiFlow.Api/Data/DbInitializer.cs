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

            int wordId = 1;
            int dialogueId = 1;

            foreach (var lang in languages)
            {
                foreach (var lvl in levels)
                {
                    foreach (var cat in categories)
                    {
                        // Generate structured words for 600+ capacity per level
                        for (int i = 1; i <= 30; i++)
                        {
                            wordList.Add(new Word
                            {
                                LanguageCode = lang,
                                Level = lvl,
                                Category = cat,
                                TargetWord = $"{cat.Split(' ')[0]}_Term_{i}_{lang.ToUpper()}",
                                Translation = $"{cat} Terimi {i} (Türkçe Anlamı)",
                                Phonetic = $"/term_{i}/",
                                ExampleSentence = $"This is an example sentence for {cat} term {i} in {lang.ToUpper()}.",
                                ExampleTranslation = $"Bu, {lang.ToUpper()} dilinde {cat} terim {i} için örnek cümledir."
                            });
                        }

                        // Generate 30 sample dialogues & reading/listening texts for reinforcement
                        for (int d = 1; d <= 30; d++)
                        {
                            dialogueList.Add(new DialogueText
                            {
                                LanguageCode = lang,
                                Level = lvl,
                                Category = cat,
                                Title = $"{cat} — Diyalog / Okuma Metni #{d}",
                                Content = $"A: Hello! Welcome to the {cat} section. How can I help you today?\nB: Hi! I would like to learn more about {cat} vocabulary in {lang.ToUpper()}.\nA: Excellent! Let us practice this reading and listening passage together.",
                                Translation = $"A: Merhaba! {cat} bölümüne hoş geldiniz. Bugün size nasıl yardımcı olabilirim?\nB: Selam! {lang.ToUpper()} dilinde {cat} kelimeleri hakkında daha fazla bilgi almak istiyorum.\nA: Harika! Bu okuma ve dinleme metnini birlikte pratik edelim.",
                                Type = d % 2 == 0 ? "Dialogue" : "Reading"
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
