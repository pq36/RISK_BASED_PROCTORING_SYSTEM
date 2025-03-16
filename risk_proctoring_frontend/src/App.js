import './App.css';
import BehaviorTracking from './test';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CodeCraftersHome from './home';
import FraudWarning from './warning';
import AuthPage from './login';
import ExamMonitoringPage from './exammsg';
import HeatmapPage from './display_heat_map';
function App() {
  return (
    <div>
      <Router>
            <Routes>
                <Route path="/exam" element={<BehaviorTracking />} />
                <Route path="/" element={<CodeCraftersHome />} />
                <Route path="/warning" element={<FraudWarning />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/exammsg" element={<ExamMonitoringPage />} />
                <Route path="/display_heatmap" element={<HeatmapPage/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
