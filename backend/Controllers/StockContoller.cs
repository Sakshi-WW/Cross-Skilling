using backend.Data;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos.Stocks;
using backend.Mappers;
using backend.Interfaces;
using backend.Helper;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/stock")]
    [ApiController]

    public class StockController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IStockInterface _stockRepo;
        public StockController(ApplicationDbContext context,IStockInterface stockRepo)
        {
            _stockRepo= stockRepo;
            _context = context;
        }


       
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject Query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stocks = await _stockRepo.GetAll(Query);

            var stockDto = stocks.Select(s => s.ToStockDto()).ToList();

            return Ok(stockDto);
        }

        [HttpGet("{id:int}")] //attribute routing
        public async Task<IActionResult>  GetById([FromRoute] int id) //model binding id string to int
        {
            var stock = await _stockRepo.GetbyId(id); //if it were not primary then FirstOrDefault 
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stockModel = stockDto.ToStockFromCreateDto();
            await _stockRepo.Create(stockModel);
            return CreatedAtAction(
                nameof(GetById), 
                new { id = stockModel.Id },
                stockModel.ToStockDto()
            );
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id , [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel = await _stockRepo.Update(id, updateDto);
            if(stockModel == null)
            {
                return NotFound();
            }
            await _context.SaveChangesAsync();
            return Ok(stockModel.ToStockDto());
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var stockModel = await _stockRepo.Delete(id);
            if(stockModel == null)
            {
                return NotFound();
            }   
            return NoContent();
        }


    }
}