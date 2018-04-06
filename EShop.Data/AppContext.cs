using Eshop.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Data
{
    public class AppContext : DbContext, IEntitiesContext
    {
        public DbSet<DiscountCoupon> DiscountCoupons { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=MM-LAP;Initial Catalog=EShop;Persist Security Info=False;Integrated Security=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}