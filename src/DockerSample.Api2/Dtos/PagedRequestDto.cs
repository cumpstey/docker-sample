using System;

namespace DockerSample.Api.Dtos
{
    public class PagedRequestDto
    {
        #region Properties

        /// <summary>
        /// Page number
        /// </summary>
        public int? Page { get; set; }

        /// <summary>
        /// Number of items per page
        /// </summary>
        public int? PageSize { get; set; }

        #endregion

        #region Methods

        /// <summary>
        /// Returns a sanitized page number, never below 1.
        /// </summary>
        public int GetSanitizedPage()
        {
            return Math.Max(Page.GetValueOrDefault(), 1);
        }

        /// <summary>
        /// Returns a sanitized page size, never below 1, defaulting to 10 if not specified.
        /// </summary>
        public int GetSanitizedPageSize()
        {
            return PageSize.GetValueOrDefault() > 0 ? PageSize.GetValueOrDefault() : 10;
        }

        #endregion
    }
}
