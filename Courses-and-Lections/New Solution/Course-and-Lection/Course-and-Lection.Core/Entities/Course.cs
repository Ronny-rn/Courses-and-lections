using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Course_and_Lection.Core.Entities
{
    [Table("courseTable")]
    public class Course
    {

        [Key]
        [Column("courseID")]
        public int CourseID { get; set; }
        [Column("courseName")]
        public string CourseName { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("capacity")]
        public int Capacity { get; set; }
        [Column("startDate")]
        public DateTime StartDate { get; set; }
        [Column("courseLeader")]
        public int CourseLeader { get; set; }

    }

}
