using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DockerSample.Api.Entities;
using DockerSample.Api.Settings;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MimeKit.Text;

namespace DockerSample.Api.Services
{
    /// <summary>
    /// Class containing service methods for handing JWT tokens
    /// </summary>
    public class JwtTokenGenerator
    {
        #region Fields

        private readonly UserManager<ApplicationUser> _userManager;

        private readonly ApplicationSettings _applicationSettings;

        #endregion

        #region Constructor

        public JwtTokenGenerator(UserManager<ApplicationUser> userManager, IOptions<ApplicationSettings> applicationSettings)
        {
            _userManager = userManager;
            _applicationSettings = applicationSettings.Value;
        }

        #endregion

        #region Methods

        public async Task<string> GenerateTokenForDefaultRole(ApplicationUser user)
        {
            return await GenerateTokenAsync(user, false);
        }

        public async Task<string> GenerateTokenForRole(ApplicationUser user, string role)
        {
            return await GenerateTokenAsync(user, true, role);
        }

        private async Task<string> GenerateTokenAsync(ApplicationUser user, bool restrictToRole, string role = null)
        {
            // Retrieve roles to which the user is assigned
            var roles = await _userManager.GetRolesAsync(user);
            //var restrictedRoles = restrictToRoles == null
            //    ? roles
            //    : roles.Where(i => restrictToRoles.Contains(i));
            var authorisedRole = restrictToRole
                ? role == null || roles.Contains(role) ? role : roles.FirstOrDefault()
                : roles.FirstOrDefault();

            // Generate JWT token to return in the response
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_applicationSettings.JwtSecret);

            var claims = new List<Claim>() { new Claim(ClaimTypes.Name, user.Id.ToString()) };
            //claims.AddRange(restrictedRoles.Select(i => new Claim(ClaimTypes.Role, i)));
            if (authorisedRole != null)
            {
                claims.Add(new Claim(ClaimTypes.Role, authorisedRole));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        #endregion
    }
}
