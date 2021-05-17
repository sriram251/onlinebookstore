using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals
{
    public class Categories
    {
       

        public int CategorieId { get; set; }
        public string Categorie { get; set; }
        public virtual ICollection<BooksCategorie> BooksCategories { get; set; }


    }
}
