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
                OrderDate = x.OrderDate
            })
            .FirstOrDefaultAsync();

        if (order is null)
            return NotFound("Order not found");

        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult<CreateOrderResponse>> CreateOrder(CreateOrderRequest request)
    {
        var order = new Order
        {
            OrderNumber = new Guid(),
            TotalPrice = request.TotalPrice,
            CustomerId = request.CustomerId,
            OrderDate = DateTime.UtcNow
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return Ok(new CreateOrderResponse
        {
            Message = "Order successfully created"
        });
    }

    [HttpPut("{orderId}")]
    public async Task<ActionResult<UpdateOrderResponse>> UpdateOrder(int orderId, UpdateOrderRequest request)
    {
        var order = await _context.Orders
            .FirstOrDefaultAsync(x => x.OrderId == orderId);

        if (order is null)
            return NotFound("Subject not found");

        order.TotalPrice = request.TotalPrice;
        order.CustomerId = request.CustomerId;

        await _context.SaveChangesAsync();

        return Ok(new UpdateOrderResponse
        {
            OrderId = order.OrderId,
            OrderNumber = order.OrderNumber,
            TotalPrice = order.TotalPrice,
            CustomerId = order.CustomerId,
            Message = "Subject successfully updated"
        });
    }

    [HttpDelete("{orderId}")]
    public async Task<ActionResult<DeleteOrderResponse>> DeleteOrder(int orderId)
    {
        var order = await _context.Orders
            .FirstOrDefaultAsync(x => x.OrderId == orderId);

        if (order is null)
            return NotFound("Order not found");

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return Ok(new DeleteOrderResponse
        {
            Message = "Subject successfully deleted"
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
}

public record CreateOrderRequest
{
    public decimal TotalPrice { get; set; }
    public int CustomerId { get; set; }
}

public record CreateOrderResponse
{
    public string Message { get; set; }
}

public record UpdateOrderRequest
{
    public decimal TotalPrice { get; set; }
    public int CustomerId { get; set; }
}

public record UpdateOrderResponse
{
    public int OrderId { get; set; }
    public Guid OrderNumber { get; set; }
    public decimal TotalPrice { get; set; }
    public int CustomerId { get; set; }
    public string Message { get; set; }
}

public record DeleteOrderResponse
{
    public string Message { get; set; }
}