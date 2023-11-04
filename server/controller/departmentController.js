const Department = require("../models/departments");
const department = require("../models/user.js");
const getAllUniqueDepartments = async (req, res) => {
  try {
    console.log(req.user.userId);
    const uniqueDepartments = await Department.distinct("name");
    res.json(uniqueDepartments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching unique departments" });
  }
};

module.exports = { getAllUniqueDepartments };
