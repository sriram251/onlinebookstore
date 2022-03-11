using Microsoft.EntityFrameworkCore.Migrations;

namespace onlinebookstorev1._0.Migrations
{
    public partial class bookstorev12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ShopName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShopName",
                table: "AspNetUsers");
        }
    }
}
