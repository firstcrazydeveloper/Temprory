CREATE TABLE [dbo].[AccountContact]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[AccountId]   INT        NOT NULL,
	[ContactId]   INT        NOT NULL,
  	[IsPrimary]   BIT         NOT NULL DEFAULT 0,	   
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,   
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
   
	CONSTRAINT [AccountContact_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [AccountContact_Account_FK] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([Id]),
	CONSTRAINT [AccountContact_Contact_FK] FOREIGN KEY ([ContactId]) REFERENCES [dbo].[Contact] ([Id]),	
	
)
GO
CREATE UNIQUE CLUSTERED INDEX [AccountContact_BK]
    ON [dbo].[AccountContact]([AccountId] ASC,[ContactId]ASC) WITH (FILLFACTOR = 90);
GO
