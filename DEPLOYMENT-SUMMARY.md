# AISM Portal - Setup Complete ✅

## Current Status

### ✅ Completed Tasks
1. **PostgreSQL Database Setup**
   - Database: `file_recreator` created locally
   - Tables: `delegates` and `delegate_scores` created
   - Data: 113 delegates seeded successfully

2. **Authentication System**
   - Server-side session management implemented
   - Delegate login: Portfolio + Phone Number
   - Admin login: Master ID + Password
   - Secure session cookies with 24-hour expiration

3. **Application Configuration**
   - Frontend: React + Vite + Tailwind CSS
   - Backend: Express 5 + TypeScript
   - Database: PostgreSQL with Drizzle ORM
   - API proxy configured for development

4. **Production Build**
   - Frontend built: `artifacts/aism-guide/dist/public/`
   - Backend built: `artifacts/api-server/dist/`

---

## Local Development (Current Setup)

### Access URLs
- **Frontend**: http://localhost:5173/aism/
- **Backend API**: http://localhost:5000

### Start Commands
```bash
# Terminal 1 - Frontend
cd C:\Users\daksh\AISM-Portal
pnpm --filter @workspace/aism-guide run dev

# Terminal 2 - Backend
cd C:\Users\daksh\AISM-Portal
pnpm --filter @workspace/api-server run dev
```

### Test Credentials
**Admin Login:**
- Master ID: `dakshwadekar`
- Password: `AISM@0809`

**Delegate Login:**
- Portfolio: `SMT. DROUPADI MURMU`
- Phone Number: `911234567890`

---

## Production Deployment

The application is ready for deployment to `dakshwadekar.com/aism`.

### Deployment Options

#### Option 1: VPS Deployment (Recommended)
- Deploy both database and backend to VPS
- Serve static frontend files with Nginx
- Full control over infrastructure
- See `DEPLOYMENT-GUIDE.md` for detailed instructions

#### Option 2: Cloud Deployment
- Use cloud database (Supabase/Neon)
- Deploy backend to Vercel/Railway
- Deploy frontend to Vercel/Netlify
- Easier setup, recurring costs

#### Option 3: Traditional Hosting
- Upload to existing web hosting
- Requires database setup on hosting provider
- May have performance limitations

---

## Key Files

### Application Files
- Frontend source: `artifacts/aism-guide/src/`
- Backend source: `artifacts/api-server/src/`
- Database schema: `lib/db/src/schema/`
- Seed data: `scripts/seed-delegates.ts`

### Configuration Files
- Environment: `.env` (contains database credentials)
- Frontend config: `artifacts/aism-guide/vite.config.ts`
- Backend config: `artifacts/api-server/src/app.ts`
- Database config: `lib/db/drizzle.config.ts`

### Build Output
- Frontend build: `artifacts/aism-guide/dist/public/`
- Backend build: `artifacts/api-server/dist/`

---

## Database Schema

### Delegates Table
```sql
CREATE TABLE delegates (
  id SERIAL PRIMARY KEY,
  portfolio TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  category TEXT NOT NULL,
  role TEXT NOT NULL
);
```

### Delegate Scores Table
```sql
CREATE TABLE delegate_scores (
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

---

## API Endpoints

### Authentication
- `POST /api/auth/login/delegate` - Delegate login
- `POST /api/auth/login/admin` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/status` - Check authentication status

### Scores (Admin Only)
- `GET /api/scores/` - Get all delegate scores
- `GET /api/scores/:delegateId` - Get specific delegate score
- `PUT /api/scores/:delegateId` - Update delegate score

### Health
- `GET /api/health` - Health check

---

## Security Features

✅ Server-side session management (not localStorage)
✅ HTTP-only cookies for session storage
✅ Password/phone number normalization
✅ Input validation and sanitization
✅ Protected routes with middleware
✅ Admin-only endpoints with access control
✅ CORS configuration
✅ SQL injection protection (via Drizzle ORM)

---

## Next Steps for Production

1. **Choose deployment method** (VPS recommended)
2. **Set up production database** (cloud or VPS)
3. **Configure production environment variables**
4. **Deploy backend and frontend**
5. **Set up SSL/HTTPS**
6. **Configure domain DNS**
7. **Test authentication in production**
8. **Set up monitoring and backups**

---

## Support & Documentation

- **Deployment Guide**: `DEPLOYMENT-GUIDE.md`
- **Original README**: `README.md`
- **Database Schema**: `lib/db/src/schema/index.ts`
- **API Routes**: `artifacts/api-server/src/routes/`

---

## Important Notes

1. **Security**: Change default passwords and SESSION_SECRET in production
2. **Database**: Use strong database password in production
3. **HTTPS**: Always use SSL in production
4. **Backups**: Set up regular database backups
5. **Monitoring**: Monitor application logs and performance
6. **Updates**: Keep dependencies updated for security patches

---

## Quick Reference

### Local Development
```bash
# Start frontend
pnpm --filter @workspace/aism-guide run dev

# Start backend
pnpm --filter @workspace/api-server run dev

# Seed database
tsx scripts/seed-delegates.ts

# Build for production
pnpm --filter @workspace/aism-guide run build
pnpm --filter @workspace/api-server run build
```

### Database Management
```bash
# Connect to PostgreSQL
psql -U postgres -d file_recreator

# View delegates
SELECT * FROM delegates LIMIT 10;

# View scores
SELECT * FROM delegate_scores LIMIT 10;
```

### Troubleshooting
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check running processes
pm2 status

# View logs
pm2 logs aism-api
```

---

**Status**: ✅ Ready for Production Deployment

**Last Updated**: 2026-08-07
**Version**: 1.0.0