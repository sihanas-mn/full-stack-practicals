====================================================
PROJECT TITLE
====================================================

Build a complete Course Gallery Platform.

The system will allow administrators to manage courses, lecturers, categories, prices, and inquiries through Strapi CMS.

The public website will be built using React + Tailwind CSS.

The backend will use Strapi CMS with MySQL database.

The project must be created in full agentic development mode.

Do not only provide code snippets.

Act as a senior full-stack developer and create the complete working project.



====================================================
TECHNOLOGY STACK
====================================================


Frontend:

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Lucide React


Backend:

- Strapi CMS
- Node.js
- MySQL


Database:

Name:

course_gallery_db



====================================================
PROJECT ARCHITECTURE
====================================================


The system must follow this architecture:


React Frontend

        |

        | HTTPS Requests

        |

Backend API Gateway

        |

        | Secure Server Communication

        |

Strapi CMS API

        |

        |

MySQL Database



IMPORTANT:

React must NOT directly communicate with Strapi.

React only communicates with the backend API.



====================================================
ROOT FOLDER STRUCTURE
====================================================


Create:


course-gallery-platform/


│
├── backend/
│
│   ├── Strapi CMS Project
│   │
│   ├── config/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │
│   │   ├── extensions/
│   │   │
│   │   ├── middlewares/
│   │   │
│   │   └── index.js
│   │
│   ├── .env
│   ├── package.json
│   └── README.md
│
│
├── api-server/
│
│   ├── src/
│   │
│   ├── controllers/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── middleware/
│   │
│   ├── utils/
│   │
│   ├── config/
│   │
│   ├── .env
│   └── package.json
│
│
├── frontend/
│
│   ├── src/
│   │
│   ├── api/
│   │   └── axios.js
│   │
│   ├── components/
│   │
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CourseCard.jsx
│   │   ├── LecturerCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── Pagination.jsx
│   │
│   ├── pages/
│   │
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetails.jsx
│   │   ├── Lecturers.jsx
│   │   └── Contact.jsx
│   │
│   ├── hooks/
│   │
│   ├── context/
│   │
│   ├── routes/
│   │
│   ├── utils/
│   │
│   ├── .env
│   └── package.json
│
└── README.md



====================================================
AGENTIC DEVELOPMENT REQUIREMENTS
====================================================


The coding agent must:


1.

Create all folders.


2.

Initialize backend projects.


3.

Initialize frontend projects.


4.

Install dependencies.


5.

Configure databases.


6.

Create Strapi content types.


7.

Create backend API gateway.


8.

Create React UI.


9.

Connect frontend with backend.


10.

Test complete data flow.



After each milestone:

- Verify installation.
- Verify database connection.
- Verify API response.
- Fix errors before continuing.



====================================================
STRAPI BACKEND
====================================================


Create Strapi project inside:


/backend



Database configuration:


Database:

MySQL


Database Name:

course_gallery_db


Host:

localhost


Port:

3306



====================================================
STRAPI CONTENT TYPES
====================================================



1. COURSE COLLECTION TYPE

Name:

Course



Fields:


course_title

Type:

Text



slug

Type:

UID



course_code

Type:

Text



short_description

Type:

Long Text



full_description

Type:

Rich Text



course_thumbnail

Type:

Media Image



course_banner

Type:

Media Image



category

Relation:

Many Courses belongs to One Category



lecturer

Relation:

Many Courses belongs to One Lecturer



price

Type:

Decimal



discount_price

Type:

Decimal



currency

Enumeration:


LKR

USD



duration

Text


Example:

6 Months



lesson_count

Number



course_level

Enumeration:


Beginner

Intermediate

Advanced



delivery_mode

Enumeration:


Online

Physical

Hybrid



start_date

Date



end_date

Date



requirements

Rich Text



what_you_learn

Rich Text



certification

Boolean



featured_course

Boolean



status

Enumeration:


Draft

Published

Upcoming



seo_title

Text



seo_description

Long Text




====================================================
LECTURER COLLECTION TYPE
====================================================


Name:

Lecturer



Fields:


name

Text



profile_image

Media



designation

Text



bio

Rich Text



qualification

Rich Text



experience_years

Number



specialization

Text



email

Email



linkedin

URL



active_status

Boolean




====================================================
CATEGORY COLLECTION TYPE
====================================================


Name:

Category



Fields:


name

Text



description

Long Text



image

Media



slug

UID




====================================================
INQUIRY COLLECTION TYPE
====================================================


Name:

Inquiry



Fields:


full_name

Text



