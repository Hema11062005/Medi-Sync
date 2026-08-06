const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./modules/auth/authRoute");
const patientRoutes = require("./modules/patients/patientRoute");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./modules/doctors/doctorRoute");
const appointmentRoutes = require("./modules/appointments/appointmentRoute");
const billRoutes = require("./modules/billing/billRoute");
const medicineRoutes = require("./modules/inventary/medicineRoute");
const prescriptionRoutes = require("./modules/prescriptions/prescriptionRoute");
const labRoutes = require("./modules/labs/labRoute");
const dashboardRoutes = require("./modules/dashboard/dashboardRoute");
const reportRoutes = require("./modules/reports/reportRoute"); // <-- Add this
const userRoutes = require("./modules/auth/userRoute");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes); // <-- Add this
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
