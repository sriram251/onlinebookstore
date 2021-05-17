﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using onlinebookstorev1._0;

namespace onlinebookstorev1._0.Migrations
{
    [DbContext(typeof(BookstoreContext))]
    [Migration("20210503132924_bookstorev1.2")]
    partial class bookstorev12
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Authers", b =>
                {
                    b.Property<int>("AutherId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Auther_Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AutherImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AutherName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("AutherId")
                        .HasName("PK__Authers__64814E97059BD37B");

                    b.HasIndex("AutherName")
                        .IsUnique()
                        .HasDatabaseName("UQ__Authers__2D4B0E49AD53BD6F");

                    b.ToTable("Authers");
                });

            modelBuilder.Entity("onlinebookstorev1._0.AuthersBook", b =>
                {
                    b.Property<int>("AutherId")
                        .HasColumnType("int")
                        .HasColumnName("Auther_Id");

                    b.Property<int>("BookId")
                        .HasColumnType("int")
                        .HasColumnName("book_id");

                    b.HasKey("AutherId", "BookId");

                    b.HasIndex("BookId");

                    b.ToTable("AuthersBook");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Books", b =>
                {
                    b.Property<int>("BookId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("book_id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CoverImageId")
                        .HasColumnType("int")
                        .HasColumnName("coverImage_Id");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("description");

                    b.Property<string>("ISBN")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("ISBN");

                    b.Property<DateTime>("PublishedDate")
                        .HasColumnType("date")
                        .HasColumnName("published_date");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("title");

                    b.Property<int>("dimension_Id")
                        .HasColumnType("int")
                        .HasColumnName("dimension_Id");

                    b.Property<string>("language")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("pageCount")
                        .HasColumnType("int");

                    b.Property<string>("publisher")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BookId")
                        .HasName("PK__books__490D1AE1E48DEBA3");

                    b.HasIndex("CoverImageId");

                    b.HasIndex("Title")
                        .IsUnique()
                        .HasDatabaseName("UQ__books__E52A1BB38335A223");

                    b.HasIndex("dimension_Id");

                    b.ToTable("books");
                });

            modelBuilder.Entity("onlinebookstorev1._0.CoverImages", b =>
                {
                    b.Property<int>("CoverImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("coverImage_Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Coverimage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("coverimage");

                    b.HasKey("CoverImageId")
                        .HasName("PK__CoverIma__CBBA9DB76C3A400C");

                    b.ToTable("CoverImages");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShopName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.BooksCategorie", b =>
                {
                    b.Property<int>("BookId")
                        .HasColumnType("int")
                        .HasColumnName("BookId");

                    b.Property<int>("CategorieId")
                        .HasColumnType("int")
                        .HasColumnName("CategorieId");

                    b.HasKey("BookId", "CategorieId");

                    b.HasIndex("CategorieId");

                    b.ToTable("BooksCategorie");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.Categories", b =>
                {
                    b.Property<int>("CategorieId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CategorieId")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Categorie")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("CategorieId");

                    b.HasIndex("Categorie")
                        .IsUnique()
                        .HasFilter("[Categorie] IS NOT NULL");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.Imagescroller", b =>
                {
                    b.Property<int>("Imagescrollerid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("descrpiton")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imagelink")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Imagescrollerid");

                    b.ToTable("Imagescrollers");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.PeopleAddress", b =>
                {
                    b.Property<int>("Address_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("District")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pincode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("user_Id")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Address_Id");

                    b.HasIndex("user_Id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.dimensions", b =>
                {
                    b.Property<int>("dimension_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("dimension_Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("height")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("thickness")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("width")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("dimension_Id")
                        .HasName("PK__dimension_Id");

                    b.ToTable("dimension");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.products", b =>
                {
                    b.Property<Guid>("Product_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<int>("DiscountPercent")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("price")
                        .HasColumnType("int");

                    b.Property<string>("vendor_Id")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Product_Id");

                    b.HasIndex("BookId");

                    b.HasIndex("vendor_Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.usersCart", b =>
                {
                    b.Property<Guid>("Product_Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("user_Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("price")
                        .HasColumnType("int");

                    b.Property<int>("quantity")
                        .HasColumnType("int");

                    b.Property<string>("status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Product_Id", "user_Id");

                    b.HasIndex("user_Id");

                    b.ToTable("UsersCarts");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("onlinebookstorev1._0.Modals.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("onlinebookstorev1._0.Modals.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("onlinebookstorev1._0.Modals.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("onlinebookstorev1._0.Modals.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("onlinebookstorev1._0.AuthersBook", b =>
                {
                    b.HasOne("onlinebookstorev1._0.Authers", "Auther")
                        .WithMany("authersbook")
                        .HasForeignKey("AutherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("onlinebookstorev1._0.Books", "Book")
                        .WithMany("authersbook")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Auther");

                    b.Navigation("Book");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Books", b =>
                {
                    b.HasOne("onlinebookstorev1._0.CoverImages", "CoverImage")
                        .WithMany()
                        .HasForeignKey("CoverImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("onlinebookstorev1._0.Modals.dimensions", "dimension")
                        .WithMany()
                        .HasForeignKey("dimension_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CoverImage");

                    b.Navigation("dimension");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.BooksCategorie", b =>
                {
                    b.HasOne("onlinebookstorev1._0.Books", "Book")
                        .WithMany("BooksCategories")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("onlinebookstorev1._0.Modals.Categories", "Categorie")
                        .WithMany("BooksCategories")
                        .HasForeignKey("CategorieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("Categorie");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.PeopleAddress", b =>
                {
                    b.HasOne("onlinebookstorev1._0.Modals.AppUser", "User")
                        .WithMany("Addresses")
                        .HasForeignKey("user_Id");

                    b.Navigation("User");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.products", b =>
                {
                    b.HasOne("onlinebookstorev1._0.Books", "book")
                        .WithMany("Products")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("onlinebookstorev1._0.Modals.AppUser", "vendor")
                        .WithMany()
                        .HasForeignKey("vendor_Id");

                    b.Navigation("book");

                    b.Navigation("vendor");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.usersCart", b =>
                {
                    b.HasOne("onlinebookstorev1._0.Modals.products", "products")
                        .WithMany()
                        .HasForeignKey("Product_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("onlinebookstorev1._0.Modals.AppUser", "user")
                        .WithMany("Carts")
                        .HasForeignKey("user_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("products");

                    b.Navigation("user");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Authers", b =>
                {
                    b.Navigation("authersbook");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Books", b =>
                {
                    b.Navigation("authersbook");

                    b.Navigation("BooksCategories");

                    b.Navigation("Products");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.AppUser", b =>
                {
                    b.Navigation("Addresses");

                    b.Navigation("Carts");
                });

            modelBuilder.Entity("onlinebookstorev1._0.Modals.Categories", b =>
                {
                    b.Navigation("BooksCategories");
                });
#pragma warning restore 612, 618
        }
    }
}
