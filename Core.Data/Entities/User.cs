using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Entities
{
    public class User
    { 
        public Guid Id { get; set; }
        public string FirstName { get; set; }=string.Empty;
        public string? LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; }
        public string Address { get; set; }
        public Role Role { get; set; }

    }
    public enum Role
    {
        Admin,
        Customer,
        Agent
    }
}
