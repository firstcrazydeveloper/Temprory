using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Administration
{
    public class Team : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] [MaxLength(50)] public string Name { get; set; }
        [Required] public int Status { get; set; }
        [Required] public bool IsDeleted { get; set; }

    }
}