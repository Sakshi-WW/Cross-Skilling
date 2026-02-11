using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Interfaces;
using backend.Mappers;
using backend.Dtos.Comments;
using Microsoft.AspNetCore.Identity;
using backend.Models;
using backend.Extension;

namespace backend.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentInterface _commentRepo;
        private readonly IStockInterface _stockRepo;
        private readonly UserManager<Users> _userManager;
        public CommentController(ICommentInterface commentRepo, IStockInterface stockRepo, UserManager<Users> userManager)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentRepo.GetAllAsync();
            var CommentDto = comments.Select(c => c.ToCommentDto());
            return Ok(CommentDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _commentRepo.GetByIdAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{stockId:int}")]
        public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentRequestDto commentDto , IStockInterface stockRepo)
        {
             if (!await _stockRepo.StockExists(stockId)){
                return NotFound($"Stock with id {stockId} not found.");
            }
            var UserName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(UserName);
            if(AppUser == null)           {
                return NotFound("User not found");
            }

            var CommentModel = commentDto.ToCommentFromCreate(stockId);
            CommentModel.AppUserId = AppUser.Id;
            await _commentRepo.CreateAsync(CommentModel);
            return CreatedAtAction(nameof(GetById), new { id = CommentModel.Id }, CommentModel.ToCommentDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate(id));

            if (comment == null)
            {
                return NotFound("Comment not found");
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var comment = await _commentRepo.DeleteAsync(id);
            if (comment == null)
            {
                return NotFound("Comment not found");
            }
            return Ok(comment.ToCommentDto());
        }
    }
}
