# Railway Deployment Guide

## Quick Deploy to Railway

### Step 1: Prepare Your Project

1. Make sure all environment variables are documented
2. Ensure `package.json` has the correct start script
3. Push all changes to GitHub

### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository: `manishks2901/test`
6. Railway will automatically detect it's a Node.js app

### Step 3: Configure Environment Variables

Add these environment variables in Railway dashboard:

```
DATABASE_URL=<your-neon-database-url>
SESSION_SECRET=<your-session-secret>
NODE_ENV=production
PORT=3001
ENABLE_LOCAL_AUTH=true
LOCAL_ADMIN_ID=admin-001
LOCAL_ADMIN_EMAIL=admin@wadhwa.co
```

### Step 4: Configure Build Settings

Railway should auto-detect, but verify:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Root Directory**: `/`

### Step 5: Update Frontend API Calls

After deployment, Railway will give you a URL like:
`https://your-app.railway.app`

You'll need to update your frontend to use this URL for API calls.

## Alternative: Deploy Full-Stack to Railway

Instead of splitting frontend/backend:

1. Deploy the entire app to Railway
2. Railway will serve both frontend and backend
3. Remove Netlify deployment
4. Use Railway's domain or add custom domain

This is simpler and keeps everything together!

## Environment Variables Reference

Required for production:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Random secret for sessions
- `NODE_ENV=production`
- `PORT` - Railway auto-assigns this
- `ENABLE_LOCAL_AUTH=true` - For local admin login

Optional:
- `COOKIE_SECURE=true` - For HTTPS
- `LOCAL_ADMIN_ID` - Custom admin ID
- `LOCAL_ADMIN_EMAIL` - Custom admin email
