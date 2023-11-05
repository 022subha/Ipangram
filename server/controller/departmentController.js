const departments = require("../models/departments.js");

const getAllDepartments = async (req, res) => {
  try {
    const departmentsWithCounts = await departments
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "department",
            as: "employees",
          },
        },
        {
          $project: {
            name: 1,
            employeeCount: { $size: "$employees" },
          },
        },
      ])
      .exec();

    return res
      .status(200)
      .json({ success: true, departments: departmentsWithCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching unique departments" });
  }
};

const departmentInfo = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await departments.findById(departmentId);
    if (!department) {
      return res
        .status(401)
        .json({ success: false, message: "No such department exist" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding departments" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const department = await departments.findOne({ name });
    if (department) {
      return res
        .status(401)
        .json({ success: false, message: "Department already exist" });
    }

    const newDepartment = new departments({ name });
    await newDepartment.save();

    return res
      .status(200)
      .json({ success: true, message: "Department created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding departments" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const { departmentId } = req.params;

    const department = await departments.findById(departmentId);

    if (!department) {
      return res
        .status(401)
        .json({ success: false, message: "No such department exist" });
    }

    department.name = name;
    await department.save();

    return res
      .status(200)
      .json({ success: true, message: "Department updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding departments" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await departments.findById(departmentId);

    if (!department) {
      return res
        .status(401)
        .json({ success: false, message: "No such department exist" });
    }

    await department.delete();

    return res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding departments" });
  }
};

module.exports = {
  getAllDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
  departmentInfo,
};
