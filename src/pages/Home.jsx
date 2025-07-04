// src/pages/Home.jsx
import bg from "../assets/backg.jpg";

const Home = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-opacity-50 p-10 rounded-lg text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Journey</h1>
        <p className="text-lg mb-6">Plan, explore, and relive your adventures with style ✨</p>
        <div className="space-x-4">
          <a
            href="/login"
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 font-medium"
          >
            Log In
          </a>
          <a
            href="/register"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-medium"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
