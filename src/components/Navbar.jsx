import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 p-4 flex justify-between items-center px-6">
      <h1 className="text-xl font-bold text-blue-600">
        <Link to="/">TripPlanner</Link>
      </h1>

      <div className="flex items-center space-x-6">
        <Link to="/login" className="hover:text-blue-500 font-medium">
          Login
        </Link>
        <Link to="/register" className="hover:text-blue-500 font-medium">
          Register
        </Link>

        {/* Trips Dropdown */}
        <div className="relative group">
          <button className="hover:text-blue-500 font-medium focus:outline-none">
            Trips ▾
          </button>
          <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md mt-2 right-0 min-w-[150px]">
            <Link
              to="/triplist"
              className="block px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
            >
              My Trips
            </Link>
            <Link
              to="/addtrip"
              className="block px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
            >
              Add Trip
            </Link>
            <Link
              to="/edittrip/123"
              className="block px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
            >
              Edit Trip
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
