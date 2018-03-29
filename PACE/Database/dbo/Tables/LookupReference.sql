CREATE TABLE [dbo].[LookupReference]
(
    [Id]   INT            IDENTITY (1, 1) NOT NULL,
    [ObjectType] NVARCHAR (128)  NOT NULL,
    [Name]      NVARCHAR (50)  NOT NULL,
	[Description]      NVARCHAR (128)  NOT NULL,
    [Sequence]     INT            DEFAULT ((1)) NOT NULL,
    [IsDeleted]   BIT        NOT NULL DEFAULT 0,
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [LookupReference_PK] PRIMARY KEY NONCLUSTERED (Id ASC)
);


GO



