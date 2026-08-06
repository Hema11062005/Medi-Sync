const express = require("express");

const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("./userController");

const { protect } = require("../../middleware/authMiddleware");
const authorizeRoles = require("../../middleware/roleMiddleware");

// SuperAdmin only
router.get("/", protect, authorizeRoles("SuperAdmin"), getUsers);

router.post("/", protect, authorizeRoles("SuperAdmin"), createUser);

router.put("/:id", protect, authorizeRoles("SuperAdmin"), updateUser);

router.delete("/:id", protect, authorizeRoles("SuperAdmin"), deleteUser);

module.exports = router;