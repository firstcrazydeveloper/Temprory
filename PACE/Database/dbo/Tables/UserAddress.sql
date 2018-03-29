CREATE TABLE [dbo].[UserAddress]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[UserId]   INT        NOT NULL,
	[AddressId]   INT        NOT NULL,
  	[IsPrimary]   BIT        DEFAULT 0 NOT NULL,	   
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
   
	CONSTRAINT [UserAddress_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
	CONSTRAINT [UserAddress_Address_FK] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([Id]),
	CONSTRAINT [UserAddress_User_FK] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]),
	
)
GO
	CREATE UNIQUE CLUSTERED INDEX [UserAddress_BK]
    ON [dbo].[UserAddress]([UserId] ASC,[AddressId]ASC) WITH (FILLFACTOR = 90);
GO

