# Free Deployment Guide for dakshwadekar.com/aism

## Platform: Render.com (Free Tier)

Render.com offers free hosting for:
- Web services (Node.js backend)
- PostgreSQL database
- Static sites (frontend)

---

## Step 1: Create Render.com Account

1. Go to https://render.com
2. Sign up with GitHub/GitLab/Google account
3. Verify your email address

---

## Step 2: Prepare Your Application

### 2.1 Update Package.json for Production

Update `artifacts/api-server/package.json` to add start script:

```json
{
  "scripts": {
    "start": "node dist/index.mjs"
  }
}
```

### 2.2 Create .env.production File

Create `.env.production` in your project root:

```env
DATABASE_URL=your-render-database-url-here
PORT=5000
SESSION_SECRET=generate-secure-random-string
MASTER_ADMIN_ID=dakshwadekar
MASTER_ADMIN_PASSWORD=AISM@0809
NODE_ENV=production
```

### 2.3 Create render.yaml for Render Deployment

Create `render.yaml` in project root:

```yaml
services:
  - type: web
    name: aism-api
    env: node
    buildCommand: cd artifacts/api-server && npm install && npm run build
    startCommand: cd artifacts/api-server && node dist/index.mjs
    envVars:
      - key: PORT
        value: 5000
      - key: NODE_ENV
        value: production

databases:
  - name: aism-db
    databaseName: file_recreator
    user: aism_user
```

---

## Step 3: Deploy Backend & Database to Render

### 3.1 Push Code to GitHub

1. Create a new GitHub repository
2. Push your AISM-Portal code to GitHub
3. Make sure to exclude `.env` file (it's already in .gitignore)

### 3.2 Connect Render to GitHub

1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Select the AISM-Portal repository

### 3.3 Configure Backend Service

**Build & Deploy Settings:**
- **Name**: aism-api
- **Environment**: Node
- **Build Command**: `cd artifacts/api-server && npm install && npm run build`
- **Start Command**: `cd artifacts/api-server && node dist/index.mjs`
- **Branch**: main

**Environment Variables:**
- `PORT`: 5000
- `NODE_ENV`: production
- `SESSION_SECRET`: (generate secure random string)
- `MASTER_ADMIN_ID`: dakshwadekar
- `MASTER_ADMIN_PASSWORD`: AISM@0809

### 3.4 Add PostgreSQL Database

1. In Render dashboard, click "New +"
2. Select "PostgreSQL"
3. **Name**: aism-db
4. **Database**: file_recreator
5. **User**: aism_user
6. Select Free tier

### 3.5 Connect Database to Backend

1. Go to your aism-api service in Render
2. Scroll to "Environment Variables"
3. Add `DATABASE_URL` variable
4. Copy the "Internal Database URL" from your PostgreSQL service
5. Paste it as the value for `DATABASE_URL`

---

## Step 4: Run Database Migrations on Render

### 4.1 Create Migration Script

Create `scripts/render-migrate.cjs`:

```javascript
const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

const createDelegatesTable = `
  CREATE TABLE IF NOT EXISTS delegates (
    id SERIAL PRIMARY KEY, 
    portfolio TEXT NOT NULL, 
    phone_number TEXT, 
    email TEXT, 
    category TEXT NOT NULL, 
    role TEXT NOT NULL
  )
`;

const createScoresTable = `
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
  )
`;

pool.query(createDelegatesTable)
  .then(() => pool.query(createScoresTable))
  .then(() => {
    console.log('Tables created successfully');
    pool.end();
  })
  .catch(err => {
    console.error('Error creating tables:', err.message);
    pool.end();
  });
```

### 4.2 Run Migration via Render Shell

1. Go to your PostgreSQL service in Render
2. Click "Shell" (if available) or use external tool
3. Connect using the database URL
4. Run the migration commands

### 4.3 Seed Database

Update `scripts/seed-delegates.ts` to use Render database URL and run it:

```bash
# Add DATABASE_URL to environment first
DATABASE_URL=your-render-db-url tsx scripts/seed-delegates.ts
```

---

## Step 5: Deploy Frontend to Vercel (Free)

### 5.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 5.2 Update Frontend for Production

Update `artifacts/aism-guide/vite.config.ts`:

```javascript
export default defineConfig({
  base: '/aism/',
  // ... existing config
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://your-api-service.onrender.com',
        changeOrigin: true,
      },
    },
  },
});
```

### 5.3 Build Frontend

```bash
cd C:\Users\daksh\AISM-Portal
pnpm --filter @workspace/aism-guide run build
```

### 5.4 Deploy to Vercel

```bash
cd artifacts/aism-guide/dist/public
vercel
```

Follow the prompts:
- **Set up and deploy**: Y
- **Scope**: Your account
- **Link to existing project**: N
- **Project name**: aism-portal
- **Directory**: ./ (current)
- **Override settings**: N

Vercel will give you a URL like: `https://aism-portal.vercel.app`

