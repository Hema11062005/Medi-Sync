
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import ScienceIcon from "@mui/icons-material/Science";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

 const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
    roles: ["SuperAdmin","Doctor","Receptionist","Pharmacist","LabTechnician"],
  },
  {
    name: "Users",
    path: "/users",
    icon: <GroupIcon />,
    roles: ["SuperAdmin"],
  },
  {
    name: "Patients",
    path: "/patients",
    icon: <PeopleIcon />,
    roles: ["SuperAdmin","Doctor","Receptionist"],
  },
  {
    name: "Doctors",
    path: "/doctors",
    icon: <PersonIcon />,
    roles: ["SuperAdmin"],
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <EventIcon />,
    roles: ["SuperAdmin","Doctor","Receptionist"],
  },
  {
    name: "Pharmacy",
    path: "/pharmacy",
    icon: <LocalPharmacyIcon />,
    roles: ["SuperAdmin","Pharmacist"],
  },
  {
    name: "Prescriptions",
    path: "/prescriptions",
    icon: <ReceiptLongIcon />,
    roles: ["SuperAdmin","Doctor"],
  },
  {
    name: "Billing",
    path: "/billing",
    icon: <PaymentsIcon />,
    roles: ["SuperAdmin","Receptionist"],
  },
  {
    name: "Laboratory",
    path: "/labs",
    icon: <ScienceIcon />,
    roles: ["SuperAdmin","LabTechnician"],
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <BarChartIcon />,
    roles: ["SuperAdmin"],
  },
];

  return (
    <div
      style={{
        width: 240,
        minHeight: "100vh",
        background: "#1e293b",
        color: "#fff",
        padding: 20,
      }}
    >
      <h2 style={{ marginBottom: 20 }}>🏥 MediSync</h2>

      <div
        style={{
          background: "#334155",
          padding: 15,
          borderRadius: 10,
          marginBottom: 25,
        }}
      >
        <strong>{user?.name}</strong>
        <br />
        <small>{user?.role}</small>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
  {menuItems
    .filter((item) => item.roles.includes(user?.role))
    .map((item) => (
      <li key={item.path} style={{ marginBottom: 8 }}>
        <Link
          to={item.path}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#fff",
            background:
              location.pathname === item.path
                ? "#2563eb"
                : "transparent",
            transition: "0.3s",
          }}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      </li>
    ))}
</ul>
      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          marginTop: 25,
          padding: 12,
          background: "#ef4444",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
