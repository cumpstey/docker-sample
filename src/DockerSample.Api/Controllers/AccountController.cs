using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using DockerSample.Api.Dtos;
using DockerSample.Api.Dtos.Account;
using DockerSample.Api.Entities;
using DockerSample.Api.Helpers;
using DockerSample.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DockerSample.Api.Controllers
{
    /// <summary>
    /// Contains action methods to do with user account and authentication.
    /// </summary>
    [Authorize]
    [Route(ApiRoot + "account")]
    public class AccountController : BaseApiController
    {
        #region Fields

        private IUserService _userService;

        private IMapper _mapper;

        private readonly AppSettings _appSettings;

        #endregion

        #region Constructor

        /// <summary>
        /// Initialises a new instance of the <see cref="AccountController"/> class.
        /// </summary>
        /// <param name="userService">User service</param>
        /// <param name="mapper">Mapper</param>
        /// <param name="appSettings">Settings</param>
        public AccountController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings
        )
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        #endregion

        #region Action methods

        /// <summary>
        /// Authenticates a user by email address and password.
        /// </summary>
        /// <param name="request">Request object containing credentials</param>
        /// <returns>User details, and a JWT authentication token</returns>
        /// <response code="200">Successfully authenticated</response>
        /// <response code="401">User matching the provided credentials does not exist</response>
        [AllowAnonymous]
        [HttpPost("authenticate")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public IActionResult Authenticate([FromBody]AuthenticateRequestDto request)
        {
            // Authenticate user
            var user = _userService.Authenticate(request.Email, request.Password);

            // If invalid credentials provided, return an unauthorized response
            if (user == null)
            {
                return Unauthorized();
            }

            // Generate JWT token to return in the response
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Roles[0].Name),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Return basic user info (without password) and token to store client side
            return Ok(new AuthenticateResponseDto
            {
                Token = tokenString,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Roles = user.Roles.Select(i => i.Name).ToArray(),
                },
            });
        }

        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <param name="request">Request object containing user details</param>
        /// <returns>Details of the newly-created user</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item cannot be created</response>            
        [AllowAnonymous]
        [HttpPost("register")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public IActionResult Register([FromBody]RegisterRequestDto request)
        {
            // Map dto to entity
            var user = _mapper.Map<User>(request);

            try
            {
                // Create new user. This should incorporate a process to verify that the user owns the email address.
                var createdUser = _userService.Create(user, request.Password);
                var responseUser = _mapper.Map<UserDto>(createdUser);
                return Created($"/{ApiRoot}account", responseUser);
            }
            catch (AppException ex)
            {
                // Return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves details of the logged-in user.
        /// </summary>
        /// <returns>User details</returns>
        /// <response code="200">Returns the user details</response>
        [HttpGet]
        [ProducesResponseType(200)]
        public IActionResult Get()
        {
            // Find id of currently logged-in user
            var id = Guid.Parse(ControllerContext.HttpContext.User.Identity.Name);

            var user = _userService.GetById(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        /// <summary>
        /// Updates the details of the logged-in user.
        /// </summary>
        /// <param name="request">User details</param>
        /// <returns></returns>
        /// <response code="200">If the user details were successfully updated</response>
        /// <response code="400">If the user details can't be updated</response>
        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult Update([FromBody]UpdateRequestDto request)
        {
            // Find id of currently logged-in user
            var id = Guid.Parse(ControllerContext.HttpContext.User.Identity.Name);

            // Map dto to entity and set id
            var user = _mapper.Map<User>(request);
            user.Id = id;

            try
            {
                // Update user 
                _userService.Update(user, request.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // Return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Deletes the account of the logged-in user.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">If the user account was successfully deleted</response>
        [HttpDelete]
        [ProducesResponseType(200)]
        public IActionResult Delete()
        {
            // Find id of currently logged-in user
            var id = Guid.Parse(ControllerContext.HttpContext.User.Identity.Name);

            //Delete user
            _userService.Delete(id);
            return Ok();
        }

        #endregion
    }
}
