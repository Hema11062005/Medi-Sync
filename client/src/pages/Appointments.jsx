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
    reason: "",
  });

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.log(
        "Fetch Appointments Error:",
        error.response?.data || error.message
      );
    }
  };

  // Fetch patients
  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (error) {
      console.log(
        "Fetch Patients Error:",
        error.response?.data || error.message
      );
    }
  };

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.log(
        "Fetch Doctors Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  // Save appointment
  const saveAppointment = async () => {
    try {
      // Frontend validation
      if (!form.patient) {
        alert("Please select a patient");
        return;
      }

      if (!form.doctor) {
        alert("Please select a doctor");
        return;
      }

      if (!form.appointmentDate) {
        alert("Please select appointment date and time");
        return;
      }

      if (!form.reason.trim()) {
        alert("Please enter the reason for the appointment");
        return;
      }

      const appointmentData = {
        patient: form.patient,
        doctor: form.doctor,
        appointmentDate: form.appointmentDate,
        reason: form.reason.trim(),
      };

      console.log("Sending Form:", appointmentData);

      const res = await api.post("/appointments", appointmentData);

      console.log("Appointment Success:", res.data);

      alert("Appointment booked successfully!");

      setForm({
        patient: "",
        doctor: "",
        appointmentDate: "",
        reason: "",
      });

      fetchAppointments();
    } catch (error) {
      console.log("STATUS:", error.response?.status);

      console.log(
        "BACKEND ERROR:",
        JSON.stringify(error.response?.data, null, 2)
      );

      console.log(
        "SENT FORM:",
        JSON.stringify(form, null, 2)
      );

      alert(
        error.response?.data?.message ||
          "Failed to book appointment"
      );
    }
  };

  // Delete appointment
  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);

      alert("Appointment deleted successfully!");

      fetchAppointments();
    } catch (error) {
      console.log(
        "Delete Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete appointment"
      );
    }
  };

  return (
    <Layout>
      <h1>Appointments</h1>

      {/* Patient */}
      <select
        value={form.patient}
        onChange={(e) =>
          setForm({
            ...form,
            patient: e.target.value,
          })
        }
      >
        <option value="">Select Patient</option>

        {patients.map((patient) => (
          <option
            key={patient._id}
            value={patient._id}
          >
            {patient.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      {/* Doctor */}
      <select
        value={form.doctor}
        onChange={(e) =>
          setForm({
            ...form,
            doctor: e.target.value,
          })
        }
      >
        <option value="">Select Doctor</option>

        {doctors.map((doctor) => (
          <option
            key={doctor._id}
            value={doctor._id}
          >
            {doctor.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      {/* Date */}
      <input
        type="datetime-local"
        value={form.appointmentDate}
        onChange={(e) =>
          setForm({
            ...form,
            appointmentDate: e.target.value,
          })
        }
      />

      <br />
      <br />

      {/* Reason */}
      <input
        type="text"
        placeholder="Reason"
        value={form.reason}
        onChange={(e) =>
          setForm({
            ...form,
            reason: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button onClick={saveAppointment}>
        Book Appointment
      </button>

      <hr />

      <h2>Appointment List</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((appointment) => (
          <div key={appointment._id}>
            <p>
              <strong>Patient:</strong>{" "}
              {appointment.patient?.name || "Unknown"}
            </p>

            <p>
              <strong>Doctor:</strong>{" "}
              {appointment.doctor?.name || "Unknown"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {appointment.appointmentDate
                ? new Date(
                    appointment.appointmentDate
                  ).toLocaleString()
                : "Not available"}
            </p>

            <p>
              <strong>Reason:</strong>{" "}
              {appointment.reason}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {appointment.status}
            </p>

            <button
              onClick={() =>
                deleteAppointment(appointment._id)
              }
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </Layout>
  );
}

export default Appointments;