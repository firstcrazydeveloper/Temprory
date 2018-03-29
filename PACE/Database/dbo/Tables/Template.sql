CREATE TABLE [dbo].[Template]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
	[BusinessLineId]  INT          NOT NULL,
	[TransactionTypeId]  INT         NOT NULL,
    [Name] NVARCHAR (50)  NOT NULL,
	[Description] NVARCHAR (max)   NULL,
	[Tags] NVARCHAR (max)   NULL,	
	[StatusId]  INT           NOT NULL,
    [IsSignedDocumentsRequired] BIT DEFAULT(0) NOT NULL,    
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [Template_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [Template_BusinessLine_FK] FOREIGN KEY ([BusinessLineId]) REFERENCES [dbo].[trefBusinessLineType] ([Id]),
	CONSTRAINT [Template_TransactionType_FK] FOREIGN KEY ([TransactionTypeId]) REFERENCES [dbo].[trefTransactionType] ([Id]),
	CONSTRAINT [Template_TemplateStatus_FK] FOREIGN KEY ([StatusId]) REFERENCES [dbo].[trefTemplateStatusType] ([Id]),

)
GO

