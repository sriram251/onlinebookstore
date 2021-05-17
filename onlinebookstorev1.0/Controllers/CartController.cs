using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using onlinebookstorev1._0.Modals;
using onlinebookstorev1._0.Modals.ActionModal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ILogger<CartController> _logger;
        private readonly BookstoreContext entity;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManger;
        public CartController(BookstoreContext db, ILogger<CartController> logger, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.entity = db;
            this._logger = logger;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._roleManger = roleManager;
        }
        [HttpPost]
        public async Task<IActionResult> AddCart(AddCartmodal cartToAdd)
        {
            var product = entity.UsersCarts.Where(s => s.BookId == cartToAdd.BookId && s.user_Id == cartToAdd.user_Id).FirstOrDefault();
            _logger.LogInformation("product in userid ",product);
            if(product != null)
            {
                return BadRequest("The product already exist in cart");
            }
            
            await entity.UsersCarts.AddAsync(new
             usersCart{
                BookId = cartToAdd.BookId,
                user_Id = cartToAdd.user_Id,
                
                price = cartToAdd.price,
                status = cartToAdd.status,  
                quantity = cartToAdd.quantity
            });
            entity.SaveChanges();
            return Ok("user item has been added ");

        }
        [HttpDelete]
        public async Task<IActionResult> DeletefromCart(deleteCartModal cartItemTodelet)
        {
            var product = entity.UsersCarts.Where(s => s.BookId == cartItemTodelet.BookId && s.user_Id == cartItemTodelet.user_Id).FirstOrDefault();
            
            if (product == null)
            {
                _logger.LogInformation("product is not avaliable");
                return BadRequest("The product is not avaliable");
            }
            entity.UsersCarts.Remove(product);
            entity.SaveChanges();
            return Ok("cart item removed success fully");
        }
    }
}
