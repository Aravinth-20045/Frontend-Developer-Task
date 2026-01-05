# Deployment Guide

This guide will help you deploy the Task Management Application to production.

## Prerequisites

1. GitHub account
2. Vercel account (for frontend)
3. Railway/Render account (for backend)
4. Supabase account (for free PostgreSQL database)

## Step 1: Database Setup (Supabase)

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be set up
4. Go to **Project Settings** > **Database**
5. Copy the following credentials:
   - Host
   - Database name (usually `postgres`)
   - Port (usually `5432`)
   - User (usually `postgres`)
   - Password (you set this during project creation)

## Step 2: Backend Deployment (Railway or Render)

### Option A: Railway

1. Go to [Railway](https://railway.app)
2. Sign up/login with GitHub
3. Click **New Project** > **Deploy from GitHub repo**
4. Select your repository
5. Railway will detect the backend folder automatically
6. Go to **Settings** > **Variables** and add:
   ```
   PORT=5000
   DB_HOST=your-supabase-host
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your-supabase-password
   JWT_SECRET=your-random-secret-key-here
   NODE_ENV=production
   DB_SSL=true
   ```
7. Set the **Root Directory** to `backend` in Settings
8. Deploy!

### Option B: Render

1. Go to [Render](https://render.com)
2. Sign up/login
3. Click **New** > **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name**: task-management-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   ```
   PORT=5000
   DB_HOST=your-supabase-host
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your-supabase-password
   JWT_SECRET=your-random-secret-key-here
   NODE_ENV=production
   DB_SSL=true
   ```
7. Deploy!

**Note:** Copy your backend URL (e.g., `https://your-app.railway.app` or `https://your-app.onrender.com`)

## Step 3: Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Sign up/login with GitHub
3. Click **Add New Project**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build
6. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```
   (Replace with your actual backend URL from Step 2)
7. Deploy!

## Step 4: Update CORS (if needed)

If you encounter CORS errors, update `backend/server.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Register a new account
3. Create some tasks
4. Check the dashboard for statistics

## Troubleshooting

### Backend Issues

- **Database connection failed**: Check your Supabase credentials
- **Port issues**: Ensure PORT is set correctly in environment variables
- **CORS errors**: Update CORS settings in server.js

### Frontend Issues

- **API calls failing**: Verify REACT_APP_API_URL is correct
- **Build errors**: Check that all dependencies are in package.json
- **Routing issues**: Ensure vercel.json is configured correctly

## Quick Links

- [Supabase Dashboard](https://app.supabase.com)
- [Railway Dashboard](https://railway.app/dashboard)
- [Render Dashboard](https://dashboard.render.com)
- [Vercel Dashboard](https://vercel.com/dashboard)

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password
JWT_SECRET=your-secret-key
NODE_ENV=production
DB_SSL=true
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.railway.app/api
```

---

**Remember to keep your JWT_SECRET secure and never commit it to GitHub!**
