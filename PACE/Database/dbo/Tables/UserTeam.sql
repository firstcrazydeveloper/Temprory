CREATE TABLE [dbo].[UserTeam]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
    [TeamId]  INT            NOT NULL,
	[UserId]  INT         NOT NULL, 
    [CreatedBy]    [varchar](128) DEFAULT (suser_sname()) NOT NULL,
    [Created]      DATETIME       DEFAULT (getdate()) NOT NULL,
    [Modified]     DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy]   [varchar](128) DEFAULT (suser_sname()) NOT NULL,   
	CONSTRAINT [UserTeam_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [UserTeam_Team_FK] FOREIGN KEY ([TeamId]) REFERENCES [dbo].[Team] ([Id]),
	CONSTRAINT [UserTeam_User_FK] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]),

)
GO
CREATE UNIQUE CLUSTERED INDEX [UserTeam_BK]
    ON [dbo].[UserTeam]([UserId] ASC,[TeamId] ASC) WITH (FILLFACTOR = 90);


