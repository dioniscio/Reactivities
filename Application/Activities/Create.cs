using System.Threading;
using System.Threading.Tasks;
using Application.core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {

        public class Commad : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }

        }

        public class CommandValidator : AbstractValidator<Commad>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActitivyValidator());
            }
        }

        
        public class Handler : IRequestHandler<Commad,Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Commad request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

               var result =await _context.SaveChangesAsync() > 0;
               if(!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Succes(Unit.Value);                
            }
        }






    }
}