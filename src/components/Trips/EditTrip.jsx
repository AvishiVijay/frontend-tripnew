import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditTrip = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Trip ID from URL

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  // Fetch existing trip data
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/trips`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const trip = res.data.find((t) => t._id === id);
        if (trip) {
          setFormData({
            name: trip.name,
            destination: trip.destination,
            startDate: trip.startDate.slice(0, 10), // to format yyyy-mm-dd
            endDate: trip.endDate.slice(0, 10),
          });
        } else {
          setError("Trip not found.");
        }
      } catch (err) {
        console.error("Error fetching trip:", err);
        setError("Failed to fetch trip.");
      }
    };

    fetchTrip();
  }, [id, user.token]);

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
    if (startDate > endDate) {
      setError("Start date cannot be after end date.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/trips/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate("/trips");
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update trip.");
    }
  };

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
