# Vite Asset Loading Fix

## Problem
Vercel was failing to load assets because the Vite build configuration had `base: '/aism/'` causing 404 errors on JavaScript and CSS files.

## Solution
Updated the Vite configuration to use `base: '/'` instead of `base: '/aism/'` for proper asset loading on Vercel.

## Files Changed

### 1. artifacts/aism-guide/vite.config.ts
- Changed: `const basePath = process.env.BASE_PATH || '/aism/';`
- To: `const basePath = process.env.BASE_PATH || '/';`

### 2. .env.example
- Changed: `BASE_PATH=/aism/`
- To: `BASE_PATH=/`

### 3. .env (needs to be updated locally)
- Run the PowerShell script to update: `.\update-env-base.ps1`

## Manual Update Required

Since .env is in .gitignore, you need to update it manually:

**Option 1: Run PowerShell Script**
```powershell
cd C:\Users\daksh\AISM-Portal
.\update-env-base.ps1
```

**Option 2: Manual Edit**
1. Open `C:\Users\daksh\AISM-Portal\.env`
2. Find: `BASE_PATH=/aism/`
3. Change to: `BASE_PATH=/`
4. Save the file

## Next Steps

1. Update your local .env file
2. Rebuild the frontend:
```bash
cd C:\Users\daksh\AISM-Portal
pnpm --filter @workspace/aism-guide run build
```

3. Commit and push to GitHub:
```bash
git add .
git commit -m "Fix Vite base path for Vercel asset loading"
git push
```

4. Vercel will automatically redeploy with the fix

## Vercel Configuration

The `vercel.json` file already handles the `/aism/` routing through rewrites, so the Vite base path can be `/` while still serving from the correct subdirectory.

This fix ensures:
- ✅ Assets load correctly on Vercel
- ✅ Local development still works
- ✅ Production deployment serves from dakshwadekar.com/aism/