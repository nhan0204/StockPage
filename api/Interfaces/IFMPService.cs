using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Services
{
    public interface IFMPService
    {
        Task<Stock?> FindStockBySymbolAsync(string symbol);
        Task<string?> GetCompanyLogoAsync(string symbol);
        Task<string[]> GetCompanyPeersGroupAsync(string symbol);
    }
}