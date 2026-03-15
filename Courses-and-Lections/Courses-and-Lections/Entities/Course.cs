using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_and_Lections.Entities
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
        public DateOnly StartDate { get; set; }
        [Column("scheduledBeginTime")]
        public TimeOnly ScheduledBeginTime { get; set; }
        [Column("SubjectID")]
        public int SubjectId { get; set; }
        [Column("price")]
        public decimal Price { get; set; }
        
    }

}
