using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals.ActionModal
{
    public class AddCartmodal
    {
        public int BookId { get; set; }

        public string user_Id { get; set; }
        public string vendor_Id { get; set; }
        public int price { get; set; }
        public string status { get; set; }
        public int quantity { get; set; }
    }
}