---

## Step 6: Configure Namecheap DNS

### 6.1 Get Vercel DNS Settings

1. Go to Vercel dashboard
2. Select your aism-portal project
3. Go to Settings → Domains
4. Add custom domain: `dakshwadekar.com`
5. Vercel will show DNS records to add

### 6.2 Update Namecheap DNS

1. Log in to Namecheap
2. Go to Domain List → dakshwadekar.com
3. Click "Manage" next to the domain
4. Go to "Advanced DNS"
5. Delete existing records (except NS records)
6. Add these records:

**A Record:**
- **Type**: A
- **Host**: @
- **Value**: 76.76.21.21 (Vercel's IP)
- **TTL**: Automatic

**CNAME Record:**
- **Type**: CNAME
- **Host**: www
- **Value**: cname.vercel-dns.com
- **TTL**: Automatic

**Subdomain for API:**
- **Type**: CNAME
- **Host**: api
- **Value**: your-api-service.onrender.com
- **TTL**: Automatic

### 6.3 Update Frontend API URL

Update `artifacts/aism-guide/src/App.tsx` to use production API:

```javascript
// Change all fetch calls from '/api/...' to 'https://api.dakshwadekar.com/api/...'
```

Or configure Vercel to proxy the API requests.

---

## Step 7: Alternative: Single Domain Setup

If you want everything on `dakshwadekar.com/aism`:

### 7.1 Deploy Backend to Render

Get your Render API URL: `https://aism-api.onrender.com`

### 7.2 Deploy Frontend to Vercel

Configure Vercel to serve from `/aism/` path.

### 7.3 Configure Vercel Rewrites

Create `vercel.json` in project root:

```json
{
  "rewrites": [
    {
      "source": "/aism/api/:path*",
      "destination": "https://aism-api.onrender.com/api/:path*"
    },
    {
      "source": "/aism/:path*",
      "destination": "/:path*"
    }
  ]
}
```

### 7.4 Update Namecheap DNS

Point `dakshwadekar.com` to Vercel.

---

## Step 8: SSL Configuration

Both Render and Vercel provide automatic SSL certificates:
- **Render**: Automatic SSL for all services
- **Vercel**: Automatic SSL for all domains
- **Namecheap**: SSL is handled by the platforms

---

## Step 9: Testing

### 9.1 Test Backend
```bash
curl https://aism-api.onrender.com/api/health
```

### 9.2 Test Frontend
Visit: `https://dakshwadekar.com/aism/`

### 9.3 Test Authentication
- Admin: dakshwadekar / AISM@0809
- Delegate: SMT. DROUPADI MURMU / 911234567890

---

## Alternative: Netlify + Render

If you prefer Netlify instead of Vercel:

### Frontend on Netlify

1. Create Netlify account
2. Drag and drop `artifacts/aism-guide/dist/public` folder
3. Configure domain settings
4. Set up redirects in `_redirects` file:

```
/api/* https://aism-api.onrender.com/api/:splat 200
/* /aism/index.html 200
```

---

## Cost Summary

- **Render.com**: Free (backend + database)
- **Vercel/Netlify**: Free (frontend)
- **Namecheap**: Domain cost only (~$10/year)

**Total Cost: ~$10/year (domain only)**

---

## Limitations of Free Tier

- **Render**: 
  - Services spin down after 15 min inactivity
  - Cold start ~30 seconds
  - 512MB RAM limit
  - Limited bandwidth

- **Vercel**:
  - 100GB bandwidth/month
  - Serverless functions limits
  - Build time limits

For production use, consider upgrading to paid tiers.

---

## Maintenance

### Monitor Usage
- Check Render dashboard for service status
- Monitor Vercel analytics
- Watch database storage limits

### Backups
- Render doesn't auto-backup free databases
- Export database regularly:
  ```bash
  pg_dump $DATABASE_URL > backup.sql
  ```

### Updates
- Push code changes to GitHub
- Render auto-deploys on push
- Vercel auto-deploys on push

---

## Troubleshooting

### Service Not Starting
- Check Render logs
- Verify environment variables
- Ensure build command works locally

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database is running
- Test connection locally

### Domain Not Resolving
- Check DNS propagation (can take 24-48 hours)
- Verify DNS records in Namecheap
- Check Vercel domain settings

---

## Quick Start Commands

```bash
# Local testing
cd C:\Users\daksh\AISM-Portal
pnpm --filter @workspace/aism-guide run dev
pnpm --filter @workspace/api-server run dev

# Build for production
pnpm --filter @workspace/aism-guide run build
pnpm --filter @workspace/api-server run build

# Deploy to Vercel
cd artifacts/aism-guide/dist/public
vercel
```

---

**Next Steps:**
1. Create Render.com account
2. Push code to GitHub
3. Deploy backend to Render
4. Set up PostgreSQL on Render
5. Deploy frontend to Vercel
6. Configure Namecheap DNS
7. Test complete deployment