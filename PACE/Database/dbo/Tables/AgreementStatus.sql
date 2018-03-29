CREATE TABLE [dbo].[AgreementStatus]
(
[Id]   INT            IDENTITY (1, 1) NOT NULL,
[AgreementId]   INT          NOT NULL,
[AgreementStatusTypeId]   INT          NOT NULL,
[Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [AgreementStatus_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [AgreementStatus_Agreement_FK] FOREIGN KEY ([AgreementId]) REFERENCES [dbo].[Agreement] ([Id]),
	CONSTRAINT [AgreementStatus_AgreementStatusType_FK] FOREIGN KEY ([AgreementStatusTypeId]) REFERENCES [dbo].[trefAgreementStatusType] ([Id]),
)
GO
CREATE UNIQUE CLUSTERED INDEX [AgreementStatus_BK]
    ON [dbo].[AgreementStatus]([AgreementId] ASC,[AgreementStatusTypeId]ASC) WITH (FILLFACTOR = 90);
GO
