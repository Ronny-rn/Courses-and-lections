using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using HttpPutAttribute = Microsoft.AspNetCore.Mvc.HttpPutAttribute;
using HttpDeleteAttribute = Microsoft.AspNetCore.Mvc.HttpDeleteAttribute;

namespace Courses_and_Lections.Controllers.Orders;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrderController(AppDbContext context)
    {
        _context = context;
    }
    [Authorize]  
    [HttpGet("{orderId}")]
    public async Task<ActionResult<ReadOrderResponse>> GetOrder(int orderId)
    {
        var order = await _context.Orders
            .Where(x => x.OrderId == orderId)
            .Select(x => new ReadOrderResponse
            {
                OrderId = x.OrderId,
                OrderNumber = x.OrderNumber,
                TotalPrice = x.TotalPrice,
                CustomerId = x.CustomerId,
                OrderDate = x.OrderDate,
                CourseIds = x.OrderItems.Select(oi => oi.CourseId).ToList()
            })
            .FirstOrDefaultAsync();

        if (order is null)
            return NotFound("Order not found");

        return Ok(order);
    }
    [Authorize]  
    [HttpPost]
    public async Task<ActionResult<CreateOrderResponse>> CreateOrder(CreateOrderRequest request)
    {
        var courses = await _context.Courses
            .Where(c => request.CourseIds.Contains(c.CourseID))
            .ToListAsync();

        if (courses.Count != request.CourseIds.Count)
            return BadRequest("One or more course IDs are invalid.");

        var totalPrice = courses.Sum(c => c.Price);

        var order = new Order
        {
            OrderNumber = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            OrderDate = DateTime.UtcNow,
            TotalPrice = totalPrice,
            OrderItems = courses.Select(c => new OrderItem
            {
                CourseId = c.CourseID
            }).ToList()
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return Ok(new CreateOrderResponse
        {
            Message = "Order successfully created",
            OrderId = order.OrderId,
            TotalPrice = totalPrice
        });
    }
    [Authorize]  
    [HttpPut("{orderId}")]
    public async Task<ActionResult<UpdateOrderResponse>> UpdateOrder(int orderId, UpdateOrderRequest request)
    {
        var order = await _context.Orders
            .Include(x => x.OrderItems)
            .FirstOrDefaultAsync(x => x.OrderId == orderId);

        if (order is null)
            return NotFound("Order not found");

        var courses = await _context.Courses
            .Where(c => request.CourseIds.Contains(c.CourseID))
            .ToListAsync();

        if (courses.Count != request.CourseIds.Count)
            return BadRequest("One or more course IDs are invalid.");

        order.CustomerId = request.CustomerId;
        order.TotalPrice = courses.Sum(c => c.Price);
        order.OrderItems = courses.Select(c => new OrderItem
        {
            CourseId = c.CourseID
        }).ToList();

        await _context.SaveChangesAsync();

        return Ok(new UpdateOrderResponse
        {
            OrderId = order.OrderId,
            OrderNumber = order.OrderNumber,
            TotalPrice = order.TotalPrice,
            CustomerId = order.CustomerId,
            CourseIds = order.OrderItems.Select(oi => oi.CourseId).ToList(),
            Message = "Order successfully updated"
        });
    }
    [Authorize]  
    [HttpDelete("{orderId}")]
    public async Task<ActionResult<DeleteOrderResponse>> DeleteOrder(int orderId)
    {
        var order = await _context.Orders
            .Include(x => x.OrderItems)
            .FirstOrDefaultAsync(x => x.OrderId == orderId);

        if (order is null)
            return NotFound("Order not found");

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return Ok(new DeleteOrderResponse
        {
            Message = "Order successfully deleted"
        });
    }
}

// Request / Response records

public record ReadOrderResponse
{
    public int OrderId { get; set; }
    public Guid OrderNumber { get; set; }
    public decimal TotalPrice { get; set; }
    public int CustomerId { get; set; }
    public DateTime OrderDate { get; set; }
    public List<int> CourseIds { get; set; }
}

public record CreateOrderRequest
{
    public int CustomerId { get; set; }
    public List<int> CourseIds { get; set; }
}

public record CreateOrderResponse
{
    public string Message { get; set; }
    public int OrderId { get; set; }
    public decimal TotalPrice { get; set; }
}

public record UpdateOrderRequest
{
    public int CustomerId { get; set; }
    public List<int> CourseIds { get; set; }
}

public record UpdateOrderResponse
{
    public int OrderId { get; set; }
    public Guid OrderNumber { get; set; }
    public decimal TotalPrice { get; set; }
    public int CustomerId { get; set; }
    public List<int> CourseIds { get; set; }
    public string Message { get; set; }
}

public record DeleteOrderResponse
{
    public string Message { get; set; }
}