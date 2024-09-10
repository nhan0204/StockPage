using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock?>> GetAllAsync();
        Task<Stock?> GetByIdAsync(int id);
        Task<Stock?> CreateAsync(Stock stockModel);
        Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto updateDto);
        Task<Stock?> DeleteAsync(int id);
        Task<bool> StockExits(int id);
    }
}