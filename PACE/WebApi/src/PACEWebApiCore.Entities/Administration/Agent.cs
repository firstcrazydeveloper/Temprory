using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Administration
{
    public class Agent : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }

        [Required] public int AddressId { get; set; }

        [Required] [MaxLength(50)] public string AgentName { get; set; }

        [Required] [MaxLength(20)] public string ABN { get; set; }

        [MaxLength(50)] public string LicenseNo { get; set; }
    }
}