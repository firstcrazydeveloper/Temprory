CREATE TABLE [dbo].[AccountAddress]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[AccountId]   INT        NOT NULL,
	[AddressId]   INT        NOT NULL,
  	[IsPrimary]   BIT         NOT NULL DEFAULT 0,	   
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,   
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
   
	CONSTRAINT [AccounttAddress_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
	CONSTRAINT [AccountAddress_Account_FK] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([Id]),
	CONSTRAINT [AccountAddress_Address_FK] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([Id]),
	
)
GO
CREATE UNIQUE CLUSTERED INDEX [AccountAddress_BK]
    ON [dbo].[AccountAddress]([AccountId] ASC,[AddressId]ASC) WITH (FILLFACTOR = 90);
GO