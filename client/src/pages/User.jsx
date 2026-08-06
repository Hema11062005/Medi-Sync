import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

function Users() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Doctor",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users", form);

      alert("User Created Successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "Doctor",
      });

      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await API.delete(`/users/${id}`);

    fetchUsers();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: 30,
          background: "#f4f6f9",
          minHeight: "100vh",
        }}
      >
        <h1>User Management</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option>Doctor</option>
            <option>Receptionist</option>
            <option>Pharmacist</option>
            <option>LabTechnician</option>
            <option>SuperAdmin</option>
          </select>

          <button type="submit">
            Add User
          </button>
        </form>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            background: "#fff",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;