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

    [HttpGet("{courseId}")]
    public async Task<ActionResult<ReadCourseResponse>> GetCourse(int courseId)
    {
        var course = await _context.Courses
            .Where(x => x.CourseID == courseId)
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
            .FirstOrDefaultAsync();

        if (course is null)
            return NotFound("Course not found");

        return Ok(course);
    }

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
            SubjectId = request.SubjectId
        };

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        return Ok(new CreateCourseResponse
        {
            Message = "Course successfully created"
        });
    }

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
            Message = "Course successfully updated"
        });
    }

    [HttpDelete("{courseId}")]
    public async Task<ActionResult<DeleteCourseResponse>> DeleteCourse(int courseId)
    {
        var course = await _context.Courses
            .FirstOrDefaultAsync(x => x.CourseID == courseId);

        if (course is null)
            return NotFound("Course not found");

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
    public DateTime StartDate { get; set; }
    public DateTime ScheduledBeginTime { get; set; }
    public int SubjectId { get; set; }
}

public record CreateCourseRequest
{
    public string CourseName { get; set; }
    public string Description { get; set; }
    public int Capacity { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime ScheduledBeginTime { get; set; }
    public int SubjectId { get; set; }
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
    public DateTime StartDate { get; set; }
    public DateTime ScheduledBeginTime { get; set; }
    public int SubjectId { get; set; }
}

public record UpdateCourseResponse
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public string Description { get; set; }
    public int Capacity { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime ScheduledBeginTime { get; set; }
    public int SubjectId { get; set; }
    public string Message { get; set; }
}

public record DeleteCourseResponse
{
    public string Message { get; set; }
}