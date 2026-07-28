using Charachter.Model;

namespace Charachter.Repositories
{
    public interface ICharRepository
    {
        Task<IEnumerable<Charter>> GetCharterAsync();
        Task<Charter?> GetByIdAsync(int id);
        Task AddCharAsync(Charter charter);
        Task UpdateCharterAsync(Charter charter);
        Task DeleteCharterAsync(int id);

    }
}
