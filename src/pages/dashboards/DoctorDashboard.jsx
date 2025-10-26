// src/pages/dashboards/DoctorDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../api/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescriptions, setPrescriptions] = useState("");
  const [notes, setNotes] = useState("");

  const fetchAppointments = async () => {
    const res = await api.get("/appointments");
    setAppointments(res.data);
  };

  const fetchAppointmentDetails = async (id) => {
    const res = await api.get(`/appointments/${id}`);
    setSelectedAppointment(res.data);
  };

  const handleSaveDiagnosis = async () => {
    if (!diagnosis) return alert("Diagnosis required");
    await api.put(`/appointments/${selectedAppointment.id}/diagnosis`, {
      diagnosis,
      prescriptions: prescriptions.split(",").map(p => p.trim()),
      notes
    });
    setDiagnosis("");
    setPrescriptions("");
    setNotes("");
    setSelectedAppointment(null);
    fetchAppointments();
  };

  useEffect(() => { fetchAppointments(); }, []);

  return (
    <div>
      <Navbar role="DOCTOR" />
      <div className="flex">
        <Sidebar role="DOCTOR" />
        <div className="p-6 flex-1">
          <h1 className="text-3xl mb-4">Doctor Dashboard</h1>
          {!selectedAppointment ? (
            <table className="w-full text-left border">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2">ID</th>
                  <th className="p-2">Patient ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{a.id}</td>
                    <td className="p-2">{a.patientId}</td>
                    <td className="p-2">{a.patientName}</td>
                    <td className="p-2">{new Date(a.appointmentTime).toLocaleString()}</td>
                    <td className="p-2">{a.status}</td>
                    <td className="p-2">
                      <button
                        onClick={() => fetchAppointmentDetails(a.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">
                Patient: {selectedAppointment.patientName} ({selectedAppointment.patientId})
              </h2>
              <p><b>Time:</b> {new Date(selectedAppointment.appointmentTime).toLocaleString()}</p>
              <p><b>Status:</b> {selectedAppointment.status}</p>

              <h3 className="mt-4 font-bold">Vitals</h3>
              {selectedAppointment.vitals ? (
                <ul className="mb-4">
                  <li>BP: {selectedAppointment.vitals.bloodPressure}</li>
                  <li>Temp: {selectedAppointment.vitals.temperature}</li>
                  <li>Weight: {selectedAppointment.vitals.weight}</li>
                  <li>Pulse: {selectedAppointment.vitals.pulse}</li>
                </ul>
              ) : (
                <p className="mb-4 text-red-500">No vitals recorded yet.</p>
              )}

              <h3 className="mt-4 font-bold">Add Diagnosis</h3>
              <textarea
                className="border p-2 w-full mb-2"
                placeholder="Diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
              <input
                className="border p-2 w-full mb-2"
                placeholder="Prescriptions (comma separated)"
                value={prescriptions}
                onChange={(e) => setPrescriptions(e.target.value)}
              />
              <textarea
                className="border p-2 w-full mb-2"
                placeholder="Additional Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button
                onClick={handleSaveDiagnosis}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Diagnosis
              </button>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
