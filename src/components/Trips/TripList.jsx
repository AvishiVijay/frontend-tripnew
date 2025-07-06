import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch trips on mount
  useEffect(() => {
    if (!user) return navigate("/login");

    const fetchTrips = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trips", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTrips(res.data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };

    fetchTrips();
  }, [user, navigate]);

  // Delete trip
  const handleDelete = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/trips/${tripId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTrips(trips.filter((trip) => trip._id !== tripId));
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Trips</h2>
      {trips.length === 0 ? (
        <p className="text-gray-600">No trips found. Add one!</p>
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
                {trip.startDate} → {trip.endDate}
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
