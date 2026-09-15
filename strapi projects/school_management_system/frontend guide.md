Build a complete frontend application using React + Tailwind CSS for a Strapi v5 backend.

## Project Requirements

Create a modern CRUD dashboard application for managing:

1. Teachers
2. Students
3. Subjects

The frontend must communicate with the Strapi REST API using Axios.

Backend:

Base API URL:

http://localhost:1337/api


## API Endpoints

### Teachers

Get all teachers:

GET
http://localhost:1337/api/teachers?populate=*


Get single teacher:

GET
http://localhost:1337/api/teachers/:id?populate=*


Create teacher:

POST
http://localhost:1337/api/teachers


Request body:

{
  "data": {
    "name": "Teacher Name",
    "email": "teacher@email.com",
    "phone": "0771234567"
  }
}


Update teacher:

PUT
http://localhost:1337/api/teachers/:id


Delete teacher:

DELETE
http://localhost:1337/api/teachers/:id



---

### Students

Get all students:

GET
http://localhost:1337/api/students?populate=*


Get single student:

GET
http://localhost:1337/api/students/:id?populate=*


Create student:

POST
http://localhost:1337/api/students


Request body example:

{
  "data": {
    "name": "Student Name",
    "email": "student@email.com",
    "phone": "0711111111",
    "teachers": [1,2],
    "subjects": [1,2]
  }
}


Update student:

PUT
http://localhost:1337/api/students/:id


Delete student:

DELETE
http://localhost:1337/api/students/:id



---

### Subjects

Get all subjects:

GET
http://localhost:1337/api/subjects?populate=*


Get single subject:

GET
http://localhost:1337/api/subjects/:id?populate=*


Create subject:

POST
http://localhost:1337/api/subjects


Request body example:

{
  "data": {
    "name": "Mathematics",
    "description": "Mathematics subject",
    "teacher": 1
  }
}


Update subject:

PUT
http://localhost:1337/api/subjects/:id


Delete subject:

DELETE
http://localhost:1337/api/subjects/:id



# Data Relationships

Implement the UI based on these relationships:

Teacher:

- One teacher has one subject.
- One teacher can have many students.


Student:

- One student can have many teachers.
- One student can have many subjects.


Subject:

- One subject belongs to one teacher.
- One subject belongs to many students.



# Frontend Features Required

## Dashboard Layout

Create:

- Sidebar navigation
- Header
- Responsive layout
- Clean admin dashboard style UI


Pages:

- Teachers page
- Students page
- Subjects page



# CRUD Features

Each page must support:

- View records
- Add new records
- Edit existing records
- Delete records


Use:

- Modal forms or drawer forms for create/update
- Form validation
- Loading states
- Error handling
- Empty states



# Important Dynamic Update Requirement

When creating a new record:

Example:

User creates a new teacher:

1. Send POST request to Strapi.
2. Wait for successful response.
3. Automatically fetch the updated list OR update local state.
4. Immediately render the new teacher card in the UI.

The cards must dynamically iterate from the API response.

Do NOT hardcode cards.

Example:

After adding:

Teacher:

{
 id:4,
 name:"Robert Taylor",
 email:"robert@test.com"
}

The UI should automatically display:

-------------------------
Teacher Card

Robert Taylor

Email:
robert@test.com

Phone:
xxxxxxxx
-------------------------


The same behavior must work for:

- Adding students
- Adding subjects
- Updating records
- Deleting records



# State Management

Use:

- React Query (TanStack Query) for server state management.

Requirements:

After mutations:

Create:

invalidateQueries()

Update:

invalidateQueries()

Delete:

invalidateQueries()


The UI should refresh automatically without manually refreshing the browser.



# Axios Setup

Create:

src/api/axios.js


Example:

axios instance:

baseURL:
http://localhost:1337/api


Create separate API files:

src/api/teachersApi.js

Functions:

getTeachers()
getTeacher(id)
createTeacher(data)
updateTeacher(id,data)
deleteTeacher(id)



src/api/studentsApi.js

Functions:

getStudents()
getStudent(id)
createStudent(data)
updateStudent(id,data)
deleteStudent(id)



src/api/subjectsApi.js

Functions:

getSubjects()
getSubject(id)
createSubject(data)
updateSubject(id,data)
deleteSubject(id)



# UI Components

Create reusable components:

components/

- Card
- Modal
- Input
- Select
- Button
- LoadingSpinner
- EmptyState
- ConfirmDeleteDialog


# Teacher UI

Teacher cards should show:

- Teacher name
- Email
- Phone
- Assigned subject
- Number of students


Create teacher form:

Fields:

Name
Email
Phone


Subject assignment should use dropdown from existing subjects.


# Student UI

Student cards should show:

- Student name
- Email
- Phone
- Teachers list
- Subjects list


Create student form:

Fields:

Name
Email
Phone

Multi-select:

Teachers

Subjects



# Subject UI

Subject cards should show:

- Subject name
- Description
- Teacher
- Students count


Create subject form:

Fields:

Name
Description

Teacher dropdown



# Styling

Use Tailwind CSS.

Design:

- Modern admin dashboard
- Cards with shadows
- Responsive grid layout
- Mobile friendly
- Professional color palette
- Smooth transitions


# Folder Structure

Use:

src/

components/

pages/

api/

hooks/

utils/

layouts/


# Additional Requirements

- Use functional React components.
- Use React hooks.
- Use clean reusable code.
- No hardcoded sample data.
- All data must come from Strapi API.
- Handle Strapi response format:

{
 data:[
   {
    id,
    attributes:{
       ...
    }
   }
 ]
}

or Strapi v5 flattened responses.

- Include proper relationship rendering using populate=*.
- Make the application ready to connect to the existing Strapi backend.