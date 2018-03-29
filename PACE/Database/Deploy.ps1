# Set params
if (! $PSScriptServerName)
{
    Write-Host "Missing required variable PSScriptServerName" -ForegroundColor Yellow
    exit 1
}
if (! $PSScriptDBName)
{
    Write-Host "Missing required variable PSScriptDBName" -ForegroundColor Yellow
    exit 1
}
if (! $PSScriptUserName)
{
    Write-Host "Missing required variable PSScriptUserName" -ForegroundColor Yellow
    exit 1
}
if (! $PSScriptPassword)
{
    Write-Host "Missing required variable PSScriptPassword" -ForegroundColor Yellow
    exit 1
}
 
Write-Host "-----------------------------------------------"
Write-Host "Server Name: " + $PSScriptServerName
Write-Host "DB Name: " + $PSScriptDBName
Write-Host "User P: " + $PSScriptPassword
Write-Host "User Name: " + $PSScriptUserName
Write-Host "SqlServer.Dac Path" + $PSScriptDacPath
Write-Host "-----------------------------------------------"

# Add the DLL
# For 64-bit machines
[System.Reflection.Assembly]::LoadFrom($PSScriptDacPath)

# Create the connection string
$dacObject = New-Object Microsoft.SqlServer.Dac.DacServices ("data source=" + $PSScriptServerName + ";User Id=" + $PSScriptUserName + ";pwd=" + $PSScriptPassword + ";Integrated Security=False;")
 
#Load the dacpac
$dacpacFile = (Get-Location).Path + "\PACE.sqlproj.dacpac" 
$dacpacOptions = (Get-Location).Path + "\PACE.publish.xml"
 
Write-Host $dacpacFile
Write-Host $dacpacOptions

#Output content of publish file
Get-Content((Get-Location).Path + "\PACE.publish.xml")
 
#Load dacpac from file & deploy to database
$dacPackage = [Microsoft.SqlServer.Dac.DacPackage]::Load($dacpacFile)

# Load DacProfile
if ($dacpacOptions -ne " ") 
{
    $dacProfile = [Microsoft.SqlServer.Dac.DacProfile]::Load($dacpacOptions)
    Write-Host ('Loaded publish profile ''{0}''.' -f $dacpacOptions)
} else {
    $dacProfile = New-Object Microsoft.SqlServer.Dac.DacDeployOptions -Property @{
    'BlockOnPossibleDataLoss' = $false;
    'DropObjectsNotInSource' = $false;
    'ScriptDatabaseOptions' = $false;
    'IgnorePermissions' = $true;
    'IgnoreRoleMembership' = $true;
    'IgnoreDefaultSchema' = $true
    }
}
 
try
{
    # Deploy the dacpac
    Write-Host 'Starting Dacpac deployment...'
    $dacObject.Deploy($dacPackage, $PSScriptDBName, $true, $dacProfile.DeployOptions)
}
catch 
{ 
    "Failed to run package script: $_.Exception.Message" 
    Write-Host "Exception Detail -"; 
    $Error | format-list -force 
    Write-Host $Error[0].Exception.ParentContainsErrorRecordException; 
    Exit 1 
}