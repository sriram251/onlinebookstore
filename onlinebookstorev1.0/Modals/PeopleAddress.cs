using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals
{
    public class PeopleAddress
    {
        public int Address_Id { get; set; }
        public string user_Id { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string State {  get; set; }

        public string Country { get; set; }
        public string Pincode { get; set; }
        [ForeignKey("user_Id")]
        public virtual AppUser User { get; set; }

    }
}
