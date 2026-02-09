using Courses_and_Lections.Entities;

namespace Courses_and_Lections.Endpoints.UserManagement
{
    public class RegisterEndpoint : Endpoint<RegisterRequest, RegisterResponse>
    {
        private readonly AppDbContext _context;

        public RegisterEndpoint(AppDbContext context)
        {
            _context = context;
        }

        public override void Configure()
        {
            Post("auth/register");
            AllowAnonymous();
        }
        public override async Task<RegisterResponse> ExecuteAsync(RegisterRequest request, CancellationToken ct)
        {
            var newUser = new User(request.FullName,request.Username,request.Password,request.Age);
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return new RegisterResponse
            {
                Success = true,
                Message = "User registered successfully",
                User = new UserData
                {
                    Id = newUser.UserId,
                    FullName = newUser.FullName, 
                    Username = newUser.Username
                }
            };
        }

    }

    public record RegisterRequest
    {
        public string FullName { get; set; } = "";
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
        public int Age { get; set; }
    }
    public record RegisterResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = "";
        public UserData? User { get; set; }
    
    }   
}
