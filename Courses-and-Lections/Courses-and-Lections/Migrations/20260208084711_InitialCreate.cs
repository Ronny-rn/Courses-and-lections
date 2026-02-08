using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Courses_and_Lections.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "courseTable",
                columns: table => new
                {
                    courseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    courseName = table.Column<string>(type: "longtext", nullable: false),
                    description = table.Column<string>(type: "longtext", nullable: false),
                    capacity = table.Column<int>(type: "int", nullable: false),
                    startDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    courseLeader = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_courseTable", x => x.courseID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "lectureTable",
                columns: table => new
                {
                    lectureID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    lectureName = table.Column<string>(type: "longtext", nullable: false),
                    description = table.Column<string>(type: "longtext", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    dateTimeOfLecture = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    courseID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lectureTable", x => x.lectureID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "courseTable");

            migrationBuilder.DropTable(
                name: "lectureTable");
        }
    }
}
