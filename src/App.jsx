import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import BillMasterDashboard from "./pages/dashboards/BillMasterDashboard";
import ClerkDashboard from "./pages/dashboards/ClerkDashboard";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import NurseDashboard from "./pages/dashboards/NurseDashboard";
import PharmacyDashboard from "./pages/dashboards/PharmacyDashboard";

const router = createBrowserRouter(
  [
    { path: "/", element: <Login /> },
    { path: "/dashboard/billmaster", element: <BillMasterDashboard /> },
    { path: "/dashboard/clerk", element: <ClerkDashboard /> },
    { path: "/dashboard/doctor", element: <DoctorDashboard /> },
    { path: "/dashboard/nurse", element: <NurseDashboard /> },
    { path: "/dashboard/pharmacy", element: <PharmacyDashboard /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
