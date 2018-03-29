CREATE TABLE [dbo].[UserRole]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
    [RoleId]  INT            NOT NULL,
	[UserId]  INT           NOT NULL, 
   [CreatedBy]    [varchar](128) DEFAULT (suser_sname()) NOT NULL,
    [Created]      DATETIME       DEFAULT (getdate()) NOT NULL,
    [Modified]     DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy]   [varchar](128) DEFAULT (suser_sname()) NOT NULL,   
	CONSTRAINT [UserRole_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [UserRole_Role_FK] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Role] ([Id]),
	CONSTRAINT [ActionType_User_FK] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]),
)
GO
CREATE UNIQUE CLUSTERED INDEX [UserRole_BK]
    ON [dbo].[UserRole]([UserId] ASC,[RoleId] ASC) WITH (FILLFACTOR = 90);

