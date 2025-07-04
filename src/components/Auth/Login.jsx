import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/trips"); // redirect to Trips page
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="block mb-2" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="block mb-2" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Login</button>
    </form>
  );
}

export default Login;
