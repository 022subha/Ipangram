const express = require("express");
const { getEmployeeDetails } = require("../controller/employeeController.js");
const {
  authenticateJWT,
  authorizeManager,
} = require("../middleware/middleware");

const router = express.Router();

router.get(
  "/show-all-employees",
  authenticateJWT,
  authorizeManager,
  getEmployeeDetails
);

module.exports = router;
