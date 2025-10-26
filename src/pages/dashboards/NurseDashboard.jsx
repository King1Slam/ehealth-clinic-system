import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NurseDashboard() {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [vitals, setVitals] = useState({
    temperature: "",
    bloodPressure: "",
    pulse: "",
  });
  const [nurseNotes, setNurseNotes] = useState("");
  const navigate = useNavigate();

  // Fetch patients on load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle saving vitals
  const handleSaveVitals = async () => {
    if (!selected) {
      alert("Select a patient first");
      return;
    }

    try {
      // Send PUT request to backend
      await axios.put(`http://localhost:5000/api/appointments/${selected.id}/vitals`, {
        ...vitals,
        nurseNotes,
      });

      alert(`Vitals for ${selected.name} saved successfully!`);

      // Reset form
      setVitals({ temperature: "", bloodPressure: "", pulse: "" });
      setNurseNotes("");
    } catch (err) {
      console.error("Error saving vitals", err);
      alert("Failed to save vitals");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="p-4 flex gap-4">
      {/* Left: Patient List */}
      <div className="w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nurse: Patient List</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <ul className="space-y-2">
          {patients.map((p) => (
            <li
              key={p.id}
              onClick={() => setSelected(p)}
              className={`border p-2 rounded cursor-pointer hover:bg-gray-100 ${
                selected?.id === p.id ? "bg-blue-100" : ""
              }`}
            >
              {p.name} - {p.nrc}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Patient Details + Vitals Form */}
      <div className="w-2/3 border p-4 rounded">
        {selected ? (
          <div>
            <h3 className="text-lg font-bold mb-2">Patient Details</h3>
            <p>
              <b>Name:</b> {selected.name}
            </p>
            <p>
              <b>Email:</b> {selected.email}
            </p>
            <p>
              <b>NRC:</b> {selected.nrc}
            </p>
            <p>
              <b>House Number:</b> {selected.houseNumber}
            </p>
            <p>
              <b>Province:</b> {selected.province}
            </p>

            {/* Vitals Form */}
            <h3 className="text-lg font-bold mt-4 mb-2">Enter Vitals</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Temperature (°C)"
                value={vitals.temperature}
                onChange={(e) =>
                  setVitals({ ...vitals, temperature: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                placeholder="Blood Pressure (e.g. 120/80)"
                value={vitals.bloodPressure}
                onChange={(e) =>
                  setVitals({ ...vitals, bloodPressure: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                placeholder="Heart Rate (bpm)"
                value={vitals.pulse}
                onChange={(e) =>
                  setVitals({ ...vitals, pulse: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
              <textarea
                placeholder="Nurse Notes"
                value={nurseNotes}
                onChange={(e) => setNurseNotes(e.target.value)}
                className="border p-2 w-full rounded"
              />
              <button
                onClick={handleSaveVitals}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Vitals
              </button>
            </div>
          </div>
        ) : (
          <p>Select a patient to view details</p>
        )}
      </div>
    </div>
  );
}
