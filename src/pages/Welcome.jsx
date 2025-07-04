// src/pages/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm text-center">
        <img
          src="https://www.shutterstock.com/image-illustration/airplane-guidepost-blue-background-travel-600nw-2259238169.jpg" // Replace with your image URL
          alt="Travel"
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Wanderlust</h2>
          <p className="text-gray-600 mb-4">
            Plan your dream trip with ease. Discover new destinations,
            create personalized itineraries, and share your adventures.
          </p>
          <div className="space-y-2">
            <Link to="/register">
              <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-300">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
