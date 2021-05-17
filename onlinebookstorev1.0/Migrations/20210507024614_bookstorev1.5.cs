using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace onlinebookstorev1._0.Migrations
{
    public partial class bookstorev15 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersCarts_Products_Product_Id",
                table: "UsersCarts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersCarts",
                table: "UsersCarts");

            migrationBuilder.DropColumn(
                name: "Product_Id",
                table: "UsersCarts");

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "UsersCarts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersCarts",
                table: "UsersCarts",
                columns: new[] { "BookId", "user_Id" });

            migrationBuilder.AddForeignKey(
                name: "FK_UsersCarts_books_BookId",
                table: "UsersCarts",
                column: "BookId",
                principalTable: "books",
                principalColumn: "book_id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersCarts_books_BookId",
                table: "UsersCarts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersCarts",
                table: "UsersCarts");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "UsersCarts");

            migrationBuilder.AddColumn<Guid>(
                name: "Product_Id",
                table: "UsersCarts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersCarts",
                table: "UsersCarts",
                columns: new[] { "Product_Id", "user_Id" });

            migrationBuilder.AddForeignKey(
                name: "FK_UsersCarts_Products_Product_Id",
                table: "UsersCarts",
                column: "Product_Id",
                principalTable: "Products",
                principalColumn: "Product_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
