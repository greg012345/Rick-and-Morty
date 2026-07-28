using Charachter.Data;
using Charachter.Model;
using Charachter.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Charachter.Repositories
{
    public class CharRepository: ICharRepository
    {
        private readonly AppDbContext _context;
        public CharRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddCharAsync(Charter charter)
        {
            await _context.Char.AddAsync(charter);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCharterAsync(int id)
        {
            var employeeInDb = await _context.Char.FindAsync(id);

            if (employeeInDb == null)
            {
                throw new KeyNotFoundException($"Employee with id {id} not found");
            }

            _context.Char.Remove(employeeInDb);
            await _context.SaveChangesAsync();

        }

        public async Task<IEnumerable<Charter>> GetCharterAsync()
        {
            return await _context.Char.ToListAsync();
        }

        public async Task<Charter?> GetByIdAsync(int id)
        {
            return await _context.Char.FindAsync(id);
        }

        public async Task UpdateCharterAsync(Charter charter)
        {
            _context.Char.Update(charter);
            await _context.SaveChangesAsync();
        }
    }
}
