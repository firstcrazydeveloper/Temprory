CREATE TABLE [dbo].[Clause]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[StateId]   INT        NOT NULL,
    [Section] NVARCHAR (10)  NOT NULL,
	[TransactionTypeId]   INT        NOT NULL,
	[AgencyTypeId]   INT        NOT NULL,
    [Heading]      NVARCHAR (250)  NOT NULL,
	 [SubHeading]      NVARCHAR (250)   NULL,
    [Sequence]     INT            DEFAULT ((1)) NOT NULL,
	 [Description]      NVARCHAR (Max)  NOT  NULL,
	  [Conditions]      NVARCHAR (250)  NOT  NULL,
    [IsDeleted]   BIT        NOT NULL DEFAULT 0,
[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [Clause_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [Clause_Status_FK] FOREIGN KEY ([StateId]) REFERENCES [dbo].[trefStateType] ([Id]),
	CONSTRAINT [Clause_TransactionType_FK] FOREIGN KEY ([TransactionTypeId]) REFERENCES [dbo].[trefTransactionType] ([Id]),
	CONSTRAINT [Clause_AgencyType_FK] FOREIGN KEY ([AgencyTypeId]) REFERENCES [dbo].[trefAgencyType] ([Id]),
)
GO

