import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    medicine: "",
    dosage: "",
    instructions: ""
  });

  const fetchPrescriptions = async () => {
    const res = await api.get("/prescriptions");
    setPrescriptions(res.data);
  };

  const fetchPatients = async () => {
    const res = await api.get("/patients");
    setPatients(res.data);
  };

  const fetchDoctors = async () => {
    const res = await api.get("/doctors");
    setDoctors(res.data);
  };

  const fetchMedicines = async () => {
    const res = await api.get("/medicines");
    setMedicines(res.data);
  };

  useEffect(() => {
    fetchPrescriptions();
    fetchPatients();
    fetchDoctors();
    fetchMedicines();
  }, []);

  const savePrescription = async () => {
    try {
      await api.post("/prescriptions", form);

      setForm({
        patient: "",
        doctor: "",
        medicine: "",
        dosage: "",
        instructions: ""
      });

      fetchPrescriptions();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deletePrescription = async (id) => {
    try {
      await api.delete(`/prescriptions/${id}`);
      fetchPrescriptions();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <Layout>
      <h1>Prescriptions</h1>

      <select
        value={form.patient}
        onChange={(e) =>
          setForm({ ...form, patient: e.target.value })
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

      <br /><br />

      <select
        value={form.doctor}
        onChange={(e) =>
          setForm({ ...form, doctor: e.target.value })
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

      <br /><br />

      <select
        value={form.medicine}
        onChange={(e) =>
          setForm({ ...form, medicine: e.target.value })
        }
      >
        <option value="">Select Medicine</option>

        {medicines.map((medicine) => (
          <option
            key={medicine._id}
            value={medicine._id}
          >
            {medicine.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="text"
        placeholder="Dosage"
        value={form.dosage}
        onChange={(e) =>
          setForm({
            ...form,
            dosage: e.target.value
          })
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Instructions"
        value={form.instructions}
        onChange={(e) =>
          setForm({
            ...form,
            instructions: e.target.value
          })
        }
      />

      <br /><br />

      <button onClick={savePrescription}>
        Add Prescription
      </button>

      <hr />

      {prescriptions.map((prescription) => (
        <div key={prescription._id}>
          <p>
            <b>Patient:</b>{" "}
            {prescription.patient?.name}
          </p>

          <p>
            <b>Doctor:</b>{" "}
            {prescription.doctor?.name}
          </p>

          <p>
            <b>Medicine:</b>{" "}
            {prescription.medicine?.name}
          </p>

          <p>
            <b>Dosage:</b>{" "}
            {prescription.dosage}
          </p>

          <p>
            <b>Instructions:</b>{" "}
            {prescription.instructions}
          </p>

          <button
            onClick={() =>
              deletePrescription(prescription._id)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </Layout>
  );
}

export default Prescriptions;