# Team Task Manager

A full-stack team task management application with role-based access (Admin & Member), JWT authentication, projects, tasks, and a real-time dashboard.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React, Vite, Tailwind CSS           |
| Backend  | Node.js, Express.js (MVC)           |
| Database | MongoDB (Mongoose)                  |
| Auth     | JWT (JSON Web Tokens)               |

## Features

- **Authentication:** Signup, Login, Logout, JWT, protected routes
- **Roles:** Admin, Member
- **Admin:** Create projects, create tasks, assign to members, view all tasks
- **Member:** View assigned tasks, update task status
- **Tasks:** Todo, In Progress, Completed, due date, priority (low/medium/high)
- **Dashboard:** Total, completed, pending, overdue tasks + charts
- **UI:** Responsive layout with sidebar, navbar, cards, and tables

## Project Structure

```
team-task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── userRoutes.js
│   │   └── validators.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   ├── Procfile
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .env.example
├── .gitignore
├── package.json
├── railway.json
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Installation

```bash
cd team-task-manager

# Install all dependencies
npm run install:all

# Configure environment
cp .env.example backend/.env
cp .env.example frontend/.env
# Edit backend/.env with your MongoDB URI and JWT secret
```

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

**Terminal 1 – Backend:**

```bash
npm run dev:backend
```

**Terminal 2 – Frontend:**

```bash
npm run dev:frontend
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

## Quick Start (Demo Accounts)

1. Open http://localhost:5173/signup
2. Create an **Admin** account (select Admin role)
3. Create a **Member** account (use a different email, select Member role)
4. Log in as Admin → create a project → create a task → assign to the member
5. Log in as Member → go to **My Tasks** → update status

## API Endpoints

| Method | Endpoint                  | Access        | Description        |
| ------ | ------------------------- | ------------- | ------------------ |
| POST   | `/api/auth/signup`        | Public        | Register user      |
| POST   | `/api/auth/login`         | Public        | Login              |
| POST   | `/api/auth/logout`        | Private       | Logout             |
| GET    | `/api/auth/me`            | Private       | Current user       |
| GET    | `/api/projects`           | Private       | List projects      |
| POST   | `/api/projects`           | Admin         | Create project     |
| GET    | `/api/tasks/all`          | Admin         | All tasks          |
| GET    | `/api/tasks/my`           | Private       | My assigned tasks  |
| POST   | `/api/tasks`              | Admin         | Create task        |
| PATCH  | `/api/tasks/:id/status`   | Private       | Update status      |
| GET    | `/api/dashboard/stats`    | Private       | Dashboard stats    |
| GET    | `/api/users/members`      | Admin         | List members       |

## Production Build

```bash
npm run build:prod
NODE_ENV=production npm start
```

The backend serves the built frontend from `frontend/dist` when `NODE_ENV=production`.

## Deploy to Railway

### 1. MongoDB

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (free tier works).
2. Add your IP (or `0.0.0.0/0` for Railway) in Network Access.
3. Create a database user and copy the connection string.

### 2. Railway Project

1. Push `team-task-manager` to GitHub (or deploy from folder).
2. Create a new project on [Railway](https://railway.app/).
3. **New Service** → Deploy from GitHub repo (root: `team-task-manager`).
4. Set **Root Directory** to `team-task-manager` if the repo root is parent folder.

### 3. Environment Variables (Railway)

| Variable      | Value                                      |
| ------------- | ------------------------------------------ |
| `PORT`        | (Railway sets automatically)               |
| `MONGODB_URI` | Your Atlas connection string               |
| `JWT_SECRET`  | Strong random secret                       |
| `JWT_EXPIRE`  | `7d`                                       |
| `NODE_ENV`    | `production`                               |
| `CLIENT_URL`  | Your Railway app URL (e.g. `https://...`)  |

### 4. Build & Start

Railway uses `railway.json`:

- **Build:** `npm run build:prod` (installs deps + builds frontend)
- **Start:** `NODE_ENV=production npm start`

### 5. Generate Domain

In Railway → Settings → Networking → **Generate Domain**.

Update `CLIENT_URL` to your Railway URL.

### 6. Verify

Visit `https://your-app.up.railway.app/api/health` — should return success JSON.

## ZIP-Ready

To package for distribution:

```bash
cd team-task-manager
# Exclude node_modules when zipping
```

On Windows PowerShell:

```powershell
Compress-Archive -Path team-task-manager -DestinationPath team-task-manager.zip
```

Exclude `node_modules`, `.env`, and `dist` before zipping (or run `npm run install:all` after unzip).

## License

MIT
