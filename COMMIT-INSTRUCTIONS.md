# Commit and Push Instructions - Updated vercel.json

## ✅ File Updated

I've updated `vercel.json` with:
1. **Correct Render URL**: `https://aism-vc3k.onrender.com`
2. **Improved SPA routing**: Added catch-all rule for single-page application routing

## 📋 Changes Made

**File:** `vercel.json`

**Updated Configuration:**
```json
{
  "rewrites": [
    {
      "source": "/aism/api/:path*",
      "destination": "https://aism-vc3k.onrender.com/api/:path*"
    },
    {
      "source": "/aism/(.*)",
      "destination": "/aism/$1"
    },
    {
      "source": "/aism",
      "destination": "/aism/index.html"
    },
    {
      "source": "/(.*)",
      "destination": "/aism/index.html"
    }
  ]
}
```

**What this does:**
- ✅ API requests (`/aism/api/*`) → Proxy to Render backend
- ✅ Static assets (`/aism/assets/*`) → Serve from build
- ✅ Root path (`/aism`) → Serve index.html
- ✅ Catch-all (`/*`) → Serve index.html for SPA routing

## 🔧 Manual Commit Required

Git is not installed on your system. Here are your options:

### Option 1: GitHub Web Interface (Recommended)

1. **Go to your GitHub repository**
2. **Navigate to the root directory**
3. **Find and edit `vercel.json`**
4. **Replace the entire content with:**

```json
{
  "rewrites": [
    {
      "source": "/aism/api/:path*",
      "destination": "https://aism-vc3k.onrender.com/api/:path*"
    },
    {
      "source": "/aism/(.*)",
      "destination": "/aism/$1"
    },
    {
      "source": "/aism",
      "destination": "/aism/index.html"
    },
    {
      "source": "/(.*)",
      "destination": "/aism/index.html"
    }
  ]
}
```

5. **Commit message**: "Update vercel.json with correct Render URL and SPA routing"
6. **Commit changes**

### Option 2: Install Git

1. **Download Git**: https://git-scm.com/download/win
2. **Install with default settings**
3. **Restart terminal**
4. **Run these commands:**

```bash
cd C:\Users\daksh\AISM-Portal
git init
git add .
git commit -m "Update vercel.json with correct Render URL and SPA routing"
git remote add origin https://github.com/YOUR_USERNAME/aism-portal.git
git push -u origin main
```

### Option 3: GitHub Desktop

1. **Download GitHub Desktop**: https://desktop.github.com/
2. **Open your repository**
3. **You'll see the vercel.json change**
4. **Commit with message**: "Update vercel.json with correct Render URL and SPA routing"
5. **Push to GitHub**

## 🚀 After Deployment

Once you push to GitHub:

1. **Vercel will automatically redeploy**
2. **API calls will go to** `https://aism-vc3k.onrender.com`
3. **SPA routing will work correctly**
4. **All navigation will function properly**

## 🔍 Testing Checklist

After deployment, test:
- ✅ API calls work (authentication, data fetching)
- ✅ Navigation between pages works
- ✅ Direct URLs work (e.g., /aism/background)
- ✅ Browser refresh works on any page
- ✅ Admin login works with both accounts
- ✅ Delegate login works with fuzzy matching

---

**Recommendation: Use GitHub Web Interface for the quickest solution.**