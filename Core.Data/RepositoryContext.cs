using Core.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Data
{
    public class RepositoryContext:DbContext
    {
        public RepositoryContext(DbContextOptions options)
       : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Image> Images { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Complaint>()
                .HasMany(n => n.Images)
                .WithOne(a => a.Complaint)
                .HasForeignKey(n => n.ComplaintId);
            modelBuilder.Entity<Blog>()
                .HasMany(n => n.Images)
                .WithOne(a => a.Blog)
                .HasForeignKey(n => n.BlogId);

            modelBuilder.Entity<Image>().Ignore(x => x.Complaint);
            modelBuilder.Entity<Image>().Ignore(x => x.Blog);
        }

    }
}