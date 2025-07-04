import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddTrip from './components/Trips/AddTrip';
import EditTrip from './components/Trips/EditTrip';
import TripList from './components/Trips/TripList';
import Itinerary from "./components/Itinerary/Itinerary"; // ✅ Correct


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addtrip" element={<AddTrip />} />
        <Route path="/edittrip/:id" element={<EditTrip />} />
        <Route path="/triplist" element={<TripList />} />
        <Route path="/itinerary/:tripId" element={<Itinerary />} />
      </Routes>
    </Router>
  );
}

export default App;
