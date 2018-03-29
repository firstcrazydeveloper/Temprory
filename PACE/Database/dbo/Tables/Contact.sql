CREATE TABLE [dbo].[Contact]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,	
	[Prefix]      INT  NULL,
	[FirstName]      NVARCHAR (50)  NOT NULL,
	[LastName]      NVARCHAR (50)  NOT NULL,
	[Email]      NVARCHAR (50)  NOT NULL,	
    [Mobile]     NVARCHAR (20)  NOT NULL,
	[Fax]     NVARCHAR (20)   NULL,	
	[Phone]     NVARCHAR (20)   NULL,	
	[IsDeleted]   BIT        NOT NULL DEFAULT 0,
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [Contact_PK] PRIMARY KEY NONCLUSTERED (Id ASC)
	)
	GO
	CREATE UNIQUE CLUSTERED INDEX [Contact_BK]
    ON [dbo].[Contact]([FirstName] ASC,[LastName]ASC,[Email]ASC) WITH (FILLFACTOR = 90);
GO
