using System;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
	

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL("server=mysqlstudenti.litv.sssvt.cz;database=4c1_matousekdavid_db2;user=matousekdavid;password=123456");
    }

}
