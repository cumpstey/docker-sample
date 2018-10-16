using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DockerSample.Api.Dtos;
using DockerSample.Api.Entities;
using DockerSample.Api.Helpers;
using DockerSample.Api.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DockerSample.Api.Controllers
{
    [Authorize(Roles = Roles.Administrator)]
    [Route(ApiRoot + "users")]
    public class UsersController : BaseApiController
    {
        #region Fields

        private readonly UserManager<ApplicationUser> _userManager;

        private readonly IMapper _mapper;

        private readonly ApplicationSettings _applicationSettings;

        #endregion

        #region Constructor

        /// <summary>
        /// Initialises a new instance of the <see cref="UsersController"/> class.
        /// </summary>
        /// <param name="userManager">User manager</param>
        /// <param name="mapper">Mapper</param>
        /// <param name="applicationSettings">Settings</param>
        public UsersController(
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            IOptions<ApplicationSettings> applicationSettings
        )
        {
            _userManager = userManager;
            _mapper = mapper;
            _applicationSettings = applicationSettings.Value;
        }

        #endregion

        #region Action methods

        /// <summary>
        /// Returns a paged collection of users matching a query.
        /// </summary>
        /// <param name="request">Request object containing query parameters</param>
        /// <returns>Paged collection of users</returns>
        /// <response code="200">Success</response>
        /// <response code="401">Unauthorized</response>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Get([FromQuery]PagedRequestDto request)
        {
            var page = request.GetSanitizedPage();
            var pageSize = request.GetSanitizedPageSize();

            var totalCount = await _userManager.Users.CountAsync();
            var users = await _userManager.Users.Skip((page - 1) * pageSize).Take(pageSize).ToArrayAsync();
            var responseUsers = await Task.WhenAll(users.Select(async user =>
            {
                var userDto = _mapper.Map<UserDto>(user);
                userDto.Roles = (await _userManager.GetRolesAsync(user)).ToArray();
                return userDto;
            }));

            return Ok(new GetResponseDto()
            {
                Users = responseUsers,
                Meta = new MetaDto
                {
                    CurrentPage = page,
                    PageSize = pageSize,
                    TotalCount = totalCount,
                },
            });
        }

        #endregion
    }
}
