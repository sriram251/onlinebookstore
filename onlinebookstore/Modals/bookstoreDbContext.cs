using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace onlinebookstore.Modals
{
    public class bookstoreDbContext : DbContext
    {
        public virtual DbSet<Book> book { get; set; }
        public bookstoreDbContext(DbContextOptions option) : base(option)
        {

        }
    } 
}
