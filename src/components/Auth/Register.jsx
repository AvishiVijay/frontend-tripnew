import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        localStorage.setItem("token", data.token);
        navigate("/trips"); // or wherever you want after register
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="block mb-2" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="block mb-2" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="block mb-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
    </form>
  );
}

export default Register;
