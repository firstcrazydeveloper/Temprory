using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Contracts
{
    public class Template : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int BusinessLineTypeId { get; set; }
        [Required] public int TransactionTypeId { get; set; }
        [Required] [MaxLength(50)] public string Name { get; set; }
        public string Description { get; set; }
        public string Tags { get; set; }
        [Required] public int StatusTypeId { get; set; }
        [Required] public bool IsSignedDocumentsRequired { get; set; }
    }
}