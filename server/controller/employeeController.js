const user = require("../models/user");

const getEmployeeDetails = async (req, res) => {
  try {
    const employees = await user.find({});

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getEmployeeDetails };
