CREATE TABLE [dbo].[AgentContactAddress]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[AgentContactId]   INT        NOT NULL,
	[AddressId]   INT        NOT NULL,
  	[IsPrimary]   BIT         DEFAULT 0 NOT NULL,	   
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,   
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
   
	CONSTRAINT [AgentContactAddress_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
	CONSTRAINT [AgentContactAddress_AgentContact_FK] FOREIGN KEY ([AgentContactId]) REFERENCES [dbo].[AgentContact] ([Id]),
	CONSTRAINT [AGentContactAddress_Address_FK] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([Id]),
	
)
GO
CREATE UNIQUE CLUSTERED INDEX [AgentContactAddress_BK]
    ON [dbo].[AgentContactAddress]([AgentContactId] ASC,[AddressId]ASC) WITH (FILLFACTOR = 90);
GO
