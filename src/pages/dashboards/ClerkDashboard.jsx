import { useState, useEffect } from "react";
import api from "../../api/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function ClerkDashboard() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [province, setProvince] = useState("");
  const [nrc, setNrc] = useState("");
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    try {
      await api.post("/patients", { fullName, email, houseNumber, province, nrc });
      setFullName(""); setEmail(""); setHouseNumber(""); setProvince(""); setNrc("");
      fetchPatients();
      alert("Patient registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to register patient");
    }
  };

  return (
    <div>
      <Navbar role="CLERK" />
      <div className="flex">
        <Sidebar role="CLERK" />
        <div className="p-6 flex-1">
          <h1 className="text-3xl mb-4">Clerk Dashboard</h1>

          {/* Register Patient Form */}
          <form onSubmit={handleRegisterPatient} className="mb-6 bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Register Patient</h2>
            <input className="border p-2 mb-2 w-full" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
            <input className="border p-2 mb-2 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="border p-2 mb-2 w-full" placeholder="House Number" value={houseNumber} onChange={e => setHouseNumber(e.target.value)} />
            <input className="border p-2 mb-2 w-full" placeholder="Province" value={province} onChange={e => setProvince(e.target.value)} />
            <input className="border p-2 mb-2 w-full" placeholder="NRC" value={nrc} onChange={e => setNrc(e.target.value)} />
            <button className="bg-blue-600 text-white p-2 rounded">Register Patient</button>
          </form>

          {/* Patients List */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Registered Patients</h2>
            <table className="w-full text-left border">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2">ID</th>
                  <th className="p-2">Full Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">House No</th>
                  <th className="p-2">Province</th>
                  <th className="p-2">NRC</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">{p.fullName}</td>
                    <td className="p-2">{p.email}</td>
                    <td className="p-2">{p.houseNumber}</td>
                    <td className="p-2">{p.province}</td>
                    <td className="p-2">{p.nrc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
