using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Controllers
{
    [Authorize(Roles = "costumer")]
    [Route("api/[controller]")]
    [ApiController]
    public class AutherController : ControllerBase
    {
        private readonly ILogger<AutherController> _logger;
        private readonly BookstoreContext entity;
        public AutherController(BookstoreContext db, ILogger<AutherController> logger)
        {
            this.entity = db;
            this._logger = logger;
        }
        [HttpGet]
        public IActionResult GetAutherWithBooks()
        {

            return Ok(entity.Authers.Select(s => new { 
            AutherName = s.AutherName,
            ImageUrl = s.AutherImageUrl,
            Books = s.authersbook.Select(s => s.Book).Select(s => new {
                ISBN = s.ISBN,
                language = s.language,
                pageCount = s.pageCount,
                publisher = s.publisher,
                PublishedDate = s.PublishedDate,
                CoverImage = s.CoverImage.Coverimage,
                Title = s.Title,
                Description = s.Description,
                Categories = s.BooksCategories.Select(s => s.Categorie.Categorie)
            })
            }));
        }
        [HttpGet]
        [Route("{AutherNames}")]
        public async Task<IActionResult> GetAuther()
        {
            return Ok(entity.Authers.Select(s => s.AutherName));
        }
        [HttpPost]
        [Authorize(Roles = "Admin,vendor")]
        public async Task<IActionResult> createAuther(string auther,string autherlink)
        {
            Authers autherToAdd = entity.Authers.Where(s => s.AutherName.Trim().ToLower() == auther.Trim().ToLower()).FirstOrDefault();

            if(autherToAdd != null)
            {
                return BadRequest($"The auther {auther} already exist");
            }
            entity.Authers.Add(
                            new Authers { AutherName = auther , AutherImageUrl = autherlink });
            entity.SaveChanges();
            return Ok("The auther is added succesfully");
        }

        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateAuther([FromQuery] string auther, Authers editedAuther)
        {
            Authers autherToUpdate = entity.Authers.Where(s => s.AutherName.Trim().ToLower() == auther.Trim().ToLower()).FirstOrDefault();

            if (autherToUpdate == null)
            {
                return BadRequest($"The auther {auther} does not exist");
            }
            autherToUpdate.AutherName = editedAuther.AutherName;
            autherToUpdate.AutherImageUrl= editedAuther.AutherImageUrl;
            entity.SaveChanges();

            return Ok("The Auther has been updated sucessfully Updated");

        }
            [HttpDelete]
        [Authorize(Roles = "Admin,vendor")]
        public async Task<IActionResult> DeletAuther([FromQuery]string auther)
        {
            Authers autherTodelete = entity.Authers.Where(s => s.AutherName.Trim().ToLower() == auther.Trim().ToLower()).FirstOrDefault();

            if (autherTodelete == null)
            {
                return BadRequest($"The auther {auther} does not exist");
            }
            entity.Authers.Remove(autherTodelete);
            entity.SaveChanges();
            return Ok("The auther is added succesfully");
        }

    }
}
