const express = require("express");
const { protect } = require("../../middleware/authMiddleware");

const {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} = require("./doctorController");

const router = express.Router();

// Create doctor
router.post("/", protect, createDoctor);

// Get all doctors
router.get("/", protect, getDoctors);

// Update doctor
router.put("/:id", protect, updateDoctor);

// Delete doctor
router.delete("/:id", protect, deleteDoctor);

module.exports = router;