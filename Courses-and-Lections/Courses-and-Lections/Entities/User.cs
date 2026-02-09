using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Courses_and_Lections.Entities
{
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
}
