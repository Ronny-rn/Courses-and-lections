namespace Courses_and_Lections.Endpoints.Subjects;
    public class DeleteSubjectEndpoint : Endpoint<DeleteSubjectRequest, DeleteSubjectResponse>
    {
        private readonly AppDbContext _context;

        public DeleteSubjectEndpoint(AppDbContext context)
        {
            _context = context;
        }
        
        public override void Configure()
        {
            Delete("api/DeleteSubject");
            AllowAnonymous();
        }

        public override async Task<DeleteSubjectResponse> ExecuteAsync(DeleteSubjectRequest request, CancellationToken ct)
        {
            var subject = await _context.Subjects
                .FirstOrDefaultAsync(x => x.SubjectId == request.SubjectId, ct);

            if (subject is null)
                ThrowError("Lecture not found");

            _context.Subjects.Remove(subject);

            await _context.SaveChangesAsync(ct);

            return new DeleteSubjectResponse
            {
                Message = "Subject successfully deleted"
            };
        }
    }

    public record DeleteSubjectRequest
    {
        //Očekává jedinou hodnotu např GUID
        public int SubjectId { get; set; }
    }

    public record DeleteSubjectResponse
    {
        //Posílá zprávu o ne/úspěšném odstranění
        public string Message { get; set; }
    }
