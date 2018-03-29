using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Contracts
{
    public class TemplateTag : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int TemplateId { get; set; }
        [Required] [MaxLength(50)] public string ObjectName { get; set; }
        [Required] [MaxLength(50)] public string PropertytName { get; set; }
        [Required] [MaxLength(50)] public string Tag { get; set; }
    }
}