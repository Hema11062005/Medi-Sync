import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Pharmacy from "./pages/Pharmacy";
import Billing from "./pages/Billing";
import Laboratory from "./pages/lab";
import Reports from "./pages/Report";
import Prescriptions from "./pages/Prescriptions";
import Users from "./pages/User";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Patients */}
      <Route
        path="/patients"
        element={
          <RoleProtectedRoute
            allowedRoles={["SuperAdmin", "Doctor", "Receptionist"]}
          >
            <Patients />
          </RoleProtectedRoute>
        }
      />

      {/* Doctors */}
      <Route
        path="/doctors"
        element={
          <RoleProtectedRoute allowedRoles={["SuperAdmin"]}>
            <Doctors />
          </RoleProtectedRoute>
        }
      />

      {/* Appointments */}
      <Route
        path="/appointments"
        element={
          <RoleProtectedRoute
            allowedRoles={["SuperAdmin", "Doctor", "Receptionist"]}
          >
            <Appointments />
          </RoleProtectedRoute>
        }
      />

      {/* Pharmacy */}
      <Route
        path="/pharmacy"
        element={
          <RoleProtectedRoute
            allowedRoles={["SuperAdmin", "Pharmacist"]}
          >
            <Pharmacy />
          </RoleProtectedRoute>
        }
      />

      {/* Prescriptions */}
      <Route
        path="/prescriptions"
        element={
          <RoleProtectedRoute
            allowedRoles={["SuperAdmin", "Doctor"]}
          >
            <Prescriptions />
          </RoleProtectedRoute>
        }
      />

      {/* Billing */}
      <Route
        path="/billing"
        element={
          <RoleProtectedRoute
            allowedRoles={["SuperAdmin", "Receptionist"]}
          >
            <Billing />
          </RoleProtectedRoute>
        }
      />

      {/* Laboratory */}
      <Route
        path="/labs"
        element={
          <RoleProtectedRoute
            allowedRoles={["SuperAdmin", "LabTechnician"]}
          >
            <Laboratory />
          </RoleProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <RoleProtectedRoute allowedRoles={["SuperAdmin"]}>
            <Reports />
          </RoleProtectedRoute>
        }
      />
      <Route
  path="/users"
  element={
    <RoleProtectedRoute allowedRoles={["SuperAdmin"]}>
      <Users />
    </RoleProtectedRoute>
  }
/>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;