using Microsoft.EntityFrameworkCore.Migrations;

namespace onlinebookstorev1._0.Migrations
{
    public partial class bookstorev14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "vendor_Id",
                table: "UsersCarts",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UsersCarts_vendor_Id",
                table: "UsersCarts",
                column: "vendor_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UsersCarts_AspNetUsers_vendor_Id",
                table: "UsersCarts",
                column: "vendor_Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersCarts_AspNetUsers_vendor_Id",
                table: "UsersCarts");

            migrationBuilder.DropIndex(
                name: "IX_UsersCarts_vendor_Id",
                table: "UsersCarts");

            migrationBuilder.DropColumn(
                name: "vendor_Id",
                table: "UsersCarts");
        }
    }
}
