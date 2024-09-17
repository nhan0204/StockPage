using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Database;
using api.Dtos;
using api.DTOs;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repo
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;

        public StockRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Stock?>> GetAllAsync(QueryObject query)
        {
            var stocks =  _context.Stocks.Include(stock => stock.Comments).ThenInclude(comment => comment.AppUser).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stocks = stocks.Where(stock => stock.Symbol.Contains(query.Symbol));
            }

            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stocks = stocks.Where(stock => stock.CompanyName.Contains(query.CompanyName));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDescending ? 
                        stocks.OrderByDescending(stock => stock.Symbol) :
                        stocks.OrderBy(stock => stock.Symbol);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            stocks = stocks.Skip(skipNumber).Take(query.PageSize);

            return await stocks.ToListAsync() as List<Stock?>;
        }


        public async Task<Stock?> GetByIdAsync(int id)
        {
            var stock = await _context.Stocks.Include(stock => stock.Comments).ThenInclude(comment => comment.AppUser).FirstOrDefaultAsync(stock => stock.Id == id);
            return stock!;
        }

        public async Task<Stock?> CreateAsync(Stock stockModel)
        {
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();

            return stockModel;
        }
        public async Task<Stock?> UpdateAsync(int id, Stock stockModel)
        {
            var existingStock = await _context.Stocks.FirstOrDefaultAsync(stock => stock.Id == id);

            if (existingStock == null)
                return null;

            existingStock.Symbol = stockModel.Symbol;
            existingStock.CompanyName = stockModel.CompanyName;
            existingStock.Purchase = stockModel.Purchase;
            existingStock.LastDividend = stockModel.LastDividend;
            existingStock.Industry = stockModel.Industry;
            existingStock.MarketCap = stockModel.MarketCap;

            await _context.SaveChangesAsync();
            return existingStock;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(stock => stock.Id == id);

            if (stockModel == null)
                return null;

            _context.Stocks.Remove(stockModel);
            await _context.SaveChangesAsync();

            return stockModel;
        }

        public async Task<bool> StockExits(int id)
        {
            return await _context.Stocks.AnyAsync(stock => stock.Id == id);
        }

        public async Task<Stock?> GetBySymbolAsync(string symbol)
        {
            return await _context.Stocks.FirstOrDefaultAsync(stock => stock.Symbol == symbol);
        }
    }
}