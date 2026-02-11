using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos.Accounts;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [Route("api/account")]
    [ApiController]


    public class AccountController : ControllerBase
    {
            private readonly UserManager<Users> _UserManager;
            private readonly ITokenService _tokenService;
            private readonly SignInManager<Users> _signInManager;

        public AccountController(UserManager<Users> userManager, ITokenService tokenService, SignInManager<Users> signInManager)
        {
            _UserManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _UserManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName.ToLower());

            if (user == null)
            {
                return Unauthorized("Invalid username");
            }

            var isPasswordValid = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!isPasswordValid.Succeeded)
            {
                return Unauthorized("Invalid password");
            }

            return Ok(new newUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                token = _tokenService.CreateToken(user)
            });
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerDto)
        {
            try
            {
                if  (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }   


                var user = new Users
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email
                };

                var CreateUser = await _UserManager.CreateAsync(user, registerDto.Password);

                if (CreateUser.Succeeded)
                {
                    var roleResult = await _UserManager.AddToRoleAsync(user, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(new newUserDto
                        {
                            UserName = user.UserName,
                            Email = user.Email,
                            token = _tokenService.CreateToken(user)
                        });
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, CreateUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }
    }
}