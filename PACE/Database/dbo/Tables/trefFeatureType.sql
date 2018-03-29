CREATE TABLE [dbo].[trefFeatureType]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Description] VARCHAR(100) NOT NULL, 
    [Code] VARCHAR(10) NULL, 
    [StartDate] DATE NOT NULL DEFAULT getdate(), 
    [EndDate] DATE NULL, 
    [Created] DATETIME NOT NULL DEFAULT getdate(), 
    [CreatedBy] VARCHAR(128) NOT NULL DEFAULT suser_sname(), 
    [Modified] DATETIME NOT NULL DEFAULT getdate(), 
    [ModifiedBy] VARCHAR(128) NULL DEFAULT suser_sname()
)
