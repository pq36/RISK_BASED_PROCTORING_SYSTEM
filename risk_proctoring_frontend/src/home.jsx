import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./animate.css"; 

const CodeCraftersHome = () => {
  const [jobs, setJobs] = useState([]);

  
  const exams = [
    {
      title: "Google Online Coding Challenge (Kick Start)",
      description: "Hosted by Google, this is a coding competition that helps in hiring for software engineering roles.",
      bgColor: "#A3E4D7",
      link: "http://localhost:3000/exammsg"
    },
    {
      title: "Meta Hacker Cup",
      description: "Facebook (Meta) organizes this coding competition, and top performers often get interview opportunities.",
      bgColor: "#F5B7B1",
      link: "http://localhost:3000/exammsg"
    },
    {
      title: "Amazon Online Assessment (OA)",
      description: "Amazon's hiring test for software engineers includes coding problems, data structures, and behavioral questions.",
      bgColor: "#AED6F1",
      link: "http://localhost:3000/exammsg"
    },
    {
      title: "Microsoft Online Technical Assessment",
      description: "Microsoft uses this test to assess problem-solving, algorithms, and system design knowledge for technical roles.",
      bgColor: "#F9E79F",
      link: "http://localhost:3000/exammsg"
    },
    {
      title: "TCS National Qualifier Test (NQT)",
      description: "Conducted by Tata Consultancy Services, this exam is used for mass hiring of software engineers and freshers.",
      bgColor: "#D7BDE2",
      link: "http://localhost:3000/exammsg"
    },
  ];

  return (
    <div className="bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm p-3">
        <div className="container d-flex align-items-center">
          <h2 className="text-primary fw-bold animate_animated animate_fadeInLeft">🚀 CodeCrafters</h2>
          <input
            type="text"
            className="form-control w-25 ms-auto"
            placeholder="Search Opportunities"
          />
          <button className="btn btn-primary ms-3" onClick={() => window.location.href = "/register"}>
            Join Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mt-5 text-center">
        <h1 className="fw-bold mb-3 animate_animated animate_fadeInUp">
          Unlock <span className="text-primary">Your Career</span>
        </h1>
        <p className="text-muted animate_animated animatefadeInUp animate_delay-1s">
          Explore job opportunities, coding challenges, and hiring exams from top companies.
        </p>

        <a href="/register" className="btn btn-primary btn-lg fw-bold mt-3 animate_animated animatepulse animate_infinite">
          Get Started
        </a>
      </div>

      {/* Top Hiring Exams Section */}
      <div className="container mt-5">
        <h3 className="text-center text-dark">🚀 Top Hiring Exams</h3>
        <div className="row g-4 mt-3">
          {exams.map((exam, index) => (
            <div key={index} className="col-md-4 d-flex">
              <a href={exam.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", width: "100%" }}>
                <div
                  className="card shadow-lg p-4 text-center animate_animated animate_zoomIn d-flex flex-column justify-content-between"
                  style={{ backgroundColor: exam.bgColor, borderRadius: "15px", height: "100%" }}
                >
                  <h5 className="fw-bold text-dark">{exam.title}</h5>
                  <p className="text-muted">{exam.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Job Listings */}
      <div className="container mt-5">
        <h3 className="text-center text-dark">🔥 Latest Job Openings</h3>
        <ul className="list-group mt-3">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <li key={index} className="list-group-item">
                <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" className="fw-bold text-primary">
                  {job.title}
                </a> - {job.company.display_name}
              </li>
            ))
          ) : (
            <p className="text-center text-muted">Loading job listings...</p>
          )}
        </ul>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center p-3 mt-5 animate_animated animatefadeInUp animate_delay-2s">
        <p>&copy; 2025 CodeCrafters | Empowering Coders Globally</p>
        <div>
          <a href="#" className="text-white mx-2">Privacy Policy</a> |
          <a href="#" className="text-white mx-2">Terms of Use</a> |
          <a href="#" className="text-white mx-2">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default CodeCraftersHome;