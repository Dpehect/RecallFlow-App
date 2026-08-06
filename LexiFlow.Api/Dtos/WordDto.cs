namespace LexiFlow.Api.Dtos
{
    public class WordDto
    {
        public int Id { get; set; }
        public string LanguageCode { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
        public string TargetWord { get; set; } = string.Empty;
        public string Translation { get; set; } = string.Empty;
        public string? Phonetic { get; set; }
        public string? ExampleSentence { get; set; }
        public string? ExampleTranslation { get; set; }
        public string? AudioUrl { get; set; }
        public string? Category { get; set; }
        public bool IsLearned { get; set; }
        public int ReviewCount { get; set; }
    }

    public class UpdateWordStatusDto
    {
        public bool IsLearned { get; set; }
    }

    public class LanguageStatsDto
    {
        public string LanguageCode { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
        public int TotalWords { get; set; }
        public int LearnedWords { get; set; }
    }
}
