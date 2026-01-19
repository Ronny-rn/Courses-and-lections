using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


[Table ("users")]
public class User
{
	[Key]
	[Column ("userID")]
    public int UserId { get; set; }

	[Column ("title")]
	public string Title { get; set; }

	[Column ("fullname")]
	public string FullName { get; set; }

	[Column ("username")]
	public string Username { get; set; }

	[Column ("password")]
	public string Password { get; set; }

    [Column("age")]
    public int Age { get; set; }	
    

	public User(int userID, string title, string fullname, string username, string password, int age)
	{
		userID = UserID;
		title = Title;
		fullname = FullName;
		username = Username;
		password = Password;
		age = Age;
    }
}
