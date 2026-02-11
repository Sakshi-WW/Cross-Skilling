using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.models;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Dtos.Stocks;
using backend.Mappers;
using backend.Helper;

namespace backend.Repositories
{
    public class StockRepository : IStockInterface
    {
        private readonly ApplicationDbContext _context;
        public StockRepository(ApplicationDbContext context)
        {
            _context=context;
        }

        public async Task<Stock?> Create(Stock stockModel)
        {
            await _context.Stock.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock?> Delete(int id)
        {
            var stockModel = await _context.Stock.FindAsync(id);
            if(stockModel == null)
            {
                return null;
            }
            _context.Stock.Remove(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<List<Stock>> GetAll(QueryObject query)
        {
            var stocks = _context.Stock.Include(s => s.Comments).ThenInclude(c => c.AppUser).AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stocks = stocks.Where(s => s.Symbol.Contains(query.Symbol));
            }
            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stocks = stocks.Where(s => s.Company.Contains(query.CompanyName));
            }
            if (query.SortBy != null)
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDecsending ? stocks.OrderByDescending(s => s.Symbol) : stocks.OrderBy(s => s.Symbol);
                }
                else if (query.SortBy.Equals("CompanyName", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDecsending ? stocks.OrderByDescending(s => s.Company) : stocks.OrderBy(s => s.Company);
                }
            }
            return await stocks.Skip((query.PageNumber - 1) * query.PageSize).Take(query.PageSize).ToListAsync();
        }
        public async Task<Stock?> GetbyId(int id)
        {
            return await _context.Stock.Include(s => s.Comments).FirstOrDefaultAsync(s => s.Id == id);
        }

        public Task<Stock?> GetStockBySymbol(string symbol)
        {
            return _context.Stock.FirstOrDefaultAsync(s => s.Symbol == symbol);
        }

        public Task<bool> StockExists(int id)
        {
            return _context.Stock.AnyAsync(s => s.Id == id);
            
        }

        public async Task<Stock?> Update(int id, UpdateStockRequestDto stockDto)
        {
            var stockModel = await _context.Stock.FindAsync(id);
            if(stockModel == null)
            {
                return null;
            }
            StockMapper.ToStockFromUpdateDto(stockDto, stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }
    }
}