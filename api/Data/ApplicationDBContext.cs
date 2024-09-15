using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Database
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions) : base(dbContextOptions) {}
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Stock>().HasIndex(stock => stock.Symbol).IsUnique();

            modelBuilder.Entity<Portfolio>(porfolio => porfolio.HasKey(key => new { key.AppUserId, key.StockId}));

            modelBuilder.Entity<Portfolio>()
                .HasOne(user => user.AppUser)
                .WithMany(user => user.Portfolios)
                .HasForeignKey(foreignKey => foreignKey.AppUserId);

            modelBuilder.Entity<Portfolio>()
                .HasOne(user => user.Stock)
                .WithMany(user => user.Portfolios)
                .HasForeignKey(foreignKey => foreignKey.StockId);

            var roles = new List<IdentityRole> 
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}