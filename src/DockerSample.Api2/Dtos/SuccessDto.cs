namespace System.Collections.Generic
{
    /// <summary>
    /// Successful request
    /// </summary>
    public class SuccessDto
    {
        /// <summary>
        /// Message generated in a successful request
        /// </summary>
        public string Message { get; set; }
    }

    /// <summary>
    /// Successful request
    /// </summary>
    public class SuccessDto<T> : SuccessDto
    {
        /// <summary>
        /// Data returned by a successful request
        /// </summary>
        public T Data { get; set; }
    }
}
