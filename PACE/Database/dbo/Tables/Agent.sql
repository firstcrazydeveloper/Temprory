CREATE TABLE [dbo].[Agent]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,	
	[AddressId]      INT NOT NULL,
	[AgentName]      NVARCHAR (50)  NOT NULL,
	[Abn]     NVARCHAR (20)  NOT NULL,
	[LicenseNo]     NVARCHAR (50)   NULL,	
	[IsDeleted]   BIT        NOT NULL DEFAULT 0,
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [Agent_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [Agent_Address_FK] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([Id]),
	)
	GO
	CREATE UNIQUE CLUSTERED INDEX [Agent_BK]
    ON [dbo].[Agent]([AgentName] ASC,[AddressId]ASC) WITH (FILLFACTOR = 90);
GO