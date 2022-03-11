using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals.ActionModal
{
    public class Bookmodal
    {
        public string ISBN { get; set; }//*
        public string Title { get; set; }//*

        public string publisher { get; set; }
        public int pageCount { get; set; }
        public string Description { get; set; }
        public string CoverImage { get; set; }
        public virtual IEnumerable<string> Authers { get; set; }
        public string language { get; set; }
        public virtual IEnumerable<string> Categories { get; set; }
    }
}
