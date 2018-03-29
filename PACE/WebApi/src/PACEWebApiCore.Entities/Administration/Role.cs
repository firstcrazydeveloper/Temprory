using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Administration
{
    public class Role : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] [MaxLength(50)] public string Name { get; set; }
        [Required] public bool IsSuperAdmin { get; set; }
        public bool IsDeleted { get; set; }
    }
}