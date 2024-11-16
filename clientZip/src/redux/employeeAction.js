
import axios from "axios";

export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EMPLOYEE_ERROR = "EMPLOYEE_ERROR";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";




export const getEmployees = () => async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:5000/employees");
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: err.message,
      });
    }
  };


export const addEmployee = (employeeData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/employees/create", employeeData);
    dispatch({
      type: ADD_EMPLOYEE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: error.message,
    });
  }
};


export const updateEmployee = (id, employeeData) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/employees/${id}`, employeeData);
    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: error.message,
    });
  }
};
