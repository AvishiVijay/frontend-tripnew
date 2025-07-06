// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       login(res.data); // 👈 store user/token in context + localStorage
//       navigate("/trips"); // 👈 go to trip list page
//     } catch (err) {
//       console.log("Login error:", err.response?.data || err.message);
//       alert("Login failed. Please check credentials.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-blue-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-80"
//       >
//         <h2 className="text-xl mb-4 font-semibold text-center">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           required
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           required
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form); // use context login
      navigate("/trips"); // redirect to TripList
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>
        
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-pink-500"
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-pink-800 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

