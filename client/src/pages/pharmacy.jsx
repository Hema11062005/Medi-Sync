import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Pharmacy() {
  const [medicines, setMedicines] = useState([]);

  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    price: "",
    quantity: ""
  });

  const [editingId, setEditingId] = useState(null);

  const fetchMedicines = async () => {
    try {
      const res = await api.get("/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const saveMedicine = async () => {
    try {
      if (
        !form.name ||
        !form.manufacturer ||
        !form.price ||
        !form.quantity
      ) {
        return alert("Please fill all fields");
      }

      if (editingId) {
        await api.put(`/medicines/${editingId}`, form);
        alert("Medicine Updated Successfully");
      } else {
        await api.post("/medicines", form);
        alert("Medicine Added Successfully");
      }

      setForm({
        name: "",
        manufacturer: "",
        price: "",
        quantity: ""
      });

      setEditingId(null);

      fetchMedicines();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  const editMedicine = (medicine) => {
    setEditingId(medicine._id);

    setForm({
      name: medicine.name,
      manufacturer: medicine.manufacturer,
      price: medicine.price,
      quantity: medicine.quantity
    });
  };

  const deleteMedicine = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;

    await api.delete(`/medicines/${id}`);
    fetchMedicines();
  };

  return (
    <Layout>
      <h2>Pharmacy Management</h2>

      <input
        placeholder="Medicine Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Manufacturer"
        value={form.manufacturer}
        onChange={(e) =>
          setForm({
            ...form,
            manufacturer: e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({
            ...form,
            price: e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) =>
          setForm({
            ...form,
            quantity: e.target.value
          })
        }
      />

      <button onClick={saveMedicine}>
        {editingId ? "Update" : "Add"} Medicine
      </button>

      <hr />

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id}>
              <td>{medicine.name}</td>
              <td>{medicine.manufacturer}</td>
              <td>₹ {medicine.price}</td>
              <td>{medicine.quantity}</td>

              <td>
                <button
                  onClick={() => editMedicine(medicine)}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteMedicine(medicine._id)
                  }
                  style={{ marginLeft: "10px" }}
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

export default Pharmacy;