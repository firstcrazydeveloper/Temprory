CREATE TABLE [dbo].[AgreementClause]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[AgreementDocumentId]   INT        NOT NULL,
	[StateId]   INT        NOT NULL,
    [Section] NVARCHAR (10)  NOT NULL,
	[TransactionTypeId]   INT        NOT NULL,
	[AgencyTypeId]   INT        NOT NULL,
    [Heading]      NVARCHAR (250)  NOT NULL,
	 [SubHeading]      NVARCHAR (250)   NULL,
    [Sequence]     INT            DEFAULT ((1)) NOT NULL,
	 [Clause]      NVARCHAR (Max)  NOT  NULL,
	  [Conditions]      NVARCHAR (250)  NOT  NULL,
	   [IsEditable] BIT   DEFAULT 0 NOT NULL,
    [IsDeleted]   BIT        NOT NULL DEFAULT 0,
[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [AgreementClause_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [AgreementClause_AgreementDocument_FK] FOREIGN KEY ([AgreementDocumentId]) REFERENCES [dbo].[AgreementDocument] ([Id]),
	CONSTRAINT [AgreementClause_State_FK] FOREIGN KEY ([StateId]) REFERENCES [dbo].[trefStateType] ([Id]),
	CONSTRAINT [AgreementClause_AgencyType_FK] FOREIGN KEY ([AgencyTypeId]) REFERENCES [dbo].[trefAgencyType] ([Id]), 
    CONSTRAINT [FK_AgreementClause_trefStateType] FOREIGN KEY ([StateId]) REFERENCES [dbo].[trefStateType]([Id]),
)
GO
CREATE UNIQUE CLUSTERED INDEX [AgreementClause_BK]
    ON [dbo].[AgreementClause]([AgreementDocumentId] ASC,[IsDeleted]ASC) WITH (FILLFACTOR = 90);
GO
