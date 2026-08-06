using LexiFlow.Api.Data;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Word>>> GetWords(
            [FromQuery] string language = "en",
            [FromQuery] string level = "A1",
            [FromQuery] string? category = null)
        {
            var query = _context.Words
                .Where(w => w.LanguageCode.ToLower() == language.ToLower() &&
                            w.Level.ToUpper() == level.ToUpper());

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(w => w.Category.ToLower() == category.ToLower());
            }

            return Ok(await query.ToListAsync());
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategories()
        {
            var categories = await _context.Words
                .Select(w => w.Category)
                .Distinct()
                .ToListAsync();
            return Ok(categories);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class DialoguesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DialoguesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DialogueText>>> GetDialogues(
            [FromQuery] string language = "en",
            [FromQuery] string level = "A1",
            [FromQuery] string? category = null)
        {
            var query = _context.DialogueTexts
                .Where(d => d.LanguageCode.ToLower() == language.ToLower() &&
                            d.Level.ToUpper() == level.ToUpper());

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(d => d.Category.ToLower() == category.ToLower());
            }

            return Ok(await query.ToListAsync());
        }
    }
}
