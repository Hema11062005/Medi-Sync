const express = require("express");
const router = express.Router();

const {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill,
} = require("./billController");

router.post("/", createBill);
router.get("/", getBills);
router.get("/:id", getBillById);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

module.exports = router;