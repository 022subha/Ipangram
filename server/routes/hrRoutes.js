const express = require("express");
const router = express.Router();
const {
  getAllUniqueDepartments,
} = require("../controller/departmentController");
// Route to get all unique departments
router.get("/departmentslist", getAllUniqueDepartments);
//

module.exports = router;
