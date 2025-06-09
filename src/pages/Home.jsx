// Home.jsx
import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-header">
          <img src="/logo.jpeg" alt="Utsab Logo" className="home-logo" />
          <h1>Utsab Micro Finance Pvt. Ltd.</h1>
        </div>
        <p className="home-tagline">
          Empowering rural lives with accessible financial solutions
        </p>
        <div className="home-btn-group">
          <a href="/login" className="home-btn">Login</a>
          <a href="/register" className="home-btn">Register</a>
        </div>
      </div>
    </div>
  );
}
