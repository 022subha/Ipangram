import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdDelete,
  MdEdit,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { getAllDepartments } from "../../../services/operations/departmentAPI";
import {
  deleteEmployee,
  editEmployee,
  getAllEmployees,
} from "../../../services/operations/employeeAPI";

export default function Employees() {
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([{ id: 1, name: "Hr" }]);
  const [department, setDepartment] = useState(1);
  const [employees, setEmployees] = useState([
    {
      firstName: "Subhajit",
      lastName: "Samanta",
      email: "022subha@gmail.com",
      department: "Hr",
    },
  ]);

  useEffect(() => {
    // setEmployees(dispatch(getAllEmployees()));
    // setDepartments(dispatch(getAllDepartments()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (employeeId) => {
    dispatch(editEmployee(employeeId, department));
  };

  const handleDelete = (employeeId) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this employee?",
      onOk() {
        dispatch(deleteEmployee(employeeId));
      },
      okButtonProps: {
        className: "bg-custom-gradient",
      },
    });
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
              Department
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Change Department
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] "></th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <React.Fragment key={index}>
                <tr className="">
                  <td className="border-b-2 border-black text-center h-16">
                    <p>
                      {employee?.firstName} {employee?.lastName}
                    </p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <p>{employee?.email}</p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <p>{employee?.department}</p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <select
                      className="outline-none p-1 rounded-md "
                      value={department}
                    >
                      {departments.map((item, index) => (
                        <option key={index} value={item?.id}>
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

                  <td className="border-b-2 border-black flex items-center text-center justify-center h-16 ">
                    <MdEdit className="text-[46px] px-[10px] cursor-pointer" />
                    <MdDelete
                      className="text-[46px] px-[10px] text-red-700 cursor-pointer"
                      onClick={() => {
                        handleDelete();
                      }}
                    />
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
