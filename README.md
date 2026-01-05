# Task Management Application - MERN Stack

A full-stack Task Management Application built with the MERN stack (MongoDB/PostgreSQL, Express, React, Node.js) featuring JWT authentication, CRUD operations, and data visualization with Chart.js.

## Features

- ✅ User Authentication (Register/Login) with JWT
- ✅ Protected API routes
- ✅ Full CRUD operations for tasks
- ✅ Task status management (Todo, In Progress, Completed)
- ✅ Dashboard with Chart.js visualizations
- ✅ Responsive UI with modern design
- ✅ Error handling and form validations
- ✅ Loading indicators
- ✅ State management with Redux Toolkit

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT (JSON Web Tokens)
- bcryptjs for password hashing
- express-validator for input validation

### Frontend
- React 18
- Redux Toolkit for state management
- React Router for navigation
- Chart.js & react-chartjs-2 for data visualization
- Axios for API calls

## Project Structure

```
task-management-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Tasks/
│   │   │   └── Layout/
│   │   ├── store/
│   │   │   └── slices/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database (or use free services like Supabase)
- npm or yarn

### Database Setup

1. **Using Supabase (Recommended for free hosting):**
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Get your database credentials from Project Settings > Database
   - Note down: Host, Database name, User, Password, Port

2. **Using Local PostgreSQL:**
   - Install PostgreSQL
   - Create a new database
   - Note your connection details

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
DB_SSL=true
```

**For Supabase:**
- `DB_HOST`: Your Supabase project host (e.g., `db.xxxxx.supabase.co`)
- `DB_PORT`: 5432
- `DB_NAME`: `postgres`
- `DB_USER`: `postgres`
- `DB_PASSWORD`: Your database password
- `DB_SSL`: `true`

4. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks (Protected - requires JWT token)
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/stats` - Get task statistics
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Request Format
All protected routes require an Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Deployment

### Backend Deployment (Railway, Render, or Heroku)

1. **Railway:**
   - Create a new project on Railway
   - Connect your GitHub repository
   - Add environment variables
   - Deploy

2. **Render:**
   - Create a new Web Service
   - Connect your repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables

### Frontend Deployment (Vercel)

1. **Vercel:**
   - Install Vercel CLI: `npm i -g vercel`
   - Navigate to frontend directory
   - Run: `vercel`
   - Update `.env` with your backend API URL
   - Redeploy

2. **Alternative - Netlify:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variables

### Environment Variables for Production

**Backend (.env):**
```env
PORT=5000
DB_HOST=your-production-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
JWT_SECRET=your-production-secret-key
NODE_ENV=production
DB_SSL=true
```

**Frontend (.env):**
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Usage

1. **Register/Login:**
   - Create a new account or login with existing credentials
   - JWT token is automatically stored and used for authenticated requests

2. **Dashboard:**
   - View task statistics
   - See visual charts (Doughnut and Bar charts) showing task distribution

3. **Tasks:**
   - Create new tasks with title and status
   - Edit existing tasks
   - Delete tasks
   - Filter and manage your tasks

## Screenshots

The application includes:
- Modern, responsive login/register pages
- Dashboard with statistics cards and charts
- Task management interface with CRUD operations
- Clean, user-friendly UI

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please create an issue in the GitHub repository.

---

**Note:** Make sure to update the `.env` files with your actual database credentials and API URLs before deploying.
