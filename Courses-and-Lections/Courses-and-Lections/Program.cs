global using FastEndpoints;
global using Microsoft.EntityFrameworkCore;
global using Courses_and_Lections.Database;

using FastEndpoints.Swagger;
using FastEndpoints.Security;
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
            
            builder.Services.AddFastEndpoints();
            builder.Services.AddSwaggerDocument();

            builder.Services.AddAuthenticationJwtBearer(x => x.SigningKey = builder.Configuration["JwtSecret"]);
            builder.Services.AddAuthorization();

            string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseMySQL(connectionString));

            var app = builder.Build();
            
            app.UseCors("ReactPolicy");
            app.UseFastEndpoints();
            app.UseSwaggerGen();
            app.Run();
        }

    }
}
