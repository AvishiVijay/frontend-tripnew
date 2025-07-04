// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TripList from './pages/TripList';
import AddTrip from './pages/AddTrip';
import EditTrip from './pages/EditTrip';
import Itinerary from './pages/Itinerary';
import Profile from './pages/Profile'; // coming up next

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/add-trip" element={<AddTrip />} />
        <Route path="/edit-trip/:id" element={<EditTrip />} />
        <Route path="/trip/:id/itinerary" element={<Itinerary />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
