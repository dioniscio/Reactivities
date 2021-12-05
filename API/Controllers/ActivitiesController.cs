using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using Application.Activities;
using Domain;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult> GetActivities()
        {
            var resp = await Mediator.Send(new List.Query());
            return HandleResul(resp);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetActivities(Guid id)
        {
            var resp = await Mediator.Send(new Details.Query{Id = id});
            return HandleResul(resp);
        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        {
            return HandleResul(await Mediator.Send(new Create.Commad{Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResul(await Mediator.Send(new Edit.Commad{Activity = activity}));

        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {   
            
            return HandleResul(await Mediator.Send(new Delete.Commad{Id =id}));

        }



    }
}