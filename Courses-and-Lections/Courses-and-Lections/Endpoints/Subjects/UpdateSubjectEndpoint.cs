namespace Courses_and_Lections.Endpoints.Subjects;

    public class UpdateSubjectEndpoint : Endpoint<UpdateSubjectRequest, UpdateSubjectResponse>
    {
        
        private readonly AppDbContext _context;

        public UpdateSubjectEndpoint(AppDbContext context)
        {
            _context = context;
        }
        
        public override void Configure()
        {
            Put("api/UpdateSubject");
            AllowAnonymous();
        }

        public override async Task<UpdateSubjectResponse> ExecuteAsync(UpdateSubjectRequest request, CancellationToken ct)
        {
            var subject = await _context.Subjects
                .FirstOrDefaultAsync(x => x.SubjectId == request.SubjectId, ct);

            if (subject is null)
                ThrowError("Subject not found");

            subject.SubjectName = request.Title;
            subject.Description = request.Description;

            await _context.SaveChangesAsync(ct);

            return new UpdateSubjectResponse
            {
                SubjectId = subject.SubjectId,
                Title = subject.SubjectName,
                Description = subject.Description,
                Message = "Subject successfully updated"
            };
        }
    }

    public record UpdateSubjectRequest
    {
        //Co si budu brát za data z vytvořené lekce ( Všechna upravitelná data ) 
        public int SubjectId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
    }

    public record UpdateSubjectResponse
    {
        //Vracím to samé co při readu + succesful update message
        public int SubjectId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Message { get; set; }
        
    }
