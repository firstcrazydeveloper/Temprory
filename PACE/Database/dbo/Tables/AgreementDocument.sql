﻿CREATE TABLE [dbo].[AgreementDocument]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
	[TransactionTypeId]  INT NOT NULL,
	[BusinessLineId]  INT            NOT NULL,  
	[SoleOrJointAgencyId]  INT            NOT NULL, 
	[AgencyTypeId]  INT            NOT NULL, 
	[CommencementDate] DATETIME  NOT NULL,
	[ExpiryDate] DATETIME  NOT NULL,
	[AuctionDate] DATETIME   NULL,
	[EoiITenderDate] DATETIME   NULL,	
	[IsForAuction] BIT   NULL,
	[IsForEoiTender] BIT   NULL,
	[PropertyPrice] MONEY NOT NULL,
	[PropertyPriceGstTypeId] INT NOT NULL,
	[EstSellingPrice] MONEY NULL,
	[EstSellingMinPrice] MONEY NULL,
	[EstSellingMaxPrice] MONEY NULL,
	[ScaleFee] MONEY NULL,
	[FlatRateFee] MONEY NULL,
	[CollectDeposits] MONEY NULL,
	[Expenses] MONEY NULL,
	[ThirdParty1EstRebateAmount] MONEY NULL,
	[ThirdParty2EstRebateAmount] MONEY NULL,
	[EstSellingPriceGstTypeId] INT NULL,
	[IsChattelsIncludedOrExcluded] BIT  DEFAULT 0 NOT NULL,
	[RequireDisclosures] BIT  DEFAULT 0 NOT NULL,
	[ChattelsInclusoinOrExclusion] NVARCHAR(MAX) NULL,
	[ThirdParty1RebateName] NVARCHAR(50) NULL,
	[ThirdParty2RebateName] NVARCHAR(50) NULL,
	[DocumentId] INT NOT NULL,
	[TemplateId] INT NOT NULL,
	[Version] INT NOT NULL,
	[IsDeleted]   BIT        NOT NULL DEFAULT 0,
[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [AgreementDocument_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
CONSTRAINT [AgreementDocument_TransactionType_FK] FOREIGN KEY ([TransactionTypeId]) REFERENCES [dbo].[trefTransactionType] ([Id]),
CONSTRAINT [AgreementDocument_BusinessLine_FK] FOREIGN KEY ([BusinessLineId]) REFERENCES [dbo].[trefBusinessLineType] ([Id]),
CONSTRAINT [AgreementDocument_SoleOrJointAgency_FK] FOREIGN KEY ([SoleOrJointAgencyId]) REFERENCES [dbo].[trefSoleOrJointAgencyType] ([Id]),
CONSTRAINT [AgreementDocument_AgencyType_FK] FOREIGN KEY ([AgencyTypeId]) REFERENCES [dbo].[trefAgencyType] ([Id]),
CONSTRAINT [AgreementDocument_GSTType_PropertyPrice_FK] FOREIGN KEY ([PropertyPriceGstTypeId]) REFERENCES [dbo].[trefGSTType] ([Id]),
CONSTRAINT [AgreementDocument_GSTType_EstSellingPrice_FK] FOREIGN KEY ([EstSellingPriceGstTypeId]) REFERENCES [dbo].[trefGSTType] ([Id]),
CONSTRAINT [AgreementDocument_Template_FK] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([Id]),
CONSTRAINT [AgreementDocument_Document_FK] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Document] ([Id])
	)
GO

