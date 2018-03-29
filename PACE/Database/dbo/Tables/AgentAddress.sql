CREATE TABLE [dbo].[AgentAddress]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[AgentId]   INT        NOT NULL,
	[AddressId]   INT        NOT NULL,
  	[IsPrimary]   BIT         DEFAULT 0 NOT NULL,	   
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,   
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
   
	CONSTRAINT [AgentAddress_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
	CONSTRAINT [AgentAddress_Agent_FK] FOREIGN KEY ([AgentId]) REFERENCES [dbo].[Agent] ([Id]),
	CONSTRAINT [AgentAddress_Address_FK] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([Id]),	
)
GO
CREATE UNIQUE CLUSTERED INDEX [AgentAddress_BK]
    ON [dbo].[AgentAddress]([AgentId] ASC,[AddressId]ASC) WITH (FILLFACTOR = 90);
GO
