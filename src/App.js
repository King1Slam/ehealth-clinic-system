import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./components/AdminDashboard";
import BillMasterDashboard from "./pages/dashboards/BillMasterDashboard";
import ClerkDashboard from "./pages/dashboards/ClerkDashboard";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import NurseDashboard from "./pages/dashboards/NurseDashboard";
import PharmacyDashboard from "./pages/dashboards/PharmacyDashboard";

// ✅ Wrapper so we can use navigate inside App
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const navigate = useNavigate();

  // 🔐 Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT/token
    navigate("/"); // back to login
  };

  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      {/* Role-based dashboards with logout support */}
      <Route path="/dashboard/billmaster" element={<BillMasterDashboard onLogout={handleLogout} />} />
      <Route path="/dashboard/clerk" element={<ClerkDashboard onLogout={handleLogout} />} />
      <Route path="/dashboard/doctor" element={<DoctorDashboard onLogout={handleLogout} />} />
      <Route path="/dashboard/nurse" element={<NurseDashboard onLogout={handleLogout} />} />
      <Route path="/dashboard/pharmacy" element={<PharmacyDashboard onLogout={handleLogout} />} />
    </Routes>
  );
}

export default AppWrapper;
