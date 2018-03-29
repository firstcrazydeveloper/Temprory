CREATE TABLE [dbo].[RoleAction]
(
	[Id] INT            IDENTITY (1, 1) NOT NULL,
	[RoleId]  INT         NOT NULL, 
	[ActionTypeId]  INT         NOT NULL, 
	[IsEnabled]  BIT         NULL, 
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [RoleAction_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [RoleAction_Role_FK] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Role] ([Id]),
	CONSTRAINT [RoleAction_ActionType_FK] FOREIGN KEY ([ActionTypeId]) REFERENCES [dbo].[trefActionType] ([Id]),
)
GO
CREATE UNIQUE CLUSTERED INDEX [RoleActionType_BK]
    ON [dbo].[RoleAction]([RoleId] ASC,[ActionTypeId]ASC) WITH (FILLFACTOR = 90);
GO

