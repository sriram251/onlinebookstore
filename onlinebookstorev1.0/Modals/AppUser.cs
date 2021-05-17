using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals
{
    public class AppUser : IdentityUser
    {
        public string firstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string ShopName { get; set; }
        public virtual ICollection<PeopleAddress> Addresses { get; set; }
        
        public virtual ICollection<products> Avaliableproducts { get; set; }
        public virtual ICollection<usersCart> Carts { get; set; }

    }
}
