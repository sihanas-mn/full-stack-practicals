# EduGallery - Complete Course Gallery Platform

A complete, production-grade 3-Tier educational course platform built with **React**, **Tailwind CSS**, **Express API Gateway**, and **Strapi CMS** with **MySQL**.

---

## 🏛️ System Architecture

```
React Frontend (Vite + Tailwind CSS)
        │
        │ HTTP Requests (withCredentials: true)
        ▼
Secure Backend API Gateway (Express.js :5000)
  • Rate Limiting & Helmet Headers
  • HTTP-Only Cookie Authentication
  • Hidden Strapi API Tokens
        │
        │ Internal Service Requests (Bearer STRAPI_API_TOKEN)
        ▼
Strapi CMS Backend (Port :1337)
        │
        │ Knex / Connection Pool
        ▼
MySQL Database (course_gallery_db on :3306)
```

> **Security Rule Enforcement**:
> - The React frontend **never** communicates directly with Strapi.
> - `STRAPI_API_TOKEN` is strictly concealed within the backend API server.
> - Authentication and session handling leverage `HttpOnly`, `SameSite=Strict` cookies.

---

## 📁 Repository Structure

```
course_gallery_site/
├── backend/                    # Strapi CMS (v5) headless backend
│   ├── config/                 # Database & server configurations
│   ├── src/
│   │   ├── api/
│   │   │   ├── course/         # Course content-type schema, routes, controllers
│   │   │   ├── lecturer/       # Lecturer content-type schema, routes, controllers
│   │   │   ├── category/       # Category content-type schema, routes, controllers
│   │   │   └── inquiry/        # Inquiry content-type schema, routes, controllers
│   │   └── index.js            # Auto-bootstrap & seeder
│   └── package.json
│
├── api-server/                 # Express API Gateway (:5000)
│   ├── src/
│   │   ├── config/             # Environment & gateway settings
│   │   ├── controllers/        # Course, Category, Lecturer, Inquiry controllers
│   │   ├── middleware/         # Helmet, CORS, rate limiter, cookie security
│   │   ├── routes/             # /api/public REST endpoints
│   │   ├── services/           # Strapi client & normalization service
│   │   └── index.js            # Express app entrypoint
│   └── package.json
│
├── frontend/                   # React + Vite + Tailwind application (:5173)
│   ├── src/
│   │   ├── api/axios.js        # Axios instance configured with withCredentials: true
│   │   ├── components/         # Navbar, Footer, CourseCard, CategoryCard, etc.
│   │   ├── pages/              # Home, Courses, CourseDetails, Lecturers, Contact
│   │   ├── App.jsx             # Main router & layout
│   │   └── index.css           # Design tokens, glassmorphism & gradients
│   └── package.json
│
├── guide.md                    # Project specification
└── README.md                   # Complete system documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v20+ or v24+
- **MySQL**: MySQL 8.x (e.g., Laragon or standard MySQL service running on port 3306)
- **Database**: `course_gallery_db` (created in MySQL)

### 2. Start Strapi CMS Backend
```bash
cd backend
npm run develop
```
Strapi will launch on `http://localhost:1337`. On first boot, it creates the MySQL tables and seeds initial academic courses, categories, and faculty members.

### 3. Start API Gateway Server
```bash
cd api-server
npm run dev
```
The gateway server will run on `http://localhost:5000`.
- Health Check: `http://localhost:5000/api/health`
- Public Endpoints:
  - `GET /api/public/courses`
  - `GET /api/public/courses/:slug`
  - `GET /api/public/categories`
  - `GET /api/public/lecturers`
  - `POST /api/public/inquiries`

### 4. Start React Frontend
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` to explore the application.

---

## 🔒 Security & Features
- **3-Tier Isolation**: Frontend has zero access to Strapi admin tokens.
- **HTTP-Only Cookies**: Protected against cross-site scripting (XSS) token theft.
- **Rate Limiting**: Defends inquiry endpoints against spam and automated abuse.
- **Modern UI**: Polished glassmorphism, responsive navigation, and accessible forms.
