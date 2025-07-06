import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Itinerary = () => {
  const { tripId } = useParams();
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    day: "",
    time: "",
    location: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  // Fetch itinerary
  const fetchItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/itinerary/${tripId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [tripId]);

  // Form input handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add or update item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { day, time, description, location } = formData;

    if (!day || !time || !description || !location) {
      setError("All fields are required.");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/itinerary/${editId}`,
          formData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/itinerary/${tripId}`,
          formData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      }

      setFormData({ day: "", time: "", location: "", description: "" });
      setEditId(null);
      setError("");
      fetchItems();
    } catch (err) {
      console.error("Submit failed:", err);
      setError("Failed to submit. Try again.");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/itinerary/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchItems();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setFormData({
      day: item.day,
      time: item.time,
      location: item.location,
      description: item.description,
    });
    setEditId(item._id);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Itinerary</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="day"
            value={formData.day}
            onChange={handleChange}
            placeholder="Day"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time (e.g., 10:00 AM)"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          {editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-600">No itinerary items yet.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Day {item.day}, {item.time}
                </p>
                <p>{item.location} — {item.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-sm px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Itinerary;
