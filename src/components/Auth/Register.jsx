// import React, { useState, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", form);
//       login(res.data);
//       navigate("/trips");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-indigo-500 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
//         {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input name="name" placeholder="Name" value={form.name} onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" required />
//           <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" required />
//           <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" required />
//           <button type="submit"
//             className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold transition">
//             Register
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <span onClick={() => navigate("/login")} className="text-cyan-800 font-semibold cursor-pointer hover:underline">
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register } = useAuth(); // from context
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await register(form); // use AuthContext register
      navigate("/triplist");
    } catch (err) {
  console.error("Register Error:", err);
  setError(err.message); // ✅ shows "User already exists" or "Registration failed"
  } 

  };  

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-indigo-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
        
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-cyan-500"
            required
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-800 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;

