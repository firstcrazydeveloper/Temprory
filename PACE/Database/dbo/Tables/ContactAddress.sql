CREATE TABLE [dbo].[ContactAddress]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[ContactId]   INT        NOT NULL,
	[AddressId]   INT        NOT NULL,
  	[IsPrimary]   BIT        DEFAULT 0 NOT NULL,	   
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,   
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
   
	CONSTRAINT [ContactAddress_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
	CONSTRAINT [ContactAddress_Address_FK] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([Id]),
	CONSTRAINT [ContactAddress_Contact_FK] FOREIGN KEY ([ContactId]) REFERENCES [dbo].[Contact] ([Id]),
	
)
GO
	CREATE UNIQUE CLUSTERED INDEX [ContactAddress_BK]
    ON [dbo].[ContactAddress]([ContactId] ASC,[AddressId]ASC) WITH (FILLFACTOR = 90);
GO

