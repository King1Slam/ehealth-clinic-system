import React from "react";

export default function Navbar({ role }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">Community Health Clinic</h1>
      <div>
        <span className="mr-4">Role: {role}</span>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
