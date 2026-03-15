using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_and_Lections.Entities;

[Table("OrderItems")]
public class OrderItem
{
    [Key]
    [Column("OrderItemId")]
    public int OrderItemId { get; set; }

    [Column("OrderId")]
    public int OrderId { get; set; }

    [Column("CourseId")]
    public int CourseId { get; set; }

    [ForeignKey("OrderId")]
    public Order Order { get; set; }

    [ForeignKey("CourseId")]
    public Course Course { get; set; }
}