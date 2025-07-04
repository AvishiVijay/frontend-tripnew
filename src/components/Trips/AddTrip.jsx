import { useState } from "react";

function AddTrip() {
  const [trip, setTrip] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trip added:", trip); // Replace this with API call
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-20 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Add New Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Trip Name"
          value={trip.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={trip.destination}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Trip</button>
      </form>
    </div>
  );
}

export default AddTrip;
