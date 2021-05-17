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
    [ApiController]
    [Authorize]
    public class AddressController : ControllerBase
    {
        private readonly ILogger<AddressController> _logger;
        private readonly BookstoreContext entity;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManger;
        public AddressController(BookstoreContext db, ILogger<AddressController> logger, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.entity = db;
            this._logger = logger;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._roleManger = roleManager;
        }
        [HttpPost]
        public async Task<IActionResult> AddAddress(AddressModal address)
        {
            var user = await _userManager.FindByEmailAsync(address.Email);

            if (user == null)
            {
                return Ok("the user does not exist");
            }
            await entity.Addresses.AddAsync(new PeopleAddress
            {
                user_Id = user.Id,
                City = address.City,
                Country = address.Country,
                State = address.State,
                District = address.District,
                Pincode = address.Pincode,
                Address = address.Address
            });
            entity.SaveChanges();
            return Ok("the address has been succesfully added");
        }
        [HttpDelete("{addressid}")]
        public async Task<IActionResult> DeleteAddress(int addressid)
        {
            var addressTodelete = entity.Addresses.Where(s => s.Address_Id == addressid).FirstOrDefault();
            if(addressTodelete == null)
            {
                BadRequest("The address is not present to Delete");
            }
            entity.Addresses.Remove(addressTodelete);
            entity.SaveChanges();
            return Ok("The address has been sucessfully deleted");
        }
    }
    
}
