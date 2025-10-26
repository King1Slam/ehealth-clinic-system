import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = "http://localhost:5000/api/staff";

export default function AdminDashboard() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const isSuper = localStorage.getItem("isSuper") === "true";

  useEffect(() => {
    if (isSuper) fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
      setMessage("Failed to fetch staff");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("✅ Staff updated successfully");
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("✅ Staff created successfully");
      }

      setForm({ name: "", email: "", password: "", role: "" });
      setEditingId(null);
      fetchStaff();
    } catch (err) {
      console.error("Error saving staff:", err);
      setMessage("❌ Error saving staff");
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setForm({ name: member.name, email: member.email, password: "", role: member.role });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑️ Staff deleted");
      fetchStaff();
    } catch (err) {
      console.error("Error deleting staff:", err);
      setMessage("❌ Error deleting staff");
    }
  };

  if (!isSuper) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600 font-semibold text-xl">
          🚫 Access denied — Super Admins only
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-8 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-blue-700">👑 Super Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Manage all staff accounts for the E-Clinic System
      </p>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md">
          {message}
        </div>
      )}

      {/* Staff Form */}
      <Card className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "✏️ Edit Staff" : "➕ Add New Staff"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 border rounded-lg"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!editingId}
            />
            <select
              className="p-2 border rounded-lg"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            >
              <option value="">Select Role</option>
              <option value="CLERK">Clerk</option>
              <option value="NURSE">Nurse</option>
              <option value="DOCTOR">Doctor</option>
              <option value="ACCOUNTANT">Accountant</option>
              <option value="PHARMACY">Pharmacy</option>
            </select>

            <Button type="submit" className="mt-2 col-span-full">
              {editingId ? "Update Staff" : "Create Staff"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Staff List */}
      <Card className="p-6 bg-white rounded-2xl shadow-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">👥 Staff List</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className="text-center hover:bg-gray-50">
                  <td className="p-2 border">{member.name}</td>
                  <td className="p-2 border">{member.email}</td>
                  <td className="p-2 border">{member.role}</td>
                  <td className="p-2 border">
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(member.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
