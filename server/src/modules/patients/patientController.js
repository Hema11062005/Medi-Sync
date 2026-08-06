const Patient = require("./patients");

// CREATE PATIENT
const createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      phone,
      address,
      bloodGroup,
      allergies,
      medicalHistory,
      insuranceDetails
    } = req.body;

    const patient = new Patient({
      patientId: "PAT" + Date.now(),
      name,
      age,
      gender,
      phone,
      address,
      bloodGroup,
      allergies,
      medicalHistory,
      insuranceDetails
    });

    await patient.save();

    res.status(201).json({
      message: "Patient created successfully",
      patient
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL PATIENTS
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET SINGLE PATIENT
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE PATIENT
const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      patient: updatedPatient
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE PATIENT
const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }

    res.status(200).json({
      message: "Patient deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
};