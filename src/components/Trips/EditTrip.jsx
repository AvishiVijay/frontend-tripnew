import { useParams } from "react-router-dom";
import { useState } from "react";

function EditTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState({
    name: "Goa Trip",
    destination: "Goa",
    startDate: "2025-08-05",
    endDate: "2025-08-10"
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Trip:", trip); // Replace with API update logic
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-20 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Edit Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={trip.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="destination"
          value={trip.destination}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Update Trip</button>
      </form>
    </div>
  );
}

export default EditTrip;
