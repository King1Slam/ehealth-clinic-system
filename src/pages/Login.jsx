import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("handleLogin::res::$res")

      // Save token + role
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("isSuper", data.isSuper);


      // Redirect based on role
      switch (res.data.role) {
        case "doctor":
          navigate("/dashboard/doctor");
          break;
        case "nurse":
          navigate("/dashboard/nurse");
          break;
        case "clerk":
          navigate("/dashboard/clerk");
          break;
        case "pharmacy":
          navigate("/dashboard/pharmacy");
          break;
        case "billingmaster":
          navigate("/dashboard/billingmaster");
          break;
        default:
          setError("Unknown role. Please contact admin.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          E-Health Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

