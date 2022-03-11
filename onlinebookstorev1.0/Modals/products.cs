using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals
{
    public class products
    {
        public Guid Product_Id { get; set; }
        public string vendor_Id { get; set; }

        public int BookId { get; set; }
        public int Quantity { get; set; }
        public int price { get; set; }

        public int DiscountPercent { get; set; }
        public Books book { get; set; }
        [ForeignKey("vendor_Id")]
        public AppUser vendor { get; set; }

    }
}
