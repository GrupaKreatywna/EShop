using Microsoft.EntityFrameworkCore;

namespace Data2.Data
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {
        }
    }
}