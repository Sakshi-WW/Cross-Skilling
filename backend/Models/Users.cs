using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using backend.models;
using System.ComponentModel.DataAnnotations.Schema;


namespace backend.Models
{
    [Table("AspNetUsers")]
    public class Users : IdentityUser
    {
        public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
    }
}