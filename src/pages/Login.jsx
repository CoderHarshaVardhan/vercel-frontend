import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validateEmail(email)) {
      toast.error("⚠️ Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      toast.error("⚠️ Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("https://vercel-backend-tsil.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      toast.success("✅ Login successful!");
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);

      navigate(decoded.role === "admin" ? "/view-submissions" : "/form");
      setFormData({ email: "", password: "" });
    } catch (err) {
      toast.error(`⚠️ ${err.message}`);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <h1 className="login-heading">Login</h1>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="login-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="login-input"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="login-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="login-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Login;
