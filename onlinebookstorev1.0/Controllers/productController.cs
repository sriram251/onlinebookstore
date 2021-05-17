using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using onlinebookstorev1._0.Modals;
using onlinebookstorev1._0.Modals.ActionModal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles =("vendor"))]
    [System.Runtime.InteropServices.Guid("C9C8C403-38DD-4C8C-BCC4-990867721782")]
    public class productController : ControllerBase

    {

        private readonly ILogger<productController> _logger;
        private readonly BookstoreContext entity;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManger;
        public productController(BookstoreContext db, ILogger<productController> logger, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.entity = db;
            this._logger = logger;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._roleManger = roleManager;
        }
        [HttpPost]
        

        public async Task<IActionResult> Addproduct(Addproductmodal productToAdd)
        {
            var existingbook = entity.Books.Where(s => s.ISBN == productToAdd.book.ISBN).FirstOrDefault();
            if(existingbook == null)
            {
                using (var Client = new HttpClient())
                {
                    StringContent content = new StringContent(JsonConvert.SerializeObject(productToAdd.book), Encoding.UTF8, "application/json");
                    using(var response = await Client.PostAsync("https://localhost:5001/api/Book", content))
                    {
                        if(response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            _logger.LogInformation(response.Content.ToString());
                        }
                        else
                        {
                            return BadRequest(response.Content.ToString());
                        }
                    }
                }
                existingbook = entity.Books.Where(s => s.ISBN == productToAdd.book.ISBN).FirstOrDefault();
            }
            var productCheck = entity.Products.Where(s => s.BookId == existingbook.BookId && s.vendor_Id == productToAdd.vendor_Id).FirstOrDefault();
            if(productCheck != null)
            {
                return BadRequest("This product already exist");
            }
            try
            {
                await entity.Products.AddAsync(new products
                {
                    BookId = existingbook.BookId,
                    vendor_Id = productToAdd.vendor_Id,
                    Quantity = productToAdd.Quantity,
                    price = productToAdd.price,
                    DiscountPercent = productToAdd.DiscountPercent
                });
                await entity.SaveChangesAsync();
            }
            catch
            {
                return BadRequest("something went wrong");
            }
            
            return Ok("product has been added succesfully");
        }
        [HttpPut]
        public async Task<IActionResult> updateproduct(updateproductmodal productToUpdate)
        {
            var product = entity.Products.Where(s => s.Product_Id == productToUpdate.productId).FirstOrDefault();
            if(product == null)
            {
                return BadRequest("The product is not avaliable");
            }
            product.price = productToUpdate.price;
            product.Quantity = productToUpdate.Quantity;
            product.DiscountPercent = productToUpdate.DiscountPercent;
            await entity.SaveChangesAsync();
            return Ok("product has been updated succesfully");
        }
        [HttpDelete("{productidToRemove}")]

        public async Task<IActionResult> DeleteProduct(Guid productidToRemove)
        {
            var product = await entity.Products.FindAsync(productidToRemove);
            if(product == null)
            {
                return BadRequest("The product is not present");
            }
            entity.Products.Remove(product);
            entity.SaveChanges();

            return Ok("product has been succesfully deleted");
        }
    }
}
