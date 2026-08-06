const Patient = require("../patients/patients");
const Doctor = require("../doctors/doctors");
const Appointment = require("../appointments/appointments");
const Medicine = require("../inventary/medicine");
const Bill = require("../billing/bill");
const Prescription = require("../prescriptions/prescriptions");
const Lab = require("../labs/lab");

const getDashboard = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalMedicines = await Medicine.countDocuments();
    const totalBills = await Bill.countDocuments();
    const totalPrescriptions = await Prescription.countDocuments();
    const totalLabTests = await Lab.countDocuments();

    // Total Revenue
    const bills = await Bill.find();
    const totalRevenue = bills.reduce(
      (sum, bill) => sum + Number(bill.amount),
      0
    );

    // Recent Appointments
    const recentAppointments = await Appointment.find()
      .populate("patient", "name")
      .populate("doctor", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Low Stock Medicines
    const lowStockMedicines = await Medicine.find({
      stock: { $lt: 20 },
    });

    res.json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalMedicines,
      totalBills,
      totalPrescriptions,
      totalLabTests,
      totalRevenue,
      recentAppointments,
      lowStockMedicines,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getDashboard,
};