using SqlCodeGenerator.Attributes;
using System.ComponentModel.DataAnnotations;

namespace PACEWebApiCore.Entities.Administration
{
    public class UserAddress : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int AddressId { get; set; }
        [Required] public int UserId { get; set; }
        [Required] public int IsPrimary { get; set; }
    }

}
