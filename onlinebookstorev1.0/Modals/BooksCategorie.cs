using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Modals
{
    public class BooksCategorie
    {
        public int BookId { get; set; }
        public int CategorieId { get; set; }

        public virtual Categories Categorie { get; set; }
        public virtual Books Book { get; set; }
    }
}
