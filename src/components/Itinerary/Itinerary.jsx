import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Create configured axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const Itinerary = () => {
  const { tripId } = useParams();
  const { auth } = useAuth();

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    day: "",
    time: "",
    activity: "",
    notes: ""
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Configure axios interceptor to add auth token
  useEffect(() => {
    api.interceptors.request.use((config) => {
      if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
      return config;
    });
  }, [auth.token]);

  // Fetch itinerary with useCallback
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/itinerary/${tripId}`);
      setItems(res.data);
      setError("");
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(err.response?.data?.message || "Failed to load itinerary");
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (auth.token) {
      fetchItems();
    }
  }, [fetchItems, auth.token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const payload = {
        day: formData.day,
        activity: formData.activity,
        time: formData.time,
        notes: formData.notes
      };

      if (editId) {
        await api.put(`/itinerary/${editId}`, payload);
      } else {
        await api.post(`/itinerary/${tripId}`, payload);
      }

      setFormData({ day: "", time: "", activity: "", notes: "" });
      setEditId(null);
      await fetchItems();
      
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      setLoading(true);
      await api.delete(`/itinerary/${id}`);
      await fetchItems();
    } catch (err) {
      console.error("Delete failed:", err);
      setError(err.response?.data?.message || "Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      day: item.day,
      time: item.time,
      activity: item.activity,
      notes: item.notes
    });
    setEditId(item._id);
  };

  if (loading && items.length === 0) {
    return <div className="max-w-3xl mx-auto p-4 text-center">Loading itinerary...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Itinerary</h2>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="day"
            value={formData.day || ""}
            onChange={handleChange}
            placeholder="Day"
            min="1"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="time"
            value={formData.time || ""}
            onChange={handleChange}
            placeholder="Time (e.g., 10:00 AM)"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="activity"
            value={formData.activity || ""}
            onChange={handleChange}
            placeholder="Activity"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="notes"
            value={formData.notes || ""}
            onChange={handleChange}
            placeholder="Notes"
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      <div className="space-y-4">
        {items.length === 0 && !loading ? (
          <p className="text-gray-600 text-center">No itinerary items yet.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Day {item.day}, {item.time}
                </p>
                <p>{item.activity} — {item.notes}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  disabled={loading}
                  className="text-sm px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500 disabled:bg-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={loading}
                  className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
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