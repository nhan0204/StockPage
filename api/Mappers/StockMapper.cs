using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.Stock;
using api.DTOs;
using api.Models;

namespace api.Mappers
{
    public static class StockMapper
    {
        // Creating Dto for Stock web api to query
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                Id = stockModel.Id,
                Symbol = stockModel.Symbol,
                CompanyName = stockModel.CompanyName,
                Purchase = stockModel.Purchase,
                LastDividend = stockModel.LastDividend,
                Industry = stockModel.Industry,
                MarketCap = stockModel.MarketCap,
                Comments = stockModel.Comments.Select(comment => comment.ToCommentDto()).ToList()
            };
        }

        // Converting StockDto from web api request to Stock Model
        public static Stock ToStockFromCreate(this CreateStockRequestDto stockDto)
        {
            return new Stock
            {
                Symbol = stockDto.Symbol,
                CompanyName = stockDto.CompanyName,
                Purchase = stockDto.Purchase,
                LastDividend = stockDto.LastDividend,
                Industry = stockDto.Industry,
                MarketCap = stockDto.MarketCap
            };
        }

        public static Stock ToStockFromUpdate(this UpdateStockRequestDto stockDto)
        {
            return new Stock
            {
                Symbol = stockDto.Symbol,
                CompanyName = stockDto.CompanyName,
                Purchase = stockDto.Purchase,
                LastDividend = stockDto.LastDividend,
                Industry = stockDto.Industry,
                MarketCap = stockDto.MarketCap
            };
        }

        public static Stock ToStockFromFMP(this FMPStock fmpStock)
        {
            // Console.WriteLine($"[ {fmpStock.price} - {fmpStock.lastDiv} ]");
            return new Stock
            {
                Symbol = fmpStock.symbol!,
                CompanyName = fmpStock.companyName!,
                Purchase = (decimal) fmpStock.price,
                LastDividend = (decimal) fmpStock.lastDiv,
                Industry = fmpStock.industry!,
                MarketCap = fmpStock.mktCap
            };
        }
    }
}