// src/components/ErrorToast.js
import React from "react";

const ErrorToast = ({ messages }) => {
  if (!messages.length) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#ff4d4f",
      color: "white",
      padding: "1rem 2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      zIndex: 1000
    }}>
      {messages.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
};

export default ErrorToast;
