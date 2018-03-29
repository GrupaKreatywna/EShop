using Microsoft.EntityFrameworkCore;

namespace Auth.FWT.Data
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {
        }
    }
}