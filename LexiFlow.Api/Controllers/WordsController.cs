using LexiFlow.Api.Data;
using LexiFlow.Api.Dtos;
using LexiFlow.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LexiFlow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WordsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WordsController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Fetch word deck filtered by Language Code and CEFR Level.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WordDto>>> GetWords(
            [FromQuery] string language = "en",
            [FromQuery] string level = "A1",
            [FromQuery] bool unlearnedOnly = false)
        {
            var query = _context.Words
                .Where(w => w.LanguageCode.ToLower() == language.ToLower() &&
                            w.Level.ToUpper() == level.ToUpper());

            if (unlearnedOnly)
            {
                query = query.Where(w => !w.IsLearned);
            }

            var words = await query
                .OrderBy(w => w.IsLearned)
                .ThenBy(w => w.Id)
                .Select(w => new WordDto
                {
                    Id = w.Id,
                    LanguageCode = w.LanguageCode,
                    Level = w.Level,
                    TargetWord = w.TargetWord,
                    Translation = w.Translation,
                    Phonetic = w.Phonetic,
                    ExampleSentence = w.ExampleSentence,
                    ExampleTranslation = w.ExampleTranslation,
                    AudioUrl = w.AudioUrl,
                    Category = w.Category,
                    IsLearned = w.IsLearned,
                    ReviewCount = w.ReviewCount
                })
                .ToListAsync();

            return Ok(words);
        }

        /// <summary>
        /// Update learning status of a specific word (Learned / Review).
        /// </summary>
        [HttpPatch("{id:int}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateWordStatusDto dto)
        {
            var word = await _context.Words.FindAsync(id);
            if (word == null) return NotFound(new { message = "Word not found." });

            word.IsLearned = dto.IsLearned;
            if (!dto.IsLearned)
            {
                word.ReviewCount += 1;
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Status updated successfully.", word.Id, word.IsLearned, word.ReviewCount });
        }

        /// <summary>
        /// Get learning stats overview for current language and level.
        /// </summary>
        [HttpGet("stats")]
        public async Task<ActionResult<LanguageStatsDto>> GetStats(
            [FromQuery] string language = "en",
            [FromQuery] string level = "A1")
        {
            var query = _context.Words
                .Where(w => w.LanguageCode.ToLower() == language.ToLower() &&
                            w.Level.ToUpper() == level.ToUpper());

            var total = await query.CountAsync();
            var learned = await query.CountAsync(w => w.IsLearned);

            return Ok(new LanguageStatsDto
            {
                LanguageCode = language,
                Level = level,
                TotalWords = total,
                LearnedWords = learned
            });
        }
    }
}
