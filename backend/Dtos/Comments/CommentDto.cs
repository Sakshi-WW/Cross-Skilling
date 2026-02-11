using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Comments
{
    public class CommentDto
    {
        
        public int Id { get; set; }

        [Required]
        [MinLength(50, ErrorMessage = "Content must be at least 50 characters.")]
        [MaxLength(500, ErrorMessage = "Content must be at most 500 characters.")]
        public string Content { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }=DateTime.Now;
        public int? StockId { get; set; } 
        public string CreadtedBy { get; set; } = string.Empty;
    }
}