import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Billing() {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    patient: "",
    amount: "",
    paymentStatus: "Pending",
  });

  const fetchBills = async () => {
    const res = await api.get("/bills");
    setBills(res.data);
  };

  const fetchPatients = async () => {
    const res = await api.get("/patients");
    setPatients(res.data);
  };

  useEffect(() => {
    fetchBills();
    fetchPatients();
  }, []);

  const saveBill = async () => {
    try {
      if (editingId) {
        await api.put(`/bills/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/bills", form);
      }

      setForm({
        patient: "",
        amount: "",
        paymentStatus: "Pending",
      });

      fetchBills();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const editBill = (bill) => {
    setEditingId(bill._id);

    setForm({
      patient: bill.patient?._id,
      amount: bill.amount,
      paymentStatus: bill.paymentStatus,
    });
  };

  const deleteBill = async (id) => {
    await api.delete(`/bills/${id}`);
    fetchBills();
  };

  return (
    <Layout>
      <h1>Billing</h1>

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

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <br />
      <br />

      <select
        value={form.paymentStatus}
        onChange={(e) =>
          setForm({
            ...form,
            paymentStatus: e.target.value,
          })
        }
      >
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
      </select>

      <br />
      <br />

      <button onClick={saveBill}>
        {editingId ? "Update Bill" : "Add Bill"}
      </button>

      <hr />

      {bills.map((bill) => (
        <div key={bill._id}>
          <p>
            <strong>Patient:</strong>{" "}
            {bill.patient?.name}
          </p>

          <p>
            <strong>Amount:</strong> ₹{bill.amount}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {bill.paymentStatus}
          </p>

          <button onClick={() => editBill(bill)}>
            Edit
          </button>

          {"  "}

          <button
            onClick={() => deleteBill(bill._id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </Layout>
  );
}

export default Billing;