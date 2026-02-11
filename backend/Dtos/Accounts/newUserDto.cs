using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Accounts
{
    public class newUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }

        public string token { get; set; }
    }
}