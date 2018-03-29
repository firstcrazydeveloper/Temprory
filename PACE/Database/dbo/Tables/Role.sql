CREATE TABLE [dbo].[Role]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50)  NOT NULL,
    [IsSuperAdmin] BIT DEFAULT(0) NOT NULL,
    [IsDeleted]   BIT        NOT NULL DEFAULT 0,
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [Role_PK] PRIMARY KEY NONCLUSTERED (Id ASC) 
)
GO
CREATE UNIQUE CLUSTERED INDEX [Role_BK]
    ON [dbo].[Role]([Name] ASC) WITH (FILLFACTOR = 90);
