using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals
{
    public class AddBook
    {
        
        public string ISBN { get; set; }//*
        public string Title { get; set; }//*

        public string publisher { get; set; }
        public int pageCount { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Description { get; set; }
        public ICollection<string> authors { get; set; }
        public  string CoverImage { get; set; }
        public  dimensions dimension { get; set; }
        public string language { get; set; }
        public ICollection<string> categories { get; set; }
    }
}
