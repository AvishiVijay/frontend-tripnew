// src/pages/TripList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Replace this with fetch('/api/trips') when connected to backend
    const sampleTrips = [
      {
        _id: '1',
        name: 'Goa Vacation',
        destination: 'Goa',
        startDate: '2025-08-01',
        endDate: '2025-08-07',
      },
    ];
    setTrips(sampleTrips);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-pink-200 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Your Trips</h2>
        <div className="flex justify-end mb-4">
          <Link
            to="/add-trip"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md"
          >
            + Add Trip
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-xl p-5 shadow-md border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{trip.name}</h3>
              <p className="text-gray-600">
                Destination: <span className="font-medium">{trip.destination}</span>
              </p>
              <p className="text-gray-600">
                Dates: {trip.startDate} to {trip.endDate}
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  to={`/edit-trip/${trip._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  to={`/trip/${trip._id}/itinerary`}
                  className="text-green-600 hover:underline"
                >
                  View Itinerary
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripList;
