using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals.ActionModal
{
    public class RestpasswordModal
    {   
        [Required]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string password { get; set; }
        [DataType(DataType.Password)]
        [Required]
        public string confirmPassword { get; set; }
        public string Token { get; set; }

    }
}
