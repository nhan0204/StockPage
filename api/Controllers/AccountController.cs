using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signinManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signinManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signinManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto regiterDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    UserName = regiterDto.UserName,
                    Email = regiterDto.Email,
                };

                var existingEmail = await _userManager.FindByEmailAsync(appUser.Email!);
                var existingUserName = await _userManager.FindByNameAsync(appUser.UserName!);

                if (existingEmail != null)
                    return BadRequest("Email is already taken!");

                if (existingUserName != null)
                    return BadRequest("User name is already taken");
    
                var createdUser = await _userManager.CreateAsync(appUser, regiterDto.Password!);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRolesAsync(appUser, new[] { "User" });

                    if (roleResult.Succeeded)
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName!,
                                Email = appUser.Email!,
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    else
                        return StatusCode(500, roleResult.Errors);
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName!.ToUpper() == loginDto.UserName!.ToUpper());

            if (user == null)
                return Unauthorized("Invalid username!");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password!, false);

            if (!result.Succeeded)
                return Unauthorized("Username or password is incorrect!");
            
            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName!,
                    Email = user.Email!,
                    Token = _tokenService.CreateToken(user),
                }
            );
        }
    }
}