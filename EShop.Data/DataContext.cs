using EShop.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Data
{
    public class DataContext : DbContext, IEntitiesContext
    {
        public DbSet<Product> Products{get;set;}
        public DbSet<Price> Prices{get;set;}
        public DbSet<Order> Orders { get; set; }
        public DbSet<Category> Categories{get;set;}
        public DbSet<DiscountCoupon> DiscountCoupons { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=.\SQLEXPRESS;Initial Catalog=EShop;Persist Security Info=False;Integrated Security=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
