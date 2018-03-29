using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Contracts
{
    public class Agreement : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }

        [Required] public int AgreementDocumentId { get; set; }

        [Required] public int AccountId { get; set; }

        [Required] public int AddressId { get; set; }

        [Required] public int AgentId { get; set; }

        [Required] public int AgreementStatusId { get; set; }

        [Required] public int ApproveByUserId { get; set; }

        [Required] public int UserId { get; set; }
    }
}