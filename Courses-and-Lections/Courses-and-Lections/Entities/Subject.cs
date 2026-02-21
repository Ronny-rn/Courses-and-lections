using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_and_Lections.Entities
{
    [Table("SubjectTable")]
    public class Subject
    {

        [Key]
        [Column("SubjectID")]
        public int SubjectId { get; init; }
        [Column("Title")]
        public required string SubjectName { get; set; }
        [Column("Description")]
        public required string Description { get; set; }
        [Column("CreatedAt")]
        public DateTime CreatedAt { get; init; }
        


    }
}
