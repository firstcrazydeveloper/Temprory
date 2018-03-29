CREATE TABLE [dbo].[AgreementAddress]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[AgreementId]   INT        NOT NULL,
	[AddressId]   INT        NOT NULL,
  	[IsPrimary]   BIT         DEFAULT 0 NOT NULL,	   
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,   
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
   
	CONSTRAINT [AgreementAddress_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
	CONSTRAINT [AgreementAddress_Agreement_FK] FOREIGN KEY ([AgreementId]) REFERENCES [dbo].[Agreement] ([Id]),
	CONSTRAINT [AgreementAddress_Address_FK] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([Id]),
	
)
GO
CREATE UNIQUE CLUSTERED INDEX [AgreementAddress_BK]
    ON [dbo].[AgreementAddress]([AgreementId] ASC,[AddressId]ASC) WITH (FILLFACTOR = 90);
GO
