using FastEndpoints.Security;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Courses_and_Lections.Endpoints.UserManagement
{
    public class LoginEndpoint : Endpoint<LoginRequest, LoginResponse>
    {
        private readonly AppDbContext _context;

        public LoginEndpoint(AppDbContext context)
        {
            _context = context;
        }

        public override void Configure()
        {
            Post("auth/login");
            AllowAnonymous();
        }

        public override async Task<LoginResponse> ExecuteAsync(LoginRequest request, CancellationToken ct)
        {
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                ThrowError("Username or password is missing", 401);
            }
           

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username.ToUpper() 
                                        && u.Password == request.Password, ct);

            if(user is null)
            {
                ThrowError("Could not log you in", 401);
            }
            
            var jwt = JwtBearer.CreateToken(options =>
            {
                options.SigningKey = Config["JwtSecret"];
                options.User.Claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()));
                options.User.Claims.Add(new Claim(JwtRegisteredClaimNames.Name, user.Username)); 
            }
            
            );
            return new LoginResponse
            {
                Success = true, 
                User = new UserData
                {
                    Id = user.UserId,
                    Username = user.Username,   
                    FullName = user.FullName
                },
                JwtToken = jwt
                
            };
        }
    }
    public record LoginRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
    public record LoginResponse
    {
        public bool Success { get; set; }
        public UserData? User { get; set; }
        public string? JwtToken { get; set; }
    }
    public record UserData
    {
        public int Id { get; set; }
        public string Username { get; set; } = "";
        public string FullName { get; set; } = "";
    }
}
