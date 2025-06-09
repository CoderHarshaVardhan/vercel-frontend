import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";  // Import Navbar

import Login from "./pages/Login";
import ViewSubmissions from "./pages/ViewSubmissions";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Register from './pages/Register';
import Unauthorized from "./pages/Unauthorized";
import Success from "./pages/Success";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/success" element={<Success />} />

          <Route
            path="/view-submissions"
            element={
                <ViewSubmissions />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
