$envPath = "C:\Users\daksh\AISM-Portal\.env"
$content = Get-Content $envPath
$content = $content -replace 'BASE_PATH=/aism/', 'BASE_PATH=/'
$content | Set-Content $envPath
Write-Host "Updated BASE_PATH to / in .env file"