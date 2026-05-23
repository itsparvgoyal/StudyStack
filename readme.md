# 🎓 Course Management Platform ~ **StudyStack**

A full-stack Course Management Platform built using the MERN Stack that allows students to explore and enroll in courses while providing admins with complete course and enrollment management features.

The platform includes secure JWT authentication, role-based access control, Cloudinary image management, email notification integration, protected routes, admin/student dashboards, and responsive UI support.

---

# ✨ Features

## 👨‍🎓 Student Features

- User Registration & Login
- Secure JWT Authentication
- Browse All Courses
- View Detailed Course Information
- Send Enrollment Requests
- Access Student Dashboard
- View Enrolled Courses
- Protected Student Routes

---

## 👨‍💼 Admin Features

- Admin Authentication
- Add New Courses
- Update Existing Courses
- Delete Courses
- Accept / Reject Enrollment Requests
- Access Admin Dashboard
- View Course Analytics
- View Total Enrolled Students
- Protected Admin Routes

---

# 📧 Email Notification System

The platform automatically sends email notifications for:

- User Registration
- New Enrollment Requests
- Enrollment Approval / Rejection
- Course Updates

This helps students and admins stay updated with real-time notifications.

---

# ☁️ Cloudinary Integration

Course thumbnails are efficiently managed using Cloudinary integration, including automatic uploads and removal of old images during updates.

---

# 🔐 Authentication & Security

- JWT Token Authentication
- Cookies Based Authentication
- Role-Based Protected Routes
- Secure Password Handling
- Input Validation
- Email Validation

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Context API

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer
- Cloudinary
- Cookie Parser
- bcrypt.js

---

# 📁 Project Structure

```bash
UGAC/
│
├── Frontend/
│   ├── frontend/
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── config files
│   │   └── index.html
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── router/
│   ├── middlewares/
│   ├── config/
│   └── index.js
│   └── README.md (Api information)
│
└── README.md
