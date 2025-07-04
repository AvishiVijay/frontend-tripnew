import { useParams } from "react-router-dom";
import { useState } from "react";

function Itinerary() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState([
    { day: "Day 1", time: "10:00 AM", description: "Visit beach", location: "Calangute" },
    { day: "Day 2", time: "2:00 PM", description: "Go for water sports", location: "Baga Beach" }
  ]);

  return (
    <div className="p-6 mt-20 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Trip Itinerary</h2>
      <div className="space-y-4">
        {itinerary.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow bg-white">
            <h3 className="font-bold">{item.day}</h3>
            <p><strong>Time:</strong> {item.time}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
