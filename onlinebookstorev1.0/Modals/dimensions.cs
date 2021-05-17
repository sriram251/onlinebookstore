using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals
{
    public class dimensions
    {   [Key]
        public int dimension_Id { get; set; }
        public string height { get; set; }
        public string thickness { get; set; }
        public string width { get; set; }

       

    }
}
