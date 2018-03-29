using System;
using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Contracts
{
    public class AgreementDocument : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int TransactionTypeId { get; set; }
        [Required] public int BusinessLineId { get; set; }
        [Required] public int SoleOrJointAgencyId { get; set; }
        [Required] public int AgencyTypeId { get; set; }
        [Required] public DateTime CommencementDate { get; set; }
        [Required] public DateTime ExpiryDate { get; set; }
        public DateTime AuctionDate { get; set; }
        public DateTime EOITenderDate { get; set; }
        public bool IsForAuction { get; set; }
        public bool IsForEOITender { get; set; }
        [Required] public Decimal PropertyPrice { get; set; }
        [Required] public int PropertyPriceGSTTypeId { get; set; }
        public Decimal EstSellingPrice { get; set; }
        public Decimal EstSellingMinPrice { get; set; }
        public Decimal EstSellingMaxPrice { get; set; }
        public Decimal ScaleFee { get; set; }
        public Decimal FlatRateFee { get; set; }
        public Decimal CollectDeposits { get; set; }
        public Decimal Expenses { get; set; }
        public Decimal ThirdParty1EstRebateAmount { get; set; }
        public int EstSellingPriceGSTTypeId { get; set; }
        [Required] public bool IsChattelsIncludedOrExcluded { get; set; }
        [Required] public bool RequireDisclosures { get; set; }
        public string ChattelsInclusoinOrExclusion { get; set; }
        [MaxLength(50)] public string ThirdParty1RebateName { get; set; }
        [MaxLength(50)] public string ThirdParty2RebateName { get; set; }
        [Required] public int DocumentId { get; set; }
        [Required] public int TemplateId { get; set; }
        [Required] public int Version { get; set; }
    }
}