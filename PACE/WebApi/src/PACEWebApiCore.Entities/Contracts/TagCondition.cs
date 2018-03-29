using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Contracts
{
    public class TagCondition : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int TemplateId { get; set; }
        [Required] [MaxLength(50)] public string Tag { get; set; }
        public string Condition { get; set; }
        [Required] public string Value { get; set; }
    }
}