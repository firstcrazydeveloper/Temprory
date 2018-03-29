CREATE TABLE [dbo].[TemplateDocument]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
	[DocumentId]  INT NOT NULL,
	[TemplateId]  INT            NOT NULL,   
	[Version] INT NULL,
	[IsDeleted]   BIT        NOT NULL DEFAULT 0,
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [TemplateDocument_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [TemplateDocument_Template_FK] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([Id]),
	CONSTRAINT [TemplateDocument_Document_FK] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Document] ([Id])
)
GO
CREATE UNIQUE CLUSTERED INDEX [TemplateDocument_BK]
    ON [dbo].[TemplateDocument]([TemplateId] ASC,[DocumentId] ASC) WITH (FILLFACTOR = 90);

