import React from "react";
// import Axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TripList from "./components/Trips/TripList";
import AddTrip from "./components/Trips/AddTrip";
import EditTrip from "./components/Trips/EditTrip";
import Itinerary from "./components/Itinerary/Itinerary";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";

import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-trip" element={<AddTrip />} />
            <Route path="/edit-trip/:id" element={<EditTrip />} />
            <Route path="/trips" element={<TripList />} />
            <Route path="/itinerary/:tripId" element={<Itinerary />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
