using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Migrations;
using api.Models;

namespace api.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<Stock>> GetUserPortfolioAsync(AppUser appUser);
        Task<Portfolio?> CreateAsync(Portfolio porfolio);
        Task<Portfolio?> DeleteAsync(AppUser appUser, string symbol);
    }
}