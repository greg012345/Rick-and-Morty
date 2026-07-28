using Charachter.Model;
using Charachter.Repositories;
using Charachter.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi;

namespace Rick_and_Morty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController: ControllerBase
    {
        private readonly ICharRepository _charterReposotory;
        public CharacterController(ICharRepository charterReposotory)
        {
            _charterReposotory = charterReposotory;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Charter>>> GeCharAll()
        {
            var allCharter = await _charterReposotory.GetCharterAsync();
            return Ok(allCharter);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Charter>> GetCharById(int id)
        {
            var charter = await _charterReposotory.GetByIdAsync(id);
            if (charter == null)
            {
                return NotFound();
            }
            return Ok(charter);
        }


        [HttpPost]
        public async Task<ActionResult<Charter>> Creatcharter(Charter charter)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _charterReposotory.AddCharAsync(charter); 
            return CreatedAtAction(nameof(GetCharById), new { id = charter.id }, charter);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCharterById(int id)
        {
            await _charterReposotory.DeleteCharterAsync(id);
            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<Charter>> UpdateCharter(int id, Charter charter)
        {
            if (id != charter.id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _charterReposotory.UpdateCharterAsync(charter);   
            return CreatedAtAction(nameof(GetCharById), new { id = charter.id }, charter);
        }
    }
}