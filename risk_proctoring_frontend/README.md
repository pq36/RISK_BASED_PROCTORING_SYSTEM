# Frontend - Risk-Based Proctoring System

This is the frontend of the Risk-Based Proctoring System, which tracks user behavior and interacts with the backend for real-time risk analysis.

## 🚀 Features
- Monitors user behavior (keystrokes, mouse movements, copy/paste events, tab switches, and inactivity).
- Connects to the backend via WebSockets for real-time data transmission.
- Displays alerts when suspicious activity is detected.
- Automatically locks the screen and submits the test if the risk score reaches 100.

## 🛠 Tech Stack
- **React** (Frontend framework)
- **Socket.io-client** (WebSocket communication)
- **Bootstrap/Tailwind CSS** (UI Styling)
- **React Hooks** (State management)

## 📦 Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/frontend.git
cd frontend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm start
```
The app will be available at `http://localhost:3000`

## 🔌 WebSocket Events
| Event Name | Direction | Description |
|------------|------------|----------------|
| `mouse_data` | Client → Server | Sends mouse movement data |
| `keystroke_data` | Client → Server | Sends keystroke timestamps |
| `copy_event` | Client → Server | Detects copy actions |
| `paste_event` | Client → Server | Detects paste actions |
| `focus_change` | Client → Server | Tracks tab switching |
| `inactivity_event` | Client → Server | Detects user inactivity |
| `high_risk_alert` | Server → Client | Alerts user if risk score >= 80 |
| `lock_screen` | Server → Client | Locks the screen and auto-submits test |

## 🔔 Handling High Risk Alerts
When the server detects a high-risk event:
```js
socket.on("high_risk_alert", (data) => {
    alert(`🚨 Warning: ${data.message}\nRisk Score: ${data.riskScore}`);
});
```

If the risk score reaches 100, the test is auto-submitted:
```js
socket.on("lock_screen", () => {
    alert("Test auto-submitted due to high risk!");
    window.location.href = "/submission-page";
});
```

## 🏗 Deployment
### 1️⃣ Build for Production
```sh
npm run build
```
### 2️⃣ Deploy on a Web Server (e.g., Nginx, Vercel, Netlify

