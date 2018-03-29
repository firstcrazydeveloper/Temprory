using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Administration
{
    public class UserPersonalDetails : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int UserId { get; set; }
        [Required] [MaxLength(50)] public string FirstName { get; set; }
        [Required] [MaxLength(50)] public string LastName { get; set; }
        [MaxLength(20)] public string Prefix { get; set; }
        [MaxLength(80)] public string Email { get; set; }
        [MaxLength(20)] public string Mobile { get; set; }
    }
}