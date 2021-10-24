using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult> GetActivities()
        {
            var resp = await _context.Activities.ToListAsync();
            return Ok(resp);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetActivities(Guid id)
        {
            var resp = await _context.Activities.FindAsync(id);
            return Ok(resp);
        }


    }
}