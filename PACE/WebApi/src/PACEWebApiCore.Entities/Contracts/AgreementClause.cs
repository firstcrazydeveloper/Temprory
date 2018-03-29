using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Contracts
{
    public class AgreementClause : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int AgreementDocumentId { get; set; }
        [Required] public int StateId { get; set; }
        [Required] [MaxLength(10)] public string Section { get; set; }
        [Required] public int TransactionTypeId { get; set; }
        [Required] public int AgencyTypeId { get; set; }
        [Required] [MaxLength(250)] public string Heading { get; set; }
        [MaxLength(250)] public string SubHeading { get; set; }
        [Required] public int Sequence { get; set; }
        [Required] public string Clause { get; set; }
        [Required] [MaxLength(250)] public string Conditions { get; set; }
        [Required] public bool IsEditable { get; set; }
    }
}