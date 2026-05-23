# Backend API Documentation

## Base URL

```bash
http://localhost:3000/api/v1
```

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookies Based Authentication

---

# Authentication

Backend uses JWT + Cookies Authentication.

Frontend must send:

```js
withCredentials: true
```

Example:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});
```

---

# User Roles

## Admin
Admin can:

- Add Courses
- Update Courses
- Delete Courses
- Accept Enrollment Requests
- Reject Enrollment Requests
- Access Admin Dashboard
- View All Enrollment Requests

---

## Student
Student can:

- View Courses
- Send Enrollment Requests
- Access Student Dashboard
- View Enrolled Courses

---

# Complete API List

| Method | Endpoint | Access |
|---|---|---|
| POST | `/register` | Public |
| POST | `/login` | Public |
| POST | `/student` | Student |
| POST | `/student/enrollCourse` | Student |
| GET | `/student/dashboard` | Student |
| POST | `/admin` | Admin |
| POST | `/admin/addCourse` | Admin |
| PUT | `/admin/updateCourse/:id` | Admin |
| DELETE | `/admin/deleteCourse/:id` | Admin |
| GET | `/admin/requests` | Admin |
| PUT | `/admin/acceptRequest` | Admin |
| PUT | `/admin/rejectRequest` | Admin |
| GET | `/admin/dashboard` | Admin |
| GET | `/getAllCourses` | Public |
| GET | `/course/getCourse/:id` | Public |

---

# API Documentation

# 1. Register User

## Endpoint

```http
POST /register
```

## Request Body

```json
{
  "name": "Parv",
  "email": "parv@gmail.com",
  "password": "123456",
  "role": "Student"
}
```

## Body Fields

| Field | Type | Required |
|---|---|---|
| name | String | Yes |
| email | String | Yes |
| password | String | Yes |
| role | String | Yes |

## Allowed Role Values

```txt
Student
Admin
```

## Success Response

```json
{
  "success": true,
  "message": "User Registered Successfully"
}
```

---

# 2. Login User

## Endpoint

```http
POST /login
```

## Request Body

```json
{
  "email": "parv@gmail.com",
  "password": "123456"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Login Successful",
  "user": {
    "_id": "6852a12b12",
    "name": "Parv",
    "email": "parv@gmail.com",
    "role": "Student"
  }
}
```

---

# 3. Student Authentication Check

## Endpoint

```http
POST /student
```

## Protected Route

```txt
Student Only
```

## Success Response

```json
{
  "success": true,
  "message": "Student Authenticated",
  "user": {}
}
```

---

# 4. Student Enroll Course

## Endpoint

```http
POST /student/enrollCourse
```

## Protected Route

```txt
Student Only
```

## Request Body

```json
{
  "courseId": "6852a12b12"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Enrollment Request Sent"
}
```

---

# 5. Student Dashboard

## Endpoint

```http
GET /student/dashboard
```

## Protected Route

```txt
Student Only
```

## Success Response

```json
{
  "success": true,
  "dashboardData": {}
}
```

---

# 6. Admin Authentication Check

## Endpoint

```http
POST /admin
```

## Protected Route

```txt
Admin Only
```

## Success Response

```json
{
  "success": true,
  "message": "Admin Authenticated",
  "user": {}
}
```

---

# 7. Add Course

## Endpoint

```http
POST /admin/addCourse
```

## Protected Route

```txt
Admin Only
```

## Request Body

```json
{
  "name": "MERN Stack",
  "description": "Complete MERN Stack Course",
  "price": 4999,
  "totalVideoLectures": 120,
  "totalAssignment": 20,
  "totalProject": 5,
  "courseLevel": "Beginner",
  "courseCategory": "Web Development",
  "courseStatus": "Published",
  "thumbnail": "image-url",
  "capacity": 100
}
```

## Allowed Course Levels

```txt
Beginner
Intermediate
Advanced
```

## Allowed Course Status

```txt
Draft
Published
Archived
```

## Success Response

```json
{
  "success": true,
  "message": "Course Added Successfully",
  "course": {}
}
```

---

# 8. Get All Courses

## Endpoint

```http
GET /getAllCourses
```

## Success Response

```json
{
  "success": true,
  "courses": []
}
```

---

# 9. Get Single Course

## Endpoint

```http
GET /course/getCourse/:id
```

## Example

```http
GET /course/getCourse/6852a12b12
```

## Success Response

```json
{
  "success": true,
  "course": {}
}
```

---

# 10. Update Course

## Endpoint

```http
PUT /admin/updateCourse/:id
```

## Protected Route

```txt
Admin Only
```

## Request Body

```json
{
  "price": 2999,
  "courseStatus": "Published"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Course Updated Successfully"
}
```

---

# 11. Delete Course

## Endpoint

```http
DELETE /admin/deleteCourse/:id
```

## Protected Route

```txt
Admin Only
```

## Success Response

```json
{
  "success": true,
  "message": "Course Deleted Successfully"
}
```

---

# 12. Get Pending Requests

## Endpoint

```http
GET /admin/requests
```

## Protected Route

```txt
Admin Only
```

## Success Response

```json
{
  "success": true,
  "requests": [
    {
      "_id": "123",
      "student": {},
      "course": {},
      "status": "Pending"
    }
  ]
}
```

---

# 13. Accept Request

## Endpoint

```http
PUT /admin/acceptRequest
```

## Protected Route

```txt
Admin Only
```

## Request Body

```json
{
  "requestId": "6852a12b12"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Request Approved"
}
```

---

# 14. Reject Request

## Endpoint

```http
PUT /admin/rejectRequest
```

## Protected Route

```txt
Admin Only
```

## Request Body

```json
{
  "requestId": "6852a12b12"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Request Rejected"
}
```

---

# 15. Admin Dashboard

## Endpoint

```http
GET /admin/dashboard
```

## Protected Route

```txt
Admin Only
```

## Success Response

```json
{
  "success": true,
  "dashboardData": {}
}
```

---

# Database Schemas

## Admin Schema

```js
{
  name: String,
  email: String,
  password: String,
  role: "Admin",
  createdCourses: [Course ObjectId]
}
```

---

## Student Schema

```js
{
  name: String,
  email: String,
  password: String,
  role: "Student",
  registeredCourses: [Course ObjectId]
}
```

---

## Course Schema

```js
{
  name: String,
  description: String,
  price: Number,
  createdBy: Admin ObjectId,
  totalVideoLectures: Number,
  totalAssignment: Number,
  totalProject: Number,
  courseLevel: String,
  courseCategory: String,
  courseStatus: String,
  thumbnail: String,
  capacity: Number,
  enrolledStudents: [Student ObjectId]
}
```

---

## Request Schema

```js
{
  student: Student ObjectId,
  course: Course ObjectId,
  status: "Pending" | "Approved" | "Rejected"
}
```

---

# Common HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Features

- JWT Authentication
- Role Based Access Control
- Course Management
- Enrollment Request System
- Automatic **Email Notifications**
- Admin & Student Dashboards
- Protected Routes
- Cookies Based Authentication
- MongoDB Integration

---

# Author

### Made with ❤️ by Parv Goyal