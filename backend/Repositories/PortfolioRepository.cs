using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.models;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class PortfolioRepository : IPortfolioInterface
    {
        private readonly ApplicationDbContext _context;

        public PortfolioRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            _context.Portfolios.Add(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        public async Task<Portfolio> DeleteAsync(Users users, string symbol)
        {
            var portfolioModel = _context.Portfolios.FirstOrDefault(p => p.AppUserId == users.Id && p.Stock.Symbol.ToLower() == symbol.ToLower());
            if (portfolioModel != null)
            {
                _context.Portfolios.Remove(portfolioModel);
                await _context.SaveChangesAsync();
            }
            return portfolioModel;
        }

        public async Task<List<Stock>> GetPortfolio(Users user)
        {
            return await _context.Portfolios.Where(p => p.AppUserId == user.Id).Select(Stock => new Stock
            {
                Id = Stock.StockId,
                Symbol = Stock.Stock.Symbol,
                Company = Stock.Stock.Company,
                Purchase = Stock.Stock.Purchase,
                LastDiv= Stock.Stock.LastDiv,
                Industry = Stock.Stock.Industry,
                MarketCap = Stock.Stock.MarketCap
            }).ToListAsync();
        }
    }
}