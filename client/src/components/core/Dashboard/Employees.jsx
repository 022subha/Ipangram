import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getAllDepartments } from "../../../services/operations/departmentAPI";
import {
  editEmployee,
  getAllEmployees,
} from "../../../services/operations/employeeAPI";

export default function Employees() {
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState();

  useEffect(() => {
    const fetchEmployees = async () => {
      const result = await dispatch(getAllEmployees());
      if (result) {
        setEmployees(result);
        setDepartment(result.department ? result.department : "");
      }
    };

    const fetchDepartments = async () => {
      setDepartments(await dispatch(getAllDepartments()));
    };

    fetchEmployees();
    fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (employeeId) => {
    console.log(department);
    console.log(departments);
    dispatch(editEmployee(employeeId, department));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center self-end mb-4">
        <select className="border-2 border-black p-1 rounded-md ">
          <option>Sort By Name</option>
          <option>Sort By Location</option>
        </select>
        <MdArrowUpward className="text-xl" />
        <MdArrowDownward className="text-xl" />
      </div>
      <table className="w-full py-[10px]">
        <thead>
          <tr className="text-white">
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Name
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Email
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Location
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Department
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <React.Fragment key={index}>
                <tr className="">
                  <td className="border-b-2 border-black text-center h-16">
                    <p>
                      {employee?.FirstName} {employee?.LastName}
                    </p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <p>{employee?.Email}</p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <p>{employee?.Location}</p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <select
                      className="outline-none p-1 rounded-md "
                      value={department}
                      onChange={(e) => {
                        setDepartment(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        No Department
                      </option>
                      {departments.map((item, index) => (
                        <option
                          key={index}
                          value={item?.name}
                          className="text-center w-fit"
                        >
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="px-4 py-1 bg-custom-gradient text-white rounded-md"
                      onClick={() => handleEdit(employee?.id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Employee available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
