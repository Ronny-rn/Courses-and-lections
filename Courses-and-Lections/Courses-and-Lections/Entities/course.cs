using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("courseTable")]
public class Courses
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

    public Courses(int courseID, string courseName, string description, int capacity, DateTime startDate, int courseLeader )
	{
		CourseID = courseID;
		CourseName = courseName;
		Description = description;
		Capacity = capacity;
		StartDate = startDate;
		CourseLeader = courseLeader;
    }
}
