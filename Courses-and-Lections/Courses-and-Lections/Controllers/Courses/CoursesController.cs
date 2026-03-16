using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using HttpPutAttribute = Microsoft.AspNetCore.Mvc.HttpPutAttribute;
using HttpDeleteAttribute = Microsoft.AspNetCore.Mvc.HttpDeleteAttribute;
    
namespace Courses_and_Lections.Controllers.Courses;

[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CoursesController(AppDbContext context)
    {
        _context = context;
    }
   
    [HttpGet("")]
    public async Task<ActionResult<List<ReadCourseResponse>>> GetCourse()
    {
        var course = await _context.Courses
            .Select(x => new ReadCourseResponse
            {
                CourseId = x.CourseID,
                CourseName = x.CourseName,
                Description = x.Description,
                Capacity = x.Capacity,
                StartDate = x.StartDate,
                ScheduledBeginTime = x.ScheduledBeginTime,
                SubjectId = x.SubjectId
            })
            .ToListAsync();

        return Ok(course);
    }
   
    [HttpGet("{subjectId}")]
    public async Task<ActionResult<List<ReadCourseResponse>>> GetCourseBySubjectId(int subjectId)
    {
        var course = await _context.Courses
            .Where(x => x.SubjectId == subjectId)
            .Select(x => new ReadCourseResponse
            {
                CourseId = x.CourseID,
                CourseName = x.CourseName,
                Description = x.Description,
                Capacity = x.Capacity,
                StartDate = x.StartDate,
                ScheduledBeginTime = x.ScheduledBeginTime,
                SubjectId = x.SubjectId,
                Price = x.Price
            })
            .ToListAsync();

        return Ok(course);
    }
    [Authorize]  
    [HttpPost]
    public async Task<ActionResult<CreateCourseResponse>> CreateCourse(CreateCourseRequest request)
    {
        var course = new Course
        {
            CourseName = request.CourseName,
            Description = request.Description,
            Capacity = request.Capacity,
            StartDate = request.StartDate,
            ScheduledBeginTime = request.ScheduledBeginTime,
            SubjectId = request.SubjectId,
            Price = request.Price
        };

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        return Ok(new CreateCourseResponse
        {
            Message = "Course successfully created"
        });
    }
    [Authorize]  
    [HttpPut("{courseId}")]
    public async Task<ActionResult<UpdateCourseResponse>> UpdateCourse(int courseId, UpdateCourseRequest request)
    {
        var course = await _context.Courses
            .FirstOrDefaultAsync(x => x.CourseID == courseId);

        if (course is null)
            return NotFound("Course not found");

        course.CourseName = request.CourseName;
        course.Description = request.Description;
        course.Capacity = request.Capacity;
        course.StartDate = request.StartDate;
        course.ScheduledBeginTime = request.ScheduledBeginTime;
        course.SubjectId = request.SubjectId;
        course.Price = request.Price;

        await _context.SaveChangesAsync();

        return Ok(new UpdateCourseResponse
        {
            CourseId = course.CourseID,
            CourseName = course.CourseName,
            Description = course.Description,
            Capacity = course.Capacity,
            StartDate = course.StartDate,
            ScheduledBeginTime = course.ScheduledBeginTime,
            SubjectId = course.SubjectId,
            Price = course.Price,
            Message = "Course successfully updated"
        });
    }
    [Authorize]
    [HttpDelete("{courseId}")]
    public async Task<ActionResult<DeleteCourseResponse>> DeleteCourse(int courseId)
    {
        var course = await _context.Courses
            .FirstOrDefaultAsync(x => x.CourseID == courseId);

        if (course is null)
            return NotFound("Course not found");

        // Remove related OrderItems first
        var relatedOrderItems = _context.OrderItems
            .Where(x => x.CourseId == courseId);

        _context.OrderItems.RemoveRange(relatedOrderItems);
        _context.Courses.Remove(course);

        await _context.SaveChangesAsync();

        return Ok(new DeleteCourseResponse
        {
            Message = "Course successfully deleted"
        });
    }
}

// Request / Response records

public record ReadCourseResponse
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public string Description { get; set; }
    public int Capacity { get; set; }
    public DateOnly StartDate { get; set; }
    public TimeSpan ScheduledBeginTime { get; set; }
    public int SubjectId { get; set; }
    public decimal Price { get; set; }
}

public record CreateCourseRequest
{
    public string CourseName { get; set; }
    public string Description { get; set; }
    public int Capacity { get; set; }
    public DateOnly StartDate { get; set; }
    public TimeSpan ScheduledBeginTime { get; set; }
    public int SubjectId { get; set; }
    public decimal Price { get; set; }
}

public record CreateCourseResponse
{
    public string Message { get; set; }
}

public record UpdateCourseRequest
{
    public string CourseName { get; set; }
    public string Description { get; set; }
    public int Capacity { get; set; }
    public DateOnly StartDate { get; set; }
    public TimeSpan ScheduledBeginTime { get; set; }
    public int SubjectId { get; set; }
    public decimal Price { get; set; }
}

public record UpdateCourseResponse
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public string Description { get; set; }
    public int Capacity { get; set; }
    public DateOnly StartDate { get; set; }
    public TimeSpan ScheduledBeginTime { get; set; }
    public int SubjectId { get; set; }
    public decimal Price { get; set; }
    public string Message { get; set; }
}

public record DeleteCourseResponse
{
    public string Message { get; set; }
}