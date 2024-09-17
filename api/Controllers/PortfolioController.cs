using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepo;
        private readonly IPortfolioRepository _portfolioRepo;

        public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepo, IPortfolioRepository portfolioRepo)
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolioRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {   
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var userPorfolio = await _portfolioRepo.GetUserPortfolioAsync(appUser!);

            var userPorfolioDto = userPorfolio.Select(portfolio => portfolio.ToStockDto());
            return Ok(userPorfolioDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var stock = await _stockRepo.GetBySymbolAsync(symbol);

            if (stock == null)
                return BadRequest("Stock not found!");
            
            var userPorfolio = await _portfolioRepo.GetUserPortfolioAsync(appUser!);

            if (userPorfolio.Any(stock => stock.Symbol.ToUpper() == symbol.ToUpper()))
                return BadRequest("Stock already added!");

            var portfolioModel = new Portfolio
            {
                StockId = stock.Id,
                AppUserId = appUser!.Id
            };

            portfolioModel = await _portfolioRepo.CreateAsync(portfolioModel);

            if (portfolioModel == null)
                return StatusCode(500, "Porfolio could not created!");

            return Ok(symbol.ToUpper() + " has been added to your portfolio");
        }
    
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePorfolio(string symbol)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);

            var userPorfolio = await _portfolioRepo.GetUserPortfolioAsync(appUser!);

            if (userPorfolio.Any(portfolio => portfolio.Symbol.ToUpper() == symbol.ToUpper()))
                await _portfolioRepo.DeleteAsync(appUser!, symbol);
            else 
                return BadRequest("Stock not found in your portfolio!");

            return Ok(symbol.ToUpper() + " has been deleted.");
        }
    }
}