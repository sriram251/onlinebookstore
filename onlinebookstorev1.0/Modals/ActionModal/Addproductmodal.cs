using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals.ActionModal
{
    public class Addproductmodal
    {
        public string vendor_Id { get; set; }
        
        public int Quantity { get; set; }
        public int price { get; set; }

        public int DiscountPercent { get; set; }
        public AddBook book { get; set; }
    }
}
