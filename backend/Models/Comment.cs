
using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;


namespace backend.models
{
    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }=DateTime.Now;
        public int? StockId { get; set; }
        public Stock? Stock { get; set; }
        public String? AppUserId { get; set; }
        public Users? AppUser { get; set; }

    }
}