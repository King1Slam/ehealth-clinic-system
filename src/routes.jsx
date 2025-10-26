import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ClerkDashboard from "./pages/ClerkDashboard";
import NurseDashboard from "./pages/NurseDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import BillMasterDashboard from "./pages/BillMasterDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clerk" element={<ClerkDashboard />} />
        <Route path="/nurse" element={<NurseDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/pharmacy" element={<PharmacyDashboard />} />
        <Route path="/billmaster" element={<BillMasterDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
