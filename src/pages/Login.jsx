import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // fixed import: no curly braces for default export

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Focus email input on mount
    document.getElementById("email")?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("✅ Login successful!");

      localStorage.setItem("token", data.token);

      const decoded = jwtDecode(data.token);
      console.log("User role:", decoded.role);

      // Navigate based on role only ONCE
      if (decoded.role === "admin") {
        navigate("/view-submissions");
      } else {
        navigate("/form");
      }

      // Clear form after navigation
      setFormData({ email: "", password: "" });
    } catch (err) {
      toast.error(`⚠️ ${err.message}`);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" style={styles.label}>
            Email Address
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    background: "#0a3d62",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    margin: 0,
    padding: 20,
  },
  container: {
    background: "#ffffff",
    maxWidth: 400,
    width: "100%",
    padding: "30px 25px",
    borderRadius: 12,
    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.3)",
    color: "#0a3d62",
  },
  heading: {
    textAlign: "center",
    marginBottom: 25,
    fontWeight: 600,
    fontSize: "1.8rem",
    color: "#002b80",
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "#004080",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    marginBottom: 20,
    border: "1.5px solid #a3c5ff",
    borderRadius: 6,
    fontSize: "0.95rem",
    background: "#f8fbff",
    color: "#002b80",
    outline: "none",
    transition: "border-color 0.25s ease",
  },
  button: {
    width: "100%",
    background: "#0050d1",
    color: "white",
    border: "none",
    padding: 12,
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(0, 80, 209, 0.25)",
    transition: "background 0.3s ease",
  },
};

export default Login;
