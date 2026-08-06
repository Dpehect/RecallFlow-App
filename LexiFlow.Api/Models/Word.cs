namespace LexiFlow.Api.Models
{
    public class Word
    {
        public int Id { get; set; }
        public required string LanguageCode { get; set; } // en, de, fr, es, pt
        public required string Level { get; set; }        // A1, A2, B1, B2
        public required string TargetWord { get; set; }   // Original word in target language
        public required string Translation { get; set; }  // Meaning in Turkish/native language
        public string? Phonetic { get; set; }             // e.g. /əˈbaʊt/
        public string? ExampleSentence { get; set; }     // Example usage in target language
        public string? ExampleTranslation { get; set; }  // Translation of example sentence
        public string? AudioUrl { get; set; }            // Custom audio file link if any
        public string? Category { get; set; }            // Verbs, Nouns, Adjectives, etc.
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsLearned { get; set; } = false;
        public int ReviewCount { get; set; } = 0;
    }
}
