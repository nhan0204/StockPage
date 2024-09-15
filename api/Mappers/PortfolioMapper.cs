using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Portfolio;
using api.Models;

namespace api.Mappers
{
    public static class PortfolioMapper
    {
        public static PortfolioDto ToPortfolioDto(Portfolio portfolio)
        {
            return new PortfolioDto
            {
                AppUserId = portfolio.AppUserId,
                StockId = portfolio.StockId
            };
        }
    }
}