const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");
const route = require("./controller/controller.js")

dotenv.config();
const app = express();
const server = createServer(app);
app.use(cors());
app.use("/",route)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const userData = {}; // Store user session data

// Function to calculate mouse speed
const calculateMouseSpeed = (prev, current) => {
    if (!prev) return 0;
    const dx = current.x - prev.x;
    const dy = current.y - prev.y;
    const dt = (current.timestamp - prev.timestamp) / 1000;
    return dt ? Math.sqrt(dx * dx + dy * dy) / dt : 0;
};

// Function to calculate keystroke dynamics
const calculateKeystrokeDynamics = (userId, key, timestamp) => {
    if (!userData[userId]) userData[userId] = { keyPressTimes: {} };
    const keyData = userData[userId].keyPressTimes;
    if (keyData[key]) {
        const duration = timestamp - keyData[key];
        delete keyData[key];
        return duration;
    } else {
        keyData[key] = timestamp;
        return null;
    }
};

// Function to aggregate and send real-time data to Flask API
const sendToFlaskAPI = async (socketId) => {
    const data = userData[socketId];
    if (data) {
        if (data.keystrokes.length > 0) {
            const meanDwell = data.keystrokes.reduce((a, b) => a + b, 0) / data.keystrokes.length;
            const stdDwell = Math.sqrt(data.keystrokes
                .map(x => Math.pow(x - meanDwell, 2))
                .reduce((a, b) => a + b, 0) / data.keystrokes.length);
            const meanFlight = meanDwell / 2; // Approximation
            const stdFlight = stdDwell / 2;
            const avgMouseSpeed = data.mouseSpeeds && data.mouseSpeeds.length > 0 
                ? data.mouseSpeeds.reduce((a, b) => a + b, 0) / data.mouseSpeeds.length 
                : 0;
    
            const sampleData = {
                sample_id: socketId,
                mean_dwell: meanDwell,
                std_dwell: stdDwell,
                mean_flight: meanFlight,
                std_flight: stdFlight,
                avg_mouse_speed: avgMouseSpeed,
                tab_switch_count: data.tabSwitches,
                copy_events: data.copyEvents,
                paste_events: data.pasteEvents,
                inactivity_time: data.inactivityTime
            };
    
            // Format sampleData as a CSV row string (rounded to 2 decimals)
            const csvRow = `${socketId},${meanDwell.toFixed(2)},${stdDwell.toFixed(2)},${meanFlight.toFixed(2)},${stdFlight.toFixed(2)},${avgMouseSpeed.toFixed(2)},${data.tabSwitches},${data.copyEvents},${data.pasteEvents},${data.inactivityTime}`;
            console.log("Aggregated CSV Row:", csvRow);
            console.log("Aggregated Data Object:", sampleData);
    
            // Send data to Flask API
            try {
                const response = await axios.post("http://localhost:7000/predict", sampleData);
                console.log("Risk Score from Flask API:",response.data);

            } catch (error) {
                console.error("Error sending data to Flask API:", error);
            }
        } else {
            console.log(`No keystroke data for socket ${socketId} yet.`);
        }
    }
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  userData[socket.id] = {
      lastMouseMove: null,
      keystrokes: [],
      tabSwitches: 0,
      copyEvents: 0,
      pasteEvents: 0,
      inactivityTime: 0,
      mouseSpeeds: [],
      keyPressTimes: {},
      apiTimer: null
  };
  userData[socket.id].apiTimer = setInterval(() => sendToFlaskAPI(socket.id), 30000);
  socket.on("mouse_data", (msg) => {
      const speed = calculateMouseSpeed(userData[socket.id].lastMouseMove, msg);
      userData[socket.id].lastMouseMove = msg;
      userData[socket.id].mouseSpeeds.push(speed);
      console.log(`User ${socket.id}: Recorded mouse speed ${speed.toFixed(2)} pixels/sec`);
  });

  socket.on("keystroke_data", (msg) => {
      const duration = calculateKeystrokeDynamics(socket.id, msg.key, msg.timestamp);
      if (duration !== null) {
          userData[socket.id].keystrokes.push(duration);
          console.log(`User ${socket.id}: Recorded keystroke duration for key "${msg.key}" - ${duration} ms`);
      }
  });

  socket.on("focus_change", () => {
      userData[socket.id].tabSwitches += 1;
      console.log(`User ${socket.id}: Focus changed, total tab switches: ${userData[socket.id].tabSwitches}`);
  });

  socket.on("copy_event", (msg) => {
      userData[socket.id].copyEvents += 1;
      console.log(`User ${socket.id}: Copy event detected. Copied content: "${msg.content}". Total copy events: ${userData[socket.id].copyEvents}`);
  });

  socket.on("paste_event", (msg) => {
      userData[socket.id].pasteEvents += 1;
      console.log(`User ${socket.id}: Paste event detected. Pasted content: "${msg.content}". Total paste events: ${userData[socket.id].pasteEvents}`);
  });

  socket.on("inactivity_event", (msg) => {
      userData[socket.id].inactivityTime += Number(msg.duration);
      console.log(`User ${socket.id}: Inactivity event, total inactivity time: ${userData[socket.id].inactivityTime}`);
  });

  socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      delete userData[socket.id];
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
const URL=process.env.MONGO_URI
//server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
mongoose.connect(URL).then(()=>{
  console.log("DB Connected successfully!!!")
  server.listen(PORT,()=>{
      console.log(`server is running on http://localhost:${PORT}`)
  })
})
.catch((error)=>{
  console.log(error)
})
