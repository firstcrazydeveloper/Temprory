using System.ComponentModel.DataAnnotations;
using PACEWebApiCore.Entities.Enums;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Administration
{
    public class User : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int PeopleSoftId { get; set; }
        [Required] [MaxLength(128)] public string Domain { get; set; }
        [Required] [MaxLength(128)] public string UserName { get; set; }
        public string Password { get; set; }
        [Required] public int EmployeeId { get; set; }
        [MaxLength(250)] public string Position { get; set; }
        [Required] public int BusinessLineId { get; set; }
        [Required] public int StatusId { get; set; }

        [StatusProperty] public RecordStatus IsDeleted { get; set; }
    }
}