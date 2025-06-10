import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    terms: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("name")?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm_password, terms } = formData;

    if (!name.trim()) return toast.error("⚠️ Name is required");
    if (!validateEmail(email)) return toast.error("⚠️ Enter a valid email address");
    if (password.length < 6) return toast.error("⚠️ Password must be at least 6 characters");
    if (password !== confirm_password) return toast.error("⚠️ Passwords do not match");
    if (!terms) return toast.error("⚠️ You must agree to the Terms & Privacy");

    try {
      const response = await fetch("https://vercel-backend-tsil.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      toast.success("✅ Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2000 milliseconds = 2 seconds

      setFormData({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        terms: false,
      });
    } catch (error) {
      toast.error(`⚠️ ${error.message}`);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Utsab Micro Finance Pvt. Ltd.</h1>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" style={styles.label}>Email Address</label>
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

          <label htmlFor="password" style={styles.label}>Password (min 6 characters)</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirm_password" style={styles.label}>Confirm Password</label>
          <input
            style={styles.input}
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />

          <div style={styles.terms}>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              style={styles.checkbox}
            />
            <label htmlFor="terms" style={{ marginLeft: 8 }}>
              I agree to the{" "}
              <button
                type="button"
                onClick={() => alert("Terms & Privacy page coming soon")}
                style={{ ...styles.link, background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                Terms & Privacy
              </button>
            </label>
          </div>

          <button type="submit" style={styles.button}>Register</button>
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
    maxWidth: 550,
    width: "100%",
    padding: "35px 30px",
    borderRadius: 12,
    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.4)",
    color: "#0a3d62",
  },
  heading: {
    textAlign: "center",
    marginBottom: 30,
    fontWeight: 600,
    fontSize: "2rem",
    color: "#002b80",
  },
  label: {
    display: "block",
    marginBottom: 8,
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
    transition: "border-color 0.25s ease",
    outline: "none",
  },
  terms: {
    fontSize: "0.9rem",
    marginBottom: 20,
    color: "#333",
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
    transform: "scale(1.2)",
    accentColor: "#0050d1",
  },
  link: {
    color: "#0050d1",
    textDecoration: "none",
    fontWeight: 600,
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

export default Register;
