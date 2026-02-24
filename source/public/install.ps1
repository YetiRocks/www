# Yeti Installer for Windows
# Usage: irm https://yetirocks.com/install.ps1 | iex
$ErrorActionPreference = "Stop"

$Repo = "yetirocks/yeti"
$InstallDir = "$env:LOCALAPPDATA\yeti\bin"

Write-Host "Installing Yeti..."

# Detect architecture
$Arch = if ([Environment]::Is64BitOperatingSystem) { "x86_64" } else { Write-Error "Unsupported: 32-bit Windows"; exit 1 }
$Target = "$Arch-pc-windows-msvc"

# Get latest release
$Release = Invoke-RestMethod "https://api.github.com/repos/$Repo/releases/latest"
$Version = $Release.tag_name
$Asset = $Release.assets | Where-Object { $_.name -like "*$Target*.zip" } | Select-Object -First 1

if (-not $Asset) {
    Write-Error "No release found for $Target"
    exit 1
}

Write-Host "Downloading yeti $Version for $Target..."
$TmpDir = New-TemporaryFile | ForEach-Object { Remove-Item $_; New-Item -ItemType Directory -Path $_ }
$ZipPath = Join-Path $TmpDir "yeti.zip"
Invoke-WebRequest -Uri $Asset.browser_download_url -OutFile $ZipPath

Expand-Archive -Path $ZipPath -DestinationPath $TmpDir -Force

# Install
New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
Copy-Item (Join-Path $TmpDir "yeti.exe") $InstallDir -Force
Remove-Item $TmpDir -Recurse -Force

# Add to PATH if not already present
$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($UserPath -notlike "*$InstallDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$UserPath;$InstallDir", "User")
    Write-Host "Added $InstallDir to PATH (restart your terminal)"
}

Write-Host "Yeti $Version installed successfully!"
Write-Host "Run 'yeti init' to get started."
