using Core.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Dtos
{
    public class UserDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; }
        public string Address { get; set; }
        public Role Role { get; set; }

    }
    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
