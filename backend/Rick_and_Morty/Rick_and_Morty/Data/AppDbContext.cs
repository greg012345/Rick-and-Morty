using Charachter.Model;
using Microsoft.EntityFrameworkCore;

namespace Charachter.Data
{
    public class AppDbContext : DbContext
    {

        public DbSet<Charter> Char { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}
