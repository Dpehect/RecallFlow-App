using LexiFlow.Api.Models;

namespace LexiFlow.Api.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Words.Any()) return;

            var words = new List<Word>
            {
                // ENGLISH (en)
                new Word { LanguageCode = "en", Level = "A1", Category = "Seyahat & Otel", TargetWord = "Boarding Pass", Translation = "Uçuş Biniş Kartı", Phonetic = "/ˈbɔːr.dɪŋ ˌpæs/", ExampleSentence = "Please present your boarding pass at gate 12.", ExampleTranslation = "Lütfen kapı 12’de biniş kartınızı gösterin." },
                new Word { LanguageCode = "en", Level = "A1", Category = "Seyahat & Otel", TargetWord = "Luggage Claim", Translation = "Bagaj Teslim Alanı", Phonetic = "/ˈlʌɡ.ɪdʒ kleɪm/", ExampleSentence = "We picked up our bags at luggage claim.", ExampleTranslation = "Bavullarımızı bagaj teslim alanından aldık." },
                new Word { LanguageCode = "en", Level = "A1", Category = "Seyahat & Otel", TargetWord = "Passport Control", Translation = "Pasaport Kontrolü", Phonetic = "/ˈpæs.pɔːrt kənˈtroʊl/", ExampleSentence = "The line at passport control was short.", ExampleTranslation = "Pasaport kontrolündeki sıra kısaydı." },
                new Word { LanguageCode = "en", Level = "A1", Category = "Günlük Yaşam", TargetWord = "Neighborhood", Translation = "Mahalle, Çevre", Phonetic = "/ˈneɪ.bɚ.hʊd/", ExampleSentence = "It is a quiet neighborhood.", ExampleTranslation = "Sessiz bir mahalle." },
                new Word { LanguageCode = "en", Level = "A1", Category = "İş & Kariyer", TargetWord = "Deadline", Translation = "Son Teslim Tarihi", Phonetic = "/ˈded.laɪn/", ExampleSentence = "The project deadline is Friday.", ExampleTranslation = "Projenin son teslim tarihi cuma." },
                
                // GERMAN (de)
                new Word { LanguageCode = "de", Level = "A1", Category = "Seyahat & Otel", TargetWord = "Reisepass", Translation = "Pasaport", Phonetic = "[ˈʁaɪ̯zəˌpas]", ExampleSentence = "Zeigen Sie Ihren Reisepass.", ExampleTranslation = "Pasaportunuzu gösterin." },
                
                // FRENCH (fr)
                new Word { LanguageCode = "fr", Level = "A1", Category = "Seyahat & Otel", TargetWord = "Passeport", Translation = "Pasaport", Phonetic = "[paspɔʁ]", ExampleSentence = "Montrez votre passeport s'il vous plaît.", ExampleTranslation = "Lütfen pasaportunuzu gösterin." },

                // SPANISH (es)
                new Word { LanguageCode = "es", Level = "A1", Category = "Seyahat & Otel", TargetWord = "Pasaporte", Translation = "Pasaport", Phonetic = "[pa.saˈpoɾ.te]", ExampleSentence = "Aquí está mi pasaporte.", ExampleTranslation = "İşte pasaportum." },

                // PORTUGUESE (pt)
                new Word { LanguageCode = "pt", Level = "A1", Category = "Seyahat & Otel", TargetWord = "Passaporte", Translation = "Pasaport", Phonetic = "[pa.saˈpɔʁ.tʃi]", ExampleSentence = "Onde está o seu passaporte?", ExampleTranslation = "Pasaportunuz nerede?" }
            };

            var dialogues = new List<DialogueText>
            {
                new DialogueText
                {
                    LanguageCode = "en", Level = "A1", Category = "Seyahat & Otel", Title = "✈️ Otel Check-in Diyaloğu",
                    Content = "Receptionist: Welcome to Grand Plaza! How can I help you?\nGuest: Hello! I have a reservation under Alex Smith.",
                    Translation = "Resepsiyonist: Grand Plaza'ya hoş geldiniz! Nasıl yardımcı olabilirim?\nMüşteri: Merhaba! Alex Smith adına rezervasyonum var.",
                    Type = "Dialogue"
                }
            };

            context.Words.AddRange(words);
            context.DialogueTexts.AddRange(dialogues);
            context.SaveChanges();
        }
    }
}
