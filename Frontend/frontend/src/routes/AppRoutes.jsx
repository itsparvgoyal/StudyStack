import React from "react";
import {Routes, Route} from "react-router-dom"; 
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import StudentDashboard from "../pages/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import PendingRequests from "../pages/PendingRequests";
import AddCourse from "../pages/AddCourse";
import CourseDetails from "../pages/CourseDetails";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
    return(
        <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="Student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={<CourseDetails />}
        />

        <Route
          path="/admin/addCourse"
          element={
            <ProtectedRoute role="Admin">
              <AddCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pendingRequests"
          element={
            <ProtectedRoute role="Admin">
              <PendingRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/updateCourse/:id"
          element={<AddCourse />}
        />
        
    </Routes>
    )
}   

export default AppRoutes;