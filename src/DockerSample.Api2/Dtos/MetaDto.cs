using System;

namespace DockerSample.Api.Dtos
{
    public class MetaDto
    {
        public int TotalCount { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }
    }
}
