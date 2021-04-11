using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstore.Modals
{
    public class Book
    {   [Key]
        public int Books_id { get; set; }
        public string Title { get; set; }
        public int Auther_id { get; set; }
        public DateTime Published_date { get; set; }
        [Required]
        public string shortDescription { get; set; }
        [Required]
        public string longDescription { get; set; }
        public int coverImage_id { get; set; }
        public int sampleDoc_id { get; set; }
    }
}
