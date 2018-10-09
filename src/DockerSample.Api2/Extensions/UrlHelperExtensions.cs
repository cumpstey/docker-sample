using System;

namespace Microsoft.AspNetCore.Mvc
{
    public static class UrlHelperExtensions
    {
        public static string GetEmailVerificationLink(this IUrlHelper urlHelper, Uri rootUri, string userId, string token)
        {
            return new Uri(rootUri, $"/verify-email/?user={userId}&token={token}").ToString();
        }

        public static string GetResetPasswordLink(this IUrlHelper urlHelper, Uri rootUri, string userId, string token)
        {
            return new Uri(rootUri, $"/reset-password/?user={userId}&token={token}").ToString();
        }
    }
}
