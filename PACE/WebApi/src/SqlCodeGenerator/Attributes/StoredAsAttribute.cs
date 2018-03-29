using System;

namespace SqlCodeGenerator.Attributes
{
    /// <inheritdoc />
    /// <summary>
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Property)]
    public sealed class StoredAsAttribute : Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        public string Value { get; set; }

        public StoredAsAttribute(string value)
        {
            Value = value;
        }
    }
}