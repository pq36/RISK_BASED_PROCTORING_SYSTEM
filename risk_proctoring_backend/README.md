# 🛡️ Risk-Based Proctoring System - Backend

## 📌 Overview
This backend is part of a **Risk-Based Proctoring System** that monitors user behavior during online assessments. It collects **keystroke dynamics, mouse movements, tab switches, copy/paste actions, and inactivity times** to compute a **risk score** using a Machine Learning model.

The backend is built with **Node.js**, **Express**, **Socket.IO**, and **MongoDB**, and it interacts with a **Flask API** for risk score prediction.

---

## 🚀 Features
- **Real-time Behavior Tracking** (Mouse movements, Keystrokes, Tab switches)
- **Risk Score Calculation** using Flask API (ML Model)
- **WebSocket Integration** for live data transmission
- **Remote Desktop Detection** via latency & UserAgent checks
- **High-Risk Actions Monitoring** (Copy-Paste events, Tab changes, Inactivity)
- **Auto-Submission & Screen Lock** when Risk Score reaches 100

---

## 🏗️ Tech Stack
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** bcrypt.js for password hashing
- **Machine Learning API:** Flask (Python)
- **Deployment:** Azure VM, Nginx, Azure DevOps

---

## 📂 Project Structure
```
backend/
│-- controllers/          # Business logic for user and behavior tracking
│-- models/               # Mongoose schemas for Users and Events
│-- routes/               # Express routes (API endpoints)
│-- utils/                # Helper functions (e.g., WebSocket logic)
│-- index.js              # Entry point of the backend server
│-- config.js             # Environment variables & configurations
│-- README.md             # Project documentation
```

---

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/risk-proctoring-backend.git
cd risk-proctoring-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://your_mongo_url
SECRET_KEY=your_secret_key
FLASK_API=http://localhost:7000/predict
```

### 4️⃣ Start the Backend Server
```sh
npm start
```
By default, the backend runs on **http://localhost:5000**.

---

## 📡 WebSocket Events
| **Event Name**         | **Description**                                     |
|-----------------------|-------------------------------------------------|
| `keystroke_data`      | Logs user keystroke timings                     |
| `mouse_data`         | Tracks mouse movement speeds & patterns         |
| `tab_switch`         | Detects if the user switches tabs               |
| `copy_event`         | Logs when the user copies content               |
| `paste_event`        | Logs when the user pastes content               |
| `inactivity_event`   | Detects user inactivity                         |
| `rdp_alert`         | Flags potential Remote Desktop activity         |
| `high_risk_alert`    | Triggered when risk score ≥ 80                 |
| `auto_submit_test`   | Triggers automatic test submission at risk = 100 |

---


## 🛑 Auto-Submission & Screen Lock Mechanism
1. **Risk Score ≥ 80:** Shows a warning alert (`high_risk_alert`).
2. **Risk Score = 100:**
   - **Locks the screen** (CSS overlay or blocking UI interactions)
   - **Auto-submits the test** (`auto_submit_test` WebSocket event)
   - **Redirects the user to the submission page**

---

## 🛠️ Deployment (Azure VM + Nginx)
### 1️⃣ **Install Node.js & PM2**
```sh
sudo apt update
sudo apt install -y nodejs npm
npm install -g pm2
```

### 2️⃣ **Clone & Setup Project**
```sh
cd /var/www/risk-proctoring-backend
git pull origin main
npm install
pm run build
pm start
```

### 3️⃣ **Set Up Nginx as Reverse Proxy**
Modify `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Restart Nginx:
```sh
sudo systemctl restart nginx
```

---

## 🛡️ Security Considerations
- **Data Encryption:** Secure sensitive data with **bcrypt** and HTTPS.
- **Rate Limiting:** Prevent abuse with rate-limiting middleware.
- **CORS Policy:** Restrict frontend domains to prevent unauthorized access.

---

## 🎯 Future Improvements
- Implement **2FA authentication** for added security.
- Use **AI-based behavioral anomaly detection** instead of fixed thresholds.
- Improve **UI notifications** for better user feedback.

---





