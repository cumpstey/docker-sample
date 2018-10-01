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
            CreateMap<ApplicationUser, UserDto>();

            CreateMap<UserDto, ApplicationUser>()
                .ForMember(t => t.UserName, i => i.MapFrom(s => s.Email));
            CreateMap<RegisterRequestDto, ApplicationUser>()
                .ForMember(t => t.UserName, i => i.MapFrom(s => s.Email));
            CreateMap<UpdateRequestDto, ApplicationUser>()
                .ForMember(t => t.UserName, i => i.MapFrom(s => s.Email));
        }
    }
}
