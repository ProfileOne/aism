# Update Render Backend URL - Manual Commit Instructions

## ✅ File Updated

I've updated `vercel.json` with the correct Render backend URL:

**Changed from:** `https://aism-api.onrender.com/api/:path*`
**Changed to:** `https://aism-vc3k.onrender.com/api/:path*`

## 🔧 Manual Commit Required

Git is not installed on your system, so you'll need to commit and push this change manually.

### Option 1: Install Git (Recommended)

1. **Download Git**: https://git-scm.com/download/win
2. **Install Git** with default settings
3. **Restart your terminal/command prompt**
4. **Then run these commands**:

```bash
cd C:\Users\daksh\AISM-Portal
git init
git add .
git commit -m "Update Render backend URL to aism-vc3k.onrender.com"
git remote add origin https://github.com/YOUR_USERNAME/aism-portal.git
git push -u origin main
```

### Option 2: Use GitHub Desktop

1. **Download GitHub Desktop**: https://desktop.github.com/
2. **Clone your repository** (if not already done)
3. **Open the repository in GitHub Desktop**
4. **You'll see the changes** to vercel.json
5. **Commit the changes** with message: "Update Render backend URL to aism-vc3k.onrender.com"
6. **Push to GitHub**

### Option 3: Use Web Interface

1. **Go to your GitHub repository**
2. **Click "Upload files"**
3. **Drag and drop the updated `vercel.json` file**
4. **Add commit message**: "Update Render backend URL to aism-vc3k.onrender.com"
5. **Commit changes**

## 🚀 After Pushing

Once you push the changes to GitHub:

1. **Vercel will automatically detect the change**
2. **Vercel will automatically redeploy** with the new configuration
3. **Your API calls will now point to the correct backend**: `https://aism-vc3k.onrender.com`

## 📋 What Changed

**File:** `vercel.json`

**Line 5:**
```json
"destination": "https://aism-vc3k.onrender.com/api/:path*"
```

This ensures that API requests from your frontend at `dakshwadekar.com/aism/` are correctly proxied to your Render backend at `aism-vc3k.onrender.com`.

## 🔍 Verification

After deployment, test:
- Visit: `https://dakshwadekar.com/aism/`
- Try logging in with admin credentials
- Check browser console for any API errors
- API calls should now go to `https://aism-vc3k.onrender.com/api/...`

---

**Recommendation: Install Git for easier future updates.**