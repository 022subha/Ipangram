import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/authSlice";
import { employeeEndPoints } from "../api";
import { apiConnector } from "../apiConnector";

const { ALL_EMPLOYEE_API, EDIT_EMPLOYEE_API, DELETE_EMPLOYEE_API } =
  employeeEndPoints;

export function getAllEmployees() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      // dispatch(setLoading(true));
      const response = await apiConnector(
        `GET`,
        ALL_EMPLOYEE_API,
        {},
        {
          authorization: "Bearer " + token,
        }
      );
      // dispatch(setLoading(false));
      return response?.data?.employees;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log(error);
    }
  };
}

export function editEmployee(data, navigate) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch(setLoading(true));
      const response = await apiConnector(`POST`, EDIT_EMPLOYEE_API, data, {
        authorization: token,
      });
      dispatch(setLoading(false));

      toast.success(response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/dashboard/employees");
    } catch (error) {
      dispatch(setLoading(false));
      if (error?.response) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
}
