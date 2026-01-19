using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("CourseLeaders")]
public class CourseLeader
{
    [Key]
    [Column ("courseLeaderID")]
    public int CourseLeaderID { get; set; }

    [Column("title")]
    public string Title { get; set; }

    [Column("fullname")]
    public string Fullname { get; set; }

    [Column("age")]
    public int Age { get; set; }

    [Column("leaderFrom")]
    public DateTime LeaderFrom { get; set; }


    public CourseLeader(int courseLeaderID, string title, string fullname, int age, DateTime leaderFrom)
	{
        CourseLeaderID = courseLeaderID;
        Title = title;
        Fullname = fullname;
        Age = age;
        LeaderFrom = leaderFrom;
	}
}
