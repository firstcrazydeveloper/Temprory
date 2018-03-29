using System;

namespace SqlCodeGenerator.Attributes
{
    /// <inheritdoc />
    /// <summary>
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public sealed class KeyPropertyAttribute : Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        public bool Identity { get; set; }
    }
}