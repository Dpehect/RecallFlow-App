using LexiFlow.Api.Models;

namespace LexiFlow.Api.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Words.Any()) return; // DB seeded

            var initialWords = new List<Word>
            {
                // ================= ENGLISH (en) =================
                // A1
                new Word { LanguageCode = "en", Level = "A1", TargetWord = "Ephemeral", Phonetic = "/ɪˈfem.ər.əl/", Translation = "Kısa ömürlü, geçici", ExampleSentence = "Fame in the world of pop music can be ephemeral.", ExampleTranslation = "Pop müziği dünyasındaki ün geçici olabilir.", Category = "Adjectives" },
                new Word { LanguageCode = "en", Level = "A1", TargetWord = "Resilient", Phonetic = "/rɪˈzɪl.jənt/", Translation = "Dayanıklı, kendini çabuk toparlayan", ExampleSentence = "She is a resilient woman who recovered quickly from illness.", ExampleTranslation = "O, hastalığından hızla iyileşen dayanıklı bir kadındır.", Category = "Adjectives" },
                new Word { LanguageCode = "en", Level = "A1", TargetWord = "Luminous", Phonetic = "/ˈluː.mɪ.nəs/", Translation = "Parlak, ışık saçan", ExampleSentence = "The night sky was luminous with stars.", ExampleTranslation = "Gece gökyüzü yıldızlarla ışık saçıyordu.", Category = "Adjectives" },
                new Word { LanguageCode = "en", Level = "A1", TargetWord = "Velocity", Phonetic = "/vəˈlɒs.ə.ti/", Translation = "Hız, sürat", ExampleSentence = "The bullet travels at high velocity.", ExampleTranslation = "Mermi yüksek hızda ilerler.", Category = "Nouns" },
                // A2
                new Word { LanguageCode = "en", Level = "A2", TargetWord = "Ambiguity", Phonetic = "/ˌæm.bɪˈɡjuː.ə.ti/", Translation = "Belirsizlik, iki anlamlılık", ExampleSentence = "Avoid ambiguity in your writing.", ExampleTranslation = "Yazınızda belirsizlikten kaçının.", Category = "Nouns" },
                new Word { LanguageCode = "en", Level = "A2", TargetWord = "Persevere", Phonetic = "/ˌpɜː.sɪˈvɪər/", Translation = "Azimle devam etmek, yılmamak", ExampleSentence = "If you persevere, you will succeed.", ExampleTranslation = "Eğer azimle devam ederseniz, başarılı olursunuz.", Category = "Verbs" },
                // B1
                new Word { LanguageCode = "en", Level = "B1", TargetWord = "Serendipity", Phonetic = "/ˌser.ənˈdɪp.ə.ti/", Translation = "Tesadüfi tatlı keşif, şanslı tesadüf", ExampleSentence = "Finding this rare book was pure serendipity.", ExampleTranslation = "Bu nadir kitabı bulmak tamamen tatlı bir tesadüftü.", Category = "Nouns" },
                new Word { LanguageCode = "en", Level = "B1", TargetWord = "Meticulous", Phonetic = "/məˈtɪk.jə.ləs/", Translation = "Titiz, çok dikkatli", ExampleSentence = "He kept meticulous accounts of his expenses.", ExampleTranslation = "Harcamalarının son derece titiz kayıtlarını tuttu.", Category = "Adjectives" },
                // B2
                new Word { LanguageCode = "en", Level = "B2", TargetWord = "Quintessential", Phonetic = "/ˌkwɪn.təˈsen.ʃəl/", Translation = "Mükemmel örnek oluşturan, özgün", ExampleSentence = "Watermelon is the quintessential summer fruit.", ExampleTranslation = "Karpuz, yaz mevsiminin en özgün meyvesidir.", Category = "Adjectives" },

                // ================= GERMAN (de) =================
                // A1
                new Word { LanguageCode = "de", Level = "A1", TargetWord = "Fernweh", Phonetic = "[ˈfɛrnveː]", Translation = "Uzak diyarları özleme arzusu", ExampleSentence = "Ich habe großes Fernweh nach Asien.", ExampleTranslation = "Asya'ya karşı büyük bir uzak diyar özlemim var.", Category = "Nouns" },
                new Word { LanguageCode = "de", Level = "A1", TargetWord = "Gemütlichkeit", Phonetic = "[ɡəˈmyːtlɪçkaɪ̯t]", Translation = "Sıcaklık, huzur, samimi ortam", ExampleSentence = "Dieses Restaurant bietet echte Gemütlichkeit.", ExampleTranslation = "Bu restoran gerçek bir sıcaklık ve huzur sunuyor.", Category = "Nouns" },
                // A2
                new Word { LanguageCode = "de", Level = "A2", TargetWord = "Sehnsucht", Phonetic = "[ˈzeːnˌzʊxt]", Translation = "Derin özlem, tutku", ExampleSentence = "Sie spürte eine tiefe Sehnsucht nach Hause.", ExampleTranslation = "Evine karşı derin bir özlem hissetti.", Category = "Nouns" },
                // B1
                new Word { LanguageCode = "de", Level = "B1", TargetWord = "Wanderlust", Phonetic = "[ˈvandɐˌlʊst]", Translation = "Gezip görme arzusu, seyahat sevgisi", ExampleSentence = "Seine Wanderlust trieb ihn um die ganze Welt.", ExampleTranslation = "Gezip görme arzusu onu tüm dünyayı dolaşmaya itti.", Category = "Nouns" },

                // ================= FRENCH (fr) =================
                // A1
                new Word { LanguageCode = "fr", Level = "A1", TargetWord = "Épanouissement", Phonetic = "[epanwismɑ̃]", Translation = "Kişisel gelişim, çiçeklenme, mutluluk", ExampleSentence = "Le travail favorise son épanouissement.", ExampleTranslation = "İş, onun kişisel gelişimini destekliyor.", Category = "Nouns" },
                new Word { LanguageCode = "fr", Level = "A1", TargetWord = "Flâner", Phonetic = "[flane]", Translation = "Aylakça dolaşmak, tadını çıkararak gezmek", ExampleSentence = "J'aime flâner dans les rues de Paris.", ExampleTranslation = "Paris sokaklarında aylakça gezmeyi seviyorum.", Category = "Verbs" },

                // ================= SPANISH (es) =================
                // A1
                new Word { LanguageCode = "es", Level = "A1", TargetWord = "Madrugada", Phonetic = "[maðɾuˈɣaða]", Translation = "Sabahın erken saatleri, seher vakti", ExampleSentence = "Llegamos a la ciudad de madrugada.", ExampleTranslation = "Şehre sabahın seher vaktinde vardık.", Category = "Nouns" },
                new Word { LanguageCode = "es", Level = "A1", TargetWord = "Querencia", Phonetic = "[keˈɾen.sja]", Translation = "İnsanın kendini en güvende hissettiği yer", ExampleSentence = "Mi casa es mi querencia.", ExampleTranslation = "Evim benim kendimi en güvende hissettiğim yerdir.", Category = "Nouns" },

                // ================= PORTUGUESE (pt) =================
                // A1
                new Word { LanguageCode = "pt", Level = "A1", TargetWord = "Saudade", Phonetic = "[sawˈda.dʒi]", Translation = "Derin ve tatlı bir özlem", ExampleSentence = "Tenho muita saudade da minha terra natal.", ExampleTranslation = "Memleketime karşı çok derin bir özlem duyuyorum.", Category = "Nouns" },
                new Word { LanguageCode = "pt", Level = "A1", TargetWord = "Cafuné", Phonetic = "[ka.fuˈnɛ]", Translation = "Sevilen kişinin saçlarını okşama eylemi", ExampleSentence = "Ela adora receber cafuné antes de dormir.", ExampleTranslation = "Uyumadan önce saçının okşanmasını çok seviyor.", Category = "Nouns" }
            };

            context.Words.AddRange(initialWords);
            context.SaveChanges();
        }
    }
}
