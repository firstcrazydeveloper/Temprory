CREATE TABLE [dbo].[Agreement]
(
[Id] INT IDENTITY (1, 1) NOT NULL,
[AgreementDocumentId] INT NOT NULL,
[AccountId] INT NOT NULL,
[AddressId] INT NOT NULL,
[AgentId] INT NOT NULL,
[AgreementStatusId] INT NOT NULL,
[ApproveByUserId] INT NOT NULL,
[UserId] INT NOT NULL,
[IsDeleted]   BIT        NOT NULL DEFAULT 0,
[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
[CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
[ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
CONSTRAINT [Agreement_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
CONSTRAINT [Agreement_AgreementDocument_FK] FOREIGN KEY ([AgreementDocumentId]) REFERENCES [dbo].[AgreementDocument] ([Id]),
CONSTRAINT [Agreement_Account_FK] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([Id]),
CONSTRAINT [Agreement_Address_FK] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([Id]),
CONSTRAINT [Agreement_Agent_FK] FOREIGN KEY ([AgentId]) REFERENCES [dbo].[Agent] ([Id]),
CONSTRAINT [Agreement_AgreementStatus_FK] FOREIGN KEY ([AgreementStatusId]) REFERENCES [dbo].[AgreementStatus] ([Id]),
CONSTRAINT [Agreement_User_FK] FOREIGN KEY ([ApproveByUserId]) REFERENCES [dbo].[User] ([Id])
)
GO
CREATE UNIQUE CLUSTERED INDEX [Agreement_BK]
    ON [dbo].[Agreement]([AgreementDocumentId] ASC,[UserId]ASC) WITH (FILLFACTOR = 90);
GO