using System;

namespace SqlCodeGenerator.Attributes
{
    /// <inheritdoc />
    /// <summary>
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public sealed class NonStoredAttribute : Attribute
    {
    }
}