$envPath = "C:\Users\daksh\AISM-Portal\.env"
$content = Get-Content $envPath
$content = $content -replace 'BASE_PATH=/', 'BASE_PATH=/aism/'
$content | Set-Content $envPath
Write-Host "Reverted BASE_PATH to /aism/ in .env file"