using LexiFlow.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LexiFlow.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Word> Words => Set<Word>();
        public DbSet<DialogueText> DialogueTexts => Set<DialogueText>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Word>(entity =>
            {
                entity.HasKey(w => w.Id);
                entity.HasIndex(w => new { w.LanguageCode, w.Level, w.Category });
            });

            modelBuilder.Entity<DialogueText>(entity =>
            {
                entity.HasKey(d => d.Id);
                entity.HasIndex(d => new { d.LanguageCode, d.Level, d.Category });
            });
        }
    }
}
