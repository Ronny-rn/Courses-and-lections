namespace Courses_and_Lections.Endpoints.UserManagement;

public class UpdateUserEndpoint : Endpoint<UpdateUserRequest, UpdateUserResponse>
{
    private readonly AppDbContext _context;
    public UpdateUserEndpoint(AppDbContext context)
    {
        _context = context;
    }
    
    public override void Configure()
    {
        Put("api/UpdateUser");
        AllowAnonymous();
    }

    public override async Task<UpdateUserResponse> ExecuteAsync(UpdateUserRequest request, CancellationToken ct)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.UserId == request.UserId, ct);

        if (user is null)
            ThrowError("User not found");

        // ✏️ update allowed fields
        user.FullName = request.Fullname;
        user.Username = request.Username;
        user.Age = request.Age;

        await _context.SaveChangesAsync(ct);

        return new UpdateUserResponse
        {
            Id = user.UserId,
            Fullname = user.FullName,
            Username = user.Username,
            Age = user.Age,
            Message = "User updated successfully"
        };
    }
}

public record UpdateUserRequest
{
    public int UserId { get; set; }

    public string Fullname { get; set; }

    public string Username { get; set; }
    
    public int Age { get; set; }
}

public record UpdateUserResponse
{
    public int Id { get; init; }

    public string Fullname { get; init; }

    public string Username { get; init; }
    
    public int Age { get; init; }

    public string Message { get; init; }
}