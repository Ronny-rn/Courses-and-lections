namespace Courses_and_Lections.Endpoints.Subjects;


    public class ReadSubjectEndpoint : Endpoint<ReadSubjectRequest, ReadSubjectResponse>
    {
        private readonly AppDbContext _context;

        public ReadSubjectEndpoint(AppDbContext context)
        {
            _context = context;
        }
        
        public override void Configure()
        {
            Get("api/ReadSubject");
            AllowAnonymous();
        }

        public override async Task<ReadSubjectResponse> ExecuteAsync(ReadSubjectRequest request, CancellationToken ct)
        {
            var subject = await _context.Subjects
                .Where(x => x.SubjectId == request.SubjectId)
                .Select(x => new ReadSubjectResponse
                {
                    SubjectId = x.SubjectId,
                    SubjectName = x.SubjectName,
                    Description = x.Description
                })
                .FirstOrDefaultAsync(ct);

            if (subject is null)
                ThrowError("Subject not found");

            return subject;
        }
    }

    public record ReadSubjectRequest
    {
        //Očekává jedinou hodnotu například GUID lekce
        public int SubjectId { get; set; } 
    }

    public record ReadSubjectResponse
    {
        //Vezmu všech z databáze a hodím to do databáze ( důležité info pro uživatele ) 
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public string Description { get; set; }
    }
