CREATE TABLE [dbo].[Document]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
	[DocumentUID]  UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
	[DocumentTypeId]  INT            NOT NULL,       
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [Document_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [Document_DocumentType_FK] FOREIGN KEY ([DocumentTypeId]) REFERENCES [dbo].[trefDocumentType] ([Id]),
)
GO
CREATE UNIQUE CLUSTERED INDEX [Document_BK]
    ON [dbo].[Document]([DocumentTypeId] ASC,[DocumentUID] ASC) WITH (FILLFACTOR = 90);


