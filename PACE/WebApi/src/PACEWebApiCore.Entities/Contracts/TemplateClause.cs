using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Contracts
{
    public class TemplateClause : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int TemplateId { get; set; }
        [Required] public int StateTypeId { get; set; }
        [Required] [MaxLength(10)] public string Section { get; set; }
        [Required] public int TransactionTypeId { get; set; }
        [Required] public int AgencyTypeId { get; set; }
        [Required] [MaxLength(250)] public string Heading { get; set; }
        [MaxLength(250)] public string SubHeading { get; set; }
        [Required] public int Sequence { get; set; }
        [Required] public string Description { get; set; }
        [Required] [MaxLength(250)] public string Conditions { get; set; }
        [Required] public bool IsEditable { get; set; }
    }
}