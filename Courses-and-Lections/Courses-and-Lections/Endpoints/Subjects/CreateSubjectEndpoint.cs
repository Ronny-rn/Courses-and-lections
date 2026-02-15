using Courses_and_Lections.Entities;

namespace Courses_and_Lections.Endpoints.Subjects

{
    public class CreateSubjectEndpoint : Endpoint<CreateSubjectRequest, CreateSubjectResponse>
    {
        private readonly AppDbContext _context;

        public CreateSubjectEndpoint(AppDbContext context)
        {
            _context = context;
        }
        
        public override void Configure() 
        {
        
            Post("api/CreateSubject");
            AllowAnonymous();

        }

        public override async Task<CreateSubjectResponse> ExecuteAsync(CreateSubjectRequest request, CancellationToken ct) 
        {
            var subject = new Subject
            {
                SubjectName = request.SubjectName,
                Description = request.Description,
                CreatedAt = DateTime.UtcNow
            };

            _context.Subjects.Add(subject);

            await _context.SaveChangesAsync(ct);

            return new CreateSubjectResponse
            {
                Message = "Lecture successfully created"
            };
        }

    }

    public record CreateSubjectRequest
    {
        //Všechna povinná pole v databázi kromě věcí, které si databáze nastavuje sama ( GUID ... )
        public string SubjectName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } 
    }

    public record CreateSubjectResponse
    {
        //zpráva o ne/úspěšném vytvoření
        public string Message { get; set; }
    }
}