// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem("token") || "",
  });

  const login = async ({ email, password }) => {
  console.log("📤 Sending login request", email, password);

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok || !data.token) {
    localStorage.removeItem('token'); // Clear invalid token
    throw new Error(data.message || "Login failed");
  }

  // ✅ Save to state and localStorage
  setAuth({ user: data.user, token: data.token });
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user)); // Add this line
};


  const register = async ({ name, email, password }) => {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data; // ✅ success
};


  const logout = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("user");
    setAuth({ user: null, token: "" });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
