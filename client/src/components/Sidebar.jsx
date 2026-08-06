import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  // Prevent crash if AuthContext is unavailable
  if (!auth) {
    return null;
  }

  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "230px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>🏥 MediSync</h2>

      <div
        style={{
          background: "#334155",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <strong>{user?.name || "Guest"}</strong>
        <br />
        <small>{user?.role || "No Role"}</small>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "12px" }}>
          <Link to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>
        </li>

        {user?.role === "SuperAdmin" && (
  <li style={{ marginBottom: "12px" }}>
    <Link to="/users" style={linkStyle}>
      Users
    </Link>
  </li>
)}

        {/* Super Admin */}
        {user?.role === "SuperAdmin" && (
          <>
            <li style={{ marginBottom: "12px" }}>
              <Link to="/patients" style={linkStyle}>
                Patients
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/doctors" style={linkStyle}>
                Doctors
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/appointments" style={linkStyle}>
                Appointments
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/pharmacy" style={linkStyle}>
                Pharmacy
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/prescriptions" style={linkStyle}>
                Prescriptions
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/billing" style={linkStyle}>
                Billing
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/labs" style={linkStyle}>
                Laboratory
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/reports" style={linkStyle}>
                Reports
              </Link>
            </li>
          </>
        )}

        {/* Doctor */}
        {user?.role === "Doctor" && (
          <>
            <li style={{ marginBottom: "12px" }}>
              <Link to="/patients" style={linkStyle}>
                Patients
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/appointments" style={linkStyle}>
                Appointments
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/prescriptions" style={linkStyle}>
                Prescriptions
              </Link>
            </li>
          </>
        )}

        {/* Receptionist */}
        {user?.role === "Receptionist" && (
          <>
            <li style={{ marginBottom: "12px" }}>
              <Link to="/patients" style={linkStyle}>
                Patients
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/appointments" style={linkStyle}>
                Appointments
              </Link>
            </li>

            <li style={{ marginBottom: "12px" }}>
              <Link to="/billing" style={linkStyle}>
                Billing
              </Link>
            </li>
          </>
        )}

        {/* Pharmacist */}
        {user?.role === "Pharmacist" && (
          <li style={{ marginBottom: "12px" }}>
            <Link to="/pharmacy" style={linkStyle}>
              Pharmacy
            </Link>
          </li>
        )}

        {/* Lab Technician */}
        {user?.role === "LabTechnician" && (
          <li style={{ marginBottom: "12px" }}>
            <Link to="/labs" style={linkStyle}>
              Laboratory
            </Link>
          </li>
        )}
      </ul>

      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
          background: "#ef4444",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  padding: "8px 0",
};

export default Sidebar;