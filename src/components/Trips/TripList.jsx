import { Link } from "react-router-dom";

const dummyTrips = [
  { id: 1, name: "Manali Trip", destination: "Manali", startDate: "2025-07-10", endDate: "2025-07-14" },
  { id: 2, name: "Goa Trip", destination: "Goa", startDate: "2025-08-05", endDate: "2025-08-10" }
];

function TripList() {
  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">My Trips</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {dummyTrips.map((trip) => (
          <div key={trip.id} className="p-4 border rounded-lg shadow hover:shadow-lg bg-white">
            <h3 className="text-xl font-bold">{trip.name}</h3>
            <p>Destination: {trip.destination}</p>
            <p>From: {trip.startDate}</p>
            <p>To: {trip.endDate}</p>
            <div className="mt-2 space-x-2">
              <Link to={`/edit-trip/${trip.id}`} className="text-blue-600 underline">Edit</Link>
              <Link to={`/itinerary/${trip.id}`} className="text-green-600 underline">View Itinerary</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripList;
