using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? ProductName { get; set; }
        public int UnitPrice { get; set; }
        [Required]
        public int UnitsInStock { get; set; }
        [MaxLength]
        public string? ProductDescription { get; set; }
        [MaxLength]
        public string? Image { get; set; }
    }
}
