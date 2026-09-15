# School Management System Frontend

A modern, responsive React + Tailwind CSS dashboard application designed to manage Teachers, Students, and Subjects, seamlessly integrated with a Strapi v5 backend REST API.

## Features

- **Dynamic CRUD Operations**: Full Create, Read, Update, and Delete operations for Teachers, Students, and Subjects.
- **Instant UI Synchronization**: Powered by **TanStack React Query v5**, triggering `invalidateQueries` upon every mutation so new and modified records appear instantaneously without manual browser refresh.
- **Relational Data Mapping**:
  - **Teachers**: Assigned 1:1 with Subjects and many:many with enrolled Students.
  - **Students**: Enrolled in multiple Subjects and assigned multiple Teachers.
  - **Subjects**: Linked to designated faculty lead and displays live enrollment counts.
- **Robust Strapi v5 Support**: Uses custom normalizers supporting Strapi v5 flattened document responses and `documentId` handling.
- **Responsive Admin UI**:
  - Collapsible mobile-friendly sidebar and top header.
  - Interactive modal dialogs with backdrop blur and form validations.
  - Multi-select badges and searchable dropdown filters.
  - Reusable component library (`Card`, `Modal`, `Input`, `Select`, `Button`, `LoadingSpinner`, `EmptyState`, `ConfirmDeleteDialog`).

## Getting Started

### 1. Ensure Backend is Running
The Strapi backend should be listening on port `1337`:
```bash
cd ../school-backend
npm run develop
```
API endpoints will be served at `http://localhost:1337/api`.

### 2. Start the Frontend Development Server
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

## Directory Structure
```
school-frontend/
├── src/
│   ├── api/             # Axios instance and entity API modules
│   │   ├── axios.js
│   │   ├── teachersApi.js
│   │   ├── studentsApi.js
│   │   └── subjectsApi.js
│   ├── components/      # Reusable UI component library
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── ConfirmDeleteDialog.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Input.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   └── Select.jsx
│   ├── hooks/           # TanStack React Query hooks with cache invalidation
│   │   ├── useTeachers.js
│   │   ├── useStudents.js
│   │   └── useSubjects.js
│   ├── layouts/         # Dashboard layout, Sidebar, and Header
│   │   ├── DashboardLayout.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── pages/           # Application views
│   │   ├── OverviewPage.jsx
│   │   ├── TeachersPage.jsx
│   │   ├── StudentsPage.jsx
│   │   └── SubjectsPage.jsx
│   ├── utils/           # Strapi v5 response normalizer
│   │   └── strapiNormalize.js
│   ├── App.jsx          # Route configuration & QueryClientProvider
│   └── main.jsx
```
