CREATE TABLE [dbo].[Account]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
[Name]   NVARCHAR(128)           NOT NULL,
[Abn]   NVARCHAR(20)           NULL,
[IsDeleted]   BIT        NOT NULL DEFAULT 0,
[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [Account_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
)
GO
CREATE UNIQUE CLUSTERED INDEX [Account_BK]
    ON [dbo].[Account]([Name] ASC) WITH (FILLFACTOR = 90);
GO
