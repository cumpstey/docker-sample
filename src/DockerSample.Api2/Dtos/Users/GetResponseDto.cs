using System;
using System.Collections.Generic;
using DockerSample.Api.Dtos;
using DockerSample.Api.Services;

namespace System.Collections.Generic
{
    public class GetResponseDto
    {
        public IEnumerable<UserDto> Users { get; set; }

        public MetaDto Meta { get; set; }
    }
}
