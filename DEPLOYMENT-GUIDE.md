# AISM Portal Deployment Guide
## Deploy to dakshwadekar.com/aism

### Prerequisites
- VPS with Ubuntu/Debian (recommended 2GB RAM, 20GB storage)
- Domain: dakshwadekar.com
- SSH access to VPS
- Basic knowledge of Linux commands

---

## Step 1: VPS Setup

### 1.1 Update System
```bash
ssh user@your-vps-ip
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Required Software
```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2 for process management
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

### 1.3 Configure PostgreSQL
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE file_recreator;
CREATE USER aism_user WITH PASSWORD 'secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE file_recreator TO aism_user;
\q
```

---

## Step 2: Deploy Application Files

### 2.1 Upload Files to VPS
```bash
# On your local machine, create a zip of the built files
cd C:\Users\daksh\AISM-Portal
# Compress artifacts/api-server/dist and artifacts/aism-guide/dist/public

# Upload to VPS (using SCP or SFTP)
scp -r artifacts/api-server/dist user@your-vps-ip:/var/www/aism-api
scp -r artifacts/aism-guide/dist/public user@your-vps-ip:/var/www/aism-frontend
```

### 2.2 Set Up Directory Structure
```bash
# On VPS
sudo mkdir -p /var/www/aism-api
sudo mkdir -p /var/www/aism-frontend
sudo chown -R $USER:$USER /var/www/aism-api
sudo chown -R $USER:$USER /var/www/aism-frontend
```

---

## Step 3: Database Migration & Seeding

### 3.1 Transfer Database
```bash
# Export local database
pg_dump -U postgres file_recreator > aism_backup.sql

# Upload to VPS
scp aism_backup.sql user@your-vps-ip:/tmp/

# Import on VPS
psql -U aism_user -d file_recreator -f /tmp/aism_backup.sql
```

### 3.2 Or Re-run Migration on VPS
```bash
# On VPS, copy seed script and run
cd /var/www/aism-api
# Copy seed-delegates.ts from local machine
# Install dependencies
npm install
# Run seed script
npx tsx seed-delegates.ts
```

---

## Step 4: Configure Backend

### 4.1 Create Environment File
```bash
# On VPS
cd /var/www/aism-api
nano .env
```

Add the following:
```env
DATABASE_URL=postgresql://aism_user:secure_password_here@localhost:5432/file_recreator
PORT=5000
SESSION_SECRET=generate-secure-random-string-here
MASTER_ADMIN_ID=dakshwadekar
MASTER_ADMIN_PASSWORD=AISM@0809
NODE_ENV=production
```

### 4.2 Install Dependencies
```bash
cd /var/www/aism-api
npm install --production
```

### 4.3 Start Backend with PM2
```bash
pm2 start dist/index.mjs --name aism-api
pm2 save
pm2 startup
```

---

## Step 5: Configure Nginx

### 5.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/aism
```

Add the following configuration:
```nginx
# Upstream for API server
upstream aism_api {
    server 127.0.0.1:5000;
}

# Frontend server
server {
    listen 80;
    server_name dakshwadekar.com;

    # Frontend static files
    location /aism/ {
        alias /var/www/aism-frontend/;
        try_files $uri $uri/ /aism/index.html;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
    }

    # API proxy
    location /api/ {
        proxy_pass http://aism_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5.2 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/aism /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Step 6: Configure Firewall
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

---

## Step 7: SSL/HTTPS Setup (Recommended)

### 7.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 7.2 Obtain SSL Certificate
```bash
sudo certbot --nginx -d dakshwadekar.com
```

### 7.3 Auto-renewal
```bash
sudo certbot renew --dry-run
# Certbot automatically sets up cron job for renewal
```

---

## Step 8: Update Frontend API Configuration

### 8.1 Update API Calls
Since the frontend will be served from the same domain, the API calls should use relative paths:
- Change `fetch('/api/auth/login/delegate')` (no need for full URL)
- The Nginx configuration will proxy `/api/` requests to the backend

---

## Step 9: Testing

### 9.1 Test Backend
```bash
curl http://localhost:5000/api/health
```

### 9.2 Test Frontend
Visit: `http://dakshwadekar.com/aism/`

### 9.3 Test Authentication
- Admin: dakshwadekar / AISM@0809
- Delegate: SMT. DROUPADI MURMU / 911234567890

---

## Step 10: Maintenance

### 10.1 View Logs
```bash
# PM2 logs
pm2 logs aism-api

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 10.2 Restart Services
```bash
# Restart backend
pm2 restart aism-api

# Restart Nginx
sudo systemctl restart nginx
```

### 10.3 Update Application
```bash
# Upload new files
# Restart PM2
pm2 restart aism-api
# Clear cache if needed
sudo systemctl reload nginx
```

---

## Security Notes

1. **Change default passwords** in production
2. **Use strong SESSION_SECRET** (generate with: `openssl rand -base64 32`)
3. **Keep system updated** with security patches
4. **Use firewall** to restrict access
5. **Enable HTTPS** with SSL certificate
6. **Regular backups** of database
7. **Monitor logs** for suspicious activity

---

## Troubleshooting

### Backend not starting
```bash
pm2 logs aism-api
# Check if port 5000 is available
netstat -tlnp | grep 5000
```

### Database connection issues
```bash
# Test database connection
psql -U aism_user -d file_recreator -h localhost
```

### Nginx configuration errors
```bash
sudo nginx -t
# Check logs
sudo tail -f /var/log/nginx/error.log
```

---

## File Locations Summary

- **Backend**: `/var/www/aism-api/`
- **Frontend**: `/var/www/aism-frontend/`
- **Nginx Config**: `/etc/nginx/sites-available/aism`
- **Environment**: `/var/www/aism-api/.env`
- **PM2 Process**: `aism-api`

---

## Quick Deployment Commands Reference

```bash
# SSH into VPS
ssh user@your-vps-ip

# Restart backend
pm2 restart aism-api

# Restart Nginx
sudo systemctl restart nginx

# Check logs
pm2 logs aism-api
sudo tail -f /var/log/nginx/error.log

# Database backup
pg_dump -U aism_user file_recreator > backup.sql

# PM2 status
pm2 status
pm2 monit
```