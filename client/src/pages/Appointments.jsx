import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    appointmentDate: "",
    reason: ""
  });

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.log("Fetch Appointments Error:", error.response?.data);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (error) {
      console.log("Fetch Patients Error:", error.response?.data);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.log("Fetch Doctors Error:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const saveAppointment = async () => {
    try {
      console.log("Sending Form:", form);

      const res = await api.post("/appointments", form);

      console.log("Success:", res.data);

      setForm({
        patient: "",
        doctor: "",
        appointmentDate: "",
        reason: ""
      });

      fetchAppointments();
    } catch (error) {
      console.log(
        "Save Appointment Error:",
        error.response?.data || error.message
      );
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.log("Delete Error:", error.response?.data);
    }
  };

  return (
    <Layout>
      <h1>Appointments</h1>

      <select
        value={form.patient}
        onChange={(e) =>
          setForm({ ...form, patient: e.target.value })
        }
      >
        <option value="">Select Patient</option>
        {patients.map((patient) => (
          <option key={patient._id} value={patient._id}>
            {patient.name}
          </option>
        ))}
      </select>

      <br /><br />

      <select
        value={form.doctor}
        onChange={(e) =>
          setForm({ ...form, doctor: e.target.value })
        }
      >
        <option value="">Select Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor._id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="datetime-local"
        value={form.appointmentDate}
        onChange={(e) =>
          setForm({
            ...form,
            appointmentDate: e.target.value
          })
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Reason"
        value={form.reason}
        onChange={(e) =>
          setForm({ ...form, reason: e.target.value })
        }
      />

      <br /><br />

      <button onClick={saveAppointment}>
        Book Appointment
      </button>

      <hr />

      {appointments.map((appointment) => (
        <div key={appointment._id}>
          <p>Patient: {appointment.patient?.name}</p>
          <p>Doctor: {appointment.doctor?.name}</p>
          <p>
            Date:{" "}
            {new Date(appointment.appointmentDate).toLocaleString()}
          </p>
          <p>Reason: {appointment.reason}</p>
          <p>Status: {appointment.status}</p>

          <button
            onClick={() => deleteAppointment(appointment._id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </Layout>
  );
}

export default Appointments;