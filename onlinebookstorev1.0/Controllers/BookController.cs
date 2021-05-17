using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using onlinebookstorev1._0.Modals;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Core;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Caching.Memory;
using onlinebookstorev1._0.Modals.ActionModal;

namespace onlinebookstorev1._0.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    
    [ApiController]

    public class BookController : ControllerBase
    {
        private readonly ILogger<BookController> _logger;
        private readonly BookstoreContext entity;
        private readonly IMemoryCache _cache;
        public BookController(BookstoreContext db, ILogger<BookController> logger, IMemoryCache cache)
        {
            this.entity = db;
            this._cache = cache;
            this._logger = logger;
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAllBook()
        {
            var cacheKey = "Books";
            if(!_cache.TryGetValue(cacheKey,out List<Bookmodal> books))
            {
                books = entity.Books.Select(s => new Bookmodal
                {
                    ISBN = s.ISBN,
                    language = s.language,
                    pageCount = s.pageCount,
                    publisher = s.publisher,
                    CoverImage = s.CoverImage.Coverimage,
                    Title = s.Title,
                    Authers = s.authersbook.Select(s => s.Auther.AutherName),
                    Categories = s.BooksCategories.Select(s => s.Categorie.Categorie),
                }).ToList();
                var cacheExpery = new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddMinutes(20),
                    SlidingExpiration = TimeSpan.FromMinutes(5),

                    
                };
                _cache.Set(cacheKey, books, cacheExpery );
            }
            return Ok(books);

        }

        [Route("findbytitle")]
        [HttpGet("findbytitle/{Title}")]
        
        public async Task<IActionResult> findbookbytitle(string Title)
        {
            _logger.LogInformation($"the value of GET isbn {Title}");
            var foundBook = entity.Books.Where(s => s.Title.Trim().ToLower() == Title.Trim().ToLower())
                .Select(s => new {
                    ISBN = s.ISBN,
                    language = s.language,
                    pageCount = s.pageCount,
                    publisher = s.publisher,
                    dimension = s.dimension,
                    CoverImage = s.CoverImage.Coverimage,
                    Title = s.Title,
                    Description = s.Description,
                    Authers = s.authersbook.Select(s => new {authername = s.Auther.AutherName, Autherimageurl = s.Auther.AutherImageUrl }),
                    Categories = s.BooksCategories.Select(s => s.Categorie.Categorie)
                }).FirstOrDefault();
            if (foundBook == null)
            {
                return BadRequest($"The book with Title {Title} is not Found");
            }
            return Ok(foundBook);
        }
        [HttpGet("{ISBN}")]
        [Route("GetBook")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBook(string ISBN)
        {
            _logger.LogInformation($"the value of GET isbn {ISBN}");
            var  foundBook =  entity.Books.Where(s => s.ISBN == ISBN)
                .Select(s => new {
                                bookid = s.BookId,
                                ISBN = s.ISBN,
                                language = s.language,
                                pageCount = s.pageCount,
                                publisher = s.publisher,
                                CoverImage = s.CoverImage.Coverimage,
                                Title = s.Title,
                                Description = s.Description,
                                Authers = s.authersbook.Select(s => new { authername = s.Auther.AutherName, Autherimageurl = s.Auther.AutherImageUrl }).ToList(),
                                Categories = s.BooksCategories.Select(s => s.Categorie.Categorie).ToList(),
                                provider = s.Products.OrderByDescending(s=>s.price).Select(s => new
                                {
                                    shopname = s.vendor.ShopName,
                                    price = s.price,
                                    discount = s.DiscountPercent,
                                    product_id = s.Product_Id,
                                    vendor_Id = s.vendor_Id,
                                }).ToList()
                                 }).FirstOrDefault();
            if(foundBook == null)
            {
                return BadRequest($"The book with ISBN {ISBN} is not Found");
            }
            return Ok(foundBook
          );
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AddBook(AddBook book)
        {
            try
            {
                Books data = new Books
                {
                    Title = book.Title,
                    ISBN = book.ISBN,
                    CoverImage = new CoverImages { Coverimage = book.CoverImage },
                    dimension = book.dimension,
                    language = book.language,
                    pageCount = book.pageCount,
                    Description = book.Description,
                    publisher = book.publisher,
                    PublishedDate = book.PublishedDate,
                };
                Log.Information($"This is book to add {data}");
                var findbook = entity.Books.Where(book => book.ISBN == data.ISBN).FirstOrDefault();
                if (findbook == null)
                {
                    entity.Books.Add(data);
                    entity.SaveChanges();
                    findbook = entity.Books.Where(book => book.ISBN == data.ISBN).FirstOrDefault();
                    Log.Information($"This is a auther iteration {findbook}");
                }
                else
                {
                    return StatusCode(409, $"The book with ISBN {data.ISBN} is already exist");
                }
                foreach (string Addauther in book.authors)
                {
                    var foundAuther = entity.Authers.Where(auther => auther.AutherName.Trim().ToLower() == Addauther.Trim().ToLower()).FirstOrDefault();
                    Log.Information($"This is a foundAuther iteration {foundAuther}");
                    if (foundAuther == null)
                    {
                        entity.AuthersBook.Add(new
                        AuthersBook
                        {
                            BookId = findbook.BookId,
                            Auther = new Authers { AutherName = Addauther }
                         });
                        Log.Information($"This is a foundAuther iteration {foundAuther}");
                    }
                    else
                    {
                        entity.AuthersBook.Add(new
                        AuthersBook
                        {
                            BookId = findbook.BookId,
                            AutherId = foundAuther.AutherId
                        });
                    }
                }
                foreach (string Addcategories in book.categories)
                {
                    var foundcategorie = entity.Categories.Where(Categorie => Categorie.Categorie.Trim().ToLower() == Addcategories.Trim().ToLower()).FirstOrDefault();
                    Log.Information($"This is a categorie iteration {foundcategorie}");
                    if (foundcategorie == null)
                    {
                        entity.BooksCategorie.Add(new
                        BooksCategorie
                        {
                            BookId = findbook.BookId,
                            Categorie = new Categories { Categorie = Addcategories }
                        });
                    }
                    else
                    {
                        entity.BooksCategorie.Add(new
                        BooksCategorie
                        {
                            BookId = findbook.BookId,
                            CategorieId = foundcategorie.CategorieId
                        });
                    }
                }


                entity.SaveChanges();
                return Ok("The Book has been sucessFully added");
            }
            catch(Exception Err)
            {
                return BadRequest(Err);
            }
        }
        [HttpPut]
        [Authorize(Roles = "Admin,vendor")]
        public async Task<IActionResult> UpadateBook(AddBook book)
        {
            var books = entity.Books.Where(s => s.ISBN == book.ISBN).FirstOrDefault();
            if(books == null)
            {
                return NotFound("this book is not present to update");
            }
            var result = await DeleteBook(books.ISBN);
            _logger.LogInformation($"the response to delete is {result}");
            var result_of_add = AddBook(book);
            _logger.LogInformation($"the response to addBook is {result_of_add}");
            return Ok("updated succesfully");

        }
        [HttpDelete("{ISBN}")]
        public async Task<IActionResult> DeleteBook(string ISBN)
        {
            _logger.LogInformation($"the isbn {ISBN}");
            Books BookToDelet = entity.Books.Where(s => s.ISBN == ISBN).SingleOrDefault();
            if(BookToDelet == null)
            {
                return NotFound($"The Book With ISBN {ISBN} is not present ");
            }
            entity.Books.Remove(BookToDelet);
            entity.SaveChanges();
            return Ok($"The Book With ISBN {ISBN} is removed successfully");
        }
    }
}
