using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Course_and_Lection.Core.Entities
{
    [Table("CourseLeaders")]
    public class CourseLeader
    {
        [Key]
        [Column("courseLeaderID")]
        public int CourseLeaderID { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("fullname")]
        public string Fullname { get; set; }

        [Column("age")]
        public int Age { get; set; }

        [Column("leaderFrom")]
        public DateTime LeaderFrom { get; set; }
        
        [Column("contactEmail")]
        public string ContactEmail { get; set; }



    }
}
