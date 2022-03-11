using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals
{
    public class purchasedproducts
    {
        public int BookId { get; set; }

        public string user_Id { get; set; }
        public int price { get; set; }
        public string status { get; set; }

        public int quantity { get; set; }
        [ForeignKey("user_Id")]
        public AppUser user { get; set; }


        [ForeignKey("BookId")]
        public Books book { get; set; }
    }
}
