using System;
using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Contracts
{
    public class Document : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public Guid DocumentUID { get; set; }
        [Required] public int DocumentTypeId { get; set; }
    }
}