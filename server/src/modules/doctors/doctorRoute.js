const express = require("express");
const {protect} = require("../../middleware/authMiddleware");

const {
    createDoctor,
    getDoctors
} = require("./doctorController");

const router = express.Router();

// Create doctor
router.post("/", protect, createDoctor);

// Get all doctors
router.get("/", protect, getDoctors);

module.exports = router;