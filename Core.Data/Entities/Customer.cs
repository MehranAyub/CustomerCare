using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Entities
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string FName { get; set; }
        public string? LName { get; set; }
        public string? Address { get; set; }
        [Required]
        public string Email { get; set; }   
        public string? Phone { get; set; }   
        [Required]
        public string Passwrord { get; set; }

        public string? Role { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}
