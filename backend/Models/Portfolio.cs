using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using backend.models;

namespace backend.Models
{
    [Table("Portfolios")]
    public class Portfolio
    {
        
        public string AppUserId { get; set; }
        public int StockId { get; set; }

        public Users AppUser { get; set; }
        public Stock Stock { get; set; }
    }
}