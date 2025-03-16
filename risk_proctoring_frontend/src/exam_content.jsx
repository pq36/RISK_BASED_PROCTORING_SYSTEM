import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PythonTest = () => {
  const [answers, setAnswers] = useState({});
  const [codeAnswers, setCodeAnswers] = useState({});

  const questions = [
    {
      id: "q1",
      question: "What is the output of print(2 ** 3)?",
      options: ["5", "6", "8", "9"],
      correct: "8"
    },
    {
      id: "q2",
      question: "Which of these is used to define a function in Python?",
      options: ["def", "func", "define", "lambda"],
      correct: "def"
    },
    {
      id: "q3",
      question: "What will len([1, 2, 3, 4]) return?",
      options: ["3", "4", "5", "Error"],
      correct: "4"
    },
    {
      id: "q4",
      question: "Which of the following is a mutable data type?",
      options: ["Tuple", "String", "List", "Set"],
      correct: "List"
    }
  ];

  const codingQuestions = [
    {
      id: "code1",
      question: "Implement a class Solution with a method to check if a number is prime.",
      template: `class Solution {
  public:
    bool isPrime(int n) {
        
    }
};`,
      testCases: `// Test cases
Solution sol;
printf("%d", sol.isPrime(7)); // Expected output: 1
printf("%d", sol.isPrime(10)); // Expected output: 0`
    },
    {
      id: "code2",
      question: "Implement a class Solution with a method to reverse a string without using built-in functions.",
      template: `class Solution {
  public:
    string reverseString(string s) {
        
    }
};`,
      testCases: `// Test cases
Solution sol;
printf("%s", sol.reverseString("hello").c_str()); // Expected output: "olleh"
printf("%s", sol.reverseString("world").c_str()); // Expected output: "dlrow"`
    }
  ];

  const handleMCQChange = (qId, answer) => {
    setAnswers({ ...answers, [qId]: answer });
  };

  const handleCodeChange = (qId, code) => {
    setCodeAnswers({ ...codeAnswers, [qId]: code });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/submit-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, codeAnswers })
    });
    const result = await response.json();
    alert("Test submitted successfully!");
  };

  return (
    <div className="container mt-5 p-4 bg-light shadow-lg rounded" style={{ maxWidth: "800px" }}>
      <div className="d-flex align-items-center justify-content-center mb-4">
        <img src="https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/6713806/3500/2330/m1/fpnw/wm0/logos-21-77-.jpg?1563702063&s=c25446499054f94d550e28c39b63e932" 
             alt="Company Logo" className="me-3" style={{ width: "50px", height: "50px" }} />
        <h2 className="text-primary fw-bold text-center">🚀 Hiring Challenge 🚀</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q.id} className="mb-4 p-3 border rounded bg-white shadow-sm">
            <h5 className="mb-3">{index + 1}. {q.question}</h5>
            {q.options.map(option => (
              <div key={option} className="form-check">
                <input
                  type="radio"
                  id={`${q.id}-${option}`}
                  name={q.id}
                  value={option}
                  className="form-check-input"
                  onChange={() => handleMCQChange(q.id, option)}
                />
                <label className="form-check-label" htmlFor={`${q.id}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <hr />
        {codingQuestions.map((q, index) => (
          <div key={q.id} className="mb-4 p-3 border rounded bg-white shadow-sm">
            <h5 className="mb-3">{index + 5}. {q.question}</h5>
            <pre className="bg-dark text-white p-3 rounded">{q.template}</pre>
            <textarea
              className="form-control"
              rows="6"
              placeholder="Write your code here..."
              onChange={(e) => handleCodeChange(q.id, e.target.value)}
            ></textarea>
            <pre className="bg-secondary text-white p-2 rounded mt-2">{q.testCases}</pre>
          </div>
        ))}
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4 py-2">Submit Test</button>
        </div>
      </form>
    </div>
  );
};

export default PythonTest;