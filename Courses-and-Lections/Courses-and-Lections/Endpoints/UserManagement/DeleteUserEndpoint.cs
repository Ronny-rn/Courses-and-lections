namespace Courses_and_Lections.Endpoints.UserManagement;

public class DeleteUserEndpoint : Endpoint<DeleteUserRequest, DeleteUserResponse>
{
    private readonly AppDbContext _context;

    public DeleteUserEndpoint(AppDbContext context)
    {
        _context = context;
    }
    
    public override void Configure()
    {
        Delete("api/DeleteUser");
        AllowAnonymous();
    }

    public override async Task<DeleteUserResponse> ExecuteAsync(DeleteUserRequest request, CancellationToken ct)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.UserId == request.UserId, ct);

        if (user is null)
            ThrowError("User not found");

        _context.Users.Remove(user);

        await _context.SaveChangesAsync(ct);

        return new DeleteUserResponse
        {
            Message = "User successfully deleted"
        };
    }
}

public record DeleteUserRequest
{
    public int UserId { get; set; }
}

public record DeleteUserResponse
{
    public string Message { get; set; }
}