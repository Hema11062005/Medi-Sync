import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Labs() {
  const [labs, setLabs] = useState([]);
  const [patients, setPatients] = useState([]);

  const [form, setForm] = useState({
    patient: "",
    testName: "",
    result: "",
    status: "Pending",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchLabs = async () => {
    try {
      const res = await api.get("/labs");
      setLabs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLabs();
    fetchPatients();
  }, []);

  const saveLab = async () => {
    try {
      if (editingId) {
        await api.put(`/labs/${editingId}`, form);
      } else {
        await api.post("/labs", form);
      }

      setForm({
        patient: "",
        testName: "",
        result: "",
        status: "Pending",
      });

      setEditingId(null);
      fetchLabs();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const editLab = (lab) => {
    setEditingId(lab._id);

    setForm({
      patient: lab.patient?._id || "",
      testName: lab.testName,
      result: lab.result,
      status: lab.status,
    });
  };

  const deleteLab = async (id) => {
    if (!window.confirm("Delete this lab record?")) return;

    await api.delete(`/labs/${id}`);
    fetchLabs();
  };

  return (
    <Layout>
      <h1>Lab Management</h1>

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

      <input
        type="text"
        placeholder="Test Name"
        value={form.testName}
        onChange={(e) =>
          setForm({ ...form, testName: e.target.value })
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Result"
        value={form.result}
        onChange={(e) =>
          setForm({ ...form, result: e.target.value })
        }
      />

      <br /><br />

      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <br /><br />

      <button onClick={saveLab}>
        {editingId ? "Update Lab Test" : "Add Lab Test"}
      </button>

      <hr />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Patient</th>
            <th>Test Name</th>
            <th>Result</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {labs.map((lab) => (
            <tr key={lab._id}>
              <td>{lab.patient?.name}</td>
              <td>{lab.testName}</td>
              <td>{lab.result}</td>
              <td>{lab.status}</td>

              <td>
                <button onClick={() => editLab(lab)}>
                  Edit
                </button>

                {" "}

                <button
                  onClick={() => deleteLab(lab._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Labs;