using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using backend.Models;

namespace backend.Interfaces
{
    public interface IPortfolioInterface
    {
        Task<List<Stock>> GetPortfolio(Users user);
        Task<Portfolio> CreateAsync(Portfolio portfolio);
        Task<Portfolio> DeleteAsync(Users users, string symbol);

    }
}