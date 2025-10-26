import { useEffect, useState } from "react";
import api from "../../api/api"; // updated path to api.js
import Navbar from "../../components/Navbar"; // updated path to Navbar
import Sidebar from "../../components/Sidebar"; // updated path to Sidebar

export default function PharmacyDashboard() {
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const fetchMedicines = async () => {
    const res = await api.get("/pharmacy");
    setMedicines(res.data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const addMedicine = async (e) => {
    e.preventDefault();
    await api.post("/pharmacy", { medicineName, quantity, expiryDate });
    setMedicineName(""); setQuantity(""); setExpiryDate("");
    fetchMedicines();
  };

  return (
    <div>
      <Navbar role="PHARMACY" />
      <div className="flex">
        <Sidebar role="PHARMACY" />
        <div className="p-6 flex-1">
          <h1 className="text-3xl mb-4">Pharmacy Dashboard</h1>

          {/* Add Medicine Form */}
          <form onSubmit={addMedicine} className="mb-6 bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Add Medicine</h2>
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Medicine Name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="date"
              className="border p-2 mb-2 w-full"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <button className="bg-blue-600 text-white p-2 rounded">Add Medicine</button>
          </form>

          {/* Medicines Table */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Medicines</h2>
            <table className="w-full text-left border">
              <thead>
                <tr className="border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Expiry</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((m) => (
                  <tr key={m.id} className="border-b">
                    <td className="p-2">{m.id}</td>
                    <td className="p-2">{m.medicineName}</td>
                    <td className="p-2">{m.quantity}</td>
                    <td className="p-2">{new Date(m.expiryDate).toLocaleDateString()}</td>
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
