CREATE TABLE [dbo].[trefPropertyType]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
	[DisplayOrder] INT NOT NULL,		
	[Code] VARCHAR(10) NOT NULL,
	[Description] VARCHAR(100) NOT  NULL,	
	[StartDate] DATE       DEFAULT (getdate()) NOT NULL,
	[EndDate] DATE         NULL,
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [trefPropertyType_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
)
GO

