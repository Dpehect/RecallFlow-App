using LexiFlow.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LexiFlow.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Word> Words => Set<Word>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Word>(entity =>
            {
                entity.HasKey(w => w.Id);
                entity.HasIndex(w => new { w.LanguageCode, w.Level });
                entity.Property(w => w.TargetWord).IsRequired().HasMaxLength(150);
                entity.Property(w => w.Translation).IsRequired().HasMaxLength(250);
                entity.Property(w => w.LanguageCode).IsRequired().HasMaxLength(10);
                entity.Property(w => w.Level).IsRequired().HasMaxLength(10);
            });
        }
    }
}
