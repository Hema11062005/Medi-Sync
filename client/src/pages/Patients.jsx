import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: ""
  });

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Add or Update patient
  const savePatient = async () => {
    try {
      if (editingId) {
        await api.put(`/patients/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/patients", form);
      }

      setForm({
        name: "",
        age: "",
        gender: "",
        phone: ""
      });

      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete patient
  const deletePatient = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit patient
  const editPatient = (patient) => {
    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone
    });

    setEditingId(patient._id);
  };

  return (
    <Layout>
      <h1>Patients Management</h1>

      {/* Form */}
      <div>
        <input
          type="text"
          placeholder="Enter Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Enter Age"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: e.target.value })
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Enter Gender"
          value={form.gender}
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value })
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Enter Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <br /><br />

        <button onClick={savePatient}>
          {editingId ? "Update Patient" : "Add Patient"}
        </button>
      </div>

      <hr />

      {/* Patient List */}
      <h2>Patient List</h2>

      {patients.map((patient) => (
        <div key={patient._id}>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>

          <button onClick={() => editPatient(patient)}>
            Edit
          </button>

          <button onClick={() => deletePatient(patient._id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </Layout>
  );
}

export default Patients;