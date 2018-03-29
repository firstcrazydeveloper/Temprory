using System;

namespace SqlCodeGenerator.Attributes
{
    /// <inheritdoc />
    /// <summary>
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public sealed class SchemeAttribute : Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        public string Value { get; set; }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        /// <param name="value"></param>
        public SchemeAttribute(string value)
        {
            Value = value;
        }
    }
}