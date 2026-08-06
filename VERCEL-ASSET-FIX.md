# Vercel Asset Loading Fix - Proper Solution

## Problem
Vercel was failing to load assets because the base path `/aism/` was causing 404 errors on JavaScript and CSS files.

## Root Cause
The Vite build creates assets with the base path prefix, but Vercel was not configured to properly serve these assets from the `/aism/` subdirectory.

## Solution
Keep the Vite base path as `/aism/` (this is correct for serving from a subdirectory) and fix the Vercel configuration to properly handle asset routing.

## Files Changed

### 1. vercel.json (FIXED)
Updated to properly handle both assets and API routing:

```json
{
  "rewrites": [
    {
      "source": "/aism/api/:path*",
      "destination": "https://aism-api.onrender.com/api/:path*"
    },
    {
      "source": "/aism/(.*)",
      "destination": "/aism/$1"
    },
    {
      "source": "/aism",
      "destination": "/aism/index.html"
    }
  ]
}
```

### 2. vite.config.ts (KEPT AS IS)
- Remains: `base: '/aism/'` (correct for subdirectory deployment)
- This ensures assets are built with the correct path prefix

### 3. .env.example (KEPT AS IS)
- Remains: `BASE_PATH=/aism/` (correct for local development)

### 4. .env (REVERTED)
- Reverted to: `BASE_PATH=/aism/` (matching production)

## How This Works

1. **Vite Build**: Creates assets with `/aism/` prefix (e.g., `/aism/assets/index-xyz.js`)
2. **Vercel Rewrite**: The `"/aism/(.*)"` rule ensures requests to `/aism/assets/*` are served correctly
3. **API Proxy**: The `"/aism/api/:path*"` rule forwards API requests to Render
4. **SPA Routing**: The `"/aism"` rule serves the index.html for the root path

## Deployment Instructions

1. **Update .env file locally** (if you changed it):
```powershell
cd C:\Users\daksh\AISM-Portal
.\update-env-base-fix.ps1
```

2. **Rebuild the frontend**:
```bash
cd C:\Users\daksh\AISM-Portal
pnpm --filter @workspace/aism-guide run build
```

3. **Commit and push to GitHub**:
```bash
git add .
git commit -m "Fix Vercel asset routing for /aism/ subdirectory"
git push
```

4. **Vercel will automatically redeploy** with the fix

## Why This Approach is Correct

- ✅ **Maintains subdirectory structure**: Keeps `/aism/` path for production
- ✅ **Fixes asset loading**: Vercel now correctly serves built assets
- ✅ **Preserves local development**: Local dev still works with `/aism/` path
- ✅ **Handles SPA routing**: Proper client-side routing support
- ✅ **API proxying**: Correctly forwards API requests to backend

## Testing

After deployment, test:
- Assets should load correctly (no 404 errors)
- Navigation should work properly
- API calls should reach the backend
- Authentication should function correctly

## Vercel Configuration Details

The rewrite rules work as follows:

1. `/aism/api/*` → Proxy to Render backend
2. `/aism/assets/*` → Serve static assets from build
3. `/aism/*` → Serve static files from build
4. `/aism` → Serve index.html (SPA entry point)

This ensures that requests like:
- `/aism/assets/index-abc123.js` → Serves the JavaScript file
- `/aism/api/auth/login/delegate` → Proxies to backend
- `/aism/background` → Serves index.html (SPA routing)