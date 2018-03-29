CREATE TABLE [dbo].[TeamLiaison]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
    [TeamId]  INT            NOT NULL,
	[UserId]  INT         NOT NULL,     
	[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [TeamLiaison_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [TeamLiaison_Team_FK] FOREIGN KEY ([TeamId]) REFERENCES [dbo].[Team] ([Id]),
	CONSTRAINT [TeamLiaison_User_FK] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]),
	)
GO
CREATE UNIQUE CLUSTERED INDEX [TeamLiaison_BK]
    ON [dbo].[TeamLiaison]([TeamId] ASC,[UserId] ASC) WITH (FILLFACTOR = 90);