email

Email



phone

Text



course

Relation:

Many inquiries belong to one course



message

Long Text



created_at

Auto timestamp




====================================================
DATABASE STRUCTURE
====================================================


Database:


course_gallery_db



Tables:


courses


id

course_title

slug

course_code

short_description

full_description

price

discount_price

currency

duration

lesson_count

course_level

delivery_mode

start_date

end_date

requirements

what_you_learn

certification

featured_course

status

category_id

lecturer_id

created_at

updated_at




lecturers


id

name

profile_image

designation

bio

qualification

experience_years

specialization

email

linkedin

active_status

created_at

updated_at




categories


id

name

description

image

slug

created_at

updated_at




inquiries


id

full_name

email

phone

course_id

message

created_at

updated_at




====================================================
SECURE API TOKEN ARCHITECTURE
====================================================


IMPORTANT SECURITY RULE:


Do NOT expose Strapi API Token in React.


Do NOT store:

STRAPI_API_TOKEN

inside frontend environment variables.



The Strapi token must exist only in backend.



====================================================
HTTP ONLY COOKIE SECURITY
====================================================


Use HTTP-only cookies for authentication security.



Cookie:


Name:

strapi_access_token



Settings:


httpOnly=true


secure=true


sameSite=strict


maxAge=appropriate expiry



Example:


Set-Cookie:

strapi_access_token=value;

HttpOnly;

Secure;

SameSite=Strict;




====================================================
BACKEND ENVIRONMENT
====================================================


api-server/.env


Example:


STRAPI_URL=http://localhost:1337/api


STRAPI_API_TOKEN=SECRET_TOKEN


COOKIE_SECRET=SECRET_VALUE


FRONTEND_URL=http://localhost:5173




====================================================
FRONTEND ENVIRONMENT
====================================================


frontend/.env


Only:


VITE_BACKEND_URL=http://localhost:5000/api



No Strapi token.



====================================================
BACKEND API GATEWAY
====================================================


Create backend APIs:



GET

/api/public/courses


Returns published courses.



GET

/api/public/courses/:slug


Returns course details.



GET

/api/public/categories


Returns categories.



GET

/api/public/lecturers


Returns lecturers.



POST

/api/public/inquiries


Submit inquiries.




Backend internally calls Strapi:


Authorization:

Bearer STRAPI_API_TOKEN



====================================================
COOKIE AND SECURITY MIDDLEWARE
====================================================


Implement:


- Cookie parser
- Helmet security headers
- CORS configuration
- Rate limiting
- Input validation
- Error handling



Allow only trusted frontend domains.



====================================================
REACT FRONTEND
====================================================


Create React application:


/frontend



Install:


react-router-dom

axios

tailwindcss

react-hook-form

lucide-react




====================================================
AXIOS CONFIGURATION
====================================================


Create:


src/api/axios.js



Configure:


baseURL:

VITE_BACKEND_URL


Enable:


withCredentials:true



Because authentication uses HTTP-only cookies.



====================================================
FRONTEND PAGES
====================================================



Home Page:


- Hero section
- Featured courses
- Categories
- Lecturer showcase
- CTA section



Courses Page:


Features:


- Search courses
- Filter category
- Filter level
- Sort price
- Pagination



Course Details:


Display:


- Image
- Description
- Lecturer
- Price
- Duration
- Requirements
- Learning outcomes
- Certification



Lecturer Page:


Display:


- Profile
- Experience
- Qualifications
- Courses



Contact Page:


Form:


Name

Email

Phone

Course

Message




====================================================
UI DESIGN
====================================================


Use Tailwind CSS.


Design:


Modern education platform.


Style:


- Clean white background
- Blue/purple gradients
- Professional cards
- Responsive design
- Mobile friendly



====================================================
FINAL DEVELOPMENT FLOW
====================================================


Admin:

Strapi Dashboard


↓

Create Course


↓

Save


↓

MySQL Database


↓

Strapi API


↓

Backend API Gateway


↓

HTTP Only Cookie Authentication


↓

React Website


↓

Updated Course Display



====================================================
FINAL REQUIREMENT
====================================================


Deliver a complete production-ready Course Gallery Platform.


Must include:


✓ Strapi CMS

✓ MySQL database

✓ React frontend

✓ Tailwind UI

✓ Backend API Gateway

✓ Secure HTTP-only cookie handling

✓ Hidden Strapi API token

✓ Proper folder structure

✓ Clean architecture

✓ Environment configuration

✓ Working API integration

✓ Responsive design

✓ Deployment instructions