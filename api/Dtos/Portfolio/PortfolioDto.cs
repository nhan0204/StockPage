using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Portfolio
{
    public class PortfolioDto
    {
        public string? AppUserId { get; set; }
        public int StockId { get; set; }
    }
}