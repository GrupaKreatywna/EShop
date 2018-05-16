using EShop.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

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
        private readonly IConfiguration _conf;

        public DataContext(IConfiguration conf )
        {
            _conf = conf;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_conf["SQL-Server:ConnectionString"]);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
