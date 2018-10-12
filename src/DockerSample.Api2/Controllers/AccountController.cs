using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
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

        private readonly JwtTokenGenerator _tokenGenerator;

        private readonly UrlEncoder _urlEncoder;

        private readonly IEmailSender _emailSender;

        private readonly IMapper _mapper;

        private readonly ApplicationSettings _applicationSettings;

        private const string AuthenticatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}&digits=6";

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
            JwtTokenGenerator tokenGenerator,
            UrlEncoder urlEncoder,
            IEmailSender emailSender,
            IMapper mapper,
            IOptions<ApplicationSettings> applicationSettings
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenGenerator = tokenGenerator;
            _urlEncoder = urlEncoder;
            _emailSender = emailSender;
            _mapper = mapper;
            _applicationSettings = applicationSettings.Value;
        }

        #endregion

        #region Action methods

        #region Log in and log out

        /// <summary>
        /// Authenticates a user by email address and password.
        /// </summary>
        /// <param name="request">Request object containing credentials</param>
        /// <returns>User details, and a JWT authentication token</returns>
        /// <response code="200">Successfully authenticated</response>
        /// <response code="400">Invalid data provided</response>
        /// <response code="401">User matching the provided credentials does not exist</response>
        [AllowAnonymous]
        [HttpPost("authenticate")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateRequestDto request)
        {
            // If validation fails, return error response
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            // Authenticate user
            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                // Retrieve authenticated user if successfully authenticated
                var user = await _userManager.FindByEmailAsync(request.Email);

                // If email not yet confirmed, return error response
                if (!user.EmailConfirmed)
                {
                    return Unauthorized(new ErrorDto(ErrorDto.EmailNotVerified, "Please verify your email address by clicking the link in the email you have been sent."));
                }

                var tokenString = await _tokenGenerator.GenerateTokenAsync(user);

                // Return authentication token
                return Ok(new AuthenticatedResponseDto
                {
                    Token = tokenString,
                });
            }

            // If two factor auth is required, return success response
            if (result.RequiresTwoFactor)
            {
                //var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
                //var twofatoken = await _userManager.GenerateTwoFactorTokenAsync(user, "");
                return Ok(new Require2FAResponseDto());
            }

            // If user is locked out, return error response
            if (result.IsLockedOut)
            {
                return Unauthorized(new ErrorDto(ErrorDto.UserLockedOut, "Account locked"));
            }

            // If authentication failed, return error response
            return Unauthorized(new ErrorDto(ErrorDto.UserNotFound, "User not found matching the provided credentials"));
        }

        [HttpPost("authenticate2fa")]
        [AllowAnonymous]
        public async Task<IActionResult> AuthenticateWith2fa([FromBody]AuthenticateWith2faRequestDto request)
        {
            // If validation fails, return error response
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            // Load user
            // It's not clear how this works - it doesn't seem to be dependent on anything in the request headers or body.
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            // Remove any formatting the user may have added to the 2FA code
            var authenticatorCode = request.Code.Replace(" ", string.Empty).Replace("-", string.Empty);

            // Verify the 2FA code
            //var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(authenticatorCode, false, request.RememberMachine);
            var is2faTokenValid = await _userManager.VerifyTwoFactorTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider, authenticatorCode);

            //if (result.Succeeded)
            if (is2faTokenValid)
            {
                // If email not yet confirmed, return error response
                if (!user.EmailConfirmed)
                {
                    return Unauthorized(new ErrorDto(ErrorDto.EmailNotVerified, "Please verify your email address by clicking the link in the email you have been sent."));
                }

                // Return authentication token
                var tokenString = await _tokenGenerator.GenerateTokenAsync(user);
                return Ok(new AuthenticatedResponseDto
                {
                    Token = tokenString,
                });
            }

            //// If user is locked out, return error response
            //if (result.IsLockedOut)
            //{
            //    return Unauthorized(new ErrorDto(ErrorDto.UserLockedOut, "Account locked"));
            //}

            // If authentication failed, return error response
            return Unauthorized(new ErrorDto(ErrorDto.Invalid2faCode, "Invalid two factor authentication code"));
        }

        #endregion

        #region Manage two factor authentication

        [HttpGet("2fa")]
        public async Task<IActionResult> TwoFactorAuthentication()
        {
            // Retrieve user
            var user = await _userManager.FindByIdAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            var model = new
            {
                HasAuthenticator = await _userManager.GetAuthenticatorKeyAsync(user) != null,
                Is2faEnabled = user.TwoFactorEnabled,
                RecoveryCodesLeft = await _userManager.CountRecoveryCodesAsync(user),
            };

            return Ok(model);
        }

        [HttpPut("2fa/disable")]
        public async Task<IActionResult> Disable2fa()
        {
            // Retrieve user
            var user = await _userManager.FindByIdAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            // Disable two factor authentication
            var disable2faResult = await _userManager.SetTwoFactorEnabledAsync(user, false);
            if (!disable2faResult.Succeeded)
            {
                return BadRequest(new ErrorDto(ErrorDto.Unexpected, "Unexpected error disabling two factor authentication"));
            }

            return Ok();
        }

        [HttpGet("2fa/enable")]
        public async Task<IActionResult> EnableAuthenticator()
        {
            // Retrieve user
            var user = await _userManager.FindByIdAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            // Generate response containing the shared key and url for the authenticator app
            var response = new EnableAuthenticatorResponseDto();
            await LoadSharedKeyAndQrCodeUrlAsync(user, response);
            return Ok(response);
        }

        [HttpPut("2fa/enable")]
        public async Task<IActionResult> EnableAuthenticator(EnableAuthenticatorRequestDto request)
        {
            // Retrieve user
            var user = await _userManager.FindByIdAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }


            // Strip spaces and hypens
            var verificationCode = request.Code.Replace(" ", string.Empty).Replace("-", string.Empty);

            var is2faTokenValid = await _userManager.VerifyTwoFactorTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);

            if (!is2faTokenValid)
            {
                ModelState.AddModelError(nameof(request.Code), "Verification code is invalid.");
                return BadRequest(ModelState);
            }

            await _userManager.SetTwoFactorEnabledAsync(user, true);

            var recoveryCodes = await _userManager.GenerateNewTwoFactorRecoveryCodesAsync(user, 10);
            //TempData[RecoveryCodesKey] = recoveryCodes.ToArray();

            //return RedirectToAction(nameof(ShowRecoveryCodes));

            return Ok(); //Also return recovery codes
        }

        #endregion

        #region Registration

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

        #endregion

        #region Email verification

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

            // Retrieve user
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

        #endregion

        #region View and update account details

        /// <summary>
        /// Retrieves details of the logged-in user.
        /// </summary>
        /// <returns>User details</returns>
        /// <response code="200">Returns the user details</response>
        /// <response code="400">If the user specified in the token no longer exists</response>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Get()
        {
            // Retrieve user
            var user = await _userManager.FindByIdAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            // Map user details into response object
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

        #endregion

        #region Delete account

        /// <summary>
        /// Deletes the account of the logged-in user.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">If the user account was successfully deleted</response>
        [HttpDelete]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Delete()
        {
            // Retrieve user
            var user = await _userManager.FindByIdAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            // Delete user account
            var result = await _userManager.DeleteAsync(user);

            // TODO: check for errors, and return appropriate responses
            return Ok();
        }

        #endregion

        #endregion

        #region Helpers

        private string FormatKey(string unformattedKey)
        {
            var result = new StringBuilder();
            int currentPosition = 0;
            while (currentPosition + 4 < unformattedKey.Length)
            {
                result.Append(unformattedKey.Substring(currentPosition, 4)).Append(" ");
                currentPosition += 4;
            }

            if (currentPosition < unformattedKey.Length)
            {
                result.Append(unformattedKey.Substring(currentPosition));
            }

            return result.ToString().ToLowerInvariant();
        }

        private string GenerateQrCodeUri(string email, string unformattedKey)
        {
            return string.Format(
                AuthenticatorUriFormat,
                _urlEncoder.Encode("TwoFactAuth"),
                _urlEncoder.Encode(email),
                unformattedKey);
        }

        private async Task LoadSharedKeyAndQrCodeUrlAsync(ApplicationUser user, EnableAuthenticatorResponseDto dto)
        {
            var unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
            if (string.IsNullOrEmpty(unformattedKey))
            {
                await _userManager.ResetAuthenticatorKeyAsync(user);
                unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
            }

            dto.SharedKey = FormatKey(unformattedKey);
            dto.AuthenticatorUrl = GenerateQrCodeUri(user.Email, unformattedKey);
        }

        #endregion
    }
}
