using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using onlinebookstorev1._0.Modals;
using onlinebookstorev1._0.Modals.ActionModal;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class categoryController : ControllerBase
    {
        private readonly ILogger<AutherController> _logger;
        private readonly BookstoreContext entity;
        private readonly IMemoryCache _cache;
            
        public categoryController(BookstoreContext db, ILogger<AutherController> logger,IMemoryCache cache)
        {
            this.entity = db;
            this._logger = logger;
            this._cache = cache;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllcategory()
        {
            try
            {
                string cachekey = "Allcategory";
                if(!_cache.TryGetValue(cachekey,out var allcategory))
               {
                    allcategory = entity.Categories.Select(s => new
                    {
                        Cartegory = s.Categorie,
                        books = s.BooksCategories.Select(s => s.Book).Select(s => new
                        {
                            ISBN = s.ISBN,
                            CoverImage = s.CoverImage.Coverimage,
                            Title = s.Title,
                            price = s.Products.OrderByDescending(s => s.price).Select(s => new { price = s.price, discount = s.DiscountPercent }).FirstOrDefault()
                        })
                    }).ToList();
                    var cacheexpiry = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(30),
                        SlidingExpiration = TimeSpan.FromMinutes(5)
                        
                    };
                    _cache.Set(cachekey, allcategory, cacheexpiry);
                }
                return Ok(allcategory);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [Route("{categoryNames}")]
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(entity.Categories.Select(s => s.Categorie));
        }
        [HttpPost]
        [Authorize(Roles = "Admin,vendor")]
        public async Task<IActionResult> addCategorie(string category)
        {
            Categories CategorieToAdd = entity.Categories.Where(s => s.Categorie.Trim().ToLower() == category.Trim().ToLower()).FirstOrDefault();

            if (CategorieToAdd != null)
            {
                return BadRequest($"The auther {category} already exist");
            }
            entity.Categories.Add(
                            new Categories { Categorie = category });
            entity.SaveChanges();
            return Ok("The category is added succesfully");
        }

        [HttpPut]
        [Authorize(Roles = "Admin,vendor")]
        public async Task<IActionResult> UpdateAuther([FromQuery] string category, Categories editedcategory)
        {
            Categories categoryToUpdate = entity.Categories.Where(s => s.Categorie.Trim().ToLower() == category.Trim().ToLower()).FirstOrDefault();

            if (categoryToUpdate == null)
            {
                return BadRequest($"The auther {category} does not exist");
            }
            categoryToUpdate.Categorie = editedcategory.Categorie;
            entity.SaveChanges();

            return Ok("The Categorie has been updated sucessfully Updated");

        }
        [HttpDelete]
        [Authorize(Roles = "Admin,vendor")]
        public async Task<IActionResult> DeletCategorie([FromQuery] string categorie)
        {
            Categories categorieTodelete = entity.Categories.Where(s => s.Categorie.Trim().ToLower() == categorie.Trim().ToLower()).FirstOrDefault();

            if (categorieTodelete == null)
            {
                return BadRequest($"The categorie {categorie} does not exist");
            }
            entity.Categories.Remove(categorieTodelete);
            entity.SaveChanges();
            return Ok("The categorie is added succesfully");
        }
    }
}
