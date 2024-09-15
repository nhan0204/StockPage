using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Database;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;

        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Stock>> GetUserPortfolioAsync(AppUser appUser)
        {
            return await _context.Portfolios
            .Where(user => user.AppUserId == appUser.Id)
            .Select(portfolio => new Stock
            {
                Id = portfolio.StockId,
                Symbol = portfolio.Stock!.Symbol,
                CompanyName = portfolio.Stock.CompanyName,
                Purchase = portfolio.Stock.Purchase,
                LastDividend = portfolio.Stock.LastDividend,
                Industry = portfolio.Stock.Industry,
                MarketCap = portfolio.Stock.MarketCap
            }).ToListAsync();
        }
    }
}