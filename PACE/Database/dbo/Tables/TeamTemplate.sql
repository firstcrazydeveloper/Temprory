CREATE TABLE [dbo].[TeamTemplate]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
    [TeamId]  INT            NOT NULL,
	[TemplateId]  INT         NOT NULL,     
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [TeamTemplate_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [TeamTemplate_Team_FK] FOREIGN KEY ([TeamId]) REFERENCES [dbo].[Team] ([Id]),
	CONSTRAINT [TeamTemplate_Template_FK] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([Id]),

)
GO
CREATE UNIQUE CLUSTERED INDEX [TeamTemplate_BK]
    ON [dbo].[TeamTemplate]([TeamId] ASC,[TemplateId] ASC) WITH (FILLFACTOR = 90);

