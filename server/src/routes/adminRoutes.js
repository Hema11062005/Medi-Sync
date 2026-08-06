const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorizeRoles("SuperAdmin"),
  (req, res) => {
    res.json({
      message: "Welcome Super Admin Dashboard",
    });
  }
);

module.exports = router;