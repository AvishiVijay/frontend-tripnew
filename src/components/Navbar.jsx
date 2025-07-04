// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="w-full bg-white shadow-md flex justify-end items-center px-8 py-4">
      <div className="flex items-center space-x-6">
        {/* Navigation Links */}
        <Link to="/" className="text-indigo-700 hover:text-indigo-500 font-medium">Home</Link>
        <Link to="/trips" className="text-indigo-700 hover:text-indigo-500 font-medium">Trips</Link>
        <Link to="/add-trip" className="text-indigo-700 hover:text-indigo-500 font-medium">Add Trip</Link>
        <Link to="/login" className="text-indigo-700 hover:text-indigo-500 font-medium">Login</Link>

        {/* Profile Icon with Dropdown */}
        <div className="relative">
          <FaUserCircle
            size={28}
            className="cursor-pointer text-indigo-700 hover:text-yellow-500"
            onClick={() => setProfileOpen(!profileOpen)}
          />
          {profileOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setProfileOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
