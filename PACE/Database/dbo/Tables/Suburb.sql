CREATE TABLE [dbo].[Suburb]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[StateId]  INT         NOT NULL, 
	[CountryTypeId]   INT          NOT NULL,
	[District]  NVARCHAR (50)   NOT NULL,
	[City]  NVARCHAR (50)   NOT NULL,
	[SuburbName]  NVARCHAR (50)   NOT NULL,
	[PostCode]   NVARCHAR (10)        NOT NULL,   
    [IsDeleted]   BIT        NOT NULL DEFAULT 0,
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [Suburb_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [Suburb_State_FK] FOREIGN KEY ([StateId]) REFERENCES [dbo].[trefStateType] ([Id]),
	CONSTRAINT [Suburb_Country_FK] FOREIGN KEY ([CountryTypeId]) REFERENCES [dbo].[trefCountryType] ([Id]),
)
