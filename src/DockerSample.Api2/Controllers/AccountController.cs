using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DockerSample.Api.Dtos;
using DockerSample.Api.Dtos.Account;
using DockerSample.Api.Entities;
using DockerSample.Api.Helpers;
using DockerSample.Api.Services;
using DockerSample.Api.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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

        private readonly UserManager<ApplicationUser> _userManager;

        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IEmailSender _emailSender;

        private readonly IMapper _mapper;

        private readonly ApplicationSettings _applicationSettings;

        #endregion

        #region Constructor

        /// <summary>
        /// Initialises a new instance of the <see cref="AccountController"/> class.
        /// </summary>
        /// <param name="userManager">User manager</param>
        /// <param name="signInManager">Sign in manager</param>
        /// <param name="emailSender">Email sender</param>
        /// <param name="mapper">Mapper</param>
        /// <param name="applicationSettings">Settings</param>
        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            IMapper mapper,
            IOptions<ApplicationSettings> applicationSettings
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _mapper = mapper;
            _applicationSettings = applicationSettings.Value;
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
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateRequestDto request)
        {
            // Authenticate user
            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, isPersistent: false, lockoutOnFailure: false);
            if (!result.Succeeded)
            {
                // TODO: Different messaging if user is locked out rather than just not exists.
                return Unauthorized(new ErrorDto(ErrorDto.UserNotFound, "User not found matching the provided credentials"));
            }

            // Retrieve authenticated user
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (!user.EmailConfirmed)
            {
                return Unauthorized(new ErrorDto(ErrorDto.EmailNotVerified, "Please verify your email address by clicking the link in the email you have been sent."));
            }

            // Retrieve roles to which the user is assigned
            var roles = await _userManager.GetRolesAsync(user);

            // Generate JWT token to return in the response
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_applicationSettings.Secret);

            var claims = new List<Claim>() { new Claim(ClaimTypes.Name, user.Id.ToString()) };
            claims.AddRange(roles.Select(i => new Claim(ClaimTypes.Role, i)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Return basic user info and token to store client side
            return Ok(new AuthenticateResponseDto
            {
                Token = tokenString,
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
        [HttpPost("register-without-email-verification")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [Obsolete]
        public async Task<IActionResult> RegisterWithoutEmailVerification([FromBody]RegisterRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            // Map dto to entity
            var user = _mapper.Map<ApplicationUser>(request);

            // Create new user. This should incorporate a process to verify that the user owns the email address.
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded)
            {
                var userDto = _mapper.Map<UserDto>(user);
                userDto.Roles = (await _userManager.GetRolesAsync(user)).ToArray();

                return Created($"/{ApiRoot}account", userDto);
            }
            else
            {
                var errorDto = new ErrorDto();
                errorDto.AddIdentityErrors(result.Errors);
                return BadRequest(errorDto);
            }
        }

        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <param name="request">Request object containing user details</param>
        /// <returns>Details of the newly-created user</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item cannot be created</response>
        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register([FromBody]RegisterRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            // Map dto to entity
            var user = _mapper.Map<ApplicationUser>(request);

            // Create new user
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded)
            {
                // Send email with verification link
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var callbackUrl = Url.GetEmailVerificationLink(_applicationSettings.FrontEndUri, user.Id, token);
                await _emailSender.SendEmailConfirmationAsync(request.Email, callbackUrl);

                // Return details of created user
                var userDto = _mapper.Map<UserDto>(user);
                userDto.Roles = (await _userManager.GetRolesAsync(user)).ToArray();

                return Created($"/{ApiRoot}account", new SuccessDto<UserDto>
                {
                    Message = "Please verify your email address by clicking the link in the email you have been sent.",
                    Data = userDto
                });
            }
            else
            {
                var errorDto = new ErrorDto();
                errorDto.AddIdentityErrors(result.Errors);
                return BadRequest(errorDto);
            }
        }

        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <param name="request">Request object containing user details</param>
        /// <returns>Details of the newly-created user</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item cannot be created</response>
        [HttpPut("verify-email")]
        [AllowAnonymous]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> VerifyEmail([FromBody]VerifyEmailRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var user = await _userManager.FindByIdAsync(request.UserId);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            var result = await _userManager.ConfirmEmailAsync(user, request.Token);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                var errorDto = new ErrorDto();
                errorDto.AddIdentityErrors(result.Errors);
                return BadRequest(errorDto);
            }
        }

        /// <summary>
        /// Retrieves details of the logged-in user.
        /// </summary>
        /// <returns>User details</returns>
        /// <response code="200">Returns the user details</response>
        /// <response code="400">If the user specified in the token no longer exists</response>
        [HttpGet("me")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Get()
        {
            var user = await _userManager.FindByIdAsync(ControllerContext.HttpContext.User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Roles = (await _userManager.GetRolesAsync(user)).ToArray();

            return Ok(userDto);
        }

        ///// <summary>
        ///// Updates the details of the logged-in user.
        ///// </summary>
        ///// <param name="request">User details</param>
        ///// <returns></returns>
        ///// <response code="200">If the user details were successfully updated</response>
        ///// <response code="400">If the user details can't be updated</response>
        //[HttpPut]
        //[ProducesResponseType(200)]
        //[ProducesResponseType(400)]
        //public IActionResult Update([FromBody]UpdateRequestDto request)
        //{
        //    // Find id of currently logged-in user
        //    var id = Guid.Parse(ControllerContext.HttpContext.User.Identity.Name);

        //    // Map dto to entity and set id
        //    var user = _mapper.Map<User>(request);
        //    user.Id = id;

        //    try
        //    {
        //        // Update user 
        //        _userService.Update(user, request.Password);
        //        return Ok();
        //    }
        //    catch (AppException ex)
        //    {
        //        // Return error message if there was an exception
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}

        /// <summary>
        /// Deletes the account of the logged-in user.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">If the user account was successfully deleted</response>
        [HttpDelete]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Delete()
        {
            var user = await _userManager.FindByIdAsync(ControllerContext.HttpContext.User.Identity.Name);
            await _userManager.DeleteAsync(user);
            return Ok();
        }

        #endregion
    }
}
