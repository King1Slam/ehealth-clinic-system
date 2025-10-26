import { useEffect, useState } from "react";
import api from "../../api/api"; // updated path to api.js
import Navbar from "../../components/Navbar"; // updated path to Navbar
import Sidebar from "../../components/Sidebar"; // updated path to Sidebar


export default function BillMasterDashboard() {
  const [bills, setBills] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [services, setServices] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const fetchBills = async () => {
    const res = await api.get("/billing"); // note: lowercase 'api' to match import
    setBills(res.data);
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const addBill = async (e) => {
    e.preventDefault();
    await api.post("/billing", {
      patientId,
      services: services.split(",").map((s) => s.trim()),
      totalAmount,
    });
    setPatientId(""); setServices(""); setTotalAmount("");
    fetchBills();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/billing/${id}/status`, { status });
    fetchBills();
  };

  return (
    <div>
      <Navbar role="BILLMASTER" />
      <div className="flex">
        <Sidebar role="BILLMASTER" />
        <div className="p-6 flex-1">
          <h1 className="text-3xl mb-4">Bill Master Dashboard</h1>

          {/* Create Bill Form */}
          <form onSubmit={addBill} className="mb-6 bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Create Bill</h2>
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Services (comma separated)"
              value={services}
              onChange={(e) => setServices(e.target.value)}
            />
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Total Amount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
            <button className="bg-blue-600 text-white p-2 rounded">Create Bill</button>
          </form>

          {/* Bills Table */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Bills</h2>
            <table className="w-full text-left border">
              <thead>
                <tr className="border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">Patient</th>
                  <th className="p-2">Services</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((b) => (
                  <tr key={b.id} className="border-b">
                    <td className="p-2">{b.id}</td>
                    <td className="p-2">{b.patient.fullName}</td>
                    <td className="p-2">{b.services.join(", ")}</td>
                    <td className="p-2">{b.totalAmount}</td>
                    <td className="p-2">{b.status}</td>
                    <td className="p-2">
                      <button
                        onClick={() => updateStatus(b.id, "PAID")}
                        className="bg-green-600 text-white px-2 rounded mr-2"
                      >
                        PAID
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, "UNPAID")}
                        className="bg-red-600 text-white px-2 rounded"
                      >
                        UNPAID
                      </button>
                    </td>
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
