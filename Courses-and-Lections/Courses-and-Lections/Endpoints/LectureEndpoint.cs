using FastEndpoints;
namespace Courses_and_Lections.Endpoints

{
    public class LectureEndpoint : Endpoint<LectureRequest, LectureResponse>
    {
        public override void Configure() 
        {
        
            Get("api/lecture");
            AllowAnonymous();

        }

        public override async Task<LectureResponse> ExecuteAsync(LectureRequest request, CancellationToken ct) 
        {
            return new LectureResponse
            {
                AllCaps = request.Check.ToUpper()
            };

        }

    }

    public record LectureRequest
    {
        public string Check { get; set; } = "";

    }

    public record LectureResponse
    {

        public string AllCaps { get; set; } = "";
    }
}
