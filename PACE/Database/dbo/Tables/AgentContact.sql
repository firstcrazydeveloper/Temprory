CREATE TABLE [dbo].[AgentContact]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
	[AgentId]   INT        NOT NULL,
	[ContactId]   INT        NOT NULL,
  	[IsPrimary]   BIT         DEFAULT 0 NOT NULL,	   
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,   
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
   
	CONSTRAINT [AgentContact_PK] PRIMARY KEY NONCLUSTERED (Id ASC),	
	CONSTRAINT [AgentContact_Agent_FK] FOREIGN KEY ([AgentId]) REFERENCES [dbo].[Agent] ([Id]),
	CONSTRAINT [AgentContact_Contact_FK] FOREIGN KEY ([ContactId]) REFERENCES [dbo].[Contact] ([Id]),
	
)
GO
CREATE UNIQUE CLUSTERED INDEX [AgentContact_BK]
    ON [dbo].[AgentContact]([AgentId] ASC,[ContactId]ASC) WITH (FILLFACTOR = 90);
GO
