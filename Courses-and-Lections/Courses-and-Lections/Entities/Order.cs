using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_and_Lections.Entities;
[Table("Orders")]
public class Order
{
    [Key]
    [Column("OrderId")]
    public int OrderId { get; set; }
    [Column("OrderCode")]
    public Guid OrderNumber { get; set; }
    [Column("CustomerId")]
    public int CustomerId { get; set; }
    [Column("OrderDate")]
    public DateTime OrderDate { get; set; }
    [Column("TotalPrice")]
    public decimal TotalPrice { get; set; }
    
}