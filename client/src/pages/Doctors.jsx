import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: ""
  });

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Add or Update doctor
  const saveDoctor = async () => {
    try {
      if (editingId) {
        await api.put(`/doctors/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/doctors", form);
      }

      setForm({
        name: "",
        specialization: "",
        experience: "",
        phone: ""
      });

      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete doctor
  const deleteDoctor = async (id) => {
    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit doctor
  const editDoctor = (doctor) => {
    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      phone: doctor.phone
    });

    setEditingId(doctor._id);
  };

  return (
    <Layout>
      <h1>Doctors Management</h1>

      {/* Form */}
      <div>
        <input
          type="text"
          placeholder="Doctor Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Specialization"
          value={form.specialization}
          onChange={(e) =>
            setForm({ ...form, specialization: e.target.value })
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Experience"
          value={form.experience}
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <br /><br />

        <button onClick={saveDoctor}>
          {editingId ? "Update Doctor" : "Add Doctor"}
        </button>
      </div>

      <hr />

      {/* Doctor List */}
      <h2>Doctor List</h2>

      {doctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        doctors.map((doctor) => (
          <div key={doctor._id}>
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>Phone:</strong> {doctor.phone}</p>

            <button onClick={() => editDoctor(doctor)}>
              Edit
            </button>

            <button onClick={() => deleteDoctor(doctor._id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </Layout>
  );
}

export default Doctors;