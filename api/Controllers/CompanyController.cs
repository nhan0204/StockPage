using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/company")]
    public class CompanyController : ControllerBase
    {
        private readonly IFMPService _fmpService;
        public CompanyController(IFMPService fmpService)
        {
            _fmpService = fmpService;
        }

        [HttpGet]
        [Route("{symbol:alpha}")]
        public async Task<IActionResult> GetCompanyProfile([FromRoute] string symbol)
        {
            var companyProfile = await _fmpService.FindStockBySymbolAsync(symbol);

            if (companyProfile == null)
                return NotFound($"Can not find {symbol.ToUpper()} by FMP");
            
            return Ok(companyProfile);
        }

        [HttpGet("logo/{symbol:alpha}")]
        public async Task<IActionResult> GetCompanyLogo([FromRoute] string symbol)
        {
            var companyLogo = await _fmpService.GetCompanyLogoAsync(symbol);
            
            if (companyLogo == null)
                return NotFound($"{symbol.ToUpper()} logo not found");
                
            return Ok(companyLogo);
        }

        [HttpGet("peers/{symbol:alpha}")]
        public async Task<IActionResult> GetCompanyPeersGroup([FromRoute] string symbol)
        {
            var peersGroup = await _fmpService.GetCompanyPeersGroupAsync(symbol);

            if (peersGroup == null)
                return NotFound($"{symbol.ToUpper()} peers group not found");
            
            return Ok(peersGroup);
        }
    }
}