using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Comments
{
    public class UpdateCommentRequestDto
    {
        public string Content { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
    }
}