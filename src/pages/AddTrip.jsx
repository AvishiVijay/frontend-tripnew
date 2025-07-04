// src/pages/AddTrip.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddTrip = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trip, setTrip] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  // Load trip data if editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/trips/${id}`)
        .then((res) => res.json())
        .then((data) => setTrip(data))
        .catch((err) => console.error("Failed to load trip", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = id
      ? `http://localhost:5000/api/trips/${id}`
      : "http://localhost:5000/api/trips";

    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...trip,
          user: "6866e0d00912816d1d1c2612", // ✅ your correct MongoDB user ID
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Trip saved/updated:", data);
        navigate("/trips");
      } else {
        console.log("❌ Backend error:", data);
      }
    } catch (err) {
      console.log("❌ Fetch error:", err);
    }
  };

  return (
    <div className="ml-64 mt-4 p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        {id ? "Edit Trip" : "Add a New Trip"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          name="name"
          placeholder="Trip Name"
          value={trip.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={trip.destination}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
        >
          {id ? "Update Trip" : "Save Trip"}
        </button>
      </form>
    </div>
  );
};

export default AddTrip;
