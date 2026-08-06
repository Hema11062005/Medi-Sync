const express = require("express");
const {protect} = require("../../middleware/authMiddleware");

const {
    createMedicine,
    getMedicines
} = require("./medicineController");

const router = express.Router();

router.post("/", protect, createMedicine);
router.get("/", protect, getMedicines);

module.exports = router;