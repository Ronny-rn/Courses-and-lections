using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Courses_and_Lections.Entities;

namespace Courses_and_Lections.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Subject> Lections { get; set; }
    public DbSet<CourseLeader> CourseLeaders { get; set; }
    public DbSet<User> Users { get; set; }

}







