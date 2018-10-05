using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DockerSample.Api.Controllers;

namespace Microsoft.AspNetCore.Mvc
{
    public static class UrlHelperExtensions
    {
        public static string GetEmailVerificationLink(this IUrlHelper urlHelper, string userId, string token)
        {
            return $"root/verify-email/?user={userId}&token={token}";
        }

        public static string GetResetPasswordLink(this IUrlHelper urlHelper, string userId, string token)
        {
            return $"root/reset-password/?user={userId}&token={token}";
        }
    }
}