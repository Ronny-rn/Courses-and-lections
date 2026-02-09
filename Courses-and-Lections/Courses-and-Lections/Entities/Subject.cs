using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_and_Lections.Entities
{
    [Table("SubjectTable")]
    public class Subject
    {

        [Key]
        [Column("SubjectID")]
        public int SubjectId { get; set; }
        [Column("Title")]
        public string SubjectName { get; set; }
        [Column("Description")]
        public string Description { get; set; }
        


    }
}
