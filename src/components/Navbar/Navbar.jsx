import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">Trip Planner</Link>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link to="/trips" className="hover:underline">My Trips</Link>
            <Link to="/add-trip" className="hover:underline">Add Trip</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
