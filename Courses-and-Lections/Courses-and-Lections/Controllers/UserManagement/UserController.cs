using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using HttpPutAttribute = Microsoft.AspNetCore.Mvc.HttpPutAttribute;
using HttpDeleteAttribute = Microsoft.AspNetCore.Mvc.HttpDeleteAttribute;

namespace Courses_and_Lections.Controllers.UserManagement;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public UsersController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            return Unauthorized("Username or password is missing");

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username.ToUpper()
                                   && u.Password == request.Password);

        if (user is null)
            return Unauthorized("Could not log you in");

        var jwt = GenerateJwt(user);

       
        Response.Cookies.Append("auth_token", jwt, new CookieOptions
        {
            HttpOnly = true,                  
            Secure = true,                    
            SameSite = SameSiteMode.None,     
            Expires = DateTimeOffset.UtcNow.AddHours(8)
        });

        return Ok(new LoginResponse
        {
            Success = true,
            User = new UserData
            {
                Id = user.UserId,
                Username = user.Username,
                FullName = user.FullName,
                Role = user.Role
            }
        });
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserData>> Me()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)
                       ?? User.FindFirst(JwtRegisteredClaimNames.Sub);

        if (userIdClaim is null || !int.TryParse(userIdClaim.Value, out var userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        if (user is null)
            return Unauthorized();

        return Ok(new UserData
        {
            Id = user.UserId,
            Username = user.Username,
            FullName = user.FullName,
            Role = user.Role
        });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("auth_token", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None
        });

        return Ok(new { Message = "Logged out successfully" });
    }

    [HttpPost("register")]
    public async Task<ActionResult<RegisterResponse>> Register(RegisterRequest request)
    {
        var newUser = new User
        {
            FullName = request.FullName,
            Username = request.Username,
            Password = request.Password,
            Age = request.Age,
           
            Role = "User"
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok(new RegisterResponse
        {
            Success = true,
            Message = "User registered successfully",
            User = new UserData
            {
                Id = newUser.UserId,
                FullName = newUser.FullName,
                Username = newUser.Username,
                Role = newUser.Role
            }
        });
    }

    

    [Authorize(Roles = "Administrator")]
    [HttpPut("{userId}")]
    public async Task<ActionResult<UpdateUserResponse>> UpdateUser(int userId, UpdateUserRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.UserId == userId);

        if (user is null)
            return NotFound("User not found");

        user.FullName = request.Fullname;
        user.Username = request.Username;
        user.Age = request.Age;

        await _context.SaveChangesAsync();

        return Ok(new UpdateUserResponse
        {
            Id = user.UserId,
            Fullname = user.FullName,
            Username = user.Username,
            Age = user.Age,
            Message = "User updated successfully"
        });
    }

    [Authorize(Roles = "Administrator")]
    [HttpDelete("{userId}")]
    public async Task<ActionResult<DeleteUserResponse>> DeleteUser(int userId)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.UserId == userId);

        if (user is null)
            return NotFound($"User with ID {userId} not found");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return Ok(new DeleteUserResponse
        {
            Message = "User successfully deleted"
        });
    }

 

    private string GenerateJwt(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSecret"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
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
    // No JwtToken field — token is in the HTTP-only cookie
}

public record RegisterRequest
{
    public string FullName { get; set; } = "";
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public int Age { get; set; }
}

public record AdminCreateUserRequest
{
    public string FullName { get; set; } = "";
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public int Age { get; set; }
    public string Role { get; set; } = "User";
}

public record RegisterResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = "";
    public UserData? User { get; set; }
}

public record UpdateUserRequest
{
    public string Fullname { get; set; } = "";
    public string Username { get; set; } = "";
    public int Age { get; set; }
}

public record UpdateUserResponse
{
    public int Id { get; init; }
    public string Fullname { get; init; } = "";
    public string Username { get; init; } = "";
    public int Age { get; init; }
    public string Message { get; init; } = "";
}

public record DeleteUserResponse
{
    public string? Message { get; set; }
}

public record UserData
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string FullName { get; set; } = "";
    public string Role { get; set; } = "";
}