namespace LexiFlow.Api.Models
{
    public class Word
    {
        public int Id { get; set; }
        public required string LanguageCode { get; set; } // en, de, fr, es, pt
        public required string Level { get; set; }        // A1, A2, B1, B2
        public required string Category { get; set; }     // Daily, Business, Travel, Food, Tech, etc.
        public required string TargetWord { get; set; }
        public required string Translation { get; set; }
        public string? Phonetic { get; set; }
        public string? ExampleSentence { get; set; }
        public string? ExampleTranslation { get; set; }
        public bool IsLearned { get; set; } = false;
        public int ReviewCount { get; set; } = 0;
    }

    public class DialogueText
    {
        public int Id { get; set; }
        public required string LanguageCode { get; set; } // en, de, fr, es, pt
        public required string Level { get; set; }        // A1, A2, B1, B2
        public required string Category { get; set; }     // Daily, Business, Travel, etc.
        public required string Title { get; set; }
        public required string Content { get; set; }     // Target language dialogue/text
        public required string Translation { get; set; } // Turkish translation
        public string Type { get; set; } = "Dialogue";    // Dialogue or Reading
    }
}
