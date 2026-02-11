using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using backend.Extension;
using Microsoft.VisualBasic;

namespace backend.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<Users> _userManager;
        private readonly IStockInterface _stockRepo;
        private readonly IPortfolioInterface _portfolioRepo;

        public PortfolioController(UserManager<Users> userManager, IStockInterface stockRepo,IPortfolioInterface portfolioRepo) 
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolioRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);
            if (AppUser == null)
            {
                return NotFound("User not found");
            }
            var portfolio = await _portfolioRepo.GetPortfolio(AppUser);


            
            return Ok(portfolio);
        }

        [HttpPost()]
        [Authorize]
        public async Task<IActionResult> AddStockToPortfolio(string Symbol)
        {
            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);
            var stock = await _stockRepo.GetStockBySymbol(Symbol);
            if (stock == null)
            {
                return NotFound("Stock not found");
            }
            var portfolio = await _portfolioRepo.GetPortfolio(AppUser);
            if(portfolio.Any(e => e.Symbol.ToLower() == Symbol.ToLower()))
            {
                return BadRequest("Stock already in portfolio");
            }
           
        
            var PortfolioModel = new Portfolio
            {
            StockId= stock.Id,
            AppUserId = AppUser.Id 
            };
            await _portfolioRepo.CreateAsync(PortfolioModel);
            if (PortfolioModel == null)
            {
                return BadRequest("Failed to add stock to portfolio");
            }
            return Ok("Stock added to portfolio");

    }
    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeletePortfolio(string Symbol)
    {
        var userName = User.GetUsername();
        var AppUser = await _userManager.FindByNameAsync(userName);
        var portfolio = await _portfolioRepo.GetPortfolio(AppUser);
        var FilteredStock= portfolio.Where(s => s.Symbol.ToLower() == Symbol.ToLower());
        if (FilteredStock.Count() == 1)
            {
                await _portfolioRepo.DeleteAsync(AppUser, Symbol);
                return Ok("Stock removed from portfolio");
            }
        else
            {
                return NotFound("Stock not found in portfolio");
            }
        
}
}}