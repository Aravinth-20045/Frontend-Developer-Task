# Pre-Deployment Checklist

Use this checklist to ensure everything is ready before deployment.

## Backend Setup
- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] `.env` file created with database credentials
- [ ] Database connection tested locally
- [ ] Backend server starts without errors
- [ ] API endpoints respond correctly
- [ ] JWT authentication works
- [ ] CORS configured properly

## Frontend Setup
- [ ] Frontend dependencies installed (`npm install` in frontend folder)
- [ ] `.env` file created with API URL
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Frontend runs locally without errors
- [ ] Login/Register pages work
- [ ] Dashboard displays correctly
- [ ] Charts render properly
- [ ] Task CRUD operations work

## Database
- [ ] Database created (Supabase or local PostgreSQL)
- [ ] Connection credentials verified
- [ ] Tables created automatically by Sequelize
- [ ] Can create users and tasks

## Testing
- [ ] User registration works
- [ ] User login works
- [ ] JWT token stored correctly
- [ ] Protected routes redirect when not authenticated
- [ ] Can create tasks
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] Can change task status
- [ ] Dashboard shows correct statistics
- [ ] Charts update when tasks change

## Deployment Preparation
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] `.env` files added to `.gitignore`
- [ ] Environment variables documented
- [ ] Backend deployment platform chosen (Railway/Render)
- [ ] Frontend deployment platform chosen (Vercel)
- [ ] Database hosting set up (Supabase)

## Production Environment Variables

### Backend
- [ ] `PORT` set
- [ ] `DB_HOST` set (Supabase host)
- [ ] `DB_PORT` set (5432)
- [ ] `DB_NAME` set (postgres)
- [ ] `DB_USER` set (postgres)
- [ ] `DB_PASSWORD` set (Supabase password)
- [ ] `JWT_SECRET` set (strong random string)
- [ ] `NODE_ENV` set to `production`
- [ ] `DB_SSL` set to `true`

### Frontend
- [ ] `REACT_APP_API_URL` set to backend production URL

## Post-Deployment
- [ ] Backend URL accessible
- [ ] Frontend URL accessible
- [ ] Can register new user on production
- [ ] Can login on production
- [ ] Can create tasks on production
- [ ] Dashboard works on production
- [ ] Charts display on production
- [ ] No console errors
- [ ] Mobile responsive design works

## Documentation
- [ ] README.md updated
- [ ] Deployment instructions clear
- [ ] Environment variables documented
- [ ] API endpoints documented

---

**Once all items are checked, you're ready to deploy! 🚀**
