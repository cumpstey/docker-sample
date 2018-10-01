using AutoMapper;
using DockerSample.Api.Dtos;
using DockerSample.Api.Dtos.Account;
using DockerSample.Api.Entities;

namespace DockerSample.Api.Helpers
{
    /// <summary>
    /// Contains AutoMapper configuration.
    /// </summary>
    public class AutoMapperProfile : Profile
    {
        /// <summary>
        /// Initialises a new instance of the <see cref="AutoMapperProfile"/> class.
        /// </summary>
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();

            CreateMap<UserDto, User>();
            CreateMap<RegisterRequestDto, User>();
            CreateMap<UpdateRequestDto, User>();
        }
    }
}
