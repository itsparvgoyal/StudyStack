import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const linkClass = "hover:text-blue-400 transition-all";

  return (
    <nav className="w-full border-b border-zinc-800 bg-black px-6 md:px-10 py-5 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-blue-500">
        StudyStack
      </Link>

      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-6 text-white">
        {renderLinks(user, linkClass, logoutHandler, navigate)}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black border-t border-zinc-800 md:hidden z-50">
          <div className="flex flex-col items-center gap-4 py-4 text-white">
            {renderLinks(user, linkClass, logoutHandler, navigate)}
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper to render navigation links based on authentication state
const renderLinks = (user, linkClass, logoutHandler, navigate) => {
  if (!user) {
    return (
      <>
        <Link to="/login" className={linkClass}>Login</Link>
        <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all">Signup</Link>
      </>
    );
  }

  return (
    <>
      {/* home link  */}
      <Link to="/" className={linkClass}>Home</Link>

      {/* Courses link */}
      <Link to="/courses" className={linkClass}>Courses</Link>

      {/* Dashboard link */}
      {user.role === "Student" ? (
        <Link to="/student/dashboard" className={linkClass}>Dashboard</Link>
      ) : (user.role === "Admin") ? (
        <Link to="/admin/dashboard" className={linkClass}>Dashboard</Link>
      ) : (
        <h1 className="text-blue-400 font-semibold">Please login/signup to see dashboard</h1>
      )}


      {/* User name */}
      <h1 className="text-amber-400 font-semibold">{user.name}</h1>

      {/* Logout button */}
      <button
        onClick={logoutHandler}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all"
      >
        Logout
      </button>
    </>
  );
};

export default Navbar;