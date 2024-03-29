using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Application.core;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController:ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResul<T>(Result<T> result){


            if(result == null) return NotFound();
            if(result.IsSuccess && result.Value !=null)
            return Ok(result.Value);
            if(result.IsSuccess && result.Value ==null)
            return NotFound();
            return BadRequest(result.Error);
        }
    }
    
}