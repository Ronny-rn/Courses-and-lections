using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_and_Lections.Entities
{
    [Table("lectureTable")]
    public class Lecture
    {
        public enum LectureStatus
        {
            Planned,
            Ongoing,
            Finished,
            Canceled
        }

        [Key]
        [Column("lectureID")]
        public int LectureID { get; set; }
        [Column("lectureName")]
        public string LectureName { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("status")]
        public LectureStatus Status { get; set; }
        [Column("dateTimeOfLecture")]
        public DateTime LectureDate { get; set; }
        [Column("courseID")]
        public int CourseID { get; set; }


    }
}
