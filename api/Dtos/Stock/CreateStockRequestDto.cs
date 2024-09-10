using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class CreateStockRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 char")]
        public string Symbol { get; set; } = string.Empty;

        [Required]
        [MaxLength(10, ErrorMessage = "Company Name cannot be over 10 characters")]
        public string CompanyName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(20, ErrorMessage = "Industry cannot be over 20 characters")]
        public string Industry { get; set; } = string.Empty;

        [Required]
        [Range(1, 50_000_000_000)]
        public long MarketCap { get; set; }

        [Required]
        [Range(1, 10_000_000_000)]
        public decimal Purchase { get; set; }
        
        [Required]
        [Range(0.001, 40)]
        public decimal LastDividend { get; set; }
    }
}