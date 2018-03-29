CREATE TABLE [dbo].[Team]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50)  NOT NULL,
	[Status]   INT        NOT NULL DEFAULT 0,
    [IsDeleted]   BIT        NOT NULL DEFAULT 0,
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [Team_PK] PRIMARY KEY NONCLUSTERED (Id ASC)
)
GO
CREATE UNIQUE CLUSTERED INDEX [Team_BK]
    ON [dbo].[Team]([Name] ASC) WITH (FILLFACTOR = 90);
