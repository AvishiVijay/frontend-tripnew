import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch trips on mount
  useEffect(() => {
    if (!auth.token) return navigate("/login");
    fetchTrips();
  }, [auth.token, navigate]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/trips", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setTrips(res.data);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/trips/${tripId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setTrips(trips.filter((trip) => trip._id !== tripId));
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Trips</h2>
        <Link
          to="/add-trip"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Trip
        </Link>
      </div>

      {loading ? (
        <p className="text-center">Loading trips...</p>
      ) : trips.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No trips found.</p>
          <Link
            to="/add-trip"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded inline-block"
          >
            Create Your First Trip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-1">{trip.name}</h3>
              <p className="text-sm text-gray-700">
                Destination: {trip.destination}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(trip.startDate).toLocaleDateString()} → {new Date(trip.endDate).toLocaleDateString()}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/edit-trip/${trip._id}`}
                  className="px-3 py-1 bg-yellow-400 text-sm rounded hover:bg-yellow-500"
                >
                  Edit
                </Link>
                <Link
                  to={`/itinerary/${trip._id}`}
                  className="px-3 py-1 bg-blue-500 text-sm text-white rounded hover:bg-blue-600"
                >
                  Itinerary
                </Link>
                <button
                  onClick={() => handleDelete(trip._id)}
                  className="px-3 py-1 bg-red-500 text-sm text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;