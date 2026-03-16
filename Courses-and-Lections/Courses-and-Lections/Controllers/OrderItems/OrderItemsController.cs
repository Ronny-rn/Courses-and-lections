using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using HttpPutAttribute = Microsoft.AspNetCore.Mvc.HttpPutAttribute;
using HttpDeleteAttribute = Microsoft.AspNetCore.Mvc.HttpDeleteAttribute;

namespace Courses_and_Lections.Controllers.OrderItems;

[Route("api/[controller]")]
[ApiController]
public class OrderItemController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrderItemController(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("{orderItemId}")]
    public async Task<ActionResult<ReadOrderItemResponse>> GetOrderItem(int orderItemId)
    {
        var orderItem = await _context.OrderItems
            .Where(x => x.OrderItemId == orderItemId)
            .Select(x => new ReadOrderItemResponse
            {
                OrderItemId = x.OrderItemId,
                OrderId = x.OrderId,
                CourseId = x.CourseId,
                CourseName = x.Course.CourseName,
                CoursePrice = x.Course.Price
            })
            .FirstOrDefaultAsync();

        if (orderItem is null)
            return NotFound("Order item not found");

        return Ok(orderItem);
    }

    // Creates one OrderItem per courseId in the list
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CreateOrderItemResponse>> CreateOrderItem(CreateOrderItemRequest request)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(x => x.OrderId == request.OrderId);
        if (order is null)
            return NotFound("Order not found");

        var courses = await _context.Courses
            .Where(c => request.CourseIds.Contains(c.CourseID))
            .ToListAsync();

        if (courses.Count != request.CourseIds.Count)
            return BadRequest("One or more course IDs are invalid.");

        var existingCourseIds = await _context.OrderItems
            .Where(x => x.OrderId == request.OrderId && request.CourseIds.Contains(x.CourseId))
            .Select(x => x.CourseId)
            .ToListAsync();

        if (existingCourseIds.Any())
            return BadRequest($"Courses already in order: {string.Join(", ", existingCourseIds)}");

        var newItems = courses.Select(c => new OrderItem
        {
            OrderId = request.OrderId,
            CourseId = c.CourseID
        }).ToList();

        _context.OrderItems.AddRange(newItems);
        order.TotalPrice += courses.Sum(c => c.Price);

        await _context.SaveChangesAsync();

        return Ok(new CreateOrderItemResponse
        {
            OrderId = request.OrderId,
            AddedCourseIds = newItems.Select(x => x.CourseId).ToList(),
            NewOrderTotal = order.TotalPrice,
            Message = "Order item(s) successfully created"
        });
    }

    // Swaps the course on a single OrderItem
    [Authorize]
    [HttpPut("{orderItemId}")]
    public async Task<ActionResult<UpdateOrderItemResponse>> UpdateOrderItem(int orderItemId, UpdateOrderItemRequest request)
    {
        var orderItem = await _context.OrderItems
            .Include(x => x.Course)
            .FirstOrDefaultAsync(x => x.OrderItemId == orderItemId);

        if (orderItem is null)
            return NotFound("Order item not found");

        var newCourse = await _context.Courses.FirstOrDefaultAsync(x => x.CourseID == request.CourseId);
        if (newCourse is null)
            return NotFound("Course not found");

        var alreadyExists = await _context.OrderItems
            .AnyAsync(x => x.OrderId == orderItem.OrderId && x.CourseId == request.CourseId && x.OrderItemId != orderItemId);
        if (alreadyExists)
            return BadRequest("This course is already in the order");

        var order = await _context.Orders.FirstOrDefaultAsync(x => x.OrderId == orderItem.OrderId);

        order.TotalPrice -= orderItem.Course.Price;
        order.TotalPrice += newCourse.Price;

        orderItem.CourseId = request.CourseId;

        await _context.SaveChangesAsync();

        return Ok(new UpdateOrderItemResponse
        {
            OrderItemId = orderItem.OrderItemId,
            OrderId = orderItem.OrderId,
            CourseId = orderItem.CourseId,
            NewOrderTotal = order.TotalPrice,
            Message = "Order item successfully updated"
        });
    }

    [Authorize]
    [HttpDelete("{orderItemId}")]
    public async Task<ActionResult<DeleteOrderItemResponse>> DeleteOrderItem(int orderItemId)
    {
        var orderItem = await _context.OrderItems
            .Include(x => x.Course)
            .FirstOrDefaultAsync(x => x.OrderItemId == orderItemId);

        if (orderItem is null)
            return NotFound("Order item not found");

        var order = await _context.Orders.FirstOrDefaultAsync(x => x.OrderId == orderItem.OrderId);

        order.TotalPrice -= orderItem.Course.Price;

        _context.OrderItems.Remove(orderItem);
        await _context.SaveChangesAsync();

        return Ok(new DeleteOrderItemResponse
        {
            NewOrderTotal = order.TotalPrice,
            Message = "Order item successfully deleted"
        });
    }
}

// Request / Response records

public record ReadOrderItemResponse
{
    public int OrderItemId { get; set; }
    public int OrderId { get; set; }
    public int CourseId { get; set; }        // single int — one row, one course
    public string CourseName { get; set; }
    public decimal CoursePrice { get; set; }
}

public record CreateOrderItemRequest
{
    public int OrderId { get; set; }
    public List<int> CourseIds { get; set; } // list allowed here — creates multiple rows at once
}

public record CreateOrderItemResponse
{
    public int OrderId { get; set; }
    public List<int> AddedCourseIds { get; set; }
    public decimal NewOrderTotal { get; set; }
    public string Message { get; set; }
}

public record UpdateOrderItemRequest
{
    public int CourseId { get; set; }        // single int — swapping one course on one row
}

public record UpdateOrderItemResponse
{
    public int OrderItemId { get; set; }
    public int OrderId { get; set; }
    public int CourseId { get; set; }
    public decimal NewOrderTotal { get; set; }
    public string Message { get; set; }
}

public record DeleteOrderItemResponse
{
    public decimal NewOrderTotal { get; set; }
    public string Message { get; set; }
}