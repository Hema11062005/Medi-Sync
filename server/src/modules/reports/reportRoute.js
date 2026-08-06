const express = require("express");
const router = express.Router();

const { getReport } = require("./reportController");

router.get("/", getReport);

module.exports = router;