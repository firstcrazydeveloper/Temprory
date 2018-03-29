CREATE TABLE [dbo].[UserContact]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[UserId]   INT        NOT NULL,
	[ContactId]   INT        NOT NULL,
  	[IsPrimary]   BIT         DEFAULT 0 NOT NULL,	   
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,   
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
   
	CONSTRAINT [UserContact_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
	CONSTRAINT [UserContact_User_FK] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]),
	CONSTRAINT [UserContact_Contact_FK] FOREIGN KEY ([ContactId]) REFERENCES [dbo].[Contact] ([Id]),
	
)
GO
CREATE UNIQUE CLUSTERED INDEX [UserContact_BK]
    ON [dbo].[UserContact]([UserId] ASC,[ContactId] ASC) WITH (FILLFACTOR = 90);
