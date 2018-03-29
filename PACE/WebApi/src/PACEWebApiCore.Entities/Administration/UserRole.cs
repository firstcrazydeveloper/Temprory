using System;
using System.Collections.Generic;
using System.Text;
using SqlCodeGenerator.Attributes;
using System.ComponentModel.DataAnnotations;

namespace PACEWebApiCore.Entities.Administration
{
    public class UserRole :BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int RoleId { get; set; }
        [Required] public int UserId { get; set; }     

    }

}
