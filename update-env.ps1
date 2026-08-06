$envPath = "C:\Users\daksh\AISM-Portal\.env"
$password = Read-Host "Enter your PostgreSQL password"
$content = Get-Content $envPath
$content = $content -replace 'postgresql://postgres:YOUR_PASSWORD@localhost:5432/file_recreator', "postgresql://postgres:$password@localhost:5432/file_recreator"
$content | Set-Content $envPath
Write-Host "Password updated successfully in .env file"