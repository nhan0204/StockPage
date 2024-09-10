using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Database;
using api.Dtos;
using api.DTOs;
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

        public async Task<List<Stock?>> GetAllAsync()
        {
            var stocks = await _context.Stocks.Include(stock => stock.Comments).ToListAsync();
            return stocks!;
        }


        public async Task<Stock?> GetByIdAsync(int id)
        {
            var stock = await _context.Stocks.Include(stock => stock.Comments).FirstOrDefaultAsync(stock => stock.Id == id);
            return stock!;
        }

        public async Task<Stock?> CreateAsync(Stock stockModel)
        {
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();

            return stockModel;
        }
        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto updateDto)
        {
            var existingStock = await _context.Stocks.FirstOrDefaultAsync(stock => stock.Id == id);

            if (existingStock == null)
                return null;

            existingStock.Symbol = updateDto.Symbol;
            existingStock.CompanyName = updateDto.CompanyName;
            existingStock.Purchase = updateDto.Purchase;
            existingStock.LastDividend = updateDto.LastDividend;
            existingStock.Industry = updateDto.Industry;
            existingStock.MarketCap = updateDto.MarketCap;

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

        public Task<bool> StockExits(int id)
        {
            return _context.Stocks.AnyAsync(stock => stock.Id == id);
        }
    }
}