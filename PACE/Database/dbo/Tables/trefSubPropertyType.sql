﻿CREATE TABLE [dbo].[trefSubPropertyType]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
	[DisplayOrder] INT NOT NULL,		
	[Code] VARCHAR(10) NOT NULL,
	[Description] VARCHAR(100) NOT  NULL,	
	[StartDate] DATETIME       DEFAULT (getdate()) NOT NULL,
	[EndDate] DATE         NULL,
    [Created] DATE       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [trefSubPropertyType_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
)
GO

