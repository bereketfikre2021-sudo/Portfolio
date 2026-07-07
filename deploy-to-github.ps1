# PowerShell Script to Deploy Portfolio to GitHub
# This script will help you deploy your portfolio to GitHub

Write-Host "=== Portfolio Deployment Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    git --version | Out-Null
} catch {
    Write-Host "ERROR: Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Navigate to project directory
$projectDir = "C:\Users\BK\Documents\Bereket Fikre Portfolio Website"
Set-Location $projectDir

# Check if this is a git repository
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Check current branch
$currentBranch = git branch --show-current 2>$null
if (-not $currentBranch) {
    $currentBranch = "main"
    git checkout -b main 2>$null
}

Write-Host "Current branch: $currentBranch" -ForegroundColor Green

# Ask user if they want to create a new branch
Write-Host ""
$createNewBranch = Read-Host "Create a new branch for deployment? (Y/N)"
if ($createNewBranch -eq "Y" -or $createNewBranch -eq "y") {
    $branchName = Read-Host "Enter branch name (e.g., 'deploy-static-site')"
    if (-not $branchName) {
        $branchName = "deploy-static-site"
    }
    Write-Host "Creating branch: $branchName" -ForegroundColor Yellow
    git checkout -b $branchName 2>$null
    $currentBranch = $branchName
}

# Check for remote
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host ""
    Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/bereketfikre2021-sudo/Portfolio.git
} else {
    Write-Host "Remote exists: $remoteExists" -ForegroundColor Green
}

# Stage all files
Write-Host ""
Write-Host "Staging files..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --short
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Deploy optimized portfolio website with SEO and performance improvements"
} else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
}

# Push to GitHub
Write-Host ""
$push = Read-Host "Push to GitHub? (Y/N)"
if ($push -eq "Y" -or $push -eq "y") {
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin $currentBranch
    
    Write-Host ""
    Write-Host "=== Deployment Complete ===" -ForegroundColor Green
    Write-Host "Your site is ready to deploy on GitHub Pages!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/bereketfikre2021-sudo/Portfolio/settings/pages" -ForegroundColor White
    Write-Host "2. Select branch: $currentBranch" -ForegroundColor White
    Write-Host "3. Select folder: / (root)" -ForegroundColor White
    Write-Host "4. Click Save" -ForegroundColor White
    Write-Host ""
    Write-Host "Your site will be live at: https://bereketfikre2021-sudo.github.io/Portfolio/" -ForegroundColor Green
} else {
    Write-Host "Skipping push. You can push manually later." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green












