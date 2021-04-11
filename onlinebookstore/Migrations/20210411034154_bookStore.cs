using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace onlinebookstore.Migrations
{
    public partial class bookStore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "book",
                columns: table => new
                {
                    Books_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Auther_id = table.Column<int>(type: "int", nullable: false),
                    Published_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    shortDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    longDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    coverImage_id = table.Column<int>(type: "int", nullable: false),
                    sampleDoc_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_book", x => x.Books_id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "book");
        }
    }
}
