# Flask API for Risk-Based Proctoring System

## Overview
This Flask API is responsible for processing behavioral data from the frontend, analyzing user interactions, and generating a risk score for potential anomalies during online assessments. The system integrates with WebSockets to handle real-time user activity tracking.

## Features
- Receives user behavioral data (keystrokes, mouse movements, tab switches, etc.)
- Computes mean dwell time, mean flight time, standard deviations, and other statistical metrics
- Sends data to a trained machine learning model for risk prediction
- Provides a real-time risk score to the frontend via WebSockets
- Auto-submits the test or locks the screen if the risk score reaches 100

## Installation

### Prerequisites
- Python 3.8+
- Flask
- Flask-SocketIO
- NumPy, Pandas, Scikit-learn (for data processing)
- PyMuPDF (if dealing with PDF parsing)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/flask-api-proctoring.git
   cd flask-api-proctoring
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```

## API Endpoints

### 1. **Ping API** (Check Server Health)
   ```http
   GET /ping
   ```
   **Response:**
   ```json
   { "message": "Server is running" }
   ```

### 2. **Predict Risk Score**
   ```http
   POST /predict
   ```
   **Request Body:** (JSON)
   ```json
   {
       "sample_id": "user123",
       "mean_dwell": 150.2,
       "std_dwell": 50.3,
       "mean_flight": 120.5,
       "std_flight": 40.1,
       "avg_mouse_speed": 2.5,
       "tab_switch_count": 3,
       "copy_events": 1,
       "paste_events": 0,
       "inactivity_time": 20
   }
   ```
   **Response:**
   ```json
   {
       "risk_score": 85.5,
       "message": "High risk detected"
   }
   ```

## WebSocket Events

| Event Name          | Description                                  |
|---------------------|----------------------------------------------|
| `mouse_data`       | Receives real-time mouse movements           |
| `keystroke_data`   | Tracks keypress patterns                     |
| `focus_change`     | Monitors tab focus changes                   |
| `copy_event`       | Detects copy actions                         |
| `paste_event`      | Detects paste actions                        |
| `high_risk_alert`  | Emits risk alerts when the risk score is high |

## Auto Submission & Locking Screen
If the risk score reaches **100**, the system:
1. Sends an event to the frontend to lock the screen.
2. Auto-submits the exam.
3. Redirects the user to a different page or logs them out.

## Deployment

### Run Locally (Development Mode)
```bash
flask run --host=0.0.0.0 --port=7000
```

### Deploy on Azure / AWS / Heroku
- Ensure `gunicorn` is installed for production use:
  ```bash
  pip install gunicorn
  ```
- Run with Gunicorn:
  ```bash
  gunicorn -w 4 -b 0.0.0.0:7000 app:app
  ```


