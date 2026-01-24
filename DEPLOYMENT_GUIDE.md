# Deployment Guide: Fixing Admin Login on Netlify

## 🚨 Current Issue

**Problem**: Admin login doesn't work on Netlify because Netlify only hosts static files (your React frontend). The Express backend with authentication is not running.

**What's Missing on Netlify**:
- `/api/login` endpoint
- Express server
- Session management
- Database connections
- Authentication middleware

## ✅ Solution: Deploy Full-Stack to Railway

Railway can host your entire application (frontend + backend) together.

### Step-by-Step Deployment

#### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

#### 2. Deploy to Railway

1. Visit https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select repository: `manishks2901/test`
6. Railway will auto-detect Node.js and start building

#### 3. Add Environment Variables

In Railway dashboard, go to **Variables** tab and add:

```
DATABASE_URL=postgresql://neondb_owner:npg_kd3Jl1BFyzRx@ep-divine-wave-ad32d1kd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
SESSION_SECRET=your-secure-random-secret-here
NODE_ENV=production
ENABLE_LOCAL_AUTH=true
LOCAL_ADMIN_ID=admin-001
LOCAL_ADMIN_EMAIL=admin@wadhwa.co
```

**Important**: Generate a new `SESSION_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 4. Configure Build Settings

Railway should auto-detect, but verify in **Settings**:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Watch Paths**: `/`

#### 5. Get Your Railway URL

After deployment completes:
1. Go to **Settings** → **Domains**
2. Click "Generate Domain"
3. You'll get a URL like: `https://your-app.up.railway.app`

#### 6. Test Admin Login

1. Visit: `https://your-app.up.railway.app/api/login`
2. Should redirect to homepage (logged in)
3. Visit: `https://your-app.up.railway.app/admin`
4. Should see admin dashboard

### Alternative: Keep Netlify for Frontend

If you want to keep Netlify for the frontend:

1. Deploy backend only to Railway
2. Update frontend API calls to point to Railway backend
3. Configure CORS on backend to allow Netlify domain

This is more complex and not recommended for this setup.

## 🔒 Security Checklist

Before going live:

- [ ] Change `SESSION_SECRET` to a strong random value
- [ ] Update `LOCAL_ADMIN_EMAIL` to your actual email
- [ ] Verify `DATABASE_URL` is correct
- [ ] Enable HTTPS (Railway does this automatically)
- [ ] Test all admin functions
- [ ] Set up custom domain (optional)

## 📊 Cost Comparison

**Railway**:
- Free tier: $5/month credit
- Hobby plan: $5/month
- Includes: Backend + Frontend + Database hosting

**Netlify (Current)**:
- Free tier: Static hosting only
- Cannot run Express backend
- Would need separate backend hosting anyway

**Recommendation**: Use Railway for everything, remove Netlify deployment.

## 🆘 Troubleshooting

### Build Fails
- Check Railway logs in dashboard
- Verify `package.json` scripts are correct
- Ensure all dependencies are in `dependencies` not `devDependencies`

### Admin Login Still Doesn't Work
- Check environment variables are set correctly
- Verify `ENABLE_LOCAL_AUTH=true` is set
- Check Railway logs for errors
- Test `/api/login` endpoint directly

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if Neon database is accessible
- Ensure SSL mode is configured correctly

## 📞 Need Help?

1. Check Railway logs: Dashboard → Deployments → View Logs
2. Test endpoints: Use browser or Postman
3. Verify environment variables: Dashboard → Variables

## Next Steps

1. Deploy to Railway following steps above
2. Test admin login on Railway URL
3. If working, remove Netlify deployment
4. (Optional) Add custom domain to Railway
