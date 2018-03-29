using SqlCodeGenerator.Attributes;
using System.ComponentModel.DataAnnotations;
using PACEWebApiCore.Entities.Enums;

namespace PACEWebApiCore.Entities.Administration
{
    public class UserTeam : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int TeamId { get; set; }
        [Required] public int UserId { get; set; }

            }

}
