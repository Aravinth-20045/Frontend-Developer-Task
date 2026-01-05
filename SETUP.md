# Quick Setup Guide

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd task-management-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskdb
DB_USER=postgres
DB_PASSWORD=your-local-password
JWT_SECRET=your-local-secret-key
NODE_ENV=development
DB_SSL=false
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## First Time Usage

1. Open http://localhost:3000
2. Click "Register" to create an account
3. Login with your credentials
4. Start creating tasks!

## Testing the API

You can test the API using Postman or curl:

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Tasks (replace TOKEN with your JWT token)
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

## Common Issues

### Database Connection Error
- Ensure PostgreSQL is running
- Check your database credentials in `.env`
- Verify the database exists

### Port Already in Use
- Change PORT in backend/.env
- Update REACT_APP_API_URL in frontend/.env accordingly

### CORS Errors
- Ensure backend is running
- Check REACT_APP_API_URL matches your backend URL
