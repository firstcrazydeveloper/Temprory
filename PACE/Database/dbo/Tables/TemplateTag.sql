CREATE TABLE [dbo].[TemplateTag]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[TemplateId]   INT        NOT NULL,
	[ObjectName]   NVARCHAR(50)        NOT NULL,
	[PropertyName]   NVARCHAR(50)        NOT NULL,
	[Tag]   NVARCHAR(50)        NOT NULL,
  	[IsDeleted]   BIT        NOT NULL DEFAULT 0,
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [TemplateTag_PK] PRIMARY KEY NONCLUSTERED (Id ASC)
	)
	GO
	CREATE UNIQUE CLUSTERED INDEX [TemplateTag_BK]
    ON [dbo].[TemplateTag]([TemplateId] ASC,[ObjectName] ASC,[PropertyName] ASC) WITH (FILLFACTOR = 90);