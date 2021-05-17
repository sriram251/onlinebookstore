using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using onlinebookstorev1._0.Controllers.services;
using onlinebookstorev1._0.Modals;
using onlinebookstorev1._0.Modals.ActionModal;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Controllers
{
    [Route("api/[controller]")]
    
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManger;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager) 
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._roleManger = roleManager;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(Registermodal userdetail)
        {
            if (string.IsNullOrWhiteSpace(userdetail.Email) || string.IsNullOrWhiteSpace(userdetail.FirstName) || string.IsNullOrWhiteSpace(userdetail.password) || string.IsNullOrWhiteSpace(userdetail.lastName))
            {
                return BadRequest("some entries are nulll");
            }
            if( userdetail.password != userdetail.confirmPassword)
            {
                return BadRequest("password and conformpassword does not match");

            }
            if (string.IsNullOrWhiteSpace(userdetail.role))
            {
                return BadRequest("please select role");
            }
            if(!await _roleManger.RoleExistsAsync(userdetail.role))
            {
                await _roleManger.CreateAsync(new IdentityRole(userdetail.role));
            }

            AppUser user = new AppUser
            {
                UserName = userdetail.Email.Split("@")[0],
                Email = userdetail.Email,
                firstName = userdetail.FirstName,
                LastName = userdetail.lastName,
                Role = userdetail.role
            };
            AppUser foundUser = await _userManager.FindByEmailAsync(user.Email);
            if(foundUser != null)
            {
                return BadRequest("The user already exist");
            }
            IdentityResult result = await _userManager.CreateAsync(user, userdetail.password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, userdetail.role);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var callbackurl = Url.Action("ConfirmEmail", "Account",new { userid = user.Id,token = code});
                Log.Information($"https://localhost:5001{callbackurl}");

                Emailservices.send(user.Email, "Confirmation Email", $"Click <a href='https://localhost:5001{callbackurl}'>here</a> to verify your email");
                return Ok("Registerd succesfully please confirm the email");
            }
            else
            {

                return BadRequest("Error occured while creating user");
            }
        }
        /// <summary>
        /// To conform the users email 
        /// </summary>
        /// <param name="userid">userid sent to the users Email</param>
        /// <param name="token">token sent to the users Email</param>
        /// <returns>redirects to home page</returns>
        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string userid, string token)
        {

            var user = await _userManager.FindByIdAsync(userid);
            if(user != null)
            {   
                var confirmUser = await _userManager.ConfirmEmailAsync(user, token);
                if (confirmUser.Succeeded)
                {
                    return new RedirectResult("https://localhost:5001/");
                }
                
            }
            return new RedirectResult("https://localhost:5001/api/Register");
        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModal loginUser)
        {
            if(string.IsNullOrWhiteSpace(loginUser.Email) || string.IsNullOrWhiteSpace(loginUser.password))
            {
                return BadRequest("Email or password is null");
            }
            AppUser user = await _userManager.FindByEmailAsync(loginUser.Email);
            if(user == null)
            {
                return BadRequest("Invalid Email or password");
            }
            
            if (!user.EmailConfirmed)
            {
                return BadRequest("Please confirm your email");
            }
            
            var signin = await _signInManager.PasswordSignInAsync(user, loginUser.password,isPersistent:false,lockoutOnFailure:false);
            Log.Information($"the sigin {signin}");
            if (signin.Succeeded)
            {
                return await GetLoginedUserdata(loginUser.Email);


            }
            return BadRequest("Invalid Email or password");

        }
        [HttpGet]
        [Route("Getuser/{Email}")]
        [Authorize]
        public async Task<IActionResult> GetLoginedUserdata(string Email)
        {
            var returnuser = _userManager.Users.Where(s => s.Email == Email).Select(s => new {
                Id = s.Id,
                FirstName = s.firstName,
                LastName =  s.LastName,
                Email = s.Email,
                role = s.Role,
                phonenumber = s.PhoneNumber,
                shopName = s.ShopName,
                usercart = s.Carts.Where(s => s.status == "cart").Select(s => new {
                    
                    BookId = s.BookId,
                    quantity = s.quantity,
                    coverimage = s.book.CoverImage.Coverimage,
                    BookName = new { Title =  s.book.Title , ISBN = s.book.ISBN},
                     provider = s.book.Products.OrderByDescending(s => s.price).Select(s => new
                     {
                         shopname = s.vendor.ShopName,
                         price = s.price,
                         discount = s.DiscountPercent,
                         product_id = s.Product_Id,
                         vendor_Id = s.vendor_Id,
                     }).FirstOrDefault()
        }).ToList(),
             
                Adresses = s.Addresses.ToList(),
                Avaliableproducts = s.Avaliableproducts.Select(s =>
                new {
                    BookName = s.book.Title,
                    price =  s.price,
                    Quantity = s.Quantity,
                    discount = s.DiscountPercent,
                    ProductId = s.Product_Id,
                })
            }).FirstOrDefault();
            Log.Information($"{returnuser.Adresses}");
            if(returnuser == null)
            {
                BadRequest("No user found");
            }
            return Ok(returnuser);
        }
        [HttpPost]
        [Route("Forgotpassword")]
        public async Task<IActionResult> Forgotpassword(Forgotpasswordmodal userdata)
        {
            var user = await _userManager.FindByEmailAsync(userdata.Email);
            if (user == null)
            {
                return BadRequest("The dosen't Exist");
            }
            else
            {
                if (await _userManager.IsEmailConfirmedAsync(user))
                {
                    var token =await  _userManager.GeneratePasswordResetTokenAsync(user);
                    Emailservices.send(user.Email, "RestPassword Email", $"Click <a href='https://localhost:5001/RestPassword/?token={token}'>here</a> to Rest your password");
                    return Ok("Please Check your Email To restPassword");
                }
                else
                {
                    return BadRequest("Please confirm the user");
                }
            }
        }

        [HttpPost]
        [Route("RestPassword")]
        public async Task<IActionResult> RestPassword(RestpasswordModal userchangepassword)
        {
            Log.Information($"{userchangepassword.Email} {userchangepassword.password}{userchangepassword.Token}");
            if(userchangepassword.Token == null)
            {
                return BadRequest("Invalid user");
            }
            else
            {
                var user = await _userManager.FindByEmailAsync(userchangepassword.Email);
                if (user == null)
                {
                    return BadRequest("The dosen't Exist");
                }
                else
                {
                    if (await _userManager.IsEmailConfirmedAsync(user))
                    {
                        var changepassword =await _userManager.ResetPasswordAsync(user, userchangepassword.Token, userchangepassword.password);
                        if (changepassword.Succeeded)
                        {
                            
                            
                            return Ok("The password has been changed succesfully");
                        }
                        else
                        {
                            foreach (var error in changepassword.Errors)
                            {

                                Log.Information($"{error.Code}, {error.Description}");
                            }
                            return BadRequest("something went wrong");
                        }
                    }
                    else
                    {
                        return BadRequest("Please verify email");
                    }
                }
            }

        }


        [HttpPost]

        [Route("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
        [HttpPut]
        [Route("Updateuser")]
        [Authorize]
        public async Task<IActionResult> updateuser(Updateusermodal updateddata)
        {
            var user = await _userManager.FindByEmailAsync(updateddata.Email);
            if(user == null)
            {
                return BadRequest("user is not present");
            }
            else
            {
                user.ShopName = updateddata.shopName;
                user.PhoneNumber = updateddata.phonenumber;
                user.firstName = updateddata.firstName;
                user.LastName = updateddata.LastName;

                await _userManager.UpdateAsync(user);
            }
            return Ok("User has been updated sucessfully");
        }
        [HttpPost]
        [Route("RemoverUser")]
        public async Task<IActionResult>RemoverUser( AppUser user)
        {
            var userTodelete = await _userManager.FindByEmailAsync(user.Email);
            if(userTodelete == null)
            {
                return BadRequest("the user is not exist");
            }
            
            await _userManager.DeleteAsync(userTodelete);
            return Ok("user deleted succesfully");
        }
    }
}
