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
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddFastEndpoints();
            builder.Services.AddSwaggerDocument();

            builder.Services.AddAuthenticationJwtBearer(x => x.SigningKey = builder.Configuration["JwtSecret"]);
            builder.Services.AddAuthorization();

            string connnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseMySQL(connnectionString));

            var app = builder.Build();
            app.UseFastEndpoints();
            app.UseSwaggerGen();
            app.Run();
        }

    }
}
