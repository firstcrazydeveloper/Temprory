SET IDENTITY_INSERT dbo.TrefCountryType ON

IF NOT EXISTS (SELECT 1 FROM TrefCountryType WHERE Id = 1)
BEGIN
INSERT TrefCountryType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (1,1,'Australia','AUS',GETDATE(),NULL,'TrefCountryType_tbl.sql','TrefCountryType_tbl.sql')
END

SET IDENTITY_INSERT dbo.TrefCountryType OFF