using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using PACEWebApiCore.Utilities.SqlBuilder.Attributes;

namespace PACEWebApiCore.Entities
{

    public class AccountAddress
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int AccountId { get; set; }
        [Required]
        public int AddressId { get; set; }
        [Required]
        public bool IsPrimary { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }

    public class AccountContact
    {
        [Required]

        public int Id { get; set; }
        [Required]
        public int AccountId { get; set; }
        [Required]
        public int ContactId { get; set; }
        [Required]
        public bool IsPrimary { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }
   
    public class AgentAddress
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int AgentId { get; set; }
        [Required]
        public int AddressId { get; set; }
        [Required]
        public bool IsPrimary { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }

    public class AgentContact
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int AgentId { get; set; }
        [Required]
        public int ContactId { get; set; }
        [Required]
        public bool IsPrimary { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }

    public class AgentContactAddress
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int AgentContactId { get; set; }
        [Required]
        public int AddressId { get; set; }
        [Required]
        public bool IsPrimary { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }
    
    public class AgreementAddress
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int AgreementId { get; set; }
        [Required]
        public int AddressId { get; set; }
        [Required]
        public bool IsPrimary { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }

    public class AgreementStatus
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int AgreementId { get; set; }
        [Required]
        public int AgreementStatusTypeId { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        [MaxLength(128)]
        public string CreatedBy { get; set; }
        [Required]
        public DateTime Modified { get; set; }
        [Required]
        [MaxLength(128)]
        public string ModifiedBy { get; set; }
    }
    
    public class ContactAddress
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int ContactId { get; set; }
        [Required]
        public int AddressId { get; set; }
        [Required]
        public bool IsPrimary { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }

    public class LookupReference
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(128)]
        public string ObjectType { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MaxLength(128)]
        public string Description { get; set; }
        [Required]
        public int Sequence { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        [MaxLength(128)]
        public string CreatedBy { get; set; }
        [Required]
        public DateTime Modified { get; set; }
        [Required]
        [MaxLength(128)]
        public string ModifiedBy { get; set; }
    }
    
    public class TeamLiaison
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int TeamId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        [MaxLength(128)]
        public string CreatedBy { get; set; }
        [Required]
        public DateTime Modified { get; set; }
        [Required]
        [MaxLength(128)]
        public string ModifiedBy { get; set; }
    }

    public class TeamTemplate
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int TeamId { get; set; }
        [Required]
        public int TemplateId { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        [MaxLength(128)]
        public string CreatedBy { get; set; }
        [Required]
        public DateTime Modified { get; set; }
        [Required]
        [MaxLength(128)]
        public string ModifiedBy { get; set; }
    }
    
    public class TemplateDocument
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int DocumentId { get; set; }
        [Required]
        public int TemplateId { get; set; }
        public int Version { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        [MaxLength(128)]
        public string CreatedBy { get; set; }
        [Required]
        public DateTime Modified { get; set; }
        [Required]
        [MaxLength(128)]
        public string ModifiedBy { get; set; }
    }

    
    public class UserApprover
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int ApproverId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }

    public class UserContact
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ContactId { get; set; }
        [Required]
        public bool IsPrimary { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }



    public class UserRole
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int RoleId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }

    public class UserTeam
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int TeamId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Modified { get; set; }
    }


}
