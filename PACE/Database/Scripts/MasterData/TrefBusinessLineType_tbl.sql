SET IDENTITY_INSERT dbo.TrefBusinessLineType ON

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 1)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (1,1,'A&T Retail Leasing - Investor','ATRLI',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 2)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (2,2,'A&T Retail Leasing - Occupier','ATRLO',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 3)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (3,3,'A&T Office Leasing - Investor','ATOLI',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 4)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (4,4,'A&T Office Leasing - Occupier','ATOLO',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 5)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (5,5,' A&T Industrial & Logistics Leasing - Investor','ATILI',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 6)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (6,6,' A&T Industrial & Logistics Leasing - Occupier','ATILO',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 7)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (7,7,'Capital Markets - Metro/City (QLD)','CMQLD',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 8)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (8,8,'Capital Markets - Metro/City (NSW)','CMNSW',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 9)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (9,9,'Capital Markets - Metro/City (ACT)','CMACT',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 10)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (10,10,'Capital Markets - Metro/City (VIC)','CMVIC',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 11)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (11,11,'Capital Markets - Metro/City (SA)','CMCA',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 12)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (12,12,'Capital Markets - Metro/City (WA)','CMWA',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 13)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (13,13,'Capital Markets - Metro/City (NT)','CMNT',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 14)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (14,14,'Capital Markets - Metro/City (TAS)','CMTAS',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 15)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (15,15,'Capital Markets - Office','CMO',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 16)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (16,16,'Capital Markets - Retail ','CMR',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 17)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (17,17,'Capital Markets - Healthcare & Retirement Living','CMHRL',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 18)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (18,18,'Capital Markets - Agricultural','CMA',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 19)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (19,19,'Capital Markets - Industrial & Logistics ','CMIL',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 20)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (20,20,'Capital Markets - Hotels & Pubs','CMHP',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 21)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (21,21,'Capital Markets - Debt & Structure','CMDS',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 22)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (22,22,'Capital Markets - Capital Advisory','CMCAD',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END



IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 23)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (23,23,'GWS - Facilities Management','GWSFM',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 24)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (24,24,'GWS - Project Management','GWSPM',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 25)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (25,25,'GWS - Management Consulting','GWSMC',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 26)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (26,26,'GWS - Advisory & Transactions Services','GWSATS',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 27)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (27,27,'Asset Services - Project Management','ASPM',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 28)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (28,28,'Asset Services - Property Management','ASPRM',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 29)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (29,29,'Asset Services - Real Estate Accounting Services','ASREAS',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 30)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (30,30,'Valuation & Advisory Services - Appraisals','VASA',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END


IF NOT EXISTS (SELECT 1 FROM TrefBusinessLineType WHERE Id = 31)
BEGIN
INSERT TrefBusinessLineType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (31,31,'Valuation & Advisory Services - Assessment & Consulting','VASAC',GETDATE(),NULL,'TrefBusinessLineType_tbl.sql','TrefBusinessLineType_tbl.sql')
END


SET IDENTITY_INSERT dbo.TrefBusinessLineType OFF