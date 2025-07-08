import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddTrip = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, destination, startDate, endDate } = formData;

    if (!name || !destination || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/trips",
        {
          ...formData,
          user: auth.userId // Include user ID from auth context
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      navigate("/triplist");
    } catch (err) {
      console.error("Trip creation failed:", err);
      setError(err.response?.data?.message || "Failed to add trip. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Trip</h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

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
            required
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
            required
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
            required
            min={new Date().toISOString().split('T')[0]}
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
            required
            min={formData.startDate || new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/triplist")}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Add Trip"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrip;