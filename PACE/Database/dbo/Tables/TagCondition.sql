CREATE TABLE [dbo].[TagCondition]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[TemplateId]   INT        NOT NULL,	
    [Tag]      NVARCHAR (50)  NOT NULL,
	[Condition]      NVARCHAR (Max)   NULL,   
	[Value]      NVARCHAR (Max)  NOT  NULL,
    [IsDeleted]   BIT        NOT NULL DEFAULT 0,
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [TagCondition_PK] PRIMARY KEY NONCLUSTERED (Id ASC)
)
