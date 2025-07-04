// src/pages/Itinerary.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Itinerary = () => {
  const { id: tripId } = useParams();
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({ time: '', activity: '' });

  useEffect(() => {
    // Replace this with fetch(`/api/itinerary/${tripId}`)
    const sampleData = [
      { time: '09:00 AM', activity: 'Visit Eiffel Tower' },
      { time: '01:00 PM', activity: 'Lunch at a French café' },
      { time: '04:00 PM', activity: 'Cruise on the Seine River' },
    ];
    setActivities(sampleData);
  }, [tripId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddActivity = (e) => {
    e.preventDefault();

    const newActivity = {
      ...formData,
      tripId,
    };

    setActivities([...activities, newActivity]);
    setFormData({ time: '', activity: '' });

    // POST to backend later: fetch('/api/itinerary', { method: 'POST', body: JSON.stringify(newActivity) })
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-violet-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">Trip Itinerary</h2>

        {/* Add Activity Form */}
        <form
          onSubmit={handleAddActivity}
          className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-medium">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Activity</label>
            <input
              type="text"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              required
              placeholder="e.g. Visit Eiffel Tower"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 rounded-lg font-semibold shadow"
          >
            Add Activity
          </button>
        </form>

        {/* Activities List */}
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-gray-600">No activities added yet.</p>
          ) : (
            activities.map((item, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-indigo-500 p-4 rounded-md shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-indigo-700 font-medium">{item.time}</span>
                </div>
                <p className="mt-1 text-gray-700">{item.activity}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
