import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router navigation
import "./animate2.css"; // Import animation library

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "User Logged In:" : "User Registered:", formData);
    alert(isLogin ? "Login Successful!" : "Registration Successful!");
    navigate("/"); // Redirect dynamically
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-white">
      
      {/* Welcome Section */}
      <div className="text-center my-4 animate__animated animate__zoomIn">
        <h2 className="fw-bold text-dark" style={{ fontSize: "2.5rem" }}>
          👋 Welcome to <span className="text-primary">Code Crafters</span>
        </h2>
        <p className="text-muted">Your gateway to coding excellence</p>
      </div>

      {/* Auth Card */}
      <div className="row w-100 shadow-lg rounded-4 bg-white" style={{ maxWidth: "900px" }}>
        <div className="col-md-6 d-flex flex-column justify-content-center p-5 text-white" 
          style={{ background: "linear-gradient(135deg, #007bff, #6610f2)", borderRadius: "20px 0 0 20px" }}>
          <h2 className="text-light fw-bold animate__animated animate__fadeInLeft">Join the Challenge</h2>
          <p className="text-light">Code. Compete. Get Hired!</p>
        </div>
        
        <div className="col-md-6 p-5" style={{ borderRadius: "0 20px 20px 0" }}>
          <h2 className="fw-bold text-center text-primary">{isLogin ? "Log in" : "Register"}</h2>
          
          <div className="d-flex justify-content-center mt-3">
            <button 
              className={`btn ${isLogin ? "btn-primary" : "btn-outline-primary"} me-2 fw-bold`} 
              onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button 
              className={`btn ${!isLogin ? "btn-primary" : "btn-outline-primary"} fw-bold`} 
              onClick={() => setIsLogin(false)}>
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control rounded-pill shadow-sm"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control rounded-pill shadow-sm"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control rounded-pill shadow-sm"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold rounded-pill shadow-sm">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {isLogin && (
            <p className="text-center mt-3">
              <a href="#" className="text-primary">Forgot password?</a>
            </p>
          )}
        </div>
      </div> {/* Closing div for auth card */}

      {/* Footer */}
      <div className="text-center mt-4 text-muted">
        <p>© 2025 Code Crafters. All rights reserved.</p>
      </div>
    </div>
  );
}
