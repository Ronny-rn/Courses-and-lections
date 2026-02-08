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
           

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username.ToUpper() 
                                        && u.Password == request.Password, ct);

            if(user is null)
            {
                ThrowError("Could not log you in", 404);
            }
            
            var jwt = JwtBearer.CreateToken(options =>
            {
                options.SigningKey = Config["JwtSecret"];
                options.User.Claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()));
                options.User.Claims.Add(new Claim(JwtRegisteredClaimNames.Name, user.Username)); 
            }
            
            );
            return new LoginResponse { Message = $"{ jwt }, test" };
        }
    }
    public record LoginRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
    public record LoginResponse
    {
        public string Message { get; set; } = "";
    }
}
