using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using backend.Dtos.Stocks;
using backend.Helper;

namespace backend.Interfaces
{
    public interface IStockInterface
    {
        Task<List<Stock>> GetAll(QueryObject query);

        Task<Stock?> GetStockBySymbol(string symbol);
        Task<Stock?> GetbyId(int id);
        Task<Stock?> Create(Stock stockModel);
        Task<Stock?> Update(int id , UpdateStockRequestDto stockDto);
        Task<Stock?> Delete(int id);
        Task<bool> StockExists(int id);
    }
}