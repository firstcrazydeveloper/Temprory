using SqlCodeGenerator.Attributes;
using System.ComponentModel.DataAnnotations;

namespace PACEWebApiCore.Entities.Administration
{
   public  class RoleAction:BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int RoleId { get; set; }        
        [Required] public int ActionTypeId { get; set; }
        [Required] public bool IsEnabled { get; set; }
    }
}
