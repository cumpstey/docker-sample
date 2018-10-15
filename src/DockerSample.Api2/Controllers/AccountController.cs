using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AutoMapper;
using DockerSample.Api.Dtos;
using DockerSample.Api.Dtos.Account;
using DockerSample.Api.Entities;
using DockerSample.Api.Services;
using DockerSample.Api.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

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
        /// <param name="tokenGenerator">Authentication token generator</param>
        /// <param name="urlEncoder">Url encoder</param>
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
        /// <returns>JWT authentication token</returns>
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

        /// <summary>
        /// Authenticates a user by verifying a TOTP code against existing user details stored in a cookie,
        /// which was returned by the authenticate request if two factor authentication is enabled for the user.
        /// Two factor authentication requires cookies in order to work - there is no alternative.
        /// </summary>
        /// <param name="request">Request object containing the TOTP code</param>
        /// <returns>JWT authentication token</returns>
        /// <response code="200">Successfully authenticated</response>
        /// <response code="400">Invalid data provided</response>
        /// <response code="401">User matching the provided credentials does not exist</response>
        [AllowAnonymous]
        [HttpPost("authenticate2fa")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
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
            var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(authenticatorCode, false, request.RememberMachine);
            //var is2faTokenValid = await _userManager.VerifyTwoFactorTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider, authenticatorCode);

            if (result.Succeeded)
            //if (is2faTokenValid)
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

            // If user is locked out, return error response
            if (result.IsLockedOut)
            {
                return Unauthorized(new ErrorDto(ErrorDto.UserLockedOut, "Account locked"));
            }

            // If authentication failed, return error response
            return Unauthorized(new ErrorDto(ErrorDto.Invalid2faCode, "Invalid two factor authentication code"));
        }

        #endregion

        #region Impersonation

        /// <summary>
        /// Enables the user to impersonate a user in a more restricted role, by providing a JWT token
        /// with a claim for only the requested role, rather than claims for all roles to which the
        /// user is entitled.
        /// If the user is not a member of the requested role, it is not included as a claim in the 
        /// returned token.
        /// </summary>
        /// <param name="request">Request object containing the required role</param>
        /// <returns>JWT authentication token</returns>
        /// <response code="200">Successfully authenticated</response>
        /// <response code="400">Invalid data provided</response>
        /// <response code="401">User matching the provided credentials does not exist</response>
        [HttpGet("impersonate-role")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> GetTokenForRole([FromBody]GetTokenForRoleRequestDto request)
        {
            // If validation fails, return error response
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            // Retrieve user
            var user = await _userManager.FindByIdAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            // Generate token restricted to specified role
            var tokenString = await _tokenGenerator.GenerateTokenAsync(user, new[] { request.Role });

            // Return authentication token
            return Ok(new AuthenticatedResponseDto
            {
                Token = tokenString,
            });
        }

        #endregion

        #region Manage two factor authentication

        /// <summary>
        /// Get details of the user's two factor authentication status.
        /// </summary>
        /// <returns>Details of the user's two factor authentication status</returns>
        /// <response code="200">Success</response>
        /// <response code="400">Invalid data provided</response>
        /// <response code="401">User matching the provided credentials does not exist</response>
        [HttpGet("2fa")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Get2faStatus()
        {
            // Retrieve user
            var user = await _userManager.FindByIdAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            var response = new User2faStatusResponseDto
            {
                ////HasAuthenticator = await _userManager.GetAuthenticatorKeyAsync(user) != null,
                Is2faEnabled = user.TwoFactorEnabled,
                RecoveryCodesLeft = await _userManager.CountRecoveryCodesAsync(user),
            };

            return Ok(response);
        }

        /// <summary>
        /// Disable two factor authentication.
        /// </summary>
        /// <response code="200">Success</response>
        /// <response code="400">Invalid data provided</response>
        /// <response code="401">User matching the provided credentials does not exist</response>
        [HttpPut("2fa/disable")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
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

        /// <summary>
        /// Request details needed to enable two factor authentication.
        /// </summary>
        /// <returns>Shared key and url which can be registered with an authenticator app</returns>
        /// <response code="200">Success</response>
        /// <response code="400">Invalid data provided</response>
        /// <response code="401">User matching the provided credentials does not exist</response>
        [HttpGet("2fa/enable")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Get2Details()
        {
            // Retrieve user
            var user = await _userManager.FindByIdAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ErrorDto(ErrorDto.UserNotFound, "User not found"));
            }

            // Generate response containing the shared key and url for the authenticator app
            var response = new User2faSetupResponseDto();
            await LoadSharedKeyAndQrCodeUrlAsync(user, response);
            return Ok(response);
        }

        /// <summary>
        /// Enable two factor authentication.
        /// </summary>
        /// <param name="request">Request object containing a TOTP code</param>
        /// <returns>Recovery codes which can be used instead of a TOTP code</returns>
        /// <response code="200">Success</response>
        /// <response code="400">Invalid data provided</response>
        /// <response code="401">User matching the provided credentials does not exist</response>
        [HttpPut("2fa/enable")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Enable2fa(Enable2faRequestDto request)
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

            var response = new User2faEnabledResponseDto
            {
                Is2faEnabled = user.TwoFactorEnabled,
                RecoveryCodesLeft = await _userManager.CountRecoveryCodesAsync(user),
                RecoveryCodes = recoveryCodes,
            };

            return Ok(response);
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

        private async Task LoadSharedKeyAndQrCodeUrlAsync(ApplicationUser user, User2faSetupResponseDto dto)
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
