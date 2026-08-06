const express = require("express");
const router = express.Router();

const {
  createLab,
  getLabs,
  updateLab,
  deleteLab,
} = require("./labController");

router.post("/", createLab);

router.get("/", getLabs);

router.put("/:id", updateLab);

router.delete("/:id", deleteLab);

module.exports = router;