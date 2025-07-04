// src/pages/EditTrip.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    // Replace this with actual fetch(`/api/trips/${id}`)
    const fetchedTrip = {
      name: 'Manali Adventure',
      destination: 'Manali',
      startDate: '2025-09-01',
      endDate: '2025-09-10',
    };
    setTripData(fetchedTrip);
  }, [id]);

  const handleChange = (e) =>
    setTripData({ ...tripData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with real PUT request to `/api/trips/${id}`
    console.log('Updated trip data:', tripData);

    navigate('/trips');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-indigo-100 flex justify-center items-center py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Edit Trip</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Trip Name</label>
            <input
              type="text"
              name="name"
              value={tripData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Destination</label>
            <input
              type="text"
              name="destination"
              value={tripData.destination}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={tripData.startDate}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                value={tripData.endDate}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold shadow-md"
          >
            Update Trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTrip;
