    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
using api.Dtos.CommentDtos;

namespace api.DTOs
    {
        public class StockDto
        {
            public int Id { get; set; }
            public string Symbol { get; set; } = string.Empty;
            public string CompanyName { get; set; } = string.Empty;
            public string Industry { get; set; } = string.Empty;
            public long MarketCap { get; set; }
            public decimal Purchase { get; set; }
            public decimal LastDividend { get; set; }
            public List<CommentDto>? Comments { get; set; }
        }
    }