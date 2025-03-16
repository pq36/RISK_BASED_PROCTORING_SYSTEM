import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import PythonTest from "./exam_content";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000"); // Backend URL

const BehaviorTracking = () => {
    const [isInactive, setIsInactive] = useState(false);
    const tabSwitchCount = useRef(0);
    const inactivityTimer = useRef(null);
    const navigate = useNavigate();

    const handleIPAddress = async () => {
        try {
            const response = await fetch("https://api64.ipify.org?format=json");
            const data = await response.json();
            const userIP = data.ip;

            console.log("🔍 Sending IP to server:", userIP);
            socket.emit("ip_event", {
                ip: userIP,
                timestamp: Date.now(),
            });
        } catch (error) {
            console.error("❌ Error fetching IP:", error);
        }
    };

    useEffect(() => {
        const resetInactivityTimer = () => {
            setIsInactive(false);
            clearTimeout(inactivityTimer.current);
            inactivityTimer.current = setTimeout(() => {
                setIsInactive(true);
                socket.emit("inactivity_event", {
                    message: "User inactive",
                    timestamp: Date.now(),
                });
            }, 5 * 60 * 1000); // 5 minutes
        };

        const detectUSBDevices = async () => {
            if ("usb" in navigator) {
                const devices = await navigator.usb.getDevices();
                console.log("Detected USB Devices:", devices);
                socket.emit("device_info", { type: "USB", count: devices.length, details: devices });
            }
        };

        const detectMediaDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const mediaDevices = devices.filter(device => device.kind === "audioinput" || device.kind === "videoinput");
            console.log("Detected Media Devices:", mediaDevices);
            socket.emit("device_info", { type: "Media", count: mediaDevices.length, details: mediaDevices });
        };

        detectUSBDevices();
        detectMediaDevices();

        const measureLatency = async () => {
            const start = performance.now();
            try {
                await fetch("http://localhost:5000"); // Ping the backend
                const latency = performance.now() - start;
                console.log(`🕒 Latency: ${latency} ms`);
                if (latency > 150) {
                    socket.emit("rdp_alert", { message: "Potential Remote Session Detected (High Latency)" });
                }
            } catch (error) {
                console.error("Latency check failed:", error);
            }
        };
        measureLatency();

        const handleMouseMove = (event) => {
            resetInactivityTimer();
            socket.emit("mouse_data", {
                x: event.clientX,
                y: event.clientY,
                timestamp: Date.now(),
            });
        };

        const handleKeyDown = (event) => {
            resetInactivityTimer();
            socket.emit("keystroke_data", {
                key: event.key,
                timestamp: Date.now(),
            });
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                let alertFlag = localStorage.getItem("tabAlertShown");

                // Show alert only once per session
                if (!alertFlag || alertFlag === "0") {
                    alert(`⚠ Warning: You switched tabs ${tabSwitchCount.current + 1} times. Stay focused!`);
                    localStorage.setItem("tabAlertShown", "1");
                }

                tabSwitchCount.current += 1;
                localStorage.setItem("tabSwitchCount", tabSwitchCount.current);
                if (tabSwitchCount.current > 5) {
                    navigate('/warning');
                }
                socket.emit("tab_switch_event", { count: tabSwitchCount.current, timestamp: Date.now() });
            } else {
                localStorage.setItem("tabAlertShown", "0");
            }
        };

        const handleCopy = () => {
            resetInactivityTimer();
            socket.emit("copy_event", {
                content: document.getSelection().toString(),
                timestamp: Date.now(),
            });
        };

        const handlePaste = (event) => {
            resetInactivityTimer();
            const content = event.clipboardData.getData("text");
            socket.emit("paste_event", {
                content: content,
                timestamp: Date.now(),
            });

            if (content.length >= 15) {
                navigate("/warning");
            }
        };

        // Attach event listeners
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("copy", handleCopy);
        document.addEventListener("paste", handlePaste);

        resetInactivityTimer();

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("copy", handleCopy);
            document.removeEventListener("paste", handlePaste);
            clearTimeout(inactivityTimer.current);
        };
    }, [navigate]);

    useEffect(() => {
        socket.on("connect", handleIPAddress); // Get and send IP when socket connects
    
        socket.on("high_risk_alert", (data) => {
            if (data.riskScore === 100) {
                setTimeout(() => {
                    navigate("/warning");
                }, 3000);
            } else if (data.riskScore >= 50) {
                alert(`🚨 Warning: ${data.message}\nRisk Score: ${data.riskScore}`);
            }
        });
    
        // Open Clarity heatmap every 1 minute
        
    
        return () => {
            socket.off("connect", handleIPAddress);
            socket.off("high_risk_alert");
        };
    }, [navigate]); // Correct dependency array
    
    return <PythonTest />;
}
export default BehaviorTracking;

    