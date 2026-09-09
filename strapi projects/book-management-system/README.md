# Book Management System

This workspace contains two applications:

```text
book-management-system/
  backend/     Strapi 5 API and MySQL configuration
  frontend/    React/Vite application
```

## Backend

The Strapi project is located at [`backend/`](backend/). Its environment file is [`backend/.env`](backend/.env).

```powershell
cd backend
npm install
npm run develop
```

The API runs at `http://localhost:1337` by default.

## Frontend

The React application is located at [`frontend/`](frontend/). Configure its API URL in [`frontend/.env`](frontend/.env):

```env
VITE_API_URL=http://localhost:1337/api
```

Then run:

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

## Build Validation

```powershell
cd backend
npm run build

cd ..\frontend
npm run build
```

The backend uses the existing MySQL database configuration and Strapi Users & Permissions authentication. See [`backend/README.md`](backend/README.md) for the original Strapi documentation.