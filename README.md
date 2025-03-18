
# Risk-Based Proctoring System

## Overview

The Risk-Based Proctoring System is designed to enhance the integrity of online examinations by monitoring user behavior and calculating a risk score to detect potential anomalies. This system integrates real-time tracking of user interactions, such as keystrokes, mouse movements, and activity patterns, to ensure a secure and fair assessment environment.

## Features

- **Real-time Behavior Tracking**: Monitors keystrokes, mouse movements, tab switches, and inactivity periods.
- **Risk Score Calculation**: Analyzes user behavior to compute a risk score indicating the likelihood of anomalous activity.
- **Automated Alerts**: Triggers alerts or actions, such as auto-submission or screen locking, when the risk score exceeds predefined thresholds.
- **WebSocket Integration**: Utilizes WebSockets for real-time data transmission between the frontend and backend.

## Installation

### Prerequisites

- Node.js
- Python 3.x
- MongoDB

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pq36/RISK_BASED_PROCTORING_SYSTEM.git
   ```


2. **Navigate to the Backend Directory**:
   ```bash
   cd RISK_BASED_PROCTORING_SYSTEM/risk_proctoring_backend
   ```


3. **Install Dependencies**:
   ```bash
   npm install
   ```


4. **Start the Server**:
   ```bash
   npm start
   ```


### Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd RISK_BASED_PROCTORING_SYSTEM/risk_proctoring_frontend
   ```


2. **Install Dependencies**:
   ```bash
   npm install
   ```


3. **Start the Development Server**:
   ```bash
   npm start
   ```


### Machine Learning Module Setup

1. **Navigate to the ML Directory**:
   ```bash
   cd RISK_BASED_PROCTORING_SYSTEM/risk_proctoring_ml
   ```


2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   ```


3. **Activate the Virtual Environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```


5. **Run the Flask App**:
   ```bash
   python app.py
   ```


## Usage

1. **Access the Frontend**:
   Open your browser and navigate to `http://localhost:3000`.

2. **Perform an Assessment**:
   The system will monitor your behavior during the assessment and compute a risk score in real-time.

3. **Receive Feedback**:
   If anomalous behavior is detected, the system will trigger alerts or take predefined actions based on the risk score.

## Contributors

- **Meghana M** - [GitHub Profile](https://github.com/pq36)
- **Rakshitha D V** - [GitHub Profile](https://github.com/DevPluse100dv)
- **Shambhavi M P** - [GitHub Profile](https://github.com/shambhaviprakash77)
- **Preethi M S** - [GitHub Profile](https://github.com/preethimss)

