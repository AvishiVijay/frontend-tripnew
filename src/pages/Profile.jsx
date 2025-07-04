// src/pages/Profile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  // Replace these with real data (e.g. from context or localStorage)
  const user = {
    name: 'Avishi Vijay',
    email: 'avishi@example.com',
  };

  const handleLogout = () => {
    // Clear token or auth state
    console.log('Logging out...');
    // localStorage.removeItem('token'); // if using token storage
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700">My Profile</h2>

        <div className="text-left space-y-4">
          <div>
            <p className="text-gray-600 font-medium">Name:</p>
            <p className="text-lg font-semibold text-gray-800">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Email:</p>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-400 text-white px-6 py-2 rounded-lg font-semibold shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
