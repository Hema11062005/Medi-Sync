const express = require("express");

const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("./patientController");

const { protect } = require("../../middleware/authMiddleware");

const router = express.Router();

// Create Patient
router.post("/", protect, createPatient);

// Get All Patients
router.get("/", protect, getPatients);

// Get Patient By ID
router.get("/:id", protect, getPatientById);

// Update Patient
router.put("/:id", protect, updatePatient);

// Delete Patient
router.delete("/:id", protect, deletePatient);

module.exports = router;