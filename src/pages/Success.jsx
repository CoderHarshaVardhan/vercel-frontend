import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // make sure you import styles
import './Success.css';

export default function Success() {
  useEffect(() => {
    toast.success("✅ Form submitted successfully!");
  }, []);

  return (
    <div className="success-container">
      {/* ToastContainer with top-right position */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
      />
      
      <h1>🎉 Submission Successful!</h1>
      <p>Thank you. Your form has been submitted successfully.</p>
      <a href="/" className="btn-back">Go to Home</a>
    </div>
  );
}
