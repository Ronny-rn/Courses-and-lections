using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_and_Lections.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Lecture> Lections { get; set; }
    public DbSet<CourseLeader> CourseLeaders { get; set; }
    public DbSet<User> Users { get; set; }

}

[Table("users")]
public class User
{
    public User(string fullName, string username, string password, int age)
    {
        FullName = fullName;
        Username = username;
        Password = password;
        Age = age;
    }

    [Key]
    [Column("userID")]
    public int UserId { get; set; }

    [Column("fullname")]
    public string FullName { get; set; }

    [Column("username")]
    public string Username { get; set; }

    [Column("password")]
    public string Password { get; set; }

    [Column("age")]
    public int Age { get; set; }

}

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


  
}

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
