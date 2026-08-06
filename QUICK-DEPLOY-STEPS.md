# Quick Deployment Steps - dakshwadekar.com/aism

## 🚀 30-Minute Free Deployment Guide

### Prerequisites
- GitHub account
- Render.com account (free)
- Vercel account (free)
- Namecheap domain (already have)

---

## Step 1: Prepare Code (5 minutes)

### 1.1 Create GitHub Repository
```bash
cd C:\Users\daksh\AISM-Portal
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/aism-portal.git
git push -u origin main
```

### 1.2 Verify Files
Ensure these files exist:
- ✅ `render.yaml` (created)
- ✅ `vercel.json` (created)
- ✅ `.gitignore` (already exists)
- ✅ `artifacts/api-server/package.json` (updated)

---

## Step 2: Deploy Backend to Render (10 minutes)

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"

### 2.2 Connect Repository
1. Select your aism-portal GitHub repository
2. Click "Connect"

### 2.3 Configure Service
**Name**: aism-api
**Environment**: Node
**Branch**: main
**Root Directory**: (leave empty)
**Build Command**: `cd artifacts/api-server && npm install && npm run build`
**Start Command**: `cd artifacts/api-server && npm run start:prod`

### 2.4 Add Environment Variables
Scroll to "Environment Variables" and add:
- `PORT`: 5000
- `NODE_ENV`: production
- `SESSION_SECRET`: (click "Generate" or enter your own)
- `MASTER_ADMIN_ID`: dakshwadekar
- `MASTER_ADMIN_PASSWORD`: AISM@0809

### 2.5 Create Database
1. Click "New +" → "PostgreSQL"
2. **Name**: aism-db
3. **Database**: file_recreator
4. **User**: aism_user
5. Select "Free" tier
6. Click "Create Database"

### 2.6 Connect Database to API
1. Go back to your aism-api service
2. Scroll to "Environment Variables"
3. Add `DATABASE_URL` variable
4. Copy the "Internal Database URL" from your aism-db service
5. Paste as value

### 2.7 Deploy
Click "Create Web Service" - Render will automatically deploy.

---

## Step 3: Set Up Database (5 minutes)

### 3.1 Run Migration
1. Go to your aism-db service in Render
2. Click "Shell" (or use external tool)
3. Connect using the database credentials
4. Run this SQL:

```sql
CREATE TABLE IF NOT EXISTS delegates (
  id SERIAL PRIMARY KEY, 
  portfolio TEXT NOT NULL, 
  phone_number TEXT, 
  email TEXT, 
  category TEXT NOT NULL, 
  role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS delegate_scores (
  id SERIAL PRIMARY KEY, 
  delegate_id INTEGER NOT NULL REFERENCES delegates(id), 
  day TEXT NOT NULL, 
  attendance TEXT, 
  opening_statement NUMERIC, 
  chits NUMERIC, 
  mod1 NUMERIC, 
  mod2 NUMERIC, 
  mod3 NUMERIC, 
  mod4 NUMERIC, 
  lobbying NUMERIC, 
  solution_paper NUMERIC, 
  updated_at TEXT NOT NULL
);
```

### 3.2 Seed Database
1. Update `scripts/seed-delegates.ts` to use Render DATABASE_URL
2. Run locally with Render database URL:
```bash
DATABASE_URL=postgresql://user:pass@host/db tsx scripts/seed-delegates.ts
```

---

## Step 4: Deploy Frontend to Vercel (5 minutes)

### 4.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### 4.2 Build Frontend Locally
```bash
cd C:\Users\daksh\AISM-Portal
pnpm --filter @workspace/aism-guide run build
```

### 4.3 Deploy to Vercel
```bash
cd artifacts/aism-guide/dist/public
npx vercel
```

Follow prompts:
- Set up and deploy: Y
- Scope: Your username
- Link to existing project: N
- Project name: aism-portal
- Directory: ./
- Override settings: N

### 4.4 Get Vercel URL
Vercel will give you: `https://aism-portal.vercel.app`

---

## Step 5: Configure Domain (5 minutes)

### 5.1 Add Custom Domain in Vercel
1. Go to Vercel dashboard → aism-portal project
2. Settings → Domains → Add
3. Enter: `dakshwadekar.com`
4. Vercel will show DNS records to add

### 5.2 Update Namecheap DNS
1. Log in to Namecheap
2. Domain List → dakshwadekar.com → Manage
3. Advanced DNS
4. Add these records:

**A Record:**
- Type: A
- Host: @
- Value: 76.76.21.21
- TTL: Automatic

**CNAME Record:**
- Type: CNAME
- Host: www
- Value: cname.vercel-dns.com
- TTL: Automatic

### 5.3 Update API URL
1. Note your Render API URL: `https://aism-api.onrender.com`
2. Update `vercel.json` to use this URL

---

## Step 6: Test Deployment

### 6.1 Test Backend
```bash
curl https://aism-api.onrender.com/api/health
```

### 6.2 Test Frontend
Visit: `https://dakshwadekar.com/aism/`

### 6.3 Test Authentication
- Admin: dakshwadekar / AISM@0809
- Delegate: SMT. DROUPADI MURMU / 911234567890

---

## ✅ Complete!

Your AISM Portal is now live at:
- **Frontend**: https://dakshwadekar.com/aism/
- **Backend**: https://aism-api.onrender.com
- **Database**: Render PostgreSQL (free tier)

**Total Cost: $0/month + domain cost**

---

## Troubleshooting

### Render Service Not Starting
- Check Render logs
- Verify build command works locally
- Ensure all dependencies are in package.json

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database is running
- Test connection locally

### Domain Not Working
- DNS propagation can take 24-48 hours
- Verify DNS records in Namecheap
- Check Vercel domain settings

### API Calls Failing
- Update vercel.json with correct Render API URL
- Check CORS settings in backend
- Verify API is accessible

---

## Important Notes

1. **Free Tier Limitations**:
   - Render services spin down after 15 min inactivity
   - Cold start takes ~30 seconds
   - Database storage limited to 1GB

2. **Security**:
   - Change default passwords in production
   - Use strong SESSION_SECRET
   - Enable SSL (automatic on both platforms)

3. **Backups**:
   - Export database regularly
   - Keep code backed up on GitHub

4. **Monitoring**:
   - Check Render dashboard for service status
   - Monitor Vercel analytics
   - Watch database storage limits