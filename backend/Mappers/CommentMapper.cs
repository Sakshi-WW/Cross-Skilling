using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Comments;
using backend.models; 


namespace backend.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Content = commentModel.Content,
                Title = commentModel.Title,
                CreatedOn = commentModel.CreatedOn,
                StockId = commentModel.StockId,
                CreadtedBy = commentModel.AppUser?.UserName ?? "Unknown"
            };
        }

        public static Comment ToCommentFromCreate(this CreateCommentRequestDto commentModel , int stockId)
        {
            return new Comment
            {
                Content = commentModel.Content,
                Title = commentModel.Title,
                StockId = stockId,
            };
        }

        public static Comment ToCommentFromUpdate(this UpdateCommentRequestDto commentModel,int stockId)
        {
            return new Comment
            {
                StockId = stockId, 
                Content = commentModel.Content,
                Title = commentModel.Title,
            };
        }
    }
}