using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Courses_and_Lections.Database;
using Courses_and_Lections.Entities;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using HttpPutAttribute = Microsoft.AspNetCore.Mvc.HttpPutAttribute;
using HttpDeleteAttribute = Microsoft.AspNetCore.Mvc.HttpDeleteAttribute;

namespace Courses_and_Lections.Controllers.Subjects;

[Route("api/[controller]")]
[ApiController]
public class SubjectsController : ControllerBase
{
    private readonly AppDbContext _context;

    public SubjectsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{subjectId}")]
    public async Task<ActionResult<ReadSubjectResponse>> GetSubject(int subjectId)
    {
        var subject = await _context.Subjects
            .Where(x => x.SubjectId == subjectId)
            .Select(x => new ReadSubjectResponse
            {
                SubjectId = x.SubjectId,
                SubjectName = x.SubjectName,
                Description = x.Description
            })
            .FirstOrDefaultAsync();

        if (subject is null)
            return NotFound("Subject not found");

        return Ok(subject);
    }

    [HttpPost]
    public async Task<ActionResult<CreateSubjectResponse>> CreateSubject(CreateSubjectRequest request)
    {
        var subject = new Subject
        {
            SubjectName = request.SubjectName,
            Description = request.Description,
            CreatedAt = DateTime.UtcNow
        };

        _context.Subjects.Add(subject);
        await _context.SaveChangesAsync();

        return Ok(new CreateSubjectResponse
        {
            Message = "Subject successfully created"
        });
    }

    [HttpPut("{subjectId}")]
    public async Task<ActionResult<UpdateSubjectResponse>> UpdateSubject(int subjectId, UpdateSubjectRequest request)
    {
        var subject = await _context.Subjects
            .FirstOrDefaultAsync(x => x.SubjectId == subjectId);

        if (subject is null)
            return NotFound("Subject not found");

        subject.SubjectName = request.Title;
        subject.Description = request.Description;

        await _context.SaveChangesAsync();

        return Ok(new UpdateSubjectResponse
        {
            SubjectId = subject.SubjectId,
            Title = subject.SubjectName,
            Description = subject.Description,
            Message = "Subject successfully updated"
        });
    }

    [HttpDelete("{subjectId}")]
    public async Task<ActionResult<DeleteSubjectResponse>> DeleteSubject(int subjectId)
    {
        var subject = await _context.Subjects
            .FirstOrDefaultAsync(x => x.SubjectId == subjectId);

        if (subject is null)
            return NotFound("Subject not found");

        _context.Subjects.Remove(subject);
        await _context.SaveChangesAsync();

        return Ok(new DeleteSubjectResponse
        {
            Message = "Subject successfully deleted"
        });
    }
}

// Request / Response records

public record ReadSubjectResponse
{
    public int SubjectId { get; set; }
    public string SubjectName { get; set; }
    public string Description { get; set; }
}

public record CreateSubjectRequest
{
    public string SubjectName { get; set; }
    public string Description { get; set; }
}

public record CreateSubjectResponse
{
    public string Message { get; set; }
}

public record UpdateSubjectRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
}

public record UpdateSubjectResponse
{
    public int SubjectId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Message { get; set; }
}

public record DeleteSubjectResponse
{
    public string Message { get; set; }
}