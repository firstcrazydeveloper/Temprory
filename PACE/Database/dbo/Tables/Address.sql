CREATE TABLE [dbo].[Address]
(
[Id]   INT            IDENTITY (1, 1) NOT NULL,
[AddressTypeId]   INT          NOT NULL,
[PropertyTypeId]   INT          NULL,
[SubPropertyTypeId]   INT          NULL,
[StreetTypeId]   INT          NOT NULL,
[SuburbId]   INT          NOT NULL,
[PropertyName]   NVARCHAR(250)           NULL,
[BlockNo]   NVARCHAR(3)           NULL,
[LotNo]   NVARCHAR(10)           NULL,
[Floor]   NVARCHAR(10)           NULL,
[Unit]   NVARCHAR(10)           NULL,
[StreetNo]   NVARCHAR(10)           NULL,
[StreetName]   NVARCHAR(50)           NULL,
[Longitude]   NVARCHAR(50)           NULL,
[Latitude]   NVARCHAR(50)           NULL,
[GeoResults]   NVARCHAR(50)           NULL,
[TitleReference]   NVARCHAR(50)           NULL,
[Section]   NVARCHAR(50)           NULL,	
[IsDeleted]   BIT        NOT NULL DEFAULT 0,
[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
[CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
[ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
CONSTRAINT [Address_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
CONSTRAINT [Agent_PropertyType_FK] FOREIGN KEY ([PropertyTypeId]) REFERENCES [dbo].[trefPropertyType] ([Id]),
CONSTRAINT [Agent_SubPropertyType_FK] FOREIGN KEY ([SubPropertyTypeId]) REFERENCES [dbo].[trefSubPropertyType] ([Id]),
CONSTRAINT [Agent_Suburb_FK] FOREIGN KEY ([SuburbId]) REFERENCES [dbo].[Suburb] ([Id]),

)
GO
CREATE UNIQUE CLUSTERED INDEX [Address_BK]
    ON [dbo].[Address]([SuburbId] ASC) WITH (FILLFACTOR = 90);
GO
