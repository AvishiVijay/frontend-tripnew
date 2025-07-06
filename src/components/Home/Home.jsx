// src/components/Home/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Trip Planner 🌍</h1>
      <p className="text-lg text-gray-600 mb-6">
        Plan, track, and manage all your trips and itineraries in one place.
      </p>

      {!user ? (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      ) : (
        <Link
          to="/trips"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Go to My Trips
        </Link>
      )}
    </div>
  );
};

export default Home;
