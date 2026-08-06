# File-Recreator

This is a monorepo web application originally built using Replit Agent, adapted for local development.

## Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express 5 + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Package Manager**: pnpm workspaces

## Local Setup

### Prerequisites

- Node.js 24 or higher
- pnpm package manager
- PostgreSQL database (optional - see note below)

### Installation

1. Install dependencies:
```bash
cd c:\Users\daksh\File-Recreator\File-Recreator
pnpm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `DATABASE_URL`: PostgreSQL connection string (if using database)
- `PORT`: Frontend port (default: 5173)
- `BASE_PATH`: Base path for routing (default: /aism/)
- `API_PORT`: API server port (default: 5000)
- `SESSION_SECRET`: Secret key for session management (change in production)
- `MASTER_ADMIN_ID`: Master admin username (default: admin)
- `MASTER_ADMIN_PASSWORD`: Master admin password (default: admin123)

### Running the Application

#### Frontend (AISM Guide)
```bash
pnpm --filter @workspace/aism-guide run dev
```

#### Component Preview Server
```bash
pnpm --filter @workspace/mockup-sandbox run dev
```

#### API Server
```bash
pnpm --filter @workspace/api-server run dev
```

### Development Scripts

- `pnpm run typecheck` - Full typecheck across all packages
- `pnpm run build` - Typecheck + build all packages
- `pnpm --filter @workspace/db run push` - Push DB schema changes (if using database)
- `tsx scripts/seed-delegates.ts` - Seed the delegates database with all 113 delegates

## Authentication Setup

The AISM portal now requires authentication to access. There are two ways to log in:

### 1. Delegate Login
- **Portfolio**: The delegate's portfolio name (required)
- **Phone Number**: The delegate's phone number (required)
- **Email**: Optional email field

### 2. Admin Login
- **Master ID**: The master admin username (default: admin)
- **Password**: The master admin password (default: admin123)

### Database Setup

1. **Create PostgreSQL database**: Ensure you have a PostgreSQL database running and set the `DATABASE_URL` in your `.env` file.

2. **Push database schema**:
```bash
pnpm --filter @workspace/db run push
```

3. **Seed delegates database**:
```bash
tsx scripts/seed-delegates.ts
```

This will populate the database with all 113 delegates from the delegation matrix.

### Security Notes

- Change the default `SESSION_SECRET`, `MASTER_ADMIN_ID`, and `MASTER_ADMIN_PASSWORD` in production
- Sessions are stored in HTTP-only cookies with a 24-hour expiration
- Phone numbers are normalized (spaces, dashes, parentheses removed) for comparison
- Portfolio names are normalized (trimmed, uppercase) for comparison
- The login screen provides no specific feedback about which field is incorrect

## Notes

- The database schema is currently empty - no tables are defined
- The application can run without a database for frontend development
- Replit-specific dependencies have been replaced with local equivalents
- Port 5173 is used for the main frontend, 5174 for component previews

## Deployment to dakshwadekar.com/aism

### Build for Production

1. Build the frontend:
```bash
pnpm --filter @workspace/aism-guide run build
```

2. The built files will be in `artifacts/aism-guide/dist/public/`

### Deployment Options

#### Option 1: Static Hosting (Recommended for dakshwadekar.com/aism)

1. Upload the contents of `artifacts/aism-guide/dist/public/` to your web server's `/aism/` directory
2. Configure your web server to handle SPA routing:

**For Apache:**
```apache
<Directory /var/www/html/aism>
    RewriteEngine On
    RewriteBase /aism/
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /aism/index.html [L]
</Directory>
```

**For Nginx:**
```nginx
location /aism/ {
    alias /var/www/html/aism/;
    try_files $uri $uri/ /aism/index.html;
}
```

#### Option 2: Subdirectory with Vite Base Path

The application is already configured with `BASE_PATH=/aism/` in the Vite config, so it will work correctly when deployed to a subdirectory.

### Notes

- For production deployment, ensure your web server is configured to handle client-side routing
- The PDF file needs to be accessible at `/aism/AISM_BG_AAWAAZ_2.0.pdf`
