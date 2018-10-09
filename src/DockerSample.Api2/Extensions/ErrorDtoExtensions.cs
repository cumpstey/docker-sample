using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace DockerSample.Api.Dtos
{
    public static class ErrorDtoExtensions
    {
        private const string DuplicateUserName = "DuplicateUserName";

        private const string DuplicateEmail = "DuplicateEmail";

        public static void AddIdentityErrors(this ErrorDto dto, IEnumerable<IdentityError> errors)
        {
            if (errors == null)
            {
                return;
            }

            // Exclude the duplicate username error if the duplicate email also exists in the collection, as these have the same meaning.
            var excludeUsernameError = errors.Any(i => i.Code == DuplicateUserName) && errors.Any(i => i.Code == DuplicateEmail);
            foreach (var error in errors.Where(i => !excludeUsernameError || i.Code != DuplicateUserName))
            {
                dto.Errors.AddItem(string.Empty, new ErrorDto.ErrorDetailDto(error.Code, error.Description));
            }
        }
    }
}
