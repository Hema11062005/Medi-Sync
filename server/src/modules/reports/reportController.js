const Patient = require("../patients/patients");
const Doctor = require("../doctors/doctors");
const Appointment = require("../appointments/appointments");
const Bill = require("../billing/bill");
const Medicine = require("../inventary/medicine");
const Prescription = require("../prescriptions/prescriptions");
const Lab = require("../labs/lab");

const getReport = async (req, res) => {
  try {
    const patients = await Patient.find();
    const doctors = await Doctor.find();
    const appointments = await Appointment.find();
    const bills = await Bill.find().populate("patient", "name");
    const medicines = await Medicine.find();
    const prescriptions = await Prescription.find()
      .populate("patient", "name")
      .populate("doctor", "name");
    const labs = await Lab.find().populate("patient", "name");

    res.json({
      patients,
      doctors,
      appointments,
      bills,
      medicines,
      prescriptions,
      labs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getReport,
};