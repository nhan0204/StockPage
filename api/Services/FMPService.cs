using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore.Storage;
using Newtonsoft.Json;

namespace api.Services
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try 
            {
                var apiKey = _config["FMPKey"];
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={apiKey}");

                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                    var stock = tasks![0];

                    if (stock != null)
                        return stock.ToStockFromFMP();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return null;
        }

        public async Task<string?> GetCompanyLogoAsync(string symbol)
        {
            try 
            {
                var apiKey = _config["FMPKey"];
                var logoUrl = $"https://financialmodelingprep.com/image-stock/{symbol.ToUpper()}.png?apikey={apiKey}";
                var result = await _httpClient.GetAsync(logoUrl);

                if (result.IsSuccessStatusCode)
                    return logoUrl;
                
            } 
            catch (Exception e)
            {
                throw new Exception(e.Message);

            }

            return null;
        }

        public async Task<string[]> GetCompanyPeersGroupAsync(string symbol)
        {
            try 
            {
                var apiKey = _config["FHIKey"];
                var result = await _httpClient.GetAsync($"https://finnhub.io/api/v1/stock/peers?symbol={symbol.ToUpper()}&token={apiKey}");

                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var peersGroup = JsonConvert.DeserializeObject<string[]>(content);

                    return peersGroup!;
                }
            } 
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return Array.Empty<string>();
        }
    }
}