using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.WebUtilities;

namespace Microsoft.AspNetCore.Mvc
{
    public static class UrlHelperExtensions
    {
        public static string GetEmailVerificationLink(this IUrlHelper urlHelper, Uri rootUri, string userId, string token)
        {
            var relativeUrl = $"/verify-email/{WebUtility.UrlEncode(userId)}/{WebUtility.UrlEncode(token)}";
            //var relativeUrl = QueryHelpers.AddQueryString("/verify-email/", new Dictionary<string, string>()
            //{
            //    { "user", userId },
            //    { "token", token },
            //});
            return new Uri(rootUri, relativeUrl).ToString();
        }

        public static string GetResetPasswordLink(this IUrlHelper urlHelper, Uri rootUri, string userId, string token)
        {
            var relativeUrl = $"/reset-password/{WebUtility.UrlEncode(userId)}/{WebUtility.UrlEncode(token)}";
            //var relativeUrl = QueryHelpers.AddQueryString("/reset-password/", new Dictionary<string, string>()
            //{
            //    { "user", userId },
            //    { "token", token },
            //});
            return new Uri(rootUri, relativeUrl).ToString();
        }
    }
}
