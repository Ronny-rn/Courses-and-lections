global using Microsoft.EntityFrameworkCore;
global using Courses_and_Lections.Database;
global using Courses_and_Lections.Entities;



namespace Courses_and_Lections
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers();

            builder.Services.AddAuthentication().AddJwtBearer();
            builder.Services.AddAuthorization();

            string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseMySQL(connectionString));

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors("ReactPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}