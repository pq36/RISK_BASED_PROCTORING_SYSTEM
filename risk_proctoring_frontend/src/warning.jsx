import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./animate1.css";

const FraudWarning = () => {
    const clarityURL = "https://clarity.microsoft.com/projects/view/YOUR_API_KEY/impressions?date=Last%203%20days";
  return (
    <div className="d-flex flex-column align-items-center justify-content-between min-vh-100 bg-light">
      
      {/* 🔹 Header */}
      <header className="w-100 py-4 bg-white shadow-sm text-center">
        <h1 className="fw-bold text-primary animate_animated animate_fadeInDown">
          🚀 CodeCrafters
        </h1>
      </header>

      {/* 🔹 Fraud Warning Message */}
      <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <div 
          className="p-4 shadow-lg rounded text-center animate_animated animatepulse animate_infinite"
          style={{
            maxWidth: "500px",
            backgroundColor: "#F8D7DA",
            borderRadius: "20px",
            border: "2px solid red",
            animation: "blinker 1s linear infinite"
          }}
        >
          <h3 className="fw-bold text-danger animate_animated animateflash animate_infinite">
            🚨 Don't Cheat! 🚨
          </h3>
          <p className="text-muted animate_animated animate_fadeInUp">
            Fraudulent activity detected. Please follow fair practices.
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Clarity Heatmap</h2>
            <button 
                onClick={() => window.open(clarityURL, "_blank")} 
                style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
            >
                Open Heatmap
            </button>
        </div>
      {/* 🔹 Footer */}
      <footer className="w-100 bg-primary text-white text-center py-3 shadow-lg animate_animated animate_fadeInUp">
        <p className="mb-0">© 2025 CodeCrafters | Empowering Coders Globally</p>
      </footer>

      {/* 🔹 Blinking Effect */}
      <style>
        {`
          @keyframes blinker {
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default FraudWarning;
