import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditTrip = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch existing trip data
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/trips/${id}`, { // Fixed endpoint
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        
        const trip = res.data;
        if (trip) {
          setFormData({
            name: trip.name,
            destination: trip.destination,
            startDate: trip.startDate ? trip.startDate.split('T')[0] : "", // Safer date handling
            endDate: trip.endDate ? trip.endDate.split('T')[0] : "",
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trip:", err);
        setError(err.response?.data?.message || "Failed to fetch trip");
        setLoading(false);
      }
    };

    if (auth.token) { // Only fetch if token exists
      fetchTrip();
    } else {
      setError("Not authenticated");
      setLoading(false);
    }
  }, [id, auth.token]); // Fixed dependency array

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, destination, startDate, endDate } = formData;

    // Validations
    if (!name || !destination || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/trips/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      navigate("/trips");
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.response?.data?.message || "Failed to update trip");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
        <button 
          onClick={() => navigate(-1)} 
          className="block mt-4 text-blue-500"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Trip</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium">Trip Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
        >
          Update Trip
        </button>
      </form>
    </div>
  );
};

export default EditTrip;
