using System;

namespace SqlCodeGenerator.Attributes
{
    /// <inheritdoc />
    /// <summary>
    /// </summary>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public sealed class DeletedAttribute : Attribute
    {
    }
}