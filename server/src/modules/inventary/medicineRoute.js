const express = require("express");
const { protect } = require("../../middleware/authMiddleware");

const {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} = require("./medicineController");

const router = express.Router();

// Get all medicines
router.get("/", protect, getMedicines);

// Add medicine
router.post("/", protect, createMedicine);

// Get single medicine
router.get("/:id", protect, getMedicineById);

// Update medicine
router.put("/:id", protect, updateMedicine);

// Delete medicine
router.delete("/:id", protect, deleteMedicine);

module.exports = router;