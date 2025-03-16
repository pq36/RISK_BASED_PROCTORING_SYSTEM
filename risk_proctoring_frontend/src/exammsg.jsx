import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./animate3.css";

const ExamMonitoringPage = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [sentence, setSentence] = useState("");

  const analyzeSentence = () => {
    if (sentence.trim() === "") {
      alert("Please type the verification sentence to proceed.");
      return;
    }
    alert("Sentence verified! Redirecting to exam...");
    navigate("/exam"); // Navigate to the exam route
  };

  return (
    <div className="container text-center mt-5 p-4 shadow-lg rounded animate__animated animate__fadeIn" 
         style={{ maxWidth: "700px", backgroundColor: "white", border: "2px solid #007bff" }}>
      
      <h2 className="text-primary fw-bold animate__animated animate__fadeInDown">
        📝 Exam Monitoring System
      </h2>

      {/* Exam Rules */}
      <p className="fw-semibold mt-3 text-primary animate__animated animate__fadeIn">
        ⚠️ <strong>Rules for Exam Entry:</strong>
      </p>
      <ul className="text-start d-inline-block list-group list-group-flush animate__animated animate__fadeInLeft">
        <li className="list-group-item text-dark">🚫 <strong>No tab switching</strong> during the exam.</li>
        <li className="list-group-item text-dark">📋 <strong>No copy-pasting</strong> answers.</li>
        <li className="list-group-item text-dark">⌨️ <strong>Typing speed and patterns</strong> will be analyzed.</li>
        <li className="list-group-item text-dark">🌐 Ensure a <strong>stable internet connection</strong>.</li>
        <li className="list-group-item text-dark">⚠️ <strong>Suspicious activity</strong> may lead to auto-submission.</li>
      </ul>

      {/* User Input */}
      <p className="mt-4 text-primary animate__animated animate__fadeIn">
        Type a simple English sentence to verify system readiness:
      </p>
      <input
        type="text"
        className="form-control w-75 mx-auto mt-3 border-primary shadow-sm animate__animated animate__pulse"
        placeholder="I will complete this exam with honesty and integrity."
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        style={{ borderColor: "#007bff", color: "#007bff" }}
      />

      {/* Proceed Button */}
      <button 
        className="btn btn-primary mt-3 px-4 py-2 fw-bold animate__animated animate__tada animate__infinite" 
        onClick={analyzeSentence}
      >
        ✅ Proceed to Exam
      </button>

    </div>
  );
};

export default ExamMonitoringPage;
