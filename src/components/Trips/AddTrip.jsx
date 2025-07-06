import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddTrip = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, destination, startDate, endDate } = formData;

    // Basic validation
    if (!name || !destination || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }
    if (startDate > endDate) {
      setError("Start date cannot be after end date.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/trips", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate("/trips");
    } catch (err) {
      console.error("Trip creation failed:", err);
      setError("Failed to add trip. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Trip</h2>

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
            placeholder="e.g., Goa Trip"
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
            placeholder="e.g., Goa"
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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Add Trip
        </button>
      </form>
    </div>
  );
};

export default AddTrip;
