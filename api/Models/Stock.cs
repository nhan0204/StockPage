using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class Stock
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(25)")]
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Industry { get; set; } = string.Empty;
        public long MarketCap { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Purchase { get; set; }
    
        [Column(TypeName = "decimal(18,2)")]
        public decimal LastDividend { get; set; }

        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}